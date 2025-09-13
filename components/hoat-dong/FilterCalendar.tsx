"use client"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { formatDate } from "./utils"
import { FilterItem } from "./types"

export function FilterCalendar({ item, onValueChange, className }: {
  item: FilterItem
  onValueChange: (id: string, value: any) => void
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date | undefined>(date)

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
