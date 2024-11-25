"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, Star, Home, Building, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import HeaderComponent from "../0-PageProperties/Header";

interface PropertyInterest {
  id: string;
  type: string;
  location: string;
  priceRange: string;
  status: "Active" | "Fulfilled";
}

interface PropertyView {
  id: string;
  propertyName: string;
  location: string;
  date: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Buyer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  joinDate: string;
  verificationStatus: "Verified" | "Unverified";
  bio: string;
  propertyInterests: PropertyInterest[];
  recentViews: PropertyView[];
  reviews: Review[];
}

const buyer: Buyer = {
  id: "1",
  name: "Doni Buyer",
  avatar: "/male1.jpg",
  location: "Jakarta, Indonesia",
  joinDate: "2023-05-15",
  verificationStatus: "Verified",
  bio: "I'm looking for my dream home in Jakarta. Interested in modern apartments and family houses with good access to schools and public transportation.",
  propertyInterests: [
    {
      id: "pi1",
      type: "Apartment",
      location: "Central Jakarta",
      priceRange: "1B - 2B IDR",
      status: "Active",
    },
    {
      id: "pi2",
      type: "House",
      location: "South Jakarta",
      priceRange: "2B - 3B IDR",
      status: "Active",
    },
    {
      id: "pi3",
      type: "Villa",
      location: "Bali",
      priceRange: "3B - 5B IDR",
      status: "Fulfilled",
    },
  ],
  recentViews: [
    {
      id: "rv1",
      propertyName: "Sudirman Suites",
      location: "Central Jakarta",
      date: "2024-03-10",
    },
    {
      id: "rv2",
      propertyName: "Green Residence",
      location: "South Jakarta",
      date: "2024-03-08",
    },
    {
      id: "rv3",
      propertyName: "Menteng Park",
      location: "Central Jakarta",
      date: "2024-03-05",
    },
  ],
  reviews: [
    {
      id: "r1",
      author: "Siti Nurhaliza (Agent)",
      rating: 5,
      comment:
        "Budi was a pleasure to work with. Very clear about his requirements and prompt in communication.",
      date: "2024-02-20",
    },
    {
      id: "r2",
      author: "John Doe (Seller)",
      rating: 4,
      comment: "Good buyer, smooth transaction process.",
      date: "2023-11-15",
    },
  ],
};

export function BuyerProfiles() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInterests = buyer.propertyInterests.filter(
    (interest) =>
      interest.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponent />

      <main className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={buyer.avatar} alt={buyer.name} />
              <AvatarFallback>{buyer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{buyer.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{buyer.location}</span>
              </div>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Member since {new Date(buyer.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/routes/rate-this">
                <Star className="mr-2 h-4 w-4" />
                Rate Buyer
              </Link>
            </Button>
            <Button>Contact Buyer</Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About {buyer.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{buyer.bio}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="interests" className="mb-8">
          <TabsList>
            <TabsTrigger value="interests">Property Interests</TabsTrigger>
            <TabsTrigger value="views">Recent Views</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="interests">
            <Card>
              <CardHeader>
                <CardTitle>Property Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Search interests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  {filteredInterests.map((interest) => (
                    <Card key={interest.id}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {interest.type}
                          </CardTitle>
                          <Badge
                            variant={
                              interest.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {interest.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{interest.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          <span>Price Range: {interest.priceRange}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="views">
            <Card>
              <CardHeader>
                <CardTitle>Recently Viewed Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {buyer.recentViews.map((view) => (
                    <Card key={view.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {view.propertyName}
                        </CardTitle>
                        <CardDescription>
                          {new Date(view.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{view.location}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline">
                          <Link href={`/routes/properties/${view.id}`}>
                            View Property
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
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
                  {buyer.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {review.author}
                          </CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{review.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <CardDescription>
                          {new Date(review.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
            <Link href="/routes/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
