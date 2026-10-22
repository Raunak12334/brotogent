import * as React from "react"
import {
  LogOut,
  Settings,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { WorkspaceSwitcher } from "@/components/workspace-switcher"
import { listWorkflows } from "@/features/workflows/data"
import { createWorkflowAction } from "@/features/workflows/actions"

// ---------------------------------------------------------------------------
// AppSidebar
// ---------------------------------------------------------------------------

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const workflows = await listWorkflows()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border" {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between gap-2 p-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2">
        <WorkspaceSwitcher />
        <SidebarTrigger className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" />
      </SidebarHeader>

      <SidebarContent>
        <WorkflowNav workflows={workflows} createWorkflowAction={createWorkflowAction} />
      </SidebarContent>

      <SidebarFooter className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex size-8 cursor-pointer items-center justify-center rounded-full outline-hidden transition-transform focus-visible:ring-2 focus-visible:ring-sidebar-ring hover:opacity-90"
                aria-label="User profile"
              />
            }
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-purple-600 font-semibold text-white">
                A
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" sideOffset={8} className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" className="cursor-pointer">
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
