"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Check,
  Edit,
  Home,
  Building,
  MapPin,
  Plus,
  Megaphone,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";
import { PropOwnChatBubble } from "./PropOwnChatBubble";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: "active" | "sold" | "inactive";
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userType: "buyer" | "seller";
  verified: boolean;
  joinDate: string;
  bio: string;
  rating: number;
  reviews: Review[];
  listings: Listing[];
}

const user: User = {
  id: "1",
  name: "Budi Santoso",
  email: "Budi@example.com",
  avatar: "/male1.jpg",
  userType: "seller",
  verified: true,
  joinDate: "2023-01-15",
  bio: "Experienced property owner with a passion for providing high-quality living spaces in Jakarta. I take pride in maintaining my properties to the highest standards and ensuring tenant satisfaction.",
  rating: 4.8,
  reviews: [
    {
      id: "r1",
      author: "John Smith",
      rating: 5,
      comment:
        "Jane was incredibly helpful and professional throughout the entire process.",
      date: "2024-02-15",
    },
    {
      id: "r2",
      author: "Emma Watson",
      rating: 4,
      comment: "Great experience overall, highly recommended!",
      date: "2024-01-20",
    },
  ],
  listings: [
    {
      id: "l1",
      title: "Luxury Villa in Ubud",
      price: 5000000000,
      location: "Ubud, Bali",
      type: "Villa",
      status: "active",
      image: "/prop1.jpg",
    },
    {
      id: "l2",
      title: "Beachfront Apartment",
      price: 3000000000,
      location: "Seminyak, Bali",
      type: "Apartment",
      status: "sold",
      image: "/prop2.jpg",
    },
    {
      id: "l3",
      title: "Traditional Balinese House",
      price: 2000000000,
      location: "Canggu, Bali",
      type: "House",
      status: "inactive",
      image: "/prop3.jpg",
    },
  ],
};

export function UserAsSellers() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // backend here
    setIsEditing(false);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponents />

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  {user.verified && (
                    <div className="flex items-center text-green-600 mt-1">
                      <Check className="h-4 w-4 mr-1" /> Verified Seller
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{user.rating}</span>
                    <span className="text-muted-foreground ml-2">
                      ({user.reviews.length} reviews)
                    </span>
                  </div>
                  <p>{user.bio}</p>
                  <Button asChild className="w-full">
                    <Link href="/routes/property-owner-profile-promote">
                      <Megaphone className="mr-2 h-4 w-4" /> Promote Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="listings">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings">Listings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="listings">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                      <CardTitle className="text-xl font-semibold">
                        Listings
                      </CardTitle>
                      <Link href="/routes/add-listings">
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />{" "}
                          {/* Tombol listing plus */}
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {user.listings.map((listing) => (
                      <div
                        key={listing.id}
                        className="mb-8 pb-6 border-b last:border-b-0 relative p-4 hover:bg-accent/50 rounded-lg"
                      >
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24">
                            <Image
                              src={listing.image}
                              alt={listing.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="absolute top-2 right-2">
                              <Link href={`/routes/edit-listings`}>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                            <h3 className="font-semibold text-lg mb-3">
                              {listing.title}
                            </h3>
                            <p className="text-primary font-bold text-xl mb-3">
                              {formatPrice(listing.price)}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <MapPin className="h-4 w-4 mr-1" />
                              {listing.location}
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-sm">{listing.type}</span>
                              <span
                                className={`text-sm font-semibold ${
                                  listing.status === "active"
                                    ? "text-green-600"
                                    : listing.status === "sold"
                                    ? "text-blue-600"
                                    : "text-gray-600"
                                }`}
                              >
                                {listing.status.charAt(0).toUpperCase() +
                                  listing.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="mb-4 pb-4 border-b last:border-b-0"
                      >
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold mr-2">
                            {review.author}
                          </h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{review.rating.toFixed(1)}</span>
                          </div>
                          <span className="ml-auto text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        <span>Listed a new property: Luxury Villa in Ubud</span>
                      </li>
                      <li className="flex items-center">
                        <Home className="h-5 w-5 mr-2" />
                        <span>Sold: Beachfront Apartment</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="h-5 w-5 mr-2" />
                        <span>Received a new 5-star review</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={editedUser.bio}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, bio: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Footer />
      <PropOwnChatBubble />
    </div>
  );
}
