"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building,
  ChevronRight,
  PieChart,
  Users,
  Plus,
  Search,
  UserCircle,
  ChevronDown,
  Megaphone,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DeveloperChatBubble } from "./DeveloperChatBubble";

interface Project {
  id: string;
  name: string;
  location: string;
  type: "Residential" | "Commercial";
  status: "Ongoing" | "Completed";
  progress: number;
  totalUnits: number;
  soldUnits: number;
}

interface Developer {
  id: string;
  name: string;
  avatar: string;
  company: string;
  projectsCount: number;
  totalRevenue: number;
  projects: Project[];
}

const developer: Developer = {
  id: "1",
  name: "PT Maju Jaya Development",
  avatar: "/dev1.jpg",
  company: "Maju Jaya Group",
  projectsCount: 5,
  totalRevenue: 500000000000, // In IDR
  projects: [
    {
      id: "p1",
      name: "Green Valley Residences",
      location: "Jakarta",
      type: "Residential",
      status: "Ongoing",
      progress: 75,
      totalUnits: 200,
      soldUnits: 150,
    },
    {
      id: "p2",
      name: "Sunset Plaza",
      location: "Bali",
      type: "Commercial",
      status: "Completed",
      progress: 100,
      totalUnits: 50,
      soldUnits: 45,
    },
    {
      id: "p3",
      name: "Mountain View Apartments",
      location: "Bandung",
      type: "Residential",
      status: "Ongoing",
      progress: 40,
      totalUnits: 150,
      soldUnits: 60,
    },
  ],
};

export function DeveloperDashboards() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = developer.projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={developer.avatar} alt={developer.name} />
              <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{developer.name}</h1>
              <p className="text-muted-foreground">{developer.company}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/routes/developer-profile">Edit Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/routes/developer-profile-promote">
                <Megaphone className="mr-2 h-4 w-4" /> Promote Profile
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {developer.projectsCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {developer.totalRevenue.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Units Sold
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {developer.projects.reduce(
                  (total, project) => total + project.soldUnits,
                  0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Projects</h2>
            <Button asChild>
              <Link href="/routes/developer-create-new-project">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Link>
            </Button>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.location}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        project.status === "Ongoing" ? "default" : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {project.type}
                    </span>
                    <span className="text-sm font-medium">
                      {project.progress}% Complete
                    </span>
                  </div>
                  <Progress value={project.progress} className="mb-2" />
                  <div className="flex justify-between items-center text-sm">
                    <span>
                      {project.soldUnits} / {project.totalUnits} Units Sold
                    </span>
                    <span>
                      {((project.soldUnits / project.totalUnits) * 100).toFixed(
                        1
                      )}
                      % Sold
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/routes/developer-project">
                      View Project <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/routes/promote-project">
                      <Megaphone className="mr-2 h-4 w-4" /> Promote
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
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

      <DeveloperChatBubble />
    </div>
  );
}
