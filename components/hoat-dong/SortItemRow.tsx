import { ArrowDownNarrowWide, ArrowDownWideNarrow, Menu, X } from "lucide-react"
import { Button } from "../ui/button"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import {CSS} from '@dnd-kit/utilities'
import { cn } from "@/lib/utils"
import {useSortable} from '@dnd-kit/sortable'
import { SortItem } from "./types"

export default function SortItemRow({ 
  item, 
  itemIndex,
  onOrderChange,
  onRemove 
}: {
  item: SortItem
  itemIndex: number
  onOrderChange: (column: string, order: string) => void
  onRemove: (column: string) => void
}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: item.id,
    transition: {
      duration: 150, 
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      className={cn("flex gap-3 px-3 items-center")}
      style={sortableStyle}
      {...attributes}
    >
      <Menu {...listeners} className="size-[16px] hover:text-foreground transition duration-200 text-muted-foreground cursor-pointer" />
      <div className="grow">
        <span className="text-xs text-muted-foreground">
          theo
          <span className="text-sm text-foreground">
            {item.column === "id" && " Mã"}
            {item.column === "date" && " Ngày"}
            {item.column === "time" && " Giờ"}
            {item.column === "product" && " Sản phẩm"}
            {item.column === "type" && " Loại"}
            {item.column === "by" && " Phương thức"}
          </span>
        </span>
      </div>
      
 
      <ToggleGroup
        size="sm"
        variant="outline"
        type="single"
        value={item.order}
        onValueChange={(value) => onOrderChange(item.column, value)}
      >
        <ToggleGroupItem className="text-muted-foreground data-[state=on]:text-trongkho-foreground cursor-pointer data-[state=on]:border-border p-1 h-fit" value="asc" aria-label="Tăng dần">
          <ArrowDownNarrowWide className="size-[14px]" />
        </ToggleGroupItem>
        <ToggleGroupItem className="text-muted-foreground data-[state=on]:text-trongkho-foreground cursor-pointer p-1 h-fit" value="des" aria-label="Giảm dần">
          <ArrowDownWideNarrow className="size-[14px]" />
        </ToggleGroupItem>
      </ToggleGroup>
      <span className="text-xs text-muted-foreground w-15">
        {item.order === "asc" ? "tăng dần" : "giảm dần"}
      </span>
  
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground cursor-pointer h-fit p-2 w-fit"
        onClick={() => {onRemove(item.column); onOrderChange(item.column, "asc")}}
      >
        <X className="size-[14px]" />
      </Button>
    </div>
  );
}