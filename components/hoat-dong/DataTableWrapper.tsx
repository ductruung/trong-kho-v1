"use client"

import { DataTable } from "./data-table"
import { columns, columns_seperated } from "./columns"
import { Activity } from "./types"
import * as React from "react"

interface DataTableWrapperProps {
  data: Activity[]
  className?: string 
  tableTitle?: React.JSX.Element
  viewMode: string
  context: string
}

export function DataTableWrapper({
  data,
  className,
  tableTitle,
  viewMode,
  context
}: DataTableWrapperProps) {
  // Determine which columns to use based on context
  const tableColumns = context === "unified" 
    ? columns 
    : columns_seperated(context as "checkin" | "checkout")

  return (
    <DataTable
      columns={tableColumns}
      data={data}
      className={className}
      tableTitle={tableTitle}
      viewMode={viewMode}
      context={context}
    />
  )
}
