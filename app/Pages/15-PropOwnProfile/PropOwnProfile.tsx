"use client";

import { UserCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import HeaderComponent from "../0-PageProperties/Header";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  status: "For Rent" | "For Sale";
  image: string;
}

interface Review {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface PropertyOwner {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  propertiesCount: number;
  averageRating: number;
  responseRate: number;
  bio: string;
}

const properties: Property[] = [
  {
    id: "p1",
    title: "Modern Apartment in CBD",
    type: "Apartment",
    location: "Central Jakarta",
    price: 5000000,
    status: "For Rent",
    image: "/prop1.jpg",
  },
  {
    id: "p2",
    title: "Spacious Family Home",
    type: "House",
    location: "South Jakarta",
    price: 8000000000,
    status: "For Sale",
    image: "/prop2.jpg",
  },
  {
    id: "p3",
    title: "Cozy Studio near University",
    type: "Studio",
    location: "West Jakarta",
    price: 3000000,
    status: "For Rent",
    image: "/prop3.jpg",
  },
];

const reviews: Review[] = [
  {
    id: "rev1",
    propertyId: "p1",
    propertyTitle: "Modern Apartment in CBD",
    reviewerName: "John Smith",
    rating: 4.8,
    comment: "Great apartment, very responsive owner. Highly recommended!",
    date: "2024-01-15",
  },
  {
    id: "rev2",
    propertyId: "p3",
    propertyTitle: "Cozy Studio near University",
    reviewerName: "Emily Johnson",
    rating: 4.8,
    comment:
      "Perfect location and well-maintained property. The owner is very professional.",
    date: "2024-02-20",
  },
];

const propertyOwner: PropertyOwner = {
  id: "o1",
  name: "Budi Santoso",
  avatar: "/male1.jpg",
  joinDate: "2022-06-15",
  propertiesCount: 3,
  averageRating: 4.8,
  responseRate: 98,
  bio: "Experienced property owner with a passion for providing high-quality living spaces in Jakarta. I take pride in maintaining my properties to the highest standards and ensuring tenant satisfaction.",
};

export function PropertyOwnerProfiles() {
  const [searchTerm, setSearchTerm] = useState("");

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isOpen, setIsOpen] = useState(false);

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card key={property.id}>
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm text-muted-foreground">
            {property.location}
          </span>
        </div>
        <p className="text-primary font-bold mb-2">
          {formatPrice(property.price)}{" "}
          {property.status === "For Rent" ? "/ month" : ""}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{property.type}</span>
          <Badge
            variant={property.status === "For Rent" ? "default" : "secondary"}
          >
            {property.status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/routes/properties/${property.id}`}>
            View Details <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/routes/user-page" className="text-2xl font-bold">
            Rumaku
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link href="/routes/listings" className="hover:underline">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/routes/about-us" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/routes/contact-us" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0">
                      <UserCircle size={24} />
                      <ChevronDown size={16} className="ml-1" />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/routes/user-profile-seller"
                        className="w-full"
                      >
                        Account Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/" className="w-full">
                        Log out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex-1">
            <Card className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">
                      {propertyOwner.name}
                    </CardTitle>
                    <CardDescription>Property Owner</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                      <Link href="/routes/rate-this">
                        <Star className="mr-2 h-4 w-4" />
                        Rate Owner
                      </Link>
                    </Button>
                    <Button>Contact Owner</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={propertyOwner.avatar}
                      alt={propertyOwner.name}
                    />
                    <AvatarFallback>
                      {propertyOwner.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold">{propertyOwner.name}</h1>
                    <p className="text-muted-foreground">
                      Member since{" "}
                      {new Date(propertyOwner.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>About {propertyOwner.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{propertyOwner.bio}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Properties
                      </CardTitle>
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {propertyOwner.propertiesCount}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average Rating
                      </CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {propertyOwner.averageRating.toFixed(1)}
                      </div>
                      <Progress
                        value={propertyOwner.averageRating * 20}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Response Rate
                      </CardTitle>
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {propertyOwner.responseRate}%
                      </div>
                      <Progress
                        value={propertyOwner.responseRate}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="properties" className="mb-8">
                  <TabsList>
                    <TabsTrigger value="properties">Properties</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="properties">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Properties by {propertyOwner.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <Input
                            type="text"
                            placeholder="Search properties..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredProperties.map((property) => (
                            <PropertyCard
                              key={property.id}
                              property={property}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <Card>
                      <CardHeader>
                        <CardTitle>Reviews</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {reviews.map((review) => (
                            <Card key={review.id}>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg">
                                    {review.reviewerName}
                                  </CardTitle>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span>{review.rating.toFixed(1)}</span>
                                  </div>
                                </div>
                                <CardDescription>
                                  {review.propertyTitle}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm mb-2">{review.comment}</p>
                                <p className="text-sm text-muted-foreground">
                                  Date:{" "}
                                  {new Date(review.date).toLocaleDateString()}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
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
