"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building,
  MessageSquare,
  Search,
  Star,
  MapPin,
  Edit,
  Plus,
  UserCircle,
  ChevronDown,
} from "lucide-react";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AgentChatBubble } from "./AgentChatBubble";

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  status: "For Sale" | "For Rent";
  owner?: {
    name: string;
    type: "Property Owner" | "Developer";
  };
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
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
  isAvailable: boolean;
  properties: Property[];
  messages: Message[];
}

const agent: Agent = {
  id: "1",
  name: "Siti Nurhaliza",
  avatar: "/female2.jpg",
  rating: 4.8,
  specializations: ["Residential", "Luxury"],
  location: "Jakarta",
  propertiesSold: 52,
  bio: "Experienced real estate agent specializing in luxury properties in Jakarta. With over 10 years of experience, I help clients find their dream homes and make smart investments.",
  isAvailable: true,
  properties: [
    {
      id: "p1",
      name: "Luxury Villa in Menteng",
      type: "Villa",
      location: "Menteng, Jakarta",
      price: 15000000000,
      status: "For Sale",
      owner: {
        name: "Mr. Tanaka",
        type: "Property Owner",
      },
    },
    {
      id: "p2",
      name: "Modern Apartment in SCBD",
      type: "Apartment",
      location: "SCBD, Jakarta",
      price: 8000000000,
      status: "For Sale",
      owner: {
        name: "Citraland",
        type: "Developer",
      },
    },
    {
      id: "p3",
      name: "Cozy Studio in Kemang",
      type: "Apartment",
      location: "Kemang, Jakarta",
      price: 5000000,
      status: "For Rent",
    },
  ],
  messages: [
    {
      id: "m1",
      sender: "John Doe",
      content:
        "Hi, I'm interested in the Luxury Villa in Menteng. Is it still available?",
      timestamp: "2024-03-15T10:30:00Z",
    },
    {
      id: "m2",
      sender: "Jane Smith",
      content:
        "Hello, can you tell me more about the Modern Apartment in SCBD?",
      timestamp: "2024-03-14T15:45:00Z",
    },
  ],
};

export function AgentDashboards() {
  const [isAvailable, setIsAvailable] = useState(agent.isAvailable);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = agent.properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <Link href="/routes/agent-profile" className="w-full">
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
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{agent.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{agent.location}</span>
              </div>
              <div className="flex flex-wrap mt-2">
                {agent.specializations.map((spec) => (
                  <Badge key={spec} variant="secondary" className="mr-2 mb-2">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                id="availability-mode"
              />
              <label
                htmlFor="availability-mode"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {isAvailable ? "Available" : "Unavailable"}
              </label>
            </div>
            <Button asChild variant="outline">
              <Link href="/routes/agent-profile-edit">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agent Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{agent.bio}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Properties Sold
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.propertiesSold}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Listings
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {agent.properties.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unread Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.messages.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="listings" className="mb-8">
          <TabsList>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Listings</CardTitle>
                  <Button asChild>
                    <Link href="/routes/add-listings">
                      <Plus className="mr-2 h-4 w-4" /> Add Listing
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Search listings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  {filteredProperties.map((property) => (
                    <Card key={property.id}>
                      <CardHeader>
                        <CardTitle>{property.name}</CardTitle>
                        <CardDescription>
                          {property.type} in {property.location}
                          {property.owner && (
                            <div className="mt-1 text-sm text-muted-foreground italic">
                              You're endorsing {property.owner.name} (
                              {property.owner.type})
                            </div>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">
                            {property.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            })}
                          </span>
                          <Badge>{property.status}</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/routes/agent-project-details`}>
                            View Details
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agent.messages.map((message) => (
                    <Card key={message.id}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {message.sender}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{message.content}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Reply</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Promote Your Services</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/routes/agent-promote">Promote Services</Link>
            </Button>
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

      <AgentChatBubble />
    </div>
  );
}
