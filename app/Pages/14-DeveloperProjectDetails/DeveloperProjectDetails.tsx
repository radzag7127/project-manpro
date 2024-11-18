"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building,
  BedDouble,
  Bath,
  Square,
  Edit,
  Save,
  Megaphone,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Property {
  id: string;
  name: string;
  type: string;
  price: number;
  status: "Available" | "Sold" | "Reserved";
  image: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export function DeveloperProjectDetails() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [property, setProperty] = useState<Property>({
    id: "prop1",
    name: "Unit A-101",
    type: "2BR Apartment",
    price: 1500000000,
    status: "Sold",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Spacious 2-bedroom apartment with modern amenities and a beautiful city view.",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the updated property data to your backend
    console.log("Saving property:", property);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">
              {property.name}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(`/routes/promotion-listing-dev/${property.id}`)
                }
              >
                <Megaphone className="mr-2 h-4 w-4" /> Promote
              </Button>
            </div>
          </div>
          <CardDescription>{property.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Image
              src={property.image}
              alt={property.name}
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Status:</span>
                </div>
                {isEditing ? (
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                    defaultValue={property.status}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                      <SelectItem value="Reserved">Reserved</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span>{property.status}</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BedDouble className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Bedrooms:</span>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    name="bedrooms"
                    value={property.bedrooms}
                    onChange={handleInputChange}
                    className="w-20 text-right"
                  />
                ) : (
                  <span>{property.bedrooms}</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Bath className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Bathrooms:</span>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    name="bathrooms"
                    value={property.bathrooms}
                    onChange={handleInputChange}
                    className="w-20 text-right"
                  />
                ) : (
                  <span>{property.bathrooms}</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Square className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Area:</span>
                </div>
                {isEditing ? (
                  <div className="flex items-center">
                    <Input
                      type="number"
                      name="area"
                      value={property.area}
                      onChange={handleInputChange}
                      className="w-20 text-right mr-2"
                    />
                    <span>m²</span>
                  </div>
                ) : (
                  <span>{property.area} m²</span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="font-semibold">
                Description:
              </Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  name="description"
                  value={property.description}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">{property.description}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <span className="text-2xl font-bold">
              {isEditing ? (
                <Input
                  type="number"
                  name="price"
                  value={property.price}
                  onChange={handleInputChange}
                  className="w-40 text-right"
                />
              ) : (
                property.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })
              )}
            </span>
            <Button onClick={() => router.back()}>Back to Listings</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
