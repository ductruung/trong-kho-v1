"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Activity } from "./types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react"

function SortDropdown() {
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
        <DropdownMenuItem className="text-xs text-muted-foreground">
          <ArrowUp />
          Sắp xếp tăng dần
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs text-muted-foreground">
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
        <SortDropdown />
      </div>,
  },
  {
    accessorKey: "created_date",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Ngày</span>
        <SortDropdown />
      </div>,
  },
  {
    accessorKey: "created_time",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Giờ</span>
        <SortDropdown />
      </div>,
  },
  {
    accessorKey: "product",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Sản phẩm</span>
        <SortDropdown />
      </div>
  },
  {
    accessorKey: "type",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Loại</span>
        <SortDropdown />
      </div>
  },
  {
    accessorKey: "by",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span></span>
        <SortDropdown />
      </div>
  }
]

export const columns_seperated: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Mã</span>
        <SortDropdown />
      </div>,
  },
  {
    accessorKey: "created_date",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Ngày</span>
        <SortDropdown />
      </div>,
  },
  {
    accessorKey: "created_time",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Giờ</span>
        <SortDropdown />
      </div>,
  },
  {
    accessorKey: "product",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span>Sản phẩm</span>
        <SortDropdown />
      </div>
  },
  {
    accessorKey: "by",
    header: () =>
      <div className="w-full flex items-center justify-between">
        <span></span>
        <SortDropdown />
      </div>
  }
]