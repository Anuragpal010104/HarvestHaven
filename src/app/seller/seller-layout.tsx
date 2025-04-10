"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart, Home, Leaf, LogOut, Package, Settings, ShoppingBag, Users } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext"; // Adjust the import path as needed

export function SellerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  // Handle redirect in useEffect to avoid updating during render
  useEffect(() => {
    if (!loading && !user) {
      router.push("/seller/login");
    }
  }, [loading, user, router]);

  const routes = [
    {
      href: "/seller/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/seller/products",
      label: "Products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: "/seller/orders",
      label: "Orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      href: "/seller/customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/seller/analytics",
      label: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      href: "/seller/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, return null (redirect will happen via useEffect)
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/seller/dashboard" className="flex items-center gap-2 font-bold">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>Seller Portal</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
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
  );
}