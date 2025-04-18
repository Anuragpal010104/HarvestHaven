"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { UserLayout } from "@/app/dashboard/user-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Star, Trash } from "lucide-react"

// Type definitions
interface Review {
  id: string
  productId: number
  productName: string
  productImage: string
  rating: number
  comment: string
  date: string
}

interface PendingReview {
  id: number
  name: string
  image: string
  orderDate: string
}

interface NewReview {
  rating: number
  comment: string
}

export default function UserReviewsPage() {
  const [activeTab, setActiveTab] = useState<"my-reviews" | "pending-reviews">("my-reviews")
  const [myReviews, setMyReviews] = useState<Review[]>(initialMyReviews)
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>(initialPendingReviews)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newReview, setNewReview] = useState<NewReview>({
    rating: 5,
    comment: "",
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null)

  const handleRatingChange = (rating: number) => {
    if (editingReview) {
      setEditingReview({ ...editingReview, rating })
    } else {
      setNewReview({ ...newReview, rating })
    }
  }

  const handleSubmitReview = async (productId: number) => {
    setIsSubmitting(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const product = pendingReviews.find((item) => item.id === productId)
      if (!product) return

      const newReviewObj: Review = {
        id: `review-${Date.now()}`,
        productId,
        productName: product.name,
        productImage: product.image,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
      }

      setMyReviews([newReviewObj, ...myReviews])
      setPendingReviews(pendingReviews.filter((item) => item.id !== productId))
      setNewReview({ rating: 5, comment: "" })
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateReview = async () => {
    if (!editingReview) return

    setIsSubmitting(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMyReviews(myReviews.map((review) =>
        review.id === editingReview.id ? editingReview : review
      ))
      setEditingReview(null)
    } catch (error) {
      console.error("Failed to update review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setMyReviews(myReviews.filter((review) => review.id !== reviewToDelete.id))

      const deletedReview = initialMyReviews.find((review) => review.id === reviewToDelete.id)
      if (deletedReview) {
        const product: PendingReview = {
          id: deletedReview.productId,
          name: deletedReview.productName,
          image: deletedReview.productImage,
          orderDate: new Date().toISOString(),
        }
        setPendingReviews([...pendingReviews, product])
      }

      setReviewToDelete(null)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Failed to delete review:", error)
    }
  }

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }

  return (
    <UserLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Reviews</h2>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "my-reviews" | "pending-reviews")} className="space-y-4">
          <TabsList>
            <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="pending-reviews">Pending Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="my-reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reviews You&apos;ve Written</CardTitle>
                <CardDescription>Manage your product reviews</CardDescription>
              </CardHeader>
              <CardContent>
                {myReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven&apos;t written any reviews yet.</p>
                    <Button onClick={() => setActiveTab("pending-reviews")} className="bg-green-600 hover:bg-green-700">
                      Review Your Purchases
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={review.productImage}
                              alt={review.productName}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <Link
                                  href={`/products/${review.productId}`}
                                  className="font-medium hover:text-green-600"
                                >
                                  {review.productName}
                                </Link>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString('en-US', dateFormatOptions)}
                              </div>
                            </div>

                            <div className="mt-2">{review.comment}</div>

                            <div className="mt-4 flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => setEditingReview(review)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                onClick={() => {
                                  setReviewToDelete(review)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending-reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Products to Review</CardTitle>
                <CardDescription>Share your thoughts on products you&apos;ve purchased</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      You&apos;ve reviewed all your purchases. Check back after your next order!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pendingReviews.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <Link href={`/products/${product.id}`} className="font-medium hover:text-green-600">
                                  {product.name}
                                </Link>
                                <div className="text-sm text-gray-500">
                                  Ordered on {new Date(product.orderDate).toLocaleDateString('en-US', dateFormatOptions)}
                                </div>
                              </div>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="bg-green-600 hover:bg-green-700">Write a Review</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>Review {product.name}</DialogTitle>
                                    <DialogDescription>
                                      Share your experience with this product to help other customers.
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="py-4 space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-2">Your Rating</label>
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRatingChange(star)}
                                            className="focus:outline-none"
                                          >
                                            <Star
                                              className={`h-8 w-8 ${
                                                star <= newReview.rating
                                                  ? "fill-yellow-400 text-yellow-400"
                                                  : "fill-gray-200 text-gray-200"
                                              }`}
                                            />
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium mb-2">Your Review</label>
                                      <Textarea
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        placeholder="Share your experience with this product..."
                                        rows={4}
                                      />
                                    </div>
                                  </div>

                                  <DialogFooter>
                                    <Button
                                      onClick={() => handleSubmitReview(product.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                      disabled={isSubmitting || !newReview.comment.trim()}
                                    >
                                      {isSubmitting ? "Submitting..." : "Submit Review"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {editingReview && (
        <Dialog open={!!editingReview} onOpenChange={(open) => !open && setEditingReview(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Your Review</DialogTitle>
              <DialogDescription>Update your review for {editingReview.productName}</DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= editingReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  value={editingReview.comment}
                  onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                  placeholder="Share your experience with this product..."
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingReview(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdateReview}
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting || !editingReview.comment.trim()}
              >
                {isSubmitting ? "Updating..." : "Update Review"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteReview}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UserLayout>
  )
}

const initialMyReviews: Review[] = [
  {
    id: "review-101",
    productId: 1,
    productName: "Organic Avocados",
    productImage: "/placeholder.svg?height=100&width=100",
    rating: 5,
    comment: "These avocados are amazing! Perfectly ripe and delicious. Will definitely buy again.",
    date: "2023-11-15T10:30:00Z",
  },
  {
    id: "review-102",
    productId: 2,
    productName: "Raw Honey",
    productImage: "/placeholder.svg?height=100&width=100",
    rating: 4,
    comment: "Great quality honey, but the jar was a bit difficult to open. Otherwise, excellent product!",
    date: "2023-10-22T14:45:00Z",
  },
  {
    id: "review-103",
    productId: 7,
    productName: "Organic Blueberries",
    productImage: "/placeholder.svg?height=100&width=100",
    rating: 5,
    comment: "So fresh and sweet! These blueberries are perfect for my morning smoothies.",
    date: "2023-12-05T09:15:00Z",
  },
]

const initialPendingReviews: PendingReview[] = [
  {
    id: 3,
    name: "Organic Quinoa",
    image: "/placeholder.svg?height=100&width=100",
    orderDate: "2023-12-10T08:30:00Z",
  },
  {
    id: 4,
    name: "Almond Milk",
    image: "/placeholder.svg?height=100&width=100",
    orderDate: "2023-12-10T08:30:00Z",
  },
  {
    id: 15,
    name: "Organic Whole Milk",
    image: "/placeholder.svg?height=100&width=100",
    orderDate: "2023-12-01T11:45:00Z",
  },
]