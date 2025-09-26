import { Download, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FilterDropdownMenu } from "./FilterDropdownMenu"
import { SortDropdownMenu } from "./SortDropdownMenu"

export function ToolBar() {
  return (
    <div className="w-auto flex items-center gap-3 border-r h-10 bg-card px-3 py-3">
      <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
        <RotateCcw className="text-muted-foreground size-[14px]" />
        Cập nhật
      </Button>
      <FilterDropdownMenu />
      <SortDropdownMenu />
      <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer"  variant="ghost" size="sm">
        <Download className="text-muted-foreground size-[14px]" />
        Tải bảng
      </Button>
      <Separator orientation="vertical" />
      <Button
        className="bg-trongkho-foreground/40 border border-bg-trongkho-foreground/60 text-xs duration-200 text-white hover:bg-trongkho-foreground/50 hover:border-bg-trongkho-foreground/70 h-fit py-1 rounded-sm ml-3 cursor-pointer"
        size="sm"
      >
        <Plus className="size-[14px]" />
        Nhập tay hoạt động
      </Button>
    </div>
  )
}
