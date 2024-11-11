"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, X, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ListingFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  specialAttributes: string;
  images: string[];
}

export function AddListings() {
  const [formData, setFormData] = useState<ListingFormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    specialAttributes: "",
    images: [],
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // Reset form or redirect user after successful submission
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Rumaku
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/routes/listings" className="hover:underline">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Post New Listing</h1>

        <Tabs defaultValue="form">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">Listing Details</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines & Tips</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>
                    Provide comprehensive information about your property
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
                      placeholder="e.g., Luxurious Villa with Ocean View"
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
                      placeholder="Describe your property in detail..."
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
                        placeholder="e.g., 5000000000"
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
                        placeholder="e.g., Ubud, Bali"
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
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            propertyType: value,
                          }))
                        }
                        required
                      >
                        <option value="">Select type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="land">Land</option>
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
                        placeholder="e.g., 3"
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
                        placeholder="e.g., 2"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialAttributes">
                      Special Attributes
                    </Label>
                    <Textarea
                      id="specialAttributes"
                      name="specialAttributes"
                      value={formData.specialAttributes}
                      onChange={handleInputChange}
                      placeholder="e.g., Ocean view, private pool, traditional architecture..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Images</CardTitle>
                  <CardDescription>
                    Upload high-quality images of your property (max 10 images)
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
                        <Upload className="h-8 w-8 text-gray-400" />
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

              <div className="flex justify-between">
                <Button type="submit">Publish Listing</Button>
                <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Listing Preview</DialogTitle>
                      <DialogDescription>
                        This is how your listing will appear to potential buyers
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <h2 className="text-2xl font-bold">
                        {formData.title || "Your Property Title"}
                      </h2>
                      <p className="text-xl font-semibold">
                        {formData.price
                          ? `IDR ${parseInt(formData.price).toLocaleString()}`
                          : "Price"}
                      </p>
                      <p>{formData.location || "Location"}</p>
                      <div className="flex space-x-4">
                        <span>{formData.bedrooms} Bedrooms</span>
                        <span>{formData.bathrooms} Bathrooms</span>
                        <span>{formData.propertyType}</span>
                      </div>
                      <p>
                        {formData.description ||
                          "Property description will appear here..."}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={`Property image ${index + 1}`}
                            width={200}
                            height={150}
                            className="rounded-lg object-cover w-full h-36"
                          />
                        ))}
                      </div>
                      <h3 className="font-semibold">Special Attributes</h3>
                      <p>
                        {formData.specialAttributes ||
                          "No special attributes specified"}
                      </p>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setPreviewOpen(false)}>
                        Close Preview
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="guidelines">
            <Card>
              <CardHeader>
                <CardTitle>Guidelines & Tips for a Great Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Use a clear, descriptive title that highlights key features
                    of your property.
                  </li>
                  <li>
                    Provide a detailed description, including unique selling
                    points and nearby amenities.
                  </li>
                  <li>
                    Be accurate with property details such as the number of
                    bedrooms, bathrooms, and property type.
                  </li>
                  <li>
                    Use high-quality, well-lit photos that showcase your
                    property's best features.
                  </li>
                  <li>
                    Include both interior and exterior shots to give a
                    comprehensive view.
                  </li>
                  <li>
                    Mention any recent renovations, upgrades, or special
                    attributes that add value.
                  </li>
                  <li>
                    Be transparent about the property's condition and any
                    potential issues.
                  </li>
                  <li>
                    Highlight the property's location and proximity to key areas
                    or landmarks.
                  </li>
                  <li>
                    Use the special attributes field to mention unique features
                    like ocean views, private pools, or traditional
                    architecture.
                  </li>
                  <li>
                    Review your listing for spelling and grammar errors before
                    publishing.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
