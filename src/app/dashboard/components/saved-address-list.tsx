"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, MapPin, Plus, Trash } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"

// Define address type
interface Address {
  id: number
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  phone: string
}

// Simple custom toast hook
const useToast = () => {
  const toast = ({ title, description }: { title: string; description: string }) => {
    console.log(`${title}: ${description}`) // Simple console.log implementation
    // You could replace this with a proper toast notification system
  }
  return { toast }
}

const fetchAddresses = async (setAddresses: React.Dispatch<React.SetStateAction<Address[]>>) => {
  try {
    const querySnapshot = await getDocs(collection(db, "addresses"))
    const fetchedAddresses = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: Number(doc.id), // Convert Firestore string id to number, or use a separate numeric id field if available
        name: data.name || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        zipCode: data.zipCode || "",
        country: data.country || "",
        phone: data.phone || "",
        isDefault: data.isDefault || false,
      } as Address;
    });
    setAddresses(fetchedAddresses)
  } catch (error) {
    console.error("Error fetching addresses:", error)
  }
}

const saveAddressToFirestore = async (address: Address) => {
  try {
    await addDoc(collection(db, "addresses"), address)
  } catch (error) {
    console.error("Error saving address:", error)
  }
}

export function SavedAddressList() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const [newAddress, setNewAddress] = useState<Address>({
    id: 0,
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  })

  useEffect(() => {
    fetchAddresses(setAddresses)
  }, [])

  const handleAddAddress = async () => {
    const addressToAdd: Address = {
      ...newAddress,
      id: addresses.length + 1,
      isDefault: newAddress.isDefault || addresses.length === 0,
    }

    const updatedAddresses = newAddress.isDefault
      ? addresses.map((addr) => ({ ...addr, isDefault: false }))
      : [...addresses]

    setAddresses([...updatedAddresses, addressToAdd])
    await saveAddressToFirestore(addressToAdd)

    setNewAddress({
      id: 0,
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Address added",
      description: "Your address has been added successfully.",
    })
  }

  const handleEditAddress = () => {
    if (!currentAddress) return

    let updatedAddresses = [...addresses]
    if (currentAddress.isDefault) {
      updatedAddresses = addresses.map((addr) => ({ ...addr, isDefault: false }))
    }

    setAddresses(updatedAddresses.map((addr) => (addr.id === currentAddress.id ? currentAddress : addr)))
    setIsEditDialogOpen(false)
    setCurrentAddress(null)

    toast({
      title: "Address updated",
      description: "Your address has been updated successfully.",
    })
  }

  const handleDeleteAddress = (id: number) => {
    const addressToDelete = addresses.find((addr) => addr.id === id)
    const newAddresses = addresses.filter((addr) => addr.id !== id)
    setAddresses(newAddresses)

    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully.",
    })

    if (addressToDelete?.isDefault && newAddresses.length > 0) {
      setAddresses(newAddresses.map((addr, index) => 
        index === 0 ? { ...addr, isDefault: true } : addr
      ))
    }
  }

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )

    toast({
      title: "Default address updated",
      description: "Your default address has been updated.",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Saved Addresses</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>Use your current location or enter details manually.</DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => {
                navigator.geolocation.getCurrentPosition(async (position) => {
                  const { latitude, longitude } = position.coords
                  const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                  )
                  const data = await response.json()
                  setNewAddress((prev) => ({
                    ...prev,
                    address: data.display_name || "",
                    city: data.address.city || "",
                    state: data.address.state || "",
                    zipCode: data.address.postcode || "",
                    country: data.address.country || "",
                  }))
                })
              }}
            >
              Use Current Location
            </Button>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Address Name
                </Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder="Home, Work, etc."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Street Address
                </Label>
                <Textarea
                  id="address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  placeholder="Street address, apt, suite, etc."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  State
                </Label>
                <Input
                  id="state"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zipCode" className="text-right">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="default" className="text-right">
                  Default
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="default"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <Label htmlFor="default" className="text-sm font-normal">
                    Set as default address
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAddress}>Save Address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <p>No saved addresses found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <Card key={address.id} className="relative">
              {address.isDefault && <Badge className="absolute top-2 right-2 bg-green-600">Default</Badge>}
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{address.name}</h4>
                    <p className="text-sm text-gray-500">{address.phone}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm mb-4">
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                </div>
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentAddress(address)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                  {!address.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address.id)}>
                      Set as Default
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {currentAddress && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
              <DialogDescription>Update your delivery address details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Address Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentAddress.name}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Street Address
                </Label>
                <Textarea
                  id="edit-address"
                  value={currentAddress.address}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-city" className="text-right">
                  City
                </Label>
                <Input
                  id="edit-city"
                  value={currentAddress.city}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-state" className="text-right">
                  State
                </Label>
                <Input
                  id="edit-state"
                  value={currentAddress.state}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-zipCode" className="text-right">
                  ZIP Code
                </Label>
                <Input
                  id="edit-zipCode"
                  value={currentAddress.zipCode}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, zipCode: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={currentAddress.phone}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-default" className="text-right">
                  Default
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-default"
                    checked={currentAddress.isDefault}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, isDefault: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <Label htmlFor="edit-default" className="text-sm font-normal">
                    Set as default address
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditAddress}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}