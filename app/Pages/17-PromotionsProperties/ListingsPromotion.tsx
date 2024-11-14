"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
}

const sampleListings: Listing[] = [
  {
    id: "1",
    title: "Modern Apartment",
    price: 500000000,
    image: "/placeholder.svg?height=100&width=200",
    location: "Jakarta",
  },
  {
    id: "2",
    title: "Luxury Villa",
    price: 2000000000,
    image: "/placeholder.svg?height=100&width=200",
    location: "Bali",
  },
  {
    id: "3",
    title: "City Center Condo",
    price: 750000000,
    image: "/placeholder.svg?height=100&width=200",
    location: "Surabaya",
  },
];

export function PromoteListingComponents() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [promotionOptions, setPromotionOptions] = useState({
    featured: false,
    topSearch: false,
    specialOffer: false,
  });
  const [duration, setDuration] = useState(7);

  const handlePromotionChange = (option: keyof typeof promotionOptions) => {
    setPromotionOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const calculatePrice = () => {
    let basePrice = 100000; // Base price per day in IDR
    let multiplier = 1;
    if (promotionOptions.featured) multiplier += 0.5;
    if (promotionOptions.topSearch) multiplier += 0.3;
    if (promotionOptions.specialOffer) multiplier += 0.2;
    return basePrice * duration * multiplier;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Promote Your Listing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Listing</CardTitle>
            <CardDescription>
              Choose the property you want to promote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) =>
                setSelectedListing(
                  sampleListings.find((l) => l.id === value) || null
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a listing" />
              </SelectTrigger>
              <SelectContent>
                {sampleListings.map((listing) => (
                  <SelectItem key={listing.id} value={listing.id}>
                    {listing.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotion Options</CardTitle>
            <CardDescription>
              Choose how you want to promote your listing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={promotionOptions.featured}
                onCheckedChange={() => handlePromotionChange("featured")}
              />
              <Label htmlFor="featured">Featured Listing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="topSearch"
                checked={promotionOptions.topSearch}
                onCheckedChange={() => handlePromotionChange("topSearch")}
              />
              <Label htmlFor="topSearch">Top of Search Results</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="specialOffer"
                checked={promotionOptions.specialOffer}
                onCheckedChange={() => handlePromotionChange("specialOffer")}
              />
              <Label htmlFor="specialOffer">Special Offer Badge</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Promotion Duration</CardTitle>
            <CardDescription>
              Select how long you want to promote your listing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Slider
              min={1}
              max={30}
              step={1}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              className="w-full"
            />
            <p className="mt-2 text-center">{duration} days</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              See how your promoted listing will appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedListing ? (
              <div className="relative border p-4 rounded-lg">
                {promotionOptions.featured && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    Featured
                  </Badge>
                )}
                {promotionOptions.specialOffer && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Special Offer
                  </Badge>
                )}
                <Image
                  src={selectedListing.image}
                  alt={selectedListing.title}
                  width={200}
                  height={100}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3 className="font-bold text-lg">{selectedListing.title}</h3>
                <p>{selectedListing.location}</p>
                <p className="font-semibold mt-2">
                  {selectedListing.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  })}
                </p>
                {promotionOptions.topSearch && (
                  <Badge className="mt-2 bg-blue-500">Top Search Result</Badge>
                )}
              </div>
            ) : (
              <p>Select a listing to see the preview</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Promotion Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Duration:</strong> {duration} days
            </p>
            <p>
              <strong>Total Price:</strong>{" "}
              {calculatePrice().toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={!selectedListing}>
              Promote Listing
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
