"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Activity } from "./types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react"
import { TableContext } from "./data-table"
import { useContext } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { defaultSortItems, deserializeSortParam, toSortParam } from "./SortDropdownMenu"

function SortDropdown({ 
  context,
  column, 
} 
: { 
  context?: string 
  column: string
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortKey = 
    context === "checkin" ? "checkin_sort" :
    context === "checkout" ? "checkout_sort" :
      "sort";
  const sortParams = params.getAll(sortKey);
  const sortItem = deserializeSortParam(sortParams).find(item => item.column === column);
  const pathname = usePathname();
  const { replace } = useRouter();

  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-fit w-fit has-[>svg]:px-1 py-1 cursor-pointer rounded-sm"
        >
          <ChevronDown className="size-[14px] text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        alignOffset={-8}
        className="rounded-sm"
      >
        <DropdownMenuItem 
          className="text-xs text-muted-foreground"
          // onClick={() => onSelect("asc")}
        >
          <ArrowUp />
          Sắp xếp tăng dần
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-xs text-muted-foreground"
          // onClick={() => onSelect("des")}
        >
          <ArrowDown />
          Sắp xếp giảm dần
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Mã</span>
        {/* <SortDropdown column="id" /> */}
      </div>,
  },
  {
    accessorKey: "created_date",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Ngày</span>
        {/* <SortDropdown column="date" /> */}
      </div>,
  },
  {
    accessorKey: "created_time",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Giờ</span>
        {/* <SortDropdown column="time" /> */}
      </div>,
  },
  {
    accessorKey: "product",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Sản phẩm</span>
        {/* <SortDropdown column="product" /> */}
      </div>
  },
  {
    accessorKey: "type",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Loại</span>
        {/* <SortDropdown column="type" /> */}
      </div>
  },
  {
    accessorKey: "by",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Phương thức</span>
        {/* <SortDropdown column="by" /> */}
      </div>
  }
]

export const columns_seperated = (context: string): ColumnDef<Activity>[] => {  
  return [
  {
    accessorKey: "id",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Mã</span>
        {/* <SortDropdown context={context} column="id" /> */}
      </div>,
  },
  {
    accessorKey: "created_date",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Ngày</span>
        {/* <SortDropdown context={context} column="date" /> */}
      </div>,
  },
  {
    accessorKey: "created_time",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Giờ</span>
        {/* <SortDropdown context={context} column="time" /> */}
      </div>,
  },
  {
    accessorKey: "product",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Sản phẩm</span>
        {/* <SortDropdown context={context} column="product" /> */}
      </div>
  },
  {
    accessorKey: "by",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Phương thức</span>
        {/* <SortDropdown context={context} column="by" /> */}
      </div>
  }
]}