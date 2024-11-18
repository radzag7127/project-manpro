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
  BarChart2,
  ChartLine,
  TrendingUp,
  Target,
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
import { Footer } from "../0-PageProperties/Footer";

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

interface MonthlySales {
  month: string;
  sold: number;
  reserved: number;
  percentage: number;
}

const monthlySales: MonthlySales[] = [
  { month: "Jan", sold: 10, reserved: 5, percentage: 75 },
  { month: "Feb", sold: 15, reserved: 8, percentage: 82 },
  { month: "Mar", sold: 25, reserved: 12, percentage: 88 },
  { month: "Apr", sold: 30, reserved: 15, percentage: 90 },
  { month: "May", sold: 35, reserved: 18, percentage: 92 },
  { month: "Jun", sold: 35, reserved: 20, percentage: 95 },
];

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

        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-primary">
                  Premium Analytics Dashboard
                </CardTitle>
                <CardDescription>
                  Get advanced insights, market analysis, and detailed
                  performance metrics
                </CardDescription>
              </div>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/routes/developer-dashboard-premium">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Premium Dashboard
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <ChartLine className="h-4 w-4 text-primary" />
                <span>Advanced Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Market Trends</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-primary" />
                <span>Competitor Analysis</span>
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
            <div className="space-y-8">
              {monthlySales.map((data) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {data.month}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {data.percentage}%
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Progress value={data.percentage} className="h-2" />
                        <div className="flex gap-4 min-w-[100px]">
                          <span className="text-sm font-medium text-primary">
                            {data.sold} sold
                          </span>
                          <span className="text-sm font-medium text-secondary">
                            {data.reserved} reserved
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Sales Performance</p>
                <div className="text-2xl font-bold">
                  {monthlySales.reduce(
                    (acc, curr) => acc + curr.sold + curr.reserved,
                    0
                  )}{" "}
                  units
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Sold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary" />
                  <span className="text-sm text-muted-foreground">
                    Reserved
                  </span>
                </div>
              </div>
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
      <Footer />
    </div>
  );
}
