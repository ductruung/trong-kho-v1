import { useState } from "react"
import { ArrowUpDown, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FilterCalendar } from "./FilterCalendar"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

export function SortDropdownMenu() {
  const [sortItems, setSortItems] = useState([
    // { id: "1", column: "id", comparator: undefined, value: undefined },
    // { id: "2", column: "date", comparator: undefined, value: undefined },
    // { id: "3", column: "time", comparator: undefined, value: undefined },
    // { id: "4", column: "type", comparator: undefined, value: undefined },
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
        <FilterCalendar item={{ id: "tmp", key: "date", comparator: "none", value: undefined }} onValueChange={() => {}} className="col-start-3" />
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
            sortItems.length === 0 ?
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1.5">Chưa có cách sắp xếp nào được áp dụng</p>
                <p className="text-xs text-muted-foreground">Thêm một tiêu chí sắp xếp phía dưới để sắp xếp dữ liệu hoạt động</p>
              </div>
              :
              <div className="flex flex-col gap-1">
                {sortItems.map((item, _) => { return <SortItem key={_} item={item} /> })}
              </div>
          }
        </div>
        <DropdownMenuSeparator />
        <div className="flex justify-between items-center py-2 px-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
            >
              <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="ghost" size="sm">
                <Plus className="text-muted-foreground size-[14px]" />
                Thêm tiêu chí sắp xếp
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="flex flex-col p-1 text-xs"
            >
              <DropdownMenuItem className="p-1.5 pl-2 hover">Mã</DropdownMenuItem>
              <DropdownMenuItem className="p-1.5 pl-2 hover">Ngày</DropdownMenuItem>
              <DropdownMenuItem className="p-1.5 pl-2 hover">Giờ</DropdownMenuItem>
              <DropdownMenuItem className="p-1.5 pl-2 hover">Loại</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="text-xs h-fit py-1 rounded-sm cursor-pointer" variant="outline" size="sm">
            Áp dụng cách sắp xếp
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
