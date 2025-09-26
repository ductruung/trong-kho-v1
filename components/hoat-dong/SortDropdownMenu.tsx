"use client"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
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
import { v4 as uuidv4 } from 'uuid'
import { TableContext } from "./data-table"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { table } from "console"

export function toSortParam(item: SortItem): string {
  return `${item.id}:${item.column}:${item.order}`;
}

export let defaultSortItems = [
  { id: "a", column: "id", order: "asc" },
  { id: "b", column: "date", order: "asc" },
  { id: "c", column: "time", order: "asc" },
  { id: "d", column: "product", order: "asc" },
  { id: "e", column: "type", order: "asc" },
  { id: "f", column: "by", order: "asc" },
] as SortItem[];

export function deserializeSortParam(param: string[]): SortItem[] {
  let sortItems = [] as SortItem[];
  param.forEach(item => {
    let [id, column, order] = item.split(":") as any;
    sortItems.push({ id , column, order });
  });
  return sortItems;
}

export function SortDropdownMenu() {
  const [open, setOpen] = useState(false);
  const tableContext = useContext<"unified" | "checkin" | "checkout">(TableContext);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortKey = 
    tableContext === "unified" ? "sort" :
    tableContext === "checkin" ? "checkin_sort" : "checkout_sort";
  const sortParams = params.getAll(sortKey);
  const sortItems = deserializeSortParam(sortParams);
  const [localSortItems, setLocalSortItems] = useState<SortItem[]>(sortItems);
  const choosableColumns = useMemo(() => defaultSortItems.filter(item => {
    if (tableContext !== "unified") {
      return !localSortItems.some(localItem => item.id === localItem.id) && item.column !== "type"
    }
    return !localSortItems.some(localItem => item.id === localItem.id)
  }), [localSortItems.length]);
  const pathname = usePathname();
  const { replace } = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over!.id) {
      setLocalSortItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over!.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const onOrderChange = useCallback((column: string, order: string) => { 
    setLocalSortItems(prev => prev.map(it => it.column === column ? { ...it, order } : it))
  }, [])

  const onRemove = useCallback((column: string) => {
    setLocalSortItems(prev => prev.filter(it => it.column !== column))
  }, [])

  const onChosen = useCallback((column: string) => {
    let id: string;
    switch (column) {
      case "id":
        id = "a";
        break;
      case "date":
        id = "b";
        break;
      case "time":
        id = "c";
        break;
      case "product":
        id = "d";
        break;
      case "type":
        id = "e";
        break;
      case "by":
        id = "f";
        break;
    }
    setLocalSortItems(prev => {
      return [...prev, { id, column, order: "asc" }]
    })
  }, [])

  const onApplySort = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(sortKey);
    localSortItems.forEach(item => {
      params.append(sortKey, toSortParam(item))
    })
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={() => {
        setOpen(prev => !prev)
        setTimeout(() => setLocalSortItems(sortItems), 100)
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button 
          className={cn("text-xs h-fit py-1 rounded-sm cursor-pointer", 
            sortParams.length > 0 && "text-trongkho-foreground dark:hover:text-trongkho-foreground dark:hover:bg-trongkho-foreground/10"
          )}
          variant="ghost" 
          size="sm"
        >
          <ArrowUpDown 
            className={cn("text-muted-foreground size-[14px]",
              sortParams.length > 0 && "text-trongkho-foreground"
            )} 
          />
          Sắp xếp
          {sortParams.length !== 0 && <span  className="text-trongkho-foreground">({
            sortParams.length
          })</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-96 p-0"
      >
        <div>
          {
            localSortItems.length === 0
            ?
              <div className="p-3">
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
                    items={localSortItems}
                    strategy={verticalListSortingStrategy}
                  >
                    {localSortItems.map((item, index) => 
                      <SortItemRow 
                        key={item.id} 
                        itemIndex={index} 
                        item={item} 
                        onOrderChange={onOrderChange}
                        onRemove={onRemove}
                      />)}
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
                <DropdownMenuItem 
                  key={item.column}
                  className="p-1.5 pl-2 hover:bg-accent rounded-sm"
                  onClick={() => onChosen(item.column)}
                >
                  {item.column === "id" && "Mã"}
                  {item.column === "date" && "Ngày"}
                  {item.column === "time" && "Giờ"}
                  {item.column === "product" && "Sản phẩm"}
                  {item.column === "type" && "Loại"}
                  {item.column === "by" && "Phương thức"}
                </DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="text-xs h-fit py-1 rounded-sm cursor-pointer"
            variant="outline"
            size="sm"
            disabled={choosableColumns.length === 6}
            onClick={onApplySort}
          >
            Áp dụng cách sắp xếp
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}