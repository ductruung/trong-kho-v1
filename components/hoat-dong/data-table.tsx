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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 25 })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    state: { pagination },
    onPaginationChange: setPagination,
  })

  return (
    <>
    <Table containerClassName="max-h-[480px] overflow-y-auto" style={{ minWidth: table.getTotalSize?.() }}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className="border-b" data-slot="table-row" key={headerGroup.id} >
            {headerGroup.headers.map((header) => {
              const canResize = header.column.getCanResize?.() ?? true
              return (
                <TableHead
                  key={header.id}
                  className="border-r bg-card text-xs font-bold sticky top-0 z-10"
                  style={{ width: header.getSize?.() }}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center justify-between">
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
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}

            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="border-r text-xs"
                  style={{ width: cell.column.getSize?.() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>

      </TableFooter>
    </Table>
    <div className="flex items-center justify-between gap-3 px-2 py-2 text-xs">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-7 w-7 rounded-sm border bg-background disabled:opacity-50"
          aria-label="Previous page"
        >
          ←
        </button>
        <div className="px-2">Page <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> of <span className="font-medium">{table.getPageCount()}</span></div>
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-7 w-7 rounded-sm border bg-background disabled:opacity-50"
          aria-label="Next page"
        >
          →
        </button>
      </div>
      <div className="flex items-center gap-2">
        <select
          className="h-7 rounded-sm border bg-background px-2"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>{size} rows</option>
          ))}
        </select>
        <div className="text-muted-foreground">{data.length} records</div>
      </div>
    </div>
    </>
  )
}