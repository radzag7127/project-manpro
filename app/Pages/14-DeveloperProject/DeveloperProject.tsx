"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building,
  MapPin,
  Users,
  DollarSign,
  BarChart,
  PieChart,
  Edit,
  Plus,
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart } from "@/components/ui/chart";

interface Property {
  id: string;
  name: string;
  type: string;
  price: number;
  status: "Available" | "Sold" | "Reserved";
  image: string;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  salesCount: number;
}

interface Project {
  id: string;
  name: string;
  location: string;
  type: "Residential" | "Commercial";
  status: "Ongoing" | "Completed";
  description: string;
  totalUnits: number;
  soldUnits: number;
  reservedUnits: number;
  startDate: string;
  completionDate: string;
  properties: Property[];
  agents: Agent[];
}

const project: Project = {
  id: "p1",
  name: "Green Valley Residences",
  location: "Jakarta",
  type: "Residential",
  status: "Ongoing",
  description:
    "Green Valley Residences is a modern eco-friendly residential complex featuring spacious apartments and excellent amenities. Located in the heart of Jakarta, it offers a perfect blend of urban living and natural surroundings.",
  totalUnits: 200,
  soldUnits: 150,
  reservedUnits: 20,
  startDate: "2023-03-15",
  completionDate: "2025-09-30",
  properties: [
    {
      id: "prop1",
      name: "Unit A-101",
      type: "2BR Apartment",
      price: 1500000000,
      status: "Sold",
      image: "/prop1.jpg",
    },
    {
      id: "prop2",
      name: "Unit B-205",
      type: "3BR Apartment",
      price: 2000000000,
      status: "Available",
      image: "/prop2.jpg",
    },
    {
      id: "prop3",
      name: "Penthouse P-01",
      type: "Penthouse",
      price: 5000000000,
      status: "Reserved",
      image: "/prop3.jpg",
    },
  ],
  agents: [
    {
      id: "a1",
      name: "Siti Nurhaliza",
      avatar: "/female1.jpg",
      salesCount: 15,
    },
    {
      id: "a2",
      name: "Budi Santoso",
      avatar: "/male1.jpg",
      salesCount: 12,
    },
    {
      id: "a3",
      name: "Anisa Wijaya",
      avatar: "/female2.jpg",
      salesCount: 8,
    },
  ],
};

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Units Sold",
      data: [10, 15, 25, 30, 35, 35],
      borderColor: "hsl(var(--primary))",
      backgroundColor: "hsl(var(--primary))",
      tension: 0.4,
    },
    {
      label: "Units Reserved",
      data: [5, 8, 12, 15, 18, 20],
      borderColor: "hsl(var(--secondary))",
      backgroundColor: "hsl(var(--secondary))",
      tension: 0.4,
    },
  ],
};

export function DeveloperProjects() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = project.properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                      <Link href="/routes/developer-profile" className="w-full">
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{project.location}</span>
            </div>
          </div>
          <Badge
            variant={project.status === "Ongoing" ? "default" : "secondary"}
            className="text-lg"
          >
            {project.status}
          </Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{project.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Project Type</p>
                <p className="font-medium">{project.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Units</p>
                <p className="font-medium">{project.totalUnits}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{project.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Date</p>
                <p className="font-medium">{project.completionDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.soldUnits}</div>
              <Progress
                value={(project.soldUnits / project.totalUnits) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Units Reserved
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.reservedUnits}</div>
              <Progress
                value={(project.reservedUnits / project.totalUnits) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Units
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {project.totalUnits - project.soldUnits - project.reservedUnits}
              </div>
              <Progress
                value={
                  ((project.totalUnits -
                    project.soldUnits -
                    project.reservedUnits) /
                    project.totalUnits) *
                  100
                }
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>
              Monthly sales and reservations overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <LineChart
                data={salesData}
                config={{
                  "Units Sold": {
                    label: "Units Sold",
                    color: "hsl(var(--primary))",
                  },
                  "Units Reserved": {
                    label: "Units Reserved",
                    color: "hsl(var(--secondary))",
                  },
                }}
                className="w-full h-full"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="properties" className="mb-8">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="agents">Assigned Agents</TabsTrigger>
          </TabsList>
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Property Listings</CardTitle>
                  <Button asChild>
                    <Link href="/routes/add-listings">
                      <Plus className="mr-2 h-4 w-4" /> Add Property
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="Search properties..."
                  className="mb-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProperties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/routes/developer-project-details`}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <Card>
                        <Image
                          src={property.image}
                          alt={property.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">
                            {property.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {property.type}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">
                              {property.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                              })}
                            </span>
                            <Badge
                              variant={
                                property.status === "Available"
                                  ? "default"
                                  : property.status === "Reserved"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {property.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="agents">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Assigned Agents</CardTitle>
                  <Button asChild>
                    <Link href={`/routes/projects/${project.id}/assign-agent`}>
                      <Plus className="mr-2 h-4 w-4" /> Assign Agent
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                          <AvatarFallback>
                            {agent.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {agent.salesCount} sales
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" asChild>
                        <Link href="/routes/agent-profile">View Profile</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild>
            <Link href={`/routes/projects/${project.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Edit Project
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/routes/promote-project`}>Promote Project</Link>
          </Button>
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
