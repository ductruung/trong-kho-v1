"use client"
import { useCallback, useState } from "react"
import { Plus, Filter } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilterItemRow } from "./FilterItemRow"
import { FilterItem } from "./types"

export function FilterDropdownMenu() {
  const [filterItems, setFilterItems] = useState<FilterItem[]>([]);
  const onKeyChange = useCallback((id: string, key: string) => {
    setFilterItems(prev => prev.map(it => it.id === id ? { ...it, key } : it))
  }, [])
  const onValueChange = useCallback((id: string, value: any) => {
    setFilterItems(prev => prev.map(it => it.id === id ? { ...it, value } : it))
  }, [])
  const onComparatorChange = useCallback((id: string, comparator: string) => {
    setFilterItems(prev => prev.map(it => it.id === id ? {...it, comparator } : it))
  }, [])
  const onRemove = useCallback((id: string) => {
    setFilterItems(prev => prev.filter(it => it.id !== id))
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
          <Filter className="text-muted-foreground size-[14px]" />
          Bộ lọc
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[336px]"
      >
        <div className="p-2">
          {filterItems.length === 0 ?
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1.5">Chưa có bộ lọc nào được áp dụng</p>
              <p className="text-xs text-muted-foreground">Thêm một bộ lọc phía dưới để lọc dữ liệu hoạt động</p>
            </div>
            :
            <div className="flex flex-col gap-1">
              {filterItems.map((item, index) => 
                <FilterItemRow 
                  key={item.id} 
                  item={item} 
                  onKeyChange={onKeyChange}
                  onComparatorChange={onComparatorChange}
                  onValueChange={onValueChange}
                  onRemove={onRemove}
                />
              )}
            </div>
          }
        </div>
        <DropdownMenuSeparator />
        <div className="flex justify-between items-center py-2 px-2">
          <Button
            className="text-xs h-fit py-1 rounded-sm cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={() => {
              setFilterItems(prev => [...prev, {
                id: uuidv4(),
                key: "id",
                comparator: "equal",
                value: undefined
              }]);
            }}
          >
            <Plus className="text-muted-foreground size-[14px]" />
            Thêm bộ lọc
          </Button>
          <Button 
            disabled={filterItems.length === 0}
            className="text-xs h-fit py-1 rounded-sm cursor-pointer" 
            variant="outline" 
            size="sm">
            Áp dụng bộ lọc
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
