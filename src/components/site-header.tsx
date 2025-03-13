"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={() => setIsOpen(false)}>
                <Leaf className="h-6 w-6 text-green-600" />
                <span>OrganicMarket</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-4 px-7 py-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-lg font-medium ${
                    pathname === route.href ? "text-green-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <Link
                href="/seller/login"
                className="text-lg font-medium text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                Seller Portal
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="hidden font-bold sm:inline-block">OrganicMarket</span>
        </Link>
        <nav className="hidden md:flex gap-6 flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium ${
                pathname === route.href ? "text-green-600" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel><Link href="/dashboard">My Account</Link></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/seller/login">Seller Portal</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

