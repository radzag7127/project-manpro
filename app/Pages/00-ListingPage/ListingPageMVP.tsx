"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Building,
  User,
  DollarSign,
  BedDouble,
  Bath,
  Square,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeaderComponent from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";

// Static data (expanded)
const paidListings = [
  {
    id: 1,
    type: "property",
    name: "Luxury Villa",
    location: "Bali",
    price: 5000000000,
    bedrooms: 5,
    bathrooms: 6,
    area: 500,
    image: "/prop1.jpg",
    isPaid: true,
    specialFeatures: ["Feng Shui Aligned", "Pool", "Smart Home"],
  },
  {
    id: 2,
    type: "project",
    name: "Green Residences",
    location: "Jakarta",
    units: 200,
    startingPrice: 800000000,
    image: "/prop2.jpg",
    isPaid: true,
    specialFeatures: ["Kiblat Direction", "Feng Shui Aligned", "Garden"],
  },
  {
    id: 3,
    type: "property",
    name: "City Center Apartment",
    location: "Surabaya",
    price: 2000000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "/prop3.jpg",
    isPaid: true,
    specialFeatures: [
      "Expert Certified",
      "Feng Shui Aligned",
      "Kiblat Direction",
    ],
  },
];

const unpaidListings = [
  {
    id: 4,
    type: "property",
    name: "Cozy House",
    location: "Yogyakarta",
    price: 1500000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "/prop4.jpg",
    isPaid: false,
    specialFeatures: ["Expert Certified", "Kiblat Direction"],
  },
  {
    id: 5,
    type: "project",
    name: "Seaside Villas",
    location: "Bali",
    units: 50,
    startingPrice: 3000000000,
    image: "/prop5.jpg",
    isPaid: false,
    specialFeatures: ["Expert Certified", "Kiblat Direction"],
  },
  {
    id: 6,
    type: "property",
    name: "Modern Office Space",
    location: "Jakarta",
    price: 10000000000,
    area: 1000,
    image: "/prop1.jpg",
    isPaid: false,
    specialFeatures: ["Expert Certified", "Kiblat Direction"],
  },
];

const profiles = [
  {
    id: 2,
    type: "developer",
    name: "Green Builders",
    rating: 4.5,
    projects: 3,
    image: "/dev1.jpg",
    isPaid: true,
    tag: "Developer",
  },
  {
    id: 4,
    type: "developer",
    name: "City Developers",
    rating: 4.0,
    projects: 2,
    image: "/dev2.jpg",
    isPaid: false,
    tag: "Developer",
  },
  {
    id: 1,
    type: "owner",
    name: "John Doe",
    rating: 4.8,
    properties: 5,
    image: "/male1.jpg",
    isPaid: true,
    tag: "Property Owner",
  },
  {
    id: 3,
    type: "owner",
    name: "Jane Smith",
    rating: 4.2,
    properties: 3,
    image: "/female1.jpg",
    isPaid: false,
    tag: "Property Owner",
  },
];

const profileAds = [
  {
    id: 1,
    name: "Luxury Living Realtors",
    tagline: "Your Gateway to Premium Properties",
    image: "/prop2.jpg",
  },
  {
    id: 2,
    name: "EcoHomes Developers",
    tagline: "Building Sustainable Futures",
    image: "/prop3.jpg",
  },
];

export function ListingPageMVPs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);
  const [areaRange, setAreaRange] = useState([0, 1000]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filterListings = (listings: any[]) => {
    return listings.filter((listing) => {
      const specialFeatureFilters = selectedFilters.filter((filter) =>
        [
          "Feng Shui Aligned",
          "Kiblat Direction",
          "Expert Certified",
          "Pool",
          "Garden",
          "Smart Home",
        ].includes(filter)
      );

      if (specialFeatureFilters.length > 0) {
        const hasSelectedFeatures = specialFeatureFilters.some((feature) =>
          listing.specialFeatures?.includes(feature)
        );
        if (!hasSelectedFeatures) return false;
      }

      return true;
    });
  };

  const renderListing = (listing: any) => (
    <Link
      href={
        listing.type === "project"
          ? `/routes/developer-project`
          : `/routes/listing-details`
      }
      key={listing.id}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Image
          src={listing.image}
          alt={listing.name}
          width={200}
          height={100}
          className="w-full h-40 object-cover"
        />
        <CardContent className="p-4">
          <h3 className="font-semibold">{listing.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" /> {listing.location}
          </div>
          {listing.type === "property" ? (
            <>
              <p className="mt-2 font-bold">
                {listing.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </p>
              <div className="flex justify-between text-sm mt-2">
                <span>
                  <BedDouble className="inline w-4 h-4 mr-1" />
                  {listing.bedrooms} beds
                </span>
                <span>
                  <Bath className="inline w-4 h-4 mr-1" />
                  {listing.bathrooms} baths
                </span>
                <span>
                  <Square className="inline w-4 h-4 mr-1" />
                  {listing.area} m²
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="mt-2">{listing.units} units</p>
              <p className="font-bold">
                Starting from{" "}
                {listing.startingPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </p>
            </>
          )}
          {listing.specialFeatures && listing.specialFeatures.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {listing.specialFeatures.map((feature: string) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
          {listing.isPaid && <Badge className="mt-2">Featured</Badge>}
        </CardContent>
      </Card>
    </Link>
  );

  const renderProfile = (profile: any) => (
    <Link
      href={
        profile.type === "developer"
          ? `/routes/developer-profile`
          : `/routes/property-owner-profile`
      }
      key={profile.id}
    >
      <Card className="flex items-center p-4 space-x-4 hover:shadow-md transition-shadow duration-300">
        <Image
          src={profile.image}
          alt={profile.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{profile.name}</h3>
            <Badge variant="outline">{profile.tag}</Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
            {profile.rating}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">
            {profile.type === "owner"
              ? `${profile.properties} properties`
              : `${profile.projects} projects`}
          </p>
          {profile.isPaid && <Badge>Premium</Badge>}
        </div>
      </Card>
    </Link>
  );

  const renderProfileAd = (ad: any) => (
    <Link href="/routes/developer-profile" key={ad.id}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Image
          src={ad.image}
          alt={ad.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
        <CardContent className="p-4">
          <h3 className="font-semibold">{ad.name}</h3>
          <p className="text-sm text-muted-foreground">{ad.tagline}</p>
          <Badge className="mt-2">Sponsored</Badge>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">Rumaku Listings</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[200px]"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="date">Newest</SelectItem>
                <SelectItem value="popularity">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Filters</h2>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="property-type">
                  <AccordionTrigger>Property Type</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["House", "Apartment", "Villa", "Land", "Office"].map(
                        (type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={type}
                              checked={selectedFilters.includes(type)}
                              onCheckedChange={() => handleFilterChange(type)}
                            />
                            <Label htmlFor={type}>{type}</Label>
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price-range">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      min={0}
                      max={10000000000}
                      step={100000000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                      <span>
                        {priceRange[0].toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <span>
                        {priceRange[1].toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="area-range">
                  <AccordionTrigger>Area Range</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={areaRange}
                      onValueChange={setAreaRange}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                      <span>{areaRange[0]} m²</span>
                      <span>{areaRange[1]} m²</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bedrooms">
                  <AccordionTrigger>Bedrooms</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["1", "2", "3", "4", "5+"].map((count) => (
                        <div
                          key={count}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`bed-${count}`}
                            checked={selectedFilters.includes(`bed-${count}`)}
                            onCheckedChange={() =>
                              handleFilterChange(`bed-${count}`)
                            }
                          />
                          <Label htmlFor={`bed-${count}`}>{count}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bathrooms">
                  <AccordionTrigger>Bathrooms</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["1", "2", "3", "4+"].map((count) => (
                        <div
                          key={count}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`bath-${count}`}
                            checked={selectedFilters.includes(`bath-${count}`)}
                            onCheckedChange={() =>
                              handleFilterChange(`bath-${count}`)
                            }
                          />
                          <Label htmlFor={`bath-${count}`}>{count}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="special-features">
                  <AccordionTrigger>Special Features</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[
                        "Feng Shui Aligned",
                        "Kiblat Direction",
                        "Expert Certified",
                        "Pool",
                        "Garden",
                        "Smart Home",
                      ].map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={feature}
                            checked={selectedFilters.includes(feature)}
                            onCheckedChange={() => handleFilterChange(feature)}
                          />
                          <Label htmlFor={feature}>{feature}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Listings</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="profiles">Profiles</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterListings([...paidListings, ...unpaidListings]).map(
                    renderListing
                  )}
                </div>
              </TabsContent>
              <TabsContent value="properties">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterListings([...paidListings, ...unpaidListings])
                    .filter((listing) => listing.type === "property")
                    .map(renderListing)}
                </div>
              </TabsContent>
              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterListings([...paidListings, ...unpaidListings])
                    .filter((listing) => listing.type === "project")
                    .map(renderListing)}
                </div>
              </TabsContent>
              <TabsContent value="profiles">
                <div className="grid grid-cols-1 gap-4">
                  {profiles.map((profile) => renderProfile(profile))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
