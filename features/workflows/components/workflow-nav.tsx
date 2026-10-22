"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Workflow } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

import { generateSlug } from "@/features/workflows/lib/utils"
import type { Workflow as WorkflowItem } from "@/lib/db/schema"

interface WorkflowNavProps {
  workflows?: WorkflowItem[]
  createWorkflowAction: (name: string) => Promise<void>
}

export function WorkflowNav({
  workflows: initialWorkflows = [],
  createWorkflowAction,
}: WorkflowNavProps) {
  const { state } = useSidebar()
  const pathname = usePathname()
  const [workflows, setWorkflows] = React.useState<WorkflowItem[]>(initialWorkflows)

  React.useEffect(() => {
    setWorkflows(initialWorkflows)
  }, [initialWorkflows])

  async function handleCreateWorkflow() {
    const name = generateSlug()
    await createWorkflowAction(name)
  }

  // -- Expanded: render the full list inline --------------------------------
  if (state === "expanded") {
    return (
      <SidebarGroup className="px-3 pt-3">
        <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
          Workflows
        </SidebarGroupLabel>
        <SidebarGroupAction
          title="Create workflow"
          aria-label="Create workflow"
          onClick={handleCreateWorkflow}
        >
          <Plus />
          <span className="sr-only">Create workflow</span>
        </SidebarGroupAction>
        <SidebarGroupContent className="mt-1">
          <SidebarMenu className="gap-0.5">
            {workflows.map((workflow) => (
              <SidebarMenuItem key={workflow.id}>
                <SidebarMenuButton
                  render={<Link href={`/workflows/${workflow.id}`} />}
                  isActive={pathname === `/workflows/${workflow.id}`}
                  className="cursor-pointer font-normal"
                >
                  <span className="truncate">{workflow.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  // -- Collapsed: single icon button that opens a popover ------------------
  return (
    <SidebarGroup className="items-center px-1 pt-2">
      <Popover>
        <SidebarMenuButton
          render={<PopoverTrigger />}
          tooltip="Workflows"
          className="cursor-pointer"
          aria-label="Workflows"
        >
          <Workflow className="size-4" />
        </SidebarMenuButton>
        <PopoverContent
          side="right"
          sideOffset={8}
          align="start"
          className="w-64 p-0"
        >
          <button
            type="button"
            onClick={handleCreateWorkflow}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Plus className="size-4 shrink-0" />
            New workflow
          </button>
          <SidebarSeparator />
          <div className="py-1">
            {workflows.map((workflow) => (
              <SidebarMenuItem key={workflow.id}>
                <SidebarMenuButton
                  render={<Link href={`/workflows/${workflow.id}`} />}
                  isActive={pathname === `/workflows/${workflow.id}`}
                  className="w-full cursor-pointer rounded-none px-4 py-2.5 font-normal"
                >
                  <span className="truncate">{workflow.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </SidebarGroup>
  )
}
