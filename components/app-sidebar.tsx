"use client"

import * as React from "react"
import {
  Building2,
  Check,
  ChevronDown,
  LogOut,
  Plus,
  Settings,
  Sparkles,
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
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const INITIAL_WORKFLOWS = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

const WORKSPACES = [
  { id: "bar-inc", name: "Bar Inc.", active: true },
  { id: "acme-corp", name: "Acme Corp", active: false },
]

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [workflows, setWorkflows] = React.useState(INITIAL_WORKFLOWS)
  const [activeWorkflow, setActiveWorkflow] = React.useState("dominant-wasp")
  const [activeWorkspace, setActiveWorkspace] = React.useState("Bar Inc.")

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border" {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between gap-2 p-3">
        {/* Workspace Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg p-1 text-left outline-hidden transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              />
            }
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-purple-600 text-white shadow-xs">
              <Building2 className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              {activeWorkspace}
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" side="bottom" sideOffset={6}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Workspaces
              </DropdownMenuLabel>
              {WORKSPACES.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => setActiveWorkspace(workspace.name)}
                  className="gap-2 cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-md bg-purple-600/10 text-purple-600 dark:bg-purple-600/20 dark:text-purple-400">
                    <Building2 className="size-3.5" />
                  </div>
                  <span className="flex-1 font-medium">{workspace.name}</span>
                  {activeWorkspace === workspace.name && (
                    <Check className="ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Sparkles />
                Create workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sidebar Trigger Toggle */}
        <SidebarTrigger className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 pt-3">
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
            Workflows
          </SidebarGroupLabel>
          <SidebarGroupAction
            title="Create workflow"
            aria-label="Create workflow"
            onClick={() => {
              const newWorkflow = prompt("Enter new workflow name:")
              if (newWorkflow?.trim()) {
                const trimmed = newWorkflow.trim()
                setWorkflows((prev) => [trimmed, ...prev])
                setActiveWorkflow(trimmed)
              }
            }}
          >
            <Plus />
            <span className="sr-only">Create workflow</span>
          </SidebarGroupAction>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu className="gap-0.5">
              {workflows.map((workflow) => {
                const isActive = activeWorkflow === workflow
                return (
                  <SidebarMenuItem key={workflow}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setActiveWorkflow(workflow)}
                      className="cursor-pointer font-normal"
                    >
                      <span className="truncate">{workflow}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
