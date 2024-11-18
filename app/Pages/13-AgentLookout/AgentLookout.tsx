"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for agents
const agents = [
  {
    id: 1,
    name: "John Doe",
    image: "/male1.jpg",
    rating: 4.8,
    reviews: 120,
    location: "Jakarta",
    specialization: "Residential",
    bio: "Experienced agent specializing in luxury properties in Jakarta.",
    promoted: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/female1.jpg",
    rating: 4.9,
    reviews: 95,
    location: "Bali",
    specialization: "Vacation Homes",
    bio: "Expert in finding the perfect vacation homes in Bali.",
    promoted: true,
  },
  {
    id: 3,
    name: "Ahmad Yani",
    image: "/male2.jpg",
    rating: 4.7,
    reviews: 80,
    location: "Surabaya",
    specialization: "Commercial",
    bio: "Specializing in commercial real estate in Surabaya and surrounding areas.",
    promoted: false,
  },
  {
    id: 4,
    name: "Siti Nurhaliza",
    image: "/female2.jpg",
    rating: 4.8,
    reviews: 120,
    location: "Jakarta",
    specialization: "Residential, Luxury",
    bio: "Experienced real estate agent specializing in luxury properties in Jakarta. With over 10 years of experience, I help clients find their dream homes and make smart investments.",
    promoted: true,
  },
  {
    id: 5,
    name: "Budi Santoso",
    image: "/male1.jpg",
    rating: 4.5,
    reviews: 60,
    location: "Yogyakarta",
    specialization: "Historical Properties",
    bio: "Expert in historical and cultural properties in Yogyakarta.",
    promoted: false,
  },
];

// Add this interface near the top of the file, after the imports
interface Agent {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  specialization: string;
  bio: string;
  promoted: boolean;
}

export function AgentLookouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === "all" || agent.location === locationFilter) &&
      (specializationFilter === "all" ||
        agent.specialization === specializationFilter) &&
      (ratingFilter === "all" || agent.rating >= parseFloat(ratingFilter))
  );

  const sortedAgents = [
    ...filteredAgents.filter((agent) => agent.promoted),
    ...filteredAgents.filter((agent) => !agent.promoted),
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Agent</h1>
          <p className="text-xl">
            Discover top-rated real estate agents in Indonesia
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search agents by name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Agents</SheetTitle>
                <SheetDescription>
                  Refine your search based on location, specialization, and
                  rating.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Select onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Jakarta">Jakarta</SelectItem>
                    <SelectItem value="Bali">Bali</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setSpecializationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Vacation Homes">
                      Vacation Homes
                    </SelectItem>
                    <SelectItem value="Historical Properties">
                      Historical Properties
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="4.0">4.0+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Update the AgentCard component with proper typing
function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="pt-6 flex-grow">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={agent.image} alt={agent.name} />
            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{agent.name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">
                {agent.rating} ({agent.reviews} reviews)
              </span>
            </div>
            {agent.promoted && (
              <Badge variant="outline" className="mt-1 text-xs">
                Featured
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-sm">{agent.location}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Specialization: {agent.specialization}
        </p>
        <p className="text-sm">{agent.bio}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/routes/agent-profile">View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
