"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Building, MapPin, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Listing {
  id: string;
  name: string;
  type: string;
  price: number;
  status: "Available" | "Sold" | "Reserved";
  image: string;
}

interface Project {
  name: string;
  location: string;
  description: string;
  type: "Residential" | "Commercial" | "Mixed-Use";
  totalUnits: number;
  startDate: string;
  completionDate: string;
  listings: Listing[];
}

export function CreateNewProjectDevelopers() {
  const router = useRouter();
  const [project, setProject] = useState<Project>({
    name: "",
    location: "",
    description: "",
    type: "Residential",
    totalUnits: 0,
    startDate: "",
    completionDate: "",
    listings: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the new project data to your backend
    console.log("Saving project:", project);
    // After saving, redirect to the project details page or listings page
    router.push("/routes/developer-projects");
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Create New Project
          </CardTitle>
          <CardDescription>
            Enter the details for your new development project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={project.name}
                onChange={handleInputChange}
                placeholder="Enter project name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={project.location}
                onChange={handleInputChange}
                placeholder="Enter project location"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={project.description}
                onChange={handleInputChange}
                placeholder="Describe your project"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Project Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
                defaultValue={project.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalUnits">Total Units</Label>
              <Input
                id="totalUnits"
                name="totalUnits"
                type="number"
                value={project.totalUnits}
                onChange={handleInputChange}
                placeholder="Enter total number of units"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={project.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="completionDate">Estimated Completion Date</Label>
              <Input
                id="completionDate"
                name="completionDate"
                type="date"
                value={project.completionDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Project
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Project Listings</CardTitle>
          <CardDescription>
            Add and manage listings for this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {project.listings.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No listings added yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.listings.map((listing) => (
                <Card key={listing.id}>
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{listing.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {listing.type}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">
                        {listing.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <span className="text-sm">{listing.status}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/routes/add-listings")}>
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
