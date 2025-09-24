import { memo } from "react"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FilterCalendar } from "./FilterCalendar"
import { FilterItem, comparatorDisplayValues } from "./types"

export const FilterItemRow = memo(function FilterItemRow({
  item,
  onKeyChange,
  onComparatorChange,
  onValueChange,
  onRemove,
}: {
  item: FilterItem
  onKeyChange: (id: string, key: string) => void
  onComparatorChange: (id: string, comparator: string) => void
  onValueChange: (id: string, value: any) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="grid gap-2 grid-cols-[minmax(0,140px)_minmax(0,70px)_minmax(0,160px)_minmax(0,26px)]">
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
          <SelectItem className="text-xs" value="product">Sản phẩm</SelectItem>
          <SelectItem className="text-xs" value="type">Loại</SelectItem>
          <SelectItem className="text-xs" value="by">Phương thức</SelectItem>
        </SelectContent>
      </Select>

      {(item.key === "date" || item.key === "time") &&
        <Select 
          value={item.comparator}
          onValueChange={selectedComparator => onComparatorChange(item.id, selectedComparator)}
        >
          <SelectTrigger size="sm" className="dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 text-xs w-full">
            <SelectValue>{comparatorDisplayValues[item.comparator as keyof typeof comparatorDisplayValues]}</SelectValue>
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
      {item.key === "product" &&
        <Input
          value={item.value}
          onChange={(e) => onValueChange(item.id, e.target.value)}
          className="col-start-3 focus-visible:ring-0 text-xs md:text-xs transition duration-200 dark:bg-popover h-8 dark:hover:border-muted-foreground/50"
          placeholder="Tên sản phẩm"
        />
      }
      {item.key === "type" &&
        <Select
          value={item.value ? item.value : undefined}
          onValueChange={selectedValue => onValueChange(item.id, selectedValue)}
        >
          <SelectTrigger size="sm" className="col-start-3 dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="checkin">Nhập kho</SelectItem>
            <SelectItem className="text-xs" value="checkout">Xuất kho</SelectItem>
          </SelectContent>
        </Select>
      }
      {item.key === "by" &&
        <Select
          value={item.value ? item.value : undefined}
          onValueChange={selectedValue => onValueChange(item.id, selectedValue)}
        >
          <SelectTrigger size="sm" className="col-start-3 dark:bg-popover dark:hover:bg-popover dark:hover:border-muted-foreground/50 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="manual">Nhập tay</SelectItem>
            <SelectItem className="text-xs" value="qr">QR</SelectItem>
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
