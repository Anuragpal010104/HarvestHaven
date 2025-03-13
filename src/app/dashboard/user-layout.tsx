"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Home, Leaf, LogOut, MapPin, Settings, ShoppingBag, User } from "lucide-react"

export function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/orders",
      label: "Order History",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      href: "/dashboard/addresses",
      label: "Addresses",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      href: "/dashboard/wishlist",
      label: "Wishlist",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>OrganicMarket</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="hidden md:flex w-64 flex-col border-r bg-gray-50">
          <div className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-green-600 ${
                  pathname === route.href ? "bg-green-100 text-green-600" : "text-muted-foreground"
                }`}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

