import Image from "next/image";
import { BarbershopService } from "../generated/prisma/client";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

export function ServiceItem({ service }: ServiceItemProps) {
  const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-solid border-border bg-card p-3">
      {/* Imagem */}
      <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex grow basis-0 flex-row items-center self-stretch">
        <div className="relative flex h-full min-h-0 min-w-0 grow basis-0 flex-col items-start justify-between">
          {/* Service Info */}
          <div className="flex h-[67.5px] w-full flex-col items-start gap-1 text-sm leading-[1.4]">
            <p className="w-full font-bold text-card-foreground">
              {service.name}
            </p>
            <p className="w-full font-normal text-muted-foreground">
              {service.description}
            </p>
          </div>

          {/* Price and Button */}
          <div className="flex w-full items-center justify-between">
            <p className="whitespace-pre text-sm font-bold leading-[1.4] text-card-foreground">
              {priceInReais}
            </p>
            <Button className="rounded-full px-4 py-2">Reservar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}