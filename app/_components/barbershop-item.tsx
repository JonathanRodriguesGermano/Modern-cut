import React from "react";
import Image from "next/image";
import { Barbershop } from "../generated/prisma/client";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Link
      href={`/barbershops/${barbershop.id}`}
      className="relative min-h-[200px] w-full min-w-[290px] rounded-xl md:min-w-0"
    >
      <div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-linear-to-t from-black to-transparent"/>
      <Image
        src={barbershop.imageUrl}
        alt={barbershop.name}
        fill
        className="rounded-xl object-cover"
      />
      <div className="absolute right-0 bottom-0 left-0 z-20 rounded-md p-4">
        <h3 className="text-background dark:text-foreground text-lg font-bold">
          {" "}
          {barbershop.name}
        </h3>
        <p className="text-background dark:text-foreground text-xs">{barbershop.address}</p>
      </div>
    </Link>
  );
};
export default BarbershopItem;
