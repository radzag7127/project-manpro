"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Building,
  Home,
  Award,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  imageUrl: string;
}

interface Testimonial {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specializations: string[];
  location: string;
  propertiesSold: number;
  bio: string;
  experience: string[];
  portfolio: Property[];
  testimonials: Testimonial[];
}

const agent: Agent = {
  id: "1",
  name: "Siti Nurhaliza",
  avatar: "/female2.jpg",
  rating: 4.8,
  specializations: ["Residential", "Luxury"],
  location: "Jakarta",
  propertiesSold: 52,
  bio: "With over 15 years of experience in the Jakarta real estate market, Siti Nurhaliza has established herself as a top-performing agent specializing in luxury residential properties. Her deep understanding of the local market, combined with her dedication to client satisfaction, has resulted in numerous successful transactions and a loyal client base.",
  experience: [
    "Senior Real Estate Agent at Rumaku (2018-present)",
    "Real Estate Consultant at Jakarta Prime Properties (2012-2018)",
    "Junior Agent at Bali Beachfront Realty (2009-2012)",
  ],
  portfolio: [
    {
      id: "p1",
      title: "Luxury Penthouse in Central Jakarta",
      type: "Apartment",
      price: 15000000000,
      location: "Jakarta",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "p2",
      title: "Modern Villa in Seminyak",
      type: "Villa",
      price: 8000000000,
      location: "Bali",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "p3",
      title: "Exclusive Gated Community Home",
      type: "House",
      price: 12000000000,
      location: "Jakarta",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ],
  testimonials: [
    {
      id: "t1",
      clientName: "Budi Hartono",
      rating: 5,
      comment:
        "Siti was instrumental in helping us find our dream home. Her knowledge of the Jakarta luxury market is unparalleled.",
    },
    {
      id: "t2",
      clientName: "Rina Wijaya",
      rating: 4.5,
      comment:
        "Professional, responsive, and always goes the extra mile. Siti made our property selling process smooth and stress-free.",
    },
    {
      id: "t3",
      clientName: "David Chen",
      rating: 5,
      comment:
        "As an expat, I was worried about navigating the Indonesian property market. Siti's expertise and patience were invaluable in finding the perfect property for my family.",
    },
  ],
};

export function AgentProfiles() {
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
                      <Link href="/routes/agent-dashboard" className="w-full">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl mb-2">{agent.name}</CardTitle>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-lg">{agent.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{agent.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {agent.propertiesSold} properties sold
                  </p>
                  <div className="flex flex-wrap justify-center">
                    {agent.specializations.map((spec) => (
                      <Badge key={spec} variant="secondary" className="m-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <Button>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{agent.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {agent.experience.map((exp, index) => (
                        <li key={index} className="flex items-start">
                          <Building className="h-5 w-5 mr-2 mt-1" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="portfolio">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {agent.portfolio.map((property) => (
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
                            <h3 className="font-semibold mb-2">
                              {property.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {property.type} in {property.location}
                            </p>
                            <p className="font-bold">
                              {property.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="testimonials">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {agent.testimonials.map((testimonial) => (
                        <Card key={testimonial.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {testimonial.clientName}
                            </CardTitle>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p>"{testimonial.comment}"</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
