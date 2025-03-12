import Link from "next/link"
import { Leaf, Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-green-50 border-t">
      <div className="container px-4 py-12 md:py-16 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="font-bold">OrganicMarket</span>
            </Link>
            <p className="text-sm text-gray-500">
              Your trusted source for certified organic products. We connect you directly with organic farmers and
              producers.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-green-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-500 hover:text-green-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/fruits" className="text-gray-500 hover:text-green-600">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link href="/products/dairy" className="text-gray-500 hover:text-green-600">
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link href="/products/pantry" className="text-gray-500 hover:text-green-600">
                  Pantry Items
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-green-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-500 hover:text-green-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-green-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-500 hover:text-green-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-500 hover:text-green-600">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-500 hover:text-green-600">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-green-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} OrganicMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

