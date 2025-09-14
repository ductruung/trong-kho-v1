"use client"
import { Columns2, Square } from "lucide-react"
import { useState, useMemo, useCallback } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function ViewBar({ viewMode }: { viewMode: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleToggle = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', value);
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace]);

  return (
    <div className="flex w-full items-center gap-3 border-b h-14 px-3 py-3">
      <ToggleGroup
        value={viewMode}
        size="sm"
        type="single"
        variant="outline"
        onValueChange={handleToggle}
      >
        <ToggleGroupItem className="text-muted-foreground data-[state=on]:text-trongkho-foreground cursor-pointer data-[state=on]:border-border p-2" value="one" aria-label="Chế độ xem một bảng">
          <Square className="size-[14px]" />
        </ToggleGroupItem>
        <ToggleGroupItem className="text-muted-foreground data-[state=on]:text-trongkho-foreground cursor-pointer p-2" value="two" aria-label="Chế độ xem hai bảng">
          <Columns2 className="size-[14px]" />
        </ToggleGroupItem>
      </ToggleGroup>
      <span className="text-muted-foreground text-xs">
        {viewMode === "one" ?
          "Xem các hoạt động nhập kho và xuất kho ở cùng một bảng." :
          "Xem các hoạt động nhập kho và xuất kho ở hai bảng khác nhau."
        }
      </span>
    </div>
  )
}
