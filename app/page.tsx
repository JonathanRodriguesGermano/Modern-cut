import Image from "next/image";
import Hearder from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";

import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";
import QuickSearchButtons from "./_components/quick-search-buttons";
import { Button } from "./_components/ui/button";

const Home = async () => {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <main>
      <Hearder />
      <PageContainer>
        <SearchInput />
        <QuickSearchButtons />

        {/* sessao banner */}
        <div className="mt-6 flex flex-col items-center gap-5 md:flex-row md:items-stretch">
          {/* Lado direito banner */}
          <div className="w-full flex-1">
            <Image
              src={banner}
              alt="Agende agora!"
              sizes="100vw"
              className="h-auto w-full rounded-xl object-cover md:w-xl"
            />
          </div>

          {/* Lado esquerdo banner */}
          <div className="text-card-foreground hidden flex-1 flex-col justify-center p-8 md:flex">
            <h2 className="mb-3 text-3xl leading-tight font-bold">
              Seu próximo corte,{" "}
              <span className="text-primary">agora mesmo!</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Encontre os profissionais mais{" "}
              <span className="font-semibold text-yellow-500">
                bem avaliados
              </span>{" "}
              da sua região e garanta seu horário sem espera.
            </p>
            <Button className="w-full font-bold uppercase md:w-auto">
              Agendar Horário
            </Button>
          </div>
        </div>

        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
