"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import * as React from "react"
import { ToolBar } from "./ToolBar"
import { PaginationBar } from "./PaginationBar"
import { cn } from "@/lib/utils"
import { PackageMinus } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  tableTitle
}: DataTableProps<TData, TValue> & { 
  className?: string 
  tableTitle?: React.JSX.Element
}) {
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 25 })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className={cn("flex flex-col max-h-full group hover:inset-shadow-2xs hover:inset-shadow-trongkho-foreground/50 duration-800 transition overflow-scroll", className)}>
      <div className="bg-background group-hover:inset-shadow-2xs group-hover:inset-shadow-trongkho-foreground/50">
        <div className="h-auto flex p-3 px-5 gap-3 text-muted-foreground group-hover:text-trongkho-foreground group-active:text-trongkho-foreground transition cursor-default">
          {tableTitle && tableTitle}
        </div>
        <ToolBar />
      </div>  
      <div className="">
      {table.getHeaderGroups().map((headerGroup) => (
        <div className="border-y flex h-10" key={headerGroup.id} > {/*Header*/}
          {headerGroup.headers.map((header) => {
            const canResize = header.column.getCanResize?.() ?? true
            return (
              <div
                key={header.id}
                className="border-r bg-card text-xs z-10"
                style={{ width: header.getSize?.() }}
              >
                {/**Individual header cell */}
                {header.isPlaceholder ? null : (
                  <div className="flex items-center justify-between px-3 py-0 h-10">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                )}
                {canResize && (
                  <div
                    onMouseDown={header.getResizeHandler?.()}
                    onTouchStart={header.getResizeHandler?.()}
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-transparent hover:bg-border active:bg-border"
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
      </div>

      <div className="overflow-y-auto">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="flex h-10 items-center text-muted-foreground hover:text-foreground transition hover:bg-muted/50 data-[state=selected]:bg-muted border-b"
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className="flex items-center h-10 border-r text-xs px-3"
                  style={{ width: cell.column.getSize?.() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>
            <div className="h-24 text-center">
              No results.
            </div>
          </div>
        )}
      </div>
      <PaginationBar />
    </div>
  )
}