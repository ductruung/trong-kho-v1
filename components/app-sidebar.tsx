"use client"
import { Shapes, Warehouse, Zap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Tổng quan",
    url: "/",
    icon: <Shapes size={20}/>,
  },
  {
    title: "Hoạt động",
    url: "/hoat-dong",
    icon: <Zap size={20}/>,
  },
  {
    title: "Kho",
    url: "/kho",
    icon: <Warehouse size={20}/>,
  },
]

export function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <Sidebar className="w-12 hover:w-40 duration-80 py-12 bg-background">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="text-muted-foreground font-medium [&>svg]:size-8" key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url} asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}