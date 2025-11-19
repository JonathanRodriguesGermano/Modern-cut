"use client";

import Image from "next/image";
import { BarbershopService, Barbershop } from "../generated/prisma/client";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { ptBR } from "date-fns/locale";

interface ServiceItemProps {
  service: BarbershopService & {
    barbershop: Barbershop;
  };
}

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export function ServiceItem({ service }: ServiceItemProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const priceInReaisInteger = Math.floor(service.priceInCents / 100);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
    : "";

  const isConfirmDisabled = !selectedDate || !selectedTime;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Sheet>
      <div className="border-border bg-card flex items-center justify-center gap-3 rounded-2xl border border-solid p-3">
        <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[10px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex grow basis-0 flex-row items-center self-stretch">
          <div className="relative flex h-full min-h-0 min-w-0 grow basis-0 flex-col items-start justify-between">
            <div className="flex h-[67.5px] w-full flex-col items-start gap-1 text-sm leading-[1.4]">
              <p className="text-card-foreground w-full font-bold">
                {service.name}
              </p>
              <p className="text-muted-foreground w-full font-normal">
                {service.description}
              </p>
            </div>

            <div className="flex w-full items-center justify-between">
              <p className="text-card-foreground text-sm leading-[1.4] font-bold whitespace-pre">
                {priceInReais}
              </p>
              <SheetTrigger asChild>
                <Button className="rounded-full px-4 py-2">Reservar</Button>
              </SheetTrigger>
            </div>
          </div>
        </div>
      </div>

      <SheetContent className="w-[370px] overflow-y-auto p-0">
        <div className="flex h-full flex-col gap-6">
          <SheetHeader className="px-5 pt-6">
            <SheetTitle className="text-lg font-bold">Fazer Reserva</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-5">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: today }}
              className="w-full p-0"
              locale={ptBR}
            />
          </div>

          {selectedDate && (
            <>
              <Separator />

              <div className="flex gap-3 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="shrink-0 rounded-full px-4 py-2"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="flex flex-col gap-3 px-5">
                <div className="border-border bg-card flex w-full flex-col gap-3 rounded-[10px] border border-solid p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-card-foreground text-base font-bold">
                      {service.name}
                    </p>
                    <p className="text-card-foreground text-sm font-bold">
                      R${priceInReaisInteger},00
                    </p>
                  </div>

                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <p>Data</p>
                    <p>{formattedDate}</p>
                  </div>

                  {selectedTime && (
                    <div className="text-muted-foreground flex items-center justify-between text-sm">
                      <p>Horário</p>
                      <p>{selectedTime}</p>
                    </div>
                  )}

                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <p>Barbearia</p>
                    <p>{service.barbershop.name}</p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-6">
                <Button
                  className="w-full rounded-full"
                  disabled={isConfirmDisabled}
                >
                  Confirmar
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
