import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CalendarDays, Clock, Search, Tag } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Blog</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Insights, tips, and stories about organic farming, sustainable living, and healthy eating.
          </p>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category, index) => (
            <Button key={index} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[300px] md:h-auto">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Featured blog post"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Featured</span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  June 15, 2023
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">The Benefits of Eating Seasonal Organic Produce</h2>
              <p className="text-gray-500 mb-4">
                Discover why eating organic fruits and vegetables in season is not only better for your health but also
                for the environment and local economy.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Author" fill className="object-cover" />
                  </div>
                  <span className="text-sm font-medium">Sarah Johnson</span>
                </div>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />5 min read
                </span>
              </div>
              <Link href="/blog/benefits-of-seasonal-produce">
                <Button className="bg-green-600 hover:bg-green-700">Read More</Button>
              </Link>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Recent Posts */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-500 mb-4">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Link href={`/blog/${post.slug}`} className="text-green-600 font-medium hover:underline">
                  Read More →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-green-50 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-6">
          Stay updated with our latest articles, organic farming tips, recipes, and exclusive offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input placeholder="Your email address" className="bg-white" />
          <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

const categories = ["Organic Farming", "Recipes", "Sustainability", "Health & Wellness", "Gardening"]

const blogPosts = [
  {
    title: "How to Start Your Own Organic Garden",
    excerpt:
      "Learn the basics of starting an organic garden at home, from soil preparation to seed selection and natural pest control.",
    date: "May 28, 2023",
    category: "Gardening",
    slug: "start-organic-garden",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "5 Easy Organic Recipes for Busy Weeknights",
    excerpt: "Quick and nutritious meal ideas using organic ingredients that you can prepare in under 30 minutes.",
    date: "May 15, 2023",
    category: "Recipes",
    slug: "easy-organic-recipes",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Understanding Organic Certification Standards",
    excerpt: "A comprehensive guide to what organic certification means and how to identify truly organic products.",
    date: "April 30, 2023",
    category: "Organic Farming",
    slug: "organic-certification-standards",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "The Environmental Impact of Organic Farming",
    excerpt: "How organic farming practices help reduce pollution, conserve water, and promote biodiversity.",
    date: "April 22, 2023",
    category: "Sustainability",
    slug: "environmental-impact-organic-farming",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Organic Foods and Your Health: What Science Says",
    excerpt: "A look at the latest research on the health benefits of consuming organic foods regularly.",
    date: "April 10, 2023",
    category: "Health & Wellness",
    slug: "organic-foods-health-benefits",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Seasonal Eating Guide: Summer Edition",
    excerpt:
      "Discover which organic fruits and vegetables are in season during summer and how to make the most of them.",
    date: "April 5, 2023",
    category: "Recipes",
    slug: "seasonal-eating-summer",
    image: "/placeholder.svg?height=300&width=500",
  },
]

