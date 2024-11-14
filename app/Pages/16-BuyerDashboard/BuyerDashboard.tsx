"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Building,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  Square,
  ChevronRight,
  MessageCircle,
  Settings,
  User,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { BuyerChatBubble } from "@/app/Pages/16-BuyerDashboard/BuyerChatBubble";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}

interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  agentName: string;
  date: string;
  status: "Pending" | "Responded";
  message: string;
}

interface Buyer {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

const savedProperties: Property[] = [
  {
    id: "p1",
    title: "Modern Apartment in CBD",
    type: "Apartment",
    location: "Central Jakarta",
    price: 2500000000,
    bedrooms: 2,
    bathrooms: 2,
    area: 80,
    image: "/prop1.jpg",
  },
  {
    id: "p2",
    title: "Spacious Family Home",
    type: "House",
    location: "South Jakarta",
    price: 5000000000,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: "/prop2.jpg",
  },
];

const recommendedProperties: Property[] = [
  {
    id: "p3",
    title: "Luxury Condo with City View",
    type: "Apartment",
    location: "North Jakarta",
    price: 3500000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "/prop3.jpg",
  },
  {
    id: "p4",
    title: "Cozy Studio near University",
    type: "Studio",
    location: "West Jakarta",
    price: 1000000000,
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    image: "/prop4.jpg",
  },
];

const recentlyViewedProperties: Property[] = [
  {
    id: "p5",
    title: "Penthouse with Rooftop Garden",
    type: "Penthouse",
    location: "Central Jakarta",
    price: 10000000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 250,
    image: "/prop5.jpg",
  },
  {
    id: "p6",
    title: "Townhouse in Gated Community",
    type: "Townhouse",
    location: "South Jakarta",
    price: 4000000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    image: "/prop1.jpg",
  },
];

const inquiries: Inquiry[] = [
  {
    id: "i1",
    propertyId: "p1",
    propertyTitle: "Modern Apartment in CBD",
    agentName: "Siti Nurhaliza",
    date: "2024-03-10",
    status: "Responded",
    message:
      "Thank you for your interest. The property is still available. Would you like to schedule a viewing?",
  },
  {
    id: "i2",
    propertyId: "p2",
    propertyTitle: "Spacious Family Home",
    agentName: "Budi Santoso",
    date: "2024-03-12",
    status: "Pending",
    message:
      "Hello, I'm interested in this property. Can you provide more information about the neighborhood and nearby schools?",
  },
];

const buyer: Buyer = {
  id: "b1",
  name: "Doni Buyer",
  avatar: "/male1.jpg",
  email: "Doni.doe@example.com",
};

export default function BuyerDashboards() {
  const savedPropertiesRef = useRef<HTMLDivElement>(null);
  const inquiriesRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card key={property.id}>
      <Image
        src={property.image}
        alt={property.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm text-muted-foreground">
            {property.location}
          </span>
        </div>
        <p className="text-primary font-bold mb-2">
          {formatPrice(property.price)}
        </p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            <BedDouble className="inline h-4 w-4 mr-1" />
            {property.bedrooms} beds
          </span>
          <span>
            <Bath className="inline h-4 w-4 mr-1" />
            {property.bathrooms} baths
          </span>
          <span>
            <Square className="inline h-4 w-4 mr-1" />
            {property.area} m²
          </span>
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
      <header className="bg-primary text-primary-foreground py-4 sticky top-0 z-10">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0">
                      <UserCircle size={24} />
                      <ChevronDown size={16} className="ml-1" />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/routes/buyer-profile" className="w-full">
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
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center mb-8">
              <Avatar className="mr-4">
                <AvatarImage src={buyer.avatar} alt={buyer.name} />
                <AvatarFallback>{buyer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {buyer.name}!
                </h1>
                <p className="text-muted-foreground">{buyer.email}</p>
                <p className="text-muted-foreground mt-2">
                  I'm looking for my dream home in Jakarta. Interested in modern
                  apartments and family houses with good access to schools and
                  public transportation.
                </p>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button
                  onClick={() => scrollToSection(savedPropertiesRef)}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Heart className="mr-2 h-4 w-4" /> Saved Properties
                </Button>
                <Button
                  onClick={() => scrollToSection(inquiriesRef)}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> My Inquiries
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" /> My Profile
                </Button>
                <Button
                  onClick={() => scrollToSection(settingsRef)}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div ref={savedPropertiesRef} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Saved Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Recommended Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyViewedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        <div ref={inquiriesRef} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">My Inquiries</h2>
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {inquiry.propertyTitle}
                      </CardTitle>
                      <CardDescription>
                        Agent: {inquiry.agentName}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        inquiry.status === "Responded" ? "default" : "secondary"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{inquiry.message}</p>
                  <p className="text-sm text-muted-foreground">
                    Sent on: {new Date(inquiry.date).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href={`/routes/inquiries/${inquiry.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div ref={settingsRef} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Manage your account settings, preferences, and notification
                options here.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/routes/settings">Manage Settings</Link>
              </Button>
            </CardFooter>
          </Card>
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

      <BuyerChatBubble />
    </div>
  );
}
