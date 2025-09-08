"use client"
import { ChevronsUpDown, Slash } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="z-99 fixed w-screen h-12 border border-b bg-background">
      <div className="flex items-center h-full pr-3 flex-1 overflow-x-auto gap-x-3 pl-3 text-sm">
        <Image
          width={20}
          height={20}
          src="/trong-kho-logo-icon.png"
          alt="Logo Trông Kho"
        />
        <span className="text-muted-foreground cursor-default">Trông kho</span>
        <span className="text-border">
          <Slash size={14} strokeWidth={2.5} />
        </span>
        <span className="text-muted-foreground cursor-default">Cửa hàng tạp hoá</span>
        <span className="text-border">
          <Slash size={14} strokeWidth={2.5} />
        </span>
        <div className="flex items-center gap-1">
          <Link href={pathname} >
            {pathname === "/" && "Tổng quan"}
            {pathname === "/hoat-dong" && "Hoạt động"}
            {pathname === "/kho" && "Kho"}
          </Link>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer text-muted-foreground px-1">
                <ChevronsUpDown size={16} strokeWidth={1} />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="grid grid-cols-1 divide-y divide-border p-0 text-xs text-muted-foreground w-40 cursor-pointer z-999"
              align="start"
              sideOffset={1}
            >
              <Link
                className={cn("px-3 py-2 hover:text-white transition duration-200", pathname === "/" && "text-trongkho-foreground hover:text-trongkho-foreground")}
                href="/"
              >
                Tổng quan
              </Link>
              <Link
                className={cn("px-3 py-2 hover:text-white transition duration-200", pathname === "/hoat-dong" && "text-trongkho-foreground hover:text-trongkho-foreground")}
                href="/hoat-dong"
              >
                Hoạt động
              </Link>
              <Link
                className={cn("px-3 py-2 hover:text-white transition duration-200", pathname === "/kho" && "text-trongkho-foreground hover:text-trongkho-foreground")}
                href="/kho"
              >
                Kho
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}