"use client"
import { useState } from "react"
import { Heading } from "@/components/hoat-dong/Heading"
import { ViewBar } from "@/components/hoat-dong/ViewBar"
import { ToolBar } from "@/components/hoat-dong/ToolBar"

export default function HoatDongPage() {
  const [viewMode, setViewMode] = useState("one");

  return (
    <main className="flex w-full pt-12 pl-12">
      <Heading />
      <div className="w-full">
        <ViewBar viewMode={viewMode} setViewMode={setViewMode} />
        <ToolBar />
      </div>
    </main>
  );
}