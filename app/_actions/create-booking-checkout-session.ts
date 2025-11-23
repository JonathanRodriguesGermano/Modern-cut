"use server";
import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { returnValidationErrors } from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBookingCheckoutSession = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        barbershop: true,
      },
    });
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: ["Service not found"],
      });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-07-30.basil",
    });
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata: {
        date: date.toISOString(),
      },
      line_items: [
        {
          price_data: {
            currency: "brl",
            unit_amount: service.priceInCents,
            product_data: {
              name: `${service.barbershop.name} - ${service.name} em ${format(date, "dd/MM/yyyy HH:mm")}`,
              description: service.description,
              images: [service.imageUrl],
            },
          },
          quantity: 1,
        },
      ],
    });
    return checkoutSession;
  });