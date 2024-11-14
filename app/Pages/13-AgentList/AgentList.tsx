"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specializations: string[];
  location: string;
  propertiesSold: number;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Siti Nurhaliza",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    specializations: ["Residential", "Luxury"],
    location: "Jakarta",
    propertiesSold: 52,
  },
  {
    id: "2",
    name: "Budi Santoso",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    specializations: ["Commercial", "Investment"],
    location: "Surabaya",
    propertiesSold: 38,
  },
  {
    id: "3",
    name: "Dewi Lestari",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    specializations: ["Residential", "New Developments"],
    location: "Bali",
    propertiesSold: 67,
  },
  {
    id: "4",
    name: "Agus Setiawan",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    specializations: ["Commercial", "Industrial"],
    location: "Bandung",
    propertiesSold: 45,
  },
  {
    id: "5",
    name: "Rina Wijaya",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    specializations: ["Residential", "Vacation Homes"],
    location: "Yogyakarta",
    propertiesSold: 31,
  },
];

export function AgentLists() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specializations.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
        <h1 className="text-3xl font-bold mb-8">Find a Real Estate Agent</h1>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search agents by name, location, or specialization..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{agent.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{agent.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{agent.location}</span>
                </div>
                <div className="mb-2">
                  {agent.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary" className="mr-2 mb-2">
                      {spec}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {agent.propertiesSold} properties sold
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/routes/agents/${agent.id}`}>View Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
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
