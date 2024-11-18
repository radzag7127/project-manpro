"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building,
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronRight,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Project {
  id: string;
  name: string;
  location: string;
  type: "Residential" | "Commercial";
  status: "Ongoing" | "Completed";
  image: string;
  completionPercentage: number;
  totalUnits: number;
  soldUnits: number;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Developer {
  id: string;
  name: string;
  logo: string;
  description: string;
  foundedYear: number;
  location: string;
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  rating: number;
  projects: Project[];
  reviews: Review[];
}

const developer: Developer = {
  id: "1",
  name: "PT Maju Jaya Development",
  logo: "/dev1.jpg",
  description:
    "PT Maju Jaya Development is a leading property developer in Indonesia, specializing in creating innovative and sustainable residential and commercial projects. With a strong focus on quality and customer satisfaction, we have been transforming the urban landscape since 1995.",
  foundedYear: 1995,
  location: "Jakarta, Indonesia",
  totalProjects: 25,
  completedProjects: 20,
  ongoingProjects: 5,
  rating: 4.7,
  projects: [
    {
      id: "p1",
      name: "Green Valley Residences",
      location: "Jakarta",
      type: "Residential",
      status: "Ongoing",
      image: "/prop1.jpg",
      completionPercentage: 75,
      totalUnits: 200,
      soldUnits: 150,
    },
    {
      id: "p2",
      name: "Sunset Plaza",
      location: "Bali",
      type: "Commercial",
      status: "Completed",
      image: "/prop2.jpg",
      completionPercentage: 100,
      totalUnits: 50,
      soldUnits: 50,
    },
    {
      id: "p3",
      name: "Mountain View Apartments",
      location: "Bandung",
      type: "Residential",
      status: "Ongoing",
      image: "/prop3.jpg",
      completionPercentage: 40,
      totalUnits: 150,
      soldUnits: 60,
    },
  ],
  reviews: [
    {
      id: "r1",
      author: "John Doe",
      rating: 5,
      comment:
        "Excellent developer with high-quality projects. Very satisfied with my investment.",
      date: "2024-02-15",
    },
    {
      id: "r2",
      author: "Jane Smith",
      rating: 4,
      comment: "Good communication and reliable timelines. Would recommend.",
      date: "2024-01-20",
    },
  ],
};

export function DeveloperProfiles() {
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
          <Link href="/" className="text-2xl font-bold">
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
                      <Link
                        href="/routes/developer-dashboard"
                        className="w-full"
                      >
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
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={developer.logo} alt={developer.name} />
              <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{developer.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{developer.location}</span>
              </div>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Founded in {developer.foundedYear}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-xl font-bold">
                {developer.rating.toFixed(1)}
              </span>
            </div>
            <Button variant="outline" asChild>
              <Link href="/routes/rate-this">
                <Star className="mr-2 h-4 w-4" />
                Rate Developer
              </Link>
            </Button>
            <Button>Contact Developer</Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About {developer.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{developer.description}</p>
          </CardContent>
        </Card>

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
                {developer.totalProjects}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Projects
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {developer.completedProjects}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ongoing Projects
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {developer.ongoingProjects}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="mb-8">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects by {developer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map((project) => (
                    <Card key={project.id}>
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {project.name}
                        </h3>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">
                            {project.location}
                          </span>
                          <Badge
                            variant={
                              project.status === "Ongoing"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{project.type}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completion</span>
                            <span>{project.completionPercentage}%</span>
                          </div>
                          <Progress value={project.completionPercentage} />
                        </div>
                        <div className="mt-4 text-sm">
                          <span>
                            {project.soldUnits} / {project.totalUnits} units
                            sold
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/routes/projects/${project.id}`}>
                            View Details{" "}
                            <ChevronRight className="ml-2 h-4 w-4" />
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
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {developer.reviews.map((review) => (
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
                        <CardDescription>{review.date}</CardDescription>
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
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
