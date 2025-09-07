import Image from "next/image";
import type { Metadata } from 'next';
import { Bell, Inbox, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: 'Trông kho',
  description: '...',
}

export default function Home() {
  return (
    <>
      <header className="h-12 border-b border-gray-600">
        <Tooltip>
          <TooltipTrigger className="my-auto" asChild>
            <Button variant="outline" size="icon" className="rounded-full border-gray-600">
              <Bell size={18} strokeWidth={1.5} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-foreground bg-background border border-muted-foreground" arrow={false}>
            Thông báo
          </TooltipContent>
        </Tooltip>
    </header>
    <main className="px-4">
      <div className="py-16 border-b border-gray-600">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl">Cửa hàng tạp hoá</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-16 space-y-16">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Hoạt động gần đây</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Hàng nhập kho
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <div className="px-6">
                  <div className="relative">
                  <Search className="absolute top-2.25 left-2.25" size={16} strokeWidth={1.5} />
                  <Input className="pl-8" placeholder="Tìm kiếm hàng..." />
                  </div>
                </div>
                <ul className="border-y grid grid-cols-1 text-sm divide-y divide-muted">
                  <h3 className="bg-background py-3 pl-6">Hôm nay (1)</h3>
                  <li className="flex justify-between px-6 py-3"> 
                    <span className="font-mono">17:30</span>
                    <span className="truncate">Coca-Cola vỉ 6 lon</span>
                    <span>x4</span>
                    <span>quét QR</span>
                  </li>
                  <h3 className="bg-background py-3 pl-6">Hôm qua (3)</h3>
                  <li className="flex justify-between px-6 py-3"> 
                    <span className="font-mono">17:30</span>
                    <span className="truncate">Coca-Cola vỉ 6 lon</span>
                    <span>x4</span>
                    <span>quét QR</span>
                  </li>
                  <li className="flex justify-between px-6 py-3"> 
                    <span className="font-mono">17:30</span>
                    <span className="truncate">Coca-Cola vỉ 6 lon</span>
                    <span>x4</span>
                    <span>quét QR</span>
                  </li>
                  <li className="flex justify-between px-6 py-3"> 
                    <span className="font-mono">17:30</span>
                    <span className="truncate">Coca-Cola vỉ 6 lon</span>
                    <span>x4</span>
                    <span>quét QR</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>
                  Hàng xuất kho
                </CardTitle>
              </CardHeader>   
              <CardContent className="h-full">
                  <div className="flex flex-col justify-center items-center h-full text-sm text-muted-foreground">
                    <Inbox color="#6e6e6e" size={100} absoluteStrokeWidth />
                    Hiện chưa có đơn hàng nào xuất kho
                  </div>
                </CardContent>           
            </Card>
          </div>
      </div>
    </main>
    </>
  );
}
