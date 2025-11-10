import Image from "next/image";
import Hearder from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";

const Home = () => {
  return (
    <main>
      <Hearder />
      <div className="space-y-4 px-5">
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <h2 className="text-xs text-foreground">Agendamentos</h2>
        <BookingItem 
        serviceName="Corte de Cabelo"
        barbeshopName="Barbearia do João"
        barbeshopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
        date={new Date()}
        />
      </div>
    </main>
  );
};

export default Home;
