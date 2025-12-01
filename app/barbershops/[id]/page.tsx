import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin } from "lucide-react";
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
    <div className="h-full w-full max-w-6xl mx-auto md:px-8 md:py-10">
      {/* Hero Section com Imagem */}
      <div className="relative h-[297px] w-full md:hidden">
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover opacity-100"
          />
          {/* Dica: Um gradiente escuro ajuda o botão de voltar a aparecer */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Botão Voltar */}
        <div className="absolute top-0 left-0 flex w-full items-baseline gap-[91px] px-5 pt-6 pb-0">
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

      {/* --- LAYOUT GRID PARA DESKTOP --- */}
      {/* Mobile: flex-col | Desktop: Grid com 3 colunas (1 esq / 2 dir) */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-10">
        
        {/* === COLUNA DA ESQUERDA (Info + Imagem) === */}
        <div className="relative z-10 -mt-5 md:mt-0 flex flex-col md:col-span-1">
          
          {/* Imagem Desktop (Só aparece no PC) */}
          <div className="hidden md:block relative h-[300px] w-full mb-6 rounded-xl overflow-hidden">
             <Image
                src={barbershop.imageUrl}
                alt={barbershop.name}
                fill
                className="object-cover"
              />
          </div>

          {/* Card de Informações */}
          <div className="bg-background rounded-t-3xl md:rounded-xl p-5 md:p-6 border md:border-gray-200">
             <div className="flex items-center gap-2 mb-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-primary">
                  <Image
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                   <h1 className="text-xl font-bold">{barbershop.name}</h1>
                   <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="size-4" />
                      <p className="text-sm">{barbershop.address}</p>
                   </div>
                </div>
             </div>

             <Separator className="my-4" />

             {/* Contatos (Movi para a esquerda no desktop para liberar espaço) */}
             <div className="space-y-3">
                 <h3 className="text-xs font-bold uppercase text-muted-foreground">Contato</h3>
                 {barbershop.phones.map((phone, index) => (
                    <PhoneItem key={index} phone={phone} />
                  ))}
             </div>
          </div>
        </div>

        {/* === COLUNA DA DIREITA (Serviços + Sobre) === */}
        <div className="bg-background md:col-span-2 p-5 md:p-0 flex flex-col gap-8">
            
            {/* Sobre Nós */}
            <div className="md:bg-card md:p-6 md:rounded-xl md:border">
                <h2 className="font-bold uppercase text-sm mb-3 text-muted-foreground">Sobre Nós</h2>
                <p className="text-sm leading-relaxed">{barbershop.description}</p>
            </div>

            <Separator className="md:hidden" />

            {/* Serviços (Grid no desktop) */}
            <div className="flex flex-col gap-4">
                <h2 className="font-bold uppercase text-sm text-muted-foreground md:text-lg md:text-foreground">Serviços</h2>
                
                {/* AQUI ESTÁ A MÁGICA DO GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {barbershop.services.map((service) => (
                    <ServiceItem
                      key={service.id}
                      service={{ ...service, barbershop }}
                    />
                  ))}
                </div>
            </div>

        </div>

      </div>
      
      {/* Footer (Apenas mobile, desktop geralmente tem footer global) */}
      <div className="md:hidden mt-10">
         {/* Seu footer existente */}
      </div>
    </div>
  );
};

export default BarbershopPage;
