import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}

