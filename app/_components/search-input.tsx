import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2">
      <Input type="text" placeholder="Pesquise serviços ou barbearias..." className="rounded-full" />
      <Button variant="default" size="icon" className="rounded-full">
        <SearchIcon />
      </Button>
    </div>
  );
};
export default SearchInput;
