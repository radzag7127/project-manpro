"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Home,
  Building,
  MapPin,
  ExternalLink,
  Star,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Footer } from "../0-PageProperties/Footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  imageUrl: string;
}

const trendingProperties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment in Jakarta",
    price: 500000000,
    location: "Jakarta",
    type: "Apartment",
    imageUrl: "/prop1.jpg",
  },
  {
    id: "2",
    title: "Cozy Villa in Bali",
    price: 2000000000,
    location: "Bali",
    type: "Villa",
    imageUrl: "/prop2.jpg",
  },
  {
    id: "3",
    title: "Spacious House in Bandung",
    price: 1500000000,
    location: "Bandung",
    type: "House",
    imageUrl: "/prop3.jpg",
  },
];

const quickSearchTags = [
  "Jakarta",
  "Bali",
  "Surabaya",
  "Villa",
  "Apartment",
  "House",
];

const testimonials = [
  {
    name: "John Doe",
    role: "Property Owner",
    quote:
      "Rumaku made selling my property a breeze. The fair exposure really helped me reach more potential buyers.",
    image: "/male1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Home Buyer",
    quote:
      "I found my dream home thanks to Rumaku's user-friendly platform and extensive listings.",
    image: "/female1.jpg",
  },
  {
    name: "Ahmad Yani",
    role: "Real Estate Agent",
    quote:
      "As an agent, Rumaku's tools have significantly improved my efficiency and client satisfaction.",
    image: "/male2.jpg",
  },
];

export function LandingPageComponentMVPnew() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/routes/listings`);
  };

  return (
    <>
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
                <Link
                  href="/routes/authentification"
                  className="hover:underline"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <Image
            src="/prop1.jpg"
            alt="Jakarta Skyline"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 mix-blend-overlay"
          />
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Find Your Dream Property with Rumaku
            </h2>
            <p className="text-xl mb-8">
              Fair exposure for all property owners, endless possibilities for
              buyers.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap gap-4 justify-center items-center">
              <form
                onSubmit={handleSearch}
                className="w-full flex flex-wrap gap-4 justify-center items-center"
              >
                <div className="w-full md:w-64 relative">
                  <MapPin className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    className="pl-10"
                    placeholder="Location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Select onValueChange={setPropertyType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-500000000">0 - 500M IDR</SelectItem>
                    <SelectItem value="500000000-1000000000">
                      500M - 1B IDR
                    </SelectItem>
                    <SelectItem value="1000000000+">1B+ IDR</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full md:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Search Properties
                </Button>
              </form>
            </div>

            {/* Quick Search Tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {quickSearchTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary-foreground hover:text-secondary transition-colors"
                  onClick={() => setSearchLocation(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Center Highlight */}

        {/* Trending Properties */}
        <section className="py-16">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Trending Properties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingProperties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{property.title}</CardTitle>
                    <p className="text-muted-foreground">{property.location}</p>
                    <p className="font-bold mt-2">
                      {property.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/routes/listing-details`} passHref>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-12">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Rumaku Legal Center</h3>
            <p className="mb-6">
              Get expert legal guidance for property owners, developers, buyers,
              and agents.
            </p>
            <Button asChild>
              <Link href="/routes/legal-center">
                Explore Legal Resources{" "}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted py-16">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">
              What Our Users Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="italic mb-4">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Fair Exposure Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Fair Exposure for All Sellers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/prop4.jpg"
                  alt="Fair Exposure Illustration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
              <div>
                <h4 className="text-2xl font-semibold mb-4">
                  Why Choose Rumaku?
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Equal visibility for all property listings</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Transparent pricing and no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Advanced tools for property owners and agents</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Dedicated support for all users</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Offer */}
        <section className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Limited Time Offer for New Users!
            </h3>
            <p className="mb-6">
              Sign up now and get your first property listing for free!
            </p>
            <Button asChild variant="secondary">
              <Link href="/routes/on-boarding">Claim Your Free Listing</Link>
            </Button>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Ready to Get Started?</h3>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Button size="lg" asChild>
                <Link href="/routes/authentification">
                  <Home className="h-4 w-4 mr-2" />
                  Looking to Buy? Start Here
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/routes/authentification">
                  <Building className="h-4 w-4 mr-2" />
                  Sell with Us
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/routes/authentification">
                  <User className="h-4 w-4 mr-2" />
                  Join as an Agent
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
