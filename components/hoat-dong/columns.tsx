"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Activity } from "./types"

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: "Mã",
  },
  {
    accessorKey: "created_date",
    header: "Ngày",
  },
  {
    accessorKey: "created_time",
    header: "Giờ",
  },
  {
    accessorKey: "product",
    header: "Sản phẩm"
  },
  {
    accessorKey: "type",
    header: "Loại"
  },
  {
    accessorKey: "by",
    header: ""
  }
]