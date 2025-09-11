"use client"
import { useState } from "react"
import { Heading } from "@/components/hoat-dong/Heading"
import { ViewBar } from "@/components/hoat-dong/ViewBar"
import { ToolBar } from "@/components/hoat-dong/ToolBar"
import { DataTable } from "@/components/hoat-dong/data-table"
import { columns } from "@/components/hoat-dong/columns"
import { mockActivities } from "@/components/hoat-dong/mock"

export default function HoatDongPage() {
  const [viewMode, setViewMode] = useState("one");

  return (
    <main className="flex w-full pt-12 pl-12">
      <Heading />
      <div className="w-full">
        <ViewBar viewMode={viewMode} setViewMode={setViewMode} />
        <ToolBar />
        <DataTable columns={columns} data={mockActivities} />
      </div>
    </main>
  );
}