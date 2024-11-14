"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  List,
  Map as MapIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
}

const properties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment in Jakarta",
    price: 500000000,
    location: "Jakarta",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 75,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Cozy Villa in Bali",
    price: 2000000000,
    location: "Bali",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Spacious House in Bandung",
    price: 1500000000,
    location: "Bandung",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Luxury Condo with City View",
    price: 3000000000,
    location: "Jakarta",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 120,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Traditional Javanese House",
    price: 1000000000,
    location: "Yogyakarta",
    type: "House",
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Beachfront Villa in Lombok",
    price: 2500000000,
    location: "Lombok",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 250,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
];

export function SearchResults() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 3000000000,
  ]);
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const price = searchParams.get("price");

    // Filter the static properties based on search params
    const filtered = properties.filter((property) => {
      const matchLocation =
        !location ||
        property.location.toLowerCase().includes(location.toLowerCase());
      const matchType =
        !type || property.type.toLowerCase() === type.toLowerCase();
      const matchPrice = !price || property.price <= parseInt(price);

      return matchLocation && matchType && matchPrice;
    });

    setFilteredProperties(filtered);
  }, [searchParams]);

  const formatPrice = (price: number | undefined) => {
    if (typeof price === "undefined") return "N/A";
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-background">
    <HeaderComponents/>

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-3">
            <div className="flex items-center mb-4 space-x-4">
              <Input
                placeholder="Modify your search..."
                className="flex-grow"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">
                {filteredProperties.length} properties found
              </p>
              <div className="flex items-center space-x-2">
                <Label htmlFor="view-mode">View:</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4 mr-2" />
                    List
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                  >
                    <MapIcon className="h-4 w-4 mr-2" />
                    Map
                  </Button>
                </div>
              </div>
            </div>
            {viewMode === "list" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property.id}>
                    <CardHeader className="p-0">
                      <Image
                        src={property.imageUrl}
                        alt={property.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2">
                        {property.title}
                      </CardTitle>
                      <p className="text-primary font-bold mb-2">
                        {formatPrice(property.price)}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms} beds
                        </span>
                        <span className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms} baths
                        </span>
                        <span className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          {property.area} m²
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        key={`view-details-${property.id}`}
                        variant="outline"
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gray-200 rounded-lg h-[600px] flex items-center justify-center">
                <p className="text-gray-500">
                  Map view would be displayed here
                </p>
              </div>
            )}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select>
                    <SelectTrigger id="property-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="jakarta">Jakarta</SelectItem>
                      <SelectItem value="bali">Bali</SelectItem>
                      <SelectItem value="bandung">Bandung</SelectItem>
                      <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="lombok">Lombok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price Range</Label>
                  <Slider
                    min={0}
                    max={3000000000}
                    step={100000000}
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, "5+"].map((num) => (
                      <Button
                        key={`bedroom-${num}`}
                        variant="outline"
                        size="sm"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified-only">Verified Sellers Only</Label>
                  <Switch id="verified-only" />
                </div>
                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
