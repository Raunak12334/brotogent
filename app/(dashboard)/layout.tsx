import { cookies } from "next/headers"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
      <AppSidebar />
      <SidebarInset className="min-h-0 overflow-hidden border shadow-none!" >
        {/* Top bar with trigger visible on mobile or when sidebar is collapsed */}
        <header className="flex h-12 shrink-0 items-center gap-2 px-4 peer-data-[state=expanded]:hidden">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
