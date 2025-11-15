import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { ServiceItem } from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";


const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="flex size-full flex-col items-start overflow-clip">
      {/* Hero Section com Imagem */}
      <div className="relative h-[297px] w-full">
        <div className="absolute left-0 top-0 h-full w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Botão Voltar */}
        <div className="absolute left-0 top-0 flex w-full items-baseline gap-[91px] px-5 pb-0 pt-6">
          <Button
            size="icon"
            variant="secondary"
            className="overflow-clip rounded-full"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Container Principal */}
      <div className="w-full flex-1 rounded-tl-3xl rounded-tr-3xl bg-background">
        {/* Informações da Barbearia */}
        <div className="flex w-full items-center gap-1.5 px-5 pb-0 pt-6">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-start gap-1.5">
              <div className="relative size-[30px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xl font-bold text-foreground">
                {barbershop.name}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {barbershop.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="px-0 py-6">
          <Separator />
        </div>

        {/* Sobre Nós */}
        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-xs font-bold uppercase text-foreground">
              SOBRE NÓS
            </p>
          </div>
          <p className="w-full text-sm text-foreground">
            {barbershop.description}
          </p>
        </div>

        {/* Divider */}
        <div className="px-0 py-6">
          <Separator />
        </div>

        {/* Serviços */}
        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-xs font-bold uppercase text-foreground">
              SERVIÇOS
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="px-0 py-6">
          <Separator />
        </div>

        {/* Contato */}
        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-xs font-bold uppercase text-foreground">
              CONTATO
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full flex-col items-center gap-2.5 px-0 pb-0 pt-[60px]">
          <div className="flex w-full flex-col items-start justify-center gap-1.5 bg-secondary px-[30px] py-8 text-xs leading-none">
            <p className="font-semibold text-foreground">
              © 2025 Copyright Aparatus
            </p>
            <p className="font-normal text-muted-foreground">
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;