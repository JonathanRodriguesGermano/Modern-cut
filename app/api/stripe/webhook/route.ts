import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const date = session.metadata?.date
      ? new Date(session.metadata.date)
      : null;
    const serviceId = session.metadata?.serviceId;
    const barbershopId = session.metadata?.barbershopId;
    const userId = session.metadata?.userId;
    if (!date || !serviceId || !barbershopId || !userId) {
      return NextResponse.error();
    }

    // Retrieve session with expanded payment_intent to get chargeId
    const expandedSession = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ["payment_intent"],
      },
    );

    // Extract chargeId from payment_intent
    const paymentIntent =
      expandedSession.payment_intent as Stripe.PaymentIntent;
    const chargeId =
      typeof paymentIntent?.latest_charge === "string"
        ? paymentIntent.latest_charge
        : paymentIntent?.latest_charge?.id;

    await prisma.booking.create({
      data: {
        barbershopId,
        serviceId,
        date,
        userId,
        stripeChargeId: chargeId || null,
      },
    });
  }
  revalidatePath("/bookings");
  return NextResponse.json({ received: true });
};
