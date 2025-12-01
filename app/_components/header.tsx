"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SidebarMenu from "./sidebar-menu";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Hearder = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="flex items-center justify-between px-5 py-6 md:container md:mx-auto md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/logo.svg" alt="Aparatus" width={100} height={26.09} />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Início
            </Link>
            <Link
              href="/bookings"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Agendamentos
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" asChild>
            <Link href="/chat">
              <MessageCircleIcon />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[370px] p-0">
              <SheetHeader className="border-b px-6 py-6 text-left">
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              </SheetHeader>
              <SidebarMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Hearder;
