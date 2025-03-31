import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "@/components/ui/sonner"; // Import Sonner's Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OrganicMarket - Fresh Organic Products",
  description: "Shop certified organic products directly from trusted farmers and producers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster
            position="top-right" // Move to top-right
            richColors // Enables rich colors for better contrast
            toastOptions={{
              style: {
                background: "#fff", // Light background
                color: "#333", // Dark text
                borderRadius: "8px", // Rounded edges
                padding: "12px", // More padding
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // Soft shadow
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
