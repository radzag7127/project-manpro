"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, X, Eye, Megaphone } from "lucide-react";

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
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";
import { Badge } from "@/components/ui/badge";

interface PropertyAttribute {
  id: string;
  category: string;
  label: string;
}

interface ListingFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  selectedAttributes: string[];
  customAttributes: string;
  images: string[];
}

export function AddListings() {
  const propertyAttributes: Record<string, PropertyAttribute[]> = {
    fengshui: [
      { id: "fs1", category: "fengshui", label: "Good Direction" },
      { id: "fs2", category: "fengshui", label: "Positive Energy Flow" },
      { id: "fs3", category: "fengshui", label: "Balanced Layout" },
      { id: "fs4", category: "fengshui", label: "Mountain Facing" },
      { id: "fs5", category: "fengshui", label: "Water Element" },
    ],
    religious: [
      { id: "r1", category: "religious", label: "Kiblat Direction" },
      { id: "r2", category: "religious", label: "Prayer Room" },
      { id: "r3", category: "religious", label: "Near Mosque" },
      { id: "r4", category: "religious", label: "Near Temple" },
    ],
    amenities: [
      { id: "am1", category: "amenities", label: "Swimming Pool" },
      { id: "am2", category: "amenities", label: "Gym" },
      { id: "am3", category: "amenities", label: "Garden" },
      { id: "am4", category: "amenities", label: "Parking" },
    ],
    views: [
      { id: "v1", category: "views", label: "Ocean View" },
      { id: "v2", category: "views", label: "Mountain View" },
      { id: "v3", category: "views", label: "City View" },
    ],
    security: [
      { id: "s1", category: "security", label: "24/7 Security" },
      { id: "s2", category: "security", label: "CCTV" },
      { id: "s3", category: "security", label: "Access Card" },
    ],
    accessibility: [
      { id: "ac1", category: "accessibility", label: "Wheelchair Friendly" },
      { id: "ac2", category: "accessibility", label: "Elevator Access" },
      { id: "ac3", category: "accessibility", label: "Wide Doorways" },
    ],
    sustainability: [
      { id: "su1", category: "sustainability", label: "Solar Panels" },
      { id: "su2", category: "sustainability", label: "Rainwater Harvesting" },
      { id: "su3", category: "sustainability", label: "Energy Efficient" },
    ],
  };

  const [formData, setFormData] = useState<ListingFormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    selectedAttributes: [],
    customAttributes: "",
    images: [],
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchAttribute, setSearchAttribute] = useState("");

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

  const handleAttributeToggle = (attributeId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAttributes: prev.selectedAttributes.includes(attributeId)
        ? prev.selectedAttributes.filter((id) => id !== attributeId)
        : [...prev.selectedAttributes, attributeId],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponents />
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
                  <div className="flex justify-start mb-4">
                    <Button variant="outline" asChild>
                      <Link href="/routes/listing-promotion">
                        <Megaphone className="h-4 w-4 mr-2" />
                        Promotion Options
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Label>Property Attributes</Label>

                    <div className="space-y-2">
                      <Input
                        placeholder="Search attributes..."
                        value={searchAttribute}
                        onChange={(e) => setSearchAttribute(e.target.value)}
                        className="mb-4"
                      />

                      <div className="max-h-[400px] overflow-y-auto space-y-6 pr-4">
                        {Object.entries(propertyAttributes)
                          .filter(
                            ([category, attributes]) =>
                              searchAttribute === "" ||
                              category
                                .toLowerCase()
                                .includes(searchAttribute.toLowerCase()) ||
                              attributes.some((attr) =>
                                attr.label
                                  .toLowerCase()
                                  .includes(searchAttribute.toLowerCase())
                              )
                          )
                          .map(([category, attributes]) => (
                            <div key={category} className="space-y-2">
                              <h3 className="text-lg font-semibold capitalize sticky top-0 bg-background py-2">
                                {category}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {attributes
                                  .filter(
                                    (attr) =>
                                      searchAttribute === "" ||
                                      attr.label
                                        .toLowerCase()
                                        .includes(searchAttribute.toLowerCase())
                                  )
                                  .map((attr) => (
                                    <Button
                                      key={attr.id}
                                      variant={
                                        formData.selectedAttributes.includes(
                                          attr.id
                                        )
                                          ? "default"
                                          : "outline"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        handleAttributeToggle(attr.id)
                                      }
                                      className="rounded-full"
                                    >
                                      {attr.label}
                                    </Button>
                                  ))}
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <Label htmlFor="customAttributes">
                          Can't find what you're looking for?
                        </Label>
                        <Textarea
                          id="customAttributes"
                          name="customAttributes"
                          value={formData.customAttributes}
                          onChange={handleInputChange}
                          placeholder="Add your own custom attributes here..."
                          className="mt-2"
                        />
                      </div>
                    </div>
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
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/routes/listing-promotion">
                      <Upload className="h-4 w-4 mr-2" />
                      Promote Listing
                    </Link>
                  </Button>
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
                          This is how your listing will appear to potential
                          buyers
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
                          {formData.customAttributes ||
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
      <Footer />
    </div>
  );
}
