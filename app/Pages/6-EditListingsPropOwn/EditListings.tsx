"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Megaphone, X, Save, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import HeaderComponent from "../0-PageProperties/Header";

interface ListingData {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  specialAttributes: string;
  images: string[];
  status: "active" | "sold" | "pending";
}

// Mock data for the existing listing
const mockListingData: ListingData = {
  id: "1",
  title: "Luxurious Villa with Ocean View",
  description:
    "Experience the epitome of luxury living in this stunning ocean-view villa. Nestled in the heart of Bali, this property offers breathtaking panoramas, world-class amenities, and unparalleled comfort.",
  price: "5000000000",
  location: "Bali, Indonesia",
  propertyType: "villa",
  bedrooms: "5",
  bathrooms: "6",
  specialAttributes:
    "Ocean view, private pool, traditional Balinese architecture",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  status: "active",
};

export function EditUploadedListings() {
  const [formData, setFormData] = useState<ListingData>(mockListingData);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, you would fetch the listing data here
    // For now, we're using the mock data
    setFormData(mockListingData);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleStatusChange = (value: "active" | "sold" | "pending") => {
    setFormData((prev) => ({ ...prev, status: value }));
    setIsDirty(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
      setIsDirty(true);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated form data to your backend
    console.log("Updated listing data:", formData);
    toast({
      title: "Changes saved",
      description: "Your listing has been updated successfully.",
    });
    setIsDirty(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponent />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Listing</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>
                Update the information about your property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (IDR)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    name="propertyType"
                    value={formData.propertyType}
                    onValueChange={(value) => {
                      handleInputChange({
                        target: { name: "propertyType", value },
                      } as any);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialAttributes">Special Attributes</Label>
                <Textarea
                  id="specialAttributes"
                  name="specialAttributes"
                  value={formData.specialAttributes}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
              <CardDescription>
                Update or add new images of your property (max 10 images)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Property image ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg object-cover w-full h-36"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {formData.images.length < 10 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-36 cursor-pointer hover:border-primary">
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">
                      Upload Image
                    </span>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      multiple
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Listing Status</CardTitle>
              <CardDescription>
                Update the current status of your listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.status}
                onValueChange={handleStatusChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">Pending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sold" id="sold" />
                  <Label htmlFor="sold">Sold</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Button type="submit" disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button type="button" variant="secondary" asChild>
                <Link href={`/routes/promotion-listing-propown/${formData.id}`}>
                  <Megaphone className="h-4 w-4 mr-2" />
                  Promote Listing
                </Link>
              </Button>
            </div>
            {isDirty && (
              <p className="text-sm text-yellow-600">
                You have unsaved changes
              </p>
            )}
          </div>
        </form>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Rumaku. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/terms" className="hover:underline mr-4">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline mr-4">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
