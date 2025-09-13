
import { Heading } from "@/components/hoat-dong/Heading"
import { ViewBar } from "@/components/hoat-dong/ViewBar"
import { ToolBar } from "@/components/hoat-dong/ToolBar"
import { DataTable } from "@/components/hoat-dong/data-table"
import { columns } from "@/components/hoat-dong/columns"
import { mockActivities } from "@/components/hoat-dong/mock"
import { PaginationBar } from "@/components/hoat-dong/PaginationBar"

export default function HoatDongPage() {
  return (
    <main className="flex w-screen h-screen pt-12 pl-12">
      <div className="flex w-full h-full">
      <Heading />
      <div className="flex flex-col w-full">
        <ViewBar />
        <ToolBar />
        <DataTable columns={columns} data={mockActivities} />
        <PaginationBar />
      </div>
      </div>
    </main>
  );
}