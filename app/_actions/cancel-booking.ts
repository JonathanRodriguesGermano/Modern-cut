"use server";

import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const inputSchema = z.object({
  bookingId: z.uuid(),
});

export const cancelBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { bookingId } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      returnValidationErrors(inputSchema, {
        _errors: ["Reserva não encontrada"],
      });
    }

    if (booking.userId !== session.user.id) {
      returnValidationErrors(inputSchema, {
        _errors: ["Você não tem permissão para cancelar esta reserva"],
      });
    }

    if (booking.cancelled) {
      returnValidationErrors(inputSchema, {
        _errors: ["Esta reserva já foi cancelada"],
      });
    }

    if (booking.date < new Date()) {
      returnValidationErrors(inputSchema, {
        _errors: ["Não é possível cancelar reservas passadas"],
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        cancelled: true,
        cancelledAt: new Date(),
      },
    });
    revalidatePath("/bookings");
    return updatedBooking;
  });