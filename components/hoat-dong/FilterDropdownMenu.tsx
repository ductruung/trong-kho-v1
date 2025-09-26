"use client"
import { useCallback, useContext, useEffect, useState } from "react"
import { Plus, Filter } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilterItemRow } from "./FilterItemRow"
import { FilterItem, Primitive } from "./types"
import { TableContext } from "./data-table"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"

function serializeValue(v: Primitive | Primitive[]): string {
  if (v instanceof Date) {
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

function deserializeFilterParam(param: string[]): FilterItem[] {
  return param.map(item => {
    let [field, op, val] = item.split(":") as any;
    if (field === "date") {
      val = new Date(decodeURIComponent(decodeURIComponent(val)));
    } else if (field === "time") {
      val = decodeURIComponent(decodeURIComponent(val));
    }
    return {
      id: uuidv4(),
      key: field,
      comparator: op,
      value: val
    }
  })
}

export function FilterDropdownMenu() {
  const tableContext = useContext<"unified" | "checkin" | "checkout">(TableContext);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const filterKey = 
    tableContext === "unified" ? "filter" :
    tableContext === "checkin" ? "checkin_filter" : "checkout_filter";
  const filterParams = params.getAll(filterKey);
  const [filterItems, setFilterItems] = useState<FilterItem[]>(filterParams ? () => deserializeFilterParam(filterParams) : []);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (filterItems.length === 0) {
      const params = new URLSearchParams(searchParams);
      params.delete(filterKey);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [filterItems, tableContext, searchParams, pathname, replace])

  const onKeyChange = useCallback((id: string, key: string) => {
    setFilterItems(prev => prev.map(it => {
      if (it.id === id) {
        if (key === "date") {
          return { ...it, key, value: new Date() }
        }
        return { ...it, key }
      } else 
        return it
      }))
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
    params.delete(filterKey);
    filterItems.forEach(item => {
      params.append(filterKey, toFilterParam(item))
    })
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          className={cn("text-xs h-fit py-1 rounded-sm cursor-pointer", 
            filterParams.length > 0 && "text-trongkho-foreground dark:hover:text-trongkho-foreground dark:hover:bg-trongkho-foreground/10"
          )} 
          variant="ghost" 
          size="sm"
        >
          <Filter 
            className={cn("text-muted-foreground size-[14px]",
              filterParams.length > 0 && "text-trongkho-foreground"
            )} 
          />
          Bộ lọc
          {filterParams.length > 0 && <span className="text-trongkho-foreground">{"(" + filterParams.length + ")"}</span>}
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
