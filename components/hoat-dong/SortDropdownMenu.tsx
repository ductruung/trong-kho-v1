import { useMemo, useState } from "react"
import { ArrowUpDown, ChevronDown, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortItemRow from "./SortItemRow"
import { SortItem } from "./types"

export function SortDropdownMenu() {
  const [sortItems, setSortItems] = useState<SortItem[]>([
    { id: "a", column: "id", type: "asc", chosen: true },
    { id: "b", column: "date", type: "asc", chosen: true },
    { id: "c", column: "time", type: "asc", chosen: true },
    { id: "d", column: "type", type: "asc", chosen: true },
  ]);
  const choosableColumns = useMemo(() => sortItems.filter(item => !item.chosen), [sortItems.length]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over!.id) {
      setSortItems((items) => {
        console.log("active: ", active);
        console.log("over: ", over);
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over!.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
          <ArrowUpDown className="text-muted-foreground size-[14px]" />
          Sắp xếp
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-96 p-0"
      >
        <div>
          {
            sortItems.length === 0 ?
              <div className="p-2">
                <p className="text-sm font-semibold text-muted-foreground mb-1.5">Chưa có cách sắp xếp nào được áp dụng</p>
                <p className="text-xs text-muted-foreground">Thêm một tiêu chí sắp xếp phía dưới để sắp xếp dữ liệu hoạt động</p>
              </div>
              :
              <div className="space-y-2 py-2">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  autoScroll={false}
                >
                  <SortableContext
                    items={sortItems}
                    strategy={verticalListSortingStrategy}
                  >
                    {sortItems.map((item, _) => <SortItemRow key={item.id} itemIndex={sortItems.findIndex(c => item.id === c.id)} item={item} />)}
                  </SortableContext>
                </DndContext>
              </div>
          }
        </div>
        <DropdownMenuSeparator className="mx-0 my-0" />
        <div className="flex justify-between items-center py-3 px-3">
          <DropdownMenu>
            {choosableColumns.length === 0 ? 
            <span className="text-xs text-muted-foreground">Đã chọn hết tiêu chí sắp xếp</span>
            :
            <DropdownMenuTrigger
              asChild
            >
              <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
                Thêm tiêu chí sắp xếp
                <ChevronDown className="text-muted-foreground size-[14px]" />
              </Button>
            </DropdownMenuTrigger>
            }
            <DropdownMenuContent
              align="start"
              className="flex flex-col p-1 text-xs w-32"
            >
              {choosableColumns.map(item => 
                <DropdownMenuItem className="p-1.5 pl-2 hover:bg-accent rounded-sm">
                  {item.column === "id" && "Mã"}
                  {item.column === "date" && "Ngày"}
                  {item.column === "time" && "Giờ"}
                  {item.column === "type" && "Loại"}
                </DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="text-xs h-fit py-1 rounded-sm cursor-pointer"
            variant="outline"
            size="sm"
            disabled={sortItems.length === 0}
          >
            Áp dụng cách sắp xếp
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
