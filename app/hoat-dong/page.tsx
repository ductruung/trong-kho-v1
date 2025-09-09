"use client"
import { ArrowUpDown, CalendarIcon, Columns2, Filter, Italic, Plus, RotateCcw, Square, Underline, X } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Dispatch, SetStateAction, useState } from "react";
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
          <Square className="size-[14px]"/>
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

function FilterCalendar({ className }) {
  function formatDate(date: Date | undefined) {
    if (!date) {
      return ""
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false
    }
    return !isNaN(date.getTime())
  }
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date | undefined>(date)
  const [value, setValue] = useState(formatDate(date))

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative flex text-xs gap-2">
        <Input
          value={value}
          placeholder="June 01, 2025"
          className="dark:bg-popover pr-10 text-xs md:text-xs focus-visible:ring-0 transition duration-200 h-8"
          onChange={(e) => {
            const date = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5 text-muted-foreground" />
              <span className="sr-only">Select date</span>
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
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

function FilterDropdownMenu() {
  const [filterItems, setFilterItems] = useState([
    {key: "id", comparator: undefined, value: undefined},
    {key: "date", comparator: undefined, value: undefined},
    {key: "time", comparator: undefined, value: undefined},
    {key: "type", comparator: undefined, value: undefined},
  ]);

  const FilterItem = ({item, key}) => (
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
          <SelectValue/>
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
        <FilterCalendar className="col-start-3"/>
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
        <X className="size-[14px]"/>
      </Button>
    </div>
  ) 

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
            {filterItems.map((item, _) => {return <FilterItem key={_} item={item}/ >})}
          </div>
        }
        </div>
        <DropdownMenuSeparator/>
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
      <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
        <ArrowUpDown className="text-muted-foreground size-[14px]" />
        Sắp xếp
      </Button>
      <Separator orientation="vertical" />
      <Button 
        className="bg-trongkho-foreground/40 border border-bg-trongkho-foreground/60 text-xs duration-200 text-white hover:bg-trongkho-foreground/50 hover:border-bg-trongkho-foreground/70 h-fit py-1 rounded-sm ml-3 cursor-pointer"
        size="sm"
      >
        <Plus className="size-[14px]"/>
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