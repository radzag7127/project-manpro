"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Home,
  Maximize,
  Bed,
  Bath,
  Car,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Footer } from "../0-PageProperties/Footer";
import HeaderComponent from "../0-PageProperties/Header";

// Mock data for the listing
const listingData = {
  id: "green-residence-1",
  title: "Luxurious Apartment at Green Residence",
  price: 2500000000,
  location: "Jakarta, Indonesia",
  size: 120,
  bedrooms: 3,
  bathrooms: 2,
  parking: 1,
  description:
    "Experience modern living in this stunning apartment at Green Residence. Featuring high-end finishes, spacious rooms, and breathtaking city views, this property offers the perfect blend of comfort and luxury.",
  images: ["/prop1.jpg", "/prop2.jpg", "/prop3.jpg", "/prop4.jpg"],
  developer: {
    name: "John Developer",
    company: "Green Developers Inc.",
    image: "/dev1.jpg",
    bio: "With over 15 years of experience in luxury property development, John Developer has established a reputation for creating exceptional living spaces that combine style, functionality, and sustainability.",
  },
  reviews: [
    {
      id: 1,
      author: "Alice Smith",
      rating: 5,
      comment:
        "Absolutely love my new apartment! The attention to detail is impressive.",
    },
    {
      id: 2,
      author: "Bob Johnson",
      rating: 4,
      comment:
        "Great location and amenities. The developer was very responsive throughout the process.",
    },
  ],
  otherProjects: [
    {
      id: "project-2",
      title: "Skyline Towers",
      location: "Surabaya",
      image: "/prop2.jpg",
    },
    {
      id: "project-3",
      title: "Riverside Villas",
      location: "Bali",
      image: "/prop3.jpg",
    },
  ],
};

// Mock data for recommended properties (paid ads)
const recommendedProperties = [
  {
    id: "rec-1",
    title: "Modern Studio in CBD",
    price: 1000000000,
    location: "Jakarta",
    image: "/prop4.jpg",
  },
  {
    id: "rec-2",
    title: "Family Home with Garden",
    price: 3500000000,
    location: "Bandung",
    image: "/prop5.jpg",
  },
  {
    id: "rec-3",
    title: "Beachfront Villa",
    price: 5000000000,
    location: "Bali",
    image: "/prop1.jpg",
  },
];

export function ListingDetailsInfoMVPs() {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % listingData.images.length);
  };

  const prevImage = () => {
    setActiveImage(
      (prev) =>
        (prev - 1 + listingData.images.length) % listingData.images.length
    );
  };

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen bg-background">
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">{listingData.title}</h1>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="relative h-[400px] mb-4">
                <Image
                  src={listingData.images[activeImage]}
                  alt={`Property image ${activeImage + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 left-4 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 right-4 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {listingData.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Property thumbnail ${index + 1}`}
                    width={100}
                    height={75}
                    className={`rounded cursor-pointer ${
                      index === activeImage ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {listingData.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h2>
                <Badge>{listingData.size} m²</Badge>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{listingData.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{listingData.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{listingData.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{listingData.parking} Parking</span>
                </div>
              </div>
              <p className="mb-6">{listingData.description}</p>
              <Button size="lg" className="w-full">
                Contact Developer
              </Button>
            </div>
          </div>

          {/* Developer Profile */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>About the Developer</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={listingData.developer.image}
                  alt={listingData.developer.name}
                />
                <AvatarFallback>
                  {listingData.developer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {listingData.developer.name}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {listingData.developer.company}
                </p>
                <p>{listingData.developer.bio}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Developer
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Developer
              </Button>
            </CardFooter>
          </Card>

          {/* Highlighted Reviews */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What Buyers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listingData.reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{review.author}</CardTitle>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-4">
              <Button variant="link">View All Reviews</Button>
            </div>
          </div>

          {/* Developer's Other Projects */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              More from {listingData.developer.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listingData.otherProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <p className="text-muted-foreground">{project.location}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommended Properties (Paid Ads) */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recommended Properties</h2>
            <Carousel>
              <CarouselContent>
                {recommendedProperties.map((property) => (
                  <CarouselItem key={property.id} className="md:basis-1/3">
                    <Card className="overflow-hidden">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg">
                          {property.title}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {property.location}
                        </p>
                        <p className="font-bold mt-2">
                          {property.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
