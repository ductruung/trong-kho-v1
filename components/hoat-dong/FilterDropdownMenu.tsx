"use client"
import { useCallback, useContext, useState } from "react"
import { Plus, Filter } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilterItemRow } from "./FilterItemRow"
import { FilterItem, Primitive } from "./types"
import { TableContext } from "./data-table"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

function serializeValue(v: Primitive | Primitive[]): string {
  if (v instanceof Date) {
    console.log("date filter value: ", v);
    console.log("date filter value toISOString: ", v.toISOString());
    return v.toISOString()
  }
  if (Array.isArray(v)) return v.map(serializeValue).join('|') // e.g. multi-select -> "a|b|c"
  if (v === null || v === undefined) return ''
  return String(v)
}

function toFilterParam(item: FilterItem): string {
  const field = encodeURIComponent(item.key)
  const op = encodeURIComponent(item.comparator)
  const val = encodeURIComponent(serializeValue(item.value))
  return `${field}:${op}:${val}`
}

export function FilterDropdownMenu() {
  const [filterItems, setFilterItems] = useState<FilterItem[]>([]);
  const tableContext = useContext(TableContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
  const onApplyFilters = () => {
    const params = new URLSearchParams(searchParams);
    const filterKey = 
      tableContext === "unified" ? "filter" :
      tableContext === "checkin" ? "checkin_filter" : "checkout_filter";
    
    params.delete(filterKey);
    filterItems.forEach(item => {
      params.append(filterKey, toFilterParam(item))
    })
    replace(`${pathname}?${params.toString()}`);
  };

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
        className="w-[396px]"
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
            size="sm"
            onClick={onApplyFilters}
          >
            Áp dụng bộ lọc
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
