"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Calendar, Bell, Users, Settings } from "lucide-react"

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Calendar, label: "Orario", path: "/schedule" },
    { icon: Bell, label: "Avvisi", path: "/notices" },
    { icon: Users, label: "Supporto", path: "/support" },
    { icon: Settings, label: "Impostazioni", path: "/settings" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
