"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Home, Leaf, LogOut, MapPin, Settings, ShoppingBag, User, Menu,Star } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const routes = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { href: "/dashboard/orders", label: "Order History", icon: <ShoppingBag className="h-5 w-5" /> },
    { href: "/dashboard/addresses", label: "Addresses", icon: <MapPin className="h-5 w-5" /> },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: <Heart className="h-5 w-5" /> },
    { href: "/dashboard/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
    { href: "/dashboard/reviews", label: "Reviews", icon: <Star className="h-5 w-5" /> }
  ];

  const SidebarContent = () => (
    <nav className="flex flex-col gap-2 pl-4 pr-0 py-4 h-full">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`flex items-center gap-3 rounded-lg pl-3 pr-4 py-2 text-sm transition-all hover:text-green-600 w-full ${
            pathname === route.href ? "bg-green-100 text-green-600" : "text-muted-foreground"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 max-w-[1440px] mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>OrganicMarket</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden md:flex">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  <div className="border-b py-4 px-4">
                    <Link href="/" className="flex items-center gap-2 font-bold">
                      <Leaf className="h-6 w-6 text-green-600" />
                      <span>OrganicMarket</span>
                    </Link>
                  </div>
                  <SidebarContent />
                  <div className="border-t p-4 mt-auto">
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 w-full">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-[240px] border-r bg-gray-50 shrink-0">
          <SidebarContent />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 md:p-6 w-full max-w-[1200px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}