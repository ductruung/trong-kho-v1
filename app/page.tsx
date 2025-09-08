import Image from "next/image";
import type { Metadata } from 'next';
import { Bell, Dot, Inbox, Search } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LiveWatchingSelect from "@/components/live-watching-select";

export const metadata: Metadata = {
  title: 'Trông kho',
  description: '...',
}

export default function Home() {
  return (
    <div className="w-full py-10">
      <main className="px-4">
        <div className="py-16 border border-b">
          <div className="max-w-7xl mx-auto flex justify-between">
            <h1 className="text-3xl">Cửa hàng tạp hoá</h1>
            <LiveWatchingSelect />
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-16 space-y-16">
          <div className="mb-6">
            <h2 className="text-xl font-medium">Hoạt động gần đây</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="gap-3 rounded-none">
              <CardHeader className="text-sm h-fit gap-0">
                <CardTitle className="p-0 font-normal">
                  Nhập kho
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <div className="px-3">
                  <div className="relative">
                    <Input className="pr-8 rounded-none" placeholder="Tìm kiếm hàng..." />
                  </div>
                </div>
                <ul className="border-y grid grid-cols-1 text-sm divide-y divide-muted">
                  <h3 className="py-3 pl-6">
                    Hôm nay
                    <Badge className="ml-2 rounded-full font-mono tabular-nums h-5 min-w-5 px-1">1</Badge>
                  </h3>
                  <div className="text-muted-foreground">
                    <li className="flex justify-between px-6 py-3">
                      <span className="font-mono">17:30</span>
                      <span className="truncate">Coca-Cola vỉ 6 lon</span>
                      <span className="font-mono">x4</span>
                      <span>quét QR</span>
                    </li>
                  </div>
                  <h3 className="py-3 pl-6">
                    Hôm qua
                    <Badge className="ml-2 rounded-full font-mono tabular-nums h-5 min-w-5 px-1">3</Badge>
                  </h3>
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
                <CardTitle className="text-sm">
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
    </div>
  );
}
