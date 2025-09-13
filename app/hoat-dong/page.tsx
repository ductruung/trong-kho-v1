
import { Heading } from "@/components/hoat-dong/Heading"
import { ViewBar } from "@/components/hoat-dong/ViewBar"
import { DataTable } from "@/components/hoat-dong/data-table"
import { columns, columns_seperated } from "@/components/hoat-dong/columns"
import { mockActivities } from "@/components/hoat-dong/mock"
import { PaginationBar } from "@/components/hoat-dong/PaginationBar"
import { PackageMinus, PackagePlus } from "lucide-react"

export default function HoatDongPage() {
  return (
    <main className="flex w-screen h-screen pt-12 pl-12">
        <Heading />
        <div className="flex-1 h-full w-full">
          <ViewBar />
         
          <div className="grid grid-cols-2 h-[94%] w-full divide-x">
            <DataTable 
              columns={columns_seperated} 
              data={mockActivities}
              tableTitle={
                <>
                  <PackageMinus strokeWidth={1.5} className="size-[20px]" />
                  <h2 className="text-sm">Bảng xuất kho</h2>
                </>
              }
            />
            <DataTable
              columns={columns_seperated} 
              data={mockActivities} 
              tableTitle={
                <>
                  <PackagePlus strokeWidth={1.5} className="size-[20px]" />
                  <h2 className="text-sm">Bảng nhập kho</h2>
                </>
              }
            />
          </div>
   
        </div>
    </main>
  );
}