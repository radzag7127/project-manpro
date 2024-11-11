"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  verified: boolean;
}

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  images: string[];
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  seller: Seller;
  reviews: Review[];
  latitude: number;
  longitude: number;
}

const property: Property = {
  id: "1",
  title: "Luxurious Villa with Ocean View",
  price: 5000000000,
  location: "Bali, Indonesia",
  type: "Villa",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  description:
    "Experience the epitome of luxury living in this stunning ocean-view villa. Nestled in the heart of Bali, this property offers breathtaking panoramas, world-class amenities, and unparalleled comfort.",
  bedrooms: 5,
  bathrooms: 6,
  area: 500,
  seller: {
    id: "s1",
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    verified: true,
  },
  reviews: [
    {
      id: "r1",
      author: "John Smith",
      rating: 5,
      comment:
        "Absolutely stunning property! The views are incredible and the amenities are top-notch.",
      date: "2024-02-15",
    },
    {
      id: "r2",
      author: "Emma Watson",
      rating: 4,
      comment:
        "Beautiful villa, but a bit far from the main attractions. Overall, a great experience.",
      date: "2024-01-20",
    },
  ],
  latitude: -8.409518,
  longitude: 115.188919,
};

export default function PropertyDetailPage() {
  const [activeImage, setActiveImage] = useState(0);

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
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
        <p className="text-xl font-semibold mb-8">
          {property.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Carousel className="w-full max-w-xl">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={`Property image ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 ${
                    activeImage === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={67}
                    className="rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{property.area} m²</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                </div>
                <p className="mt-4">{property.description}</p>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={property.seller.avatar}
                      alt={property.seller.name}
                    />
                    <AvatarFallback>
                      {property.seller.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{property.seller.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{property.seller.rating.toFixed(1)}</span>
                    </div>
                    {property.seller.verified && (
                      <span className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        Verified Seller
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Seller
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Seller
                  </Button>
                </div>
                <Link
                  href={`/routes/seller-profile/${property.seller.id}`}
                  className="block mt-2 text-center text-primary hover:underline"
                >
                  View Full Profile
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Interactive map would be displayed here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {property.reviews.map((review) => (
              <div
                key={review.id}
                className="mb-4 pb-4 border-b last:border-b-0"
              >
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold mr-2">{review.author}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                  <span className="ml-auto text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
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
