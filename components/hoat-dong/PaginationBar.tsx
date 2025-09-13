"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Input } from "../ui/input"

export function PaginationBar() {
  return (
  <div className="flex items-center fixed bottom-0 w-full h-10 px-2 gap-x-2 py-3 text-xs bg-card border-t">
    <Button
      size="icon"
      variant="outline"
      className="h-auto w-fit p-1 rounded-sm"
    >
      <ArrowLeft className="size-[14px] text-muted-foreground" />
    </Button>
    <span className="text-xs text-muted-foreground">Trang</span>
    <Input className="w-10 text-xs md:text-xs -pl-2 h-6 rounded-sm" />
    <span className="text-xs text-muted-foreground">trên 10</span>
    <Button
      size="icon"
      variant="outline"
      className="h-auto w-fit p-1 rounded-sm"
    >
      <ArrowRight className="size-[14px] text-muted-foreground" />
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-xs h-6.5 rounded-sm dark:bg-background/50 dark:border-input px-2"
        >100 hàng</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
      >
        <DropdownMenuItem className="text-xs text-muted-foreground">100 hàng</DropdownMenuItem>
        <DropdownMenuItem className="text-xs text-muted-foreground">500 hàng</DropdownMenuItem>
        <DropdownMenuItem className="text-xs text-muted-foreground">1000 hàng</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <span className="ml-2 text-xs text-muted-foreground">Tổng số 10 hoạt động</span>
  </div>
  )
}

//The component fetches how many available pages there are, how many records it currently has