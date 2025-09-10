"use client"
import { ArrowUpDown, CalendarIcon, Columns2, Filter, Italic, Plus, RotateCcw, Square, Underline, X } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Dispatch, memo, SetStateAction, useCallback, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';

function Heading() {
  return (
    <div className="w-64 h-full px-6 border-r">
      <div className="flex items-center py-3">
        <h1 className="text-lg">Hoạt động</h1>
      </div>
      <p className="text-xs text-muted-foreground">Theo dõi và quản lý các hoạt động xuất nhập kho tại đây.</p>
    </div>
  )
}

interface FilterItem {
  id: string,
  key: string,
  comparator: string,
  value: any 
}

function ViewBar({
  viewMode,
  setViewMode
}: {
  viewMode: string
  setViewMode: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="flex w-full items-center gap-3 border-b h-14 px-3 py-3">
      <ToggleGroup
        value={viewMode}
        size="sm"
        type="single"
        variant="outline"
        onValueChange={(value) => setViewMode(value)}
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

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function FilterCalendar({ item, onValueChange, className }) {
  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false
    }
    return !isNaN(date.getTime())
  }
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date | undefined>(date);
  function parseDDMMYYYY(s: string) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
    if (!m) return "";
    const [_, dd, mm, yyyy] = m;
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return d.getFullYear() === Number(yyyy) &&
           d.getMonth() === Number(mm) - 1 &&
           d.getDate() === Number(dd) ? d : "";
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex text-xs gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal h-8 w-full text-xs  dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50"
            >
              {date ? date.toLocaleDateString("vi-VN") : "Chọn ngày"}
              <CalendarIcon className="size-3.5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                onValueChange(item.id, formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

const FilterItem = memo(function FilterItemRow({
  item,
  onKeyChange,
  onComparatorChange,
  onValueChange,
  onRemove,
}: {
  item: FilterItem,
  onKeyChange: (id: string, key: string) => void
  onComparatorChange: (id: string, comparator: string) => void
  onValueChange: (id: string, value: any) => void
  onRemove: (id: string) => void
}){
  const comparatorDisplayValues = {
    "equal": "=",
    "before": "<",
    "after": ">",
    "afterIncluding": ">=",
    "beforeIncluding": "<=",
    "none": ""
  }

  return (
    <div className="grid gap-2 grid-cols-[minmax(0,80px)_minmax(0,70px)_minmax(0,160px)_minmax(0,26px)]">
      <Select
        value={item.key}
        onValueChange={selectedKey => onKeyChange(item.id, selectedKey)}
      >
        <SelectTrigger size="sm" className="dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 text-xs w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="text-xs" value="id">Mã</SelectItem>
          <SelectItem className="text-xs" value="date">Ngày</SelectItem>
          <SelectItem className="text-xs" value="time">Giờ</SelectItem>
          <SelectItem className="text-xs" value="type">Loại</SelectItem>
        </SelectContent>
      </Select>

      {(item.key === "date" || item.key === "time") &&
        <Select 
          value={item.comparator}
          onValueChange={selectedComparator => onComparatorChange(item.id, selectedComparator)}
        >
          <SelectTrigger size="sm" className="dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 text-xs w-full">
            <SelectValue>{comparatorDisplayValues[item.comparator]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="equal">= &#40;vào ...&#41;</SelectItem>
            <SelectItem className="text-xs" value="after">&gt; &#40;sau ...&#41;</SelectItem>
            <SelectItem className="text-xs" value="before">&lt; &#40;trước ...&#41;</SelectItem>
            <SelectItem className="text-xs" value="afterIncluding">&gt;= &#40;vào ... và sau đó&#41;</SelectItem>
            <SelectItem className="text-xs" value="beforeIncluding">&lt;= &#40;vào ... và trước đó&#41;</SelectItem>
          </SelectContent>
        </Select>}

      {item.key === "id" &&
        <Input
          value={item.value}
          onChange={(e) => onValueChange(item.id, e.target.value)}
          className="col-start-3 focus-visible:ring-0 text-xs md:text-xs transition duration-200 dark:bg-popover h-8 dark:hover:border-muted-foreground/50"
          placeholder="Mã"
        />
      }
      {item.key === "date" &&
        <FilterCalendar item={item} onValueChange={onValueChange} className="col-start-3" />
      }
      {item.key === "time" &&
        <Input
          inputMode="numeric"
          placeholder="--:--"
          maxLength={5}
          value={item.value ?? ""}
          onChange={(e) => {
            let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
            if (v.length >= 3) v = v.slice(0, 2) + ":" + v.slice(2);
            onValueChange(item.id, v);
          }}
          onBlur={(e) => {
            const v = e.target.value;
            if (/^\d{2}:\d{2}$/.test(v)) {
              const [h, m] = v.split(":").map(Number);
              if (h > 23 || m > 59) onValueChange(item.id, "");
            } else if (v) {
              onValueChange(item.id, "");
            }
          }}
          pattern="^\d{2}:\d{2}$"
          className="text-xs md:text-xs dark:bg-popover focus-visible:ring-0 transition duration-200 h-8"
        />
      }
      {item.key === "type" &&
        <Select
          value={item.value ? item.value : undefined}
          onValueChange={selectedValue => onValueChange(item.id, selectedValue)}
        >
          <SelectTrigger size="sm" className="col-start-3 dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 w-full text-xs">
            <SelectValue placeholder={"Xuất/Nhập kho"}/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="checkin">Nhập kho</SelectItem>
            <SelectItem className="text-xs" value="checkout">Xuất kho</SelectItem>
          </SelectContent>
        </Select>
      }
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground cursor-pointer"
        onClick={() => onRemove(item.id)}
      >
        <X className="size-[14px]" />
      </Button>
    </div>
  )
})

function FilterDropdownMenu() {
  const [filterItems, setFilterItems] = useState<FilterItem[]>([
    { id: "1", key: "id", comparator: "none", value: undefined },
    { id: "2", key: "date", comparator: "none", value: undefined },
    { id: "3", key: "time", comparator: "none", value: undefined },
    { id: "4", key: "type", comparator: "none", value: undefined },
  ]);
  const newId = useId(); //for creation of new item
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
                <FilterItem 
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

function SortDropdownMenu() {
  const [filterItems, setFilterItems] = useState([
    { key: "id", comparator: undefined, value: undefined },
    { key: "date", comparator: undefined, value: undefined },
    { key: "time", comparator: undefined, value: undefined },
    { key: "type", comparator: undefined, value: undefined },
  ]);

  const SortItem = ({ item, key }) => (
    <div className="grid gap-2 grid-cols-[minmax(0,128px)_minmax(0,60px)_minmax(0,143px)_minmax(0,26px)]">
      <Select value={item.key}>
        <SelectTrigger size="sm" className="dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 text-xs w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="text-xs" value="id">Mã</SelectItem>
          <SelectItem className="text-xs" value="date">Ngày</SelectItem>
          <SelectItem className="text-xs" value="time">Giờ</SelectItem>
          <SelectItem className="text-xs" value="type">Loại</SelectItem>
        </SelectContent>
      </Select>
      {(item.key === "date" || item.key === "time") &&
        <Select>
          <SelectTrigger size="sm" className="dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 text-xs w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="equal">=</SelectItem>
            <SelectItem className="text-xs" value="after">&gt;</SelectItem>
            <SelectItem className="text-xs" value="before">&lt;</SelectItem>
          </SelectContent>
        </Select>}
      {item.key === "id" &&
        <Input
          className="col-start-3 focus-visible:ring-0 text-xs md:text-xs transition duration-200 dark:bg-popover h-8"
          placeholder="Mã"
        />
      }
      {item.key === "date" &&
        <FilterCalendar className="col-start-3" />
      }
      {item.key === "time" &&
        <Input
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          className="text-xs md:text-xs dark:bg-popover appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none focus-visible:ring-0 transition duration-200 h-8"
        />
      }
      {item.key === "type" &&
        <Select>
          <SelectTrigger size="sm" className="col-start-3 dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="checkin">Nhập kho</SelectItem>
            <SelectItem className="text-xs" value="checkout">Xuất kho</SelectItem>
          </SelectContent>
        </Select>
      }
      <Button size="icon" variant="ghost" className="text-muted-foreground cursor-pointer">
        <X className="size-[14px]" />
      </Button>
    </div>
  )

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
        className="w-96"
      >
        <div className="p-2">
          {
            filterItems.length === 0 ?
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1.5">Chưa có bộ lọc nào được áp dụng</p>
                <p className="text-xs text-muted-foreground">Thêm một bộ lọc phía dưới để lọc dữ liệu hoạt động</p>
              </div>
              :
              <div className="flex flex-col gap-1">
                {filterItems.map((item, _) => { return <SortItem key={_} item={item} /> })}
              </div>
          }
        </div>
        <DropdownMenuSeparator />
        <div className="flex justify-between items-center py-2 px-2">
          <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
            <Plus className="text-muted-foreground size-[14px]" />
            Thêm bộ lọc
          </Button>
          <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="outline" size="sm">
            Áp dụng bộ lọc
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ToolBar() {
  return (
    <div className="w-full flex items-center gap-3 border-b h-10 bg-card px-3 py-3">
      <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
        <RotateCcw className="text-muted-foreground size-[14px]" />
        Tải lại bảng
      </Button>
      <FilterDropdownMenu />
      <SortDropdownMenu />
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