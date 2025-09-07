import Image from "next/image";
import type { Metadata } from 'next';
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Trông kho',
  description: '...',
}

export default function Home() {
  return (
    <>
    <header className="h-12 border-b border-gray-600">
      <Button className="rounded-full border-gray-600">
        <Bell strokeWidth={1.5} />Hello
      </Button>
    </header>
    <main className="px-4">
      <div className="py-16 border-b border-gray-600">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl">Cửa hàng tạp hoá Ma Vương</h1>
      </div>
      </div>
    </main>
    </>
  );
}
