import { Shapes, Warehouse, Zap } from "lucide-react"

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

// Menu items.
const items = [
  {
    title: "Tổng quan",
    url: "",
    icon: <Shapes size={20}/>,
  },
  {
    title: "Hoạt động",
    url: "#",
    icon: <Zap size={20}/>,
  },
  {
    title: "Kho",
    url: "#",
    icon: <Warehouse size={20}/>,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="w-12 hover:w-40 duration-80 py-12 bg-background">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="text-muted-foreground font-medium" key={item.title}>
                  <SidebarMenuButton asChild>
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