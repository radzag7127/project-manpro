"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Project {
  id: string;
  name: string;
  location: string;
  image: string;
  totalUnits: number;
  completionDate: string;
}

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Green Valley Residences",
    location: "Jakarta",
    image: "/placeholder.svg?height=150&width=300",
    totalUnits: 200,
    completionDate: "2025",
  },
  {
    id: "2",
    name: "Seaside Villas",
    location: "Bali",
    image: "/placeholder.svg?height=150&width=300",
    totalUnits: 50,
    completionDate: "2024",
  },
  {
    id: "3",
    name: "Urban Heights",
    location: "Surabaya",
    image: "/placeholder.svg?height=150&width=300",
    totalUnits: 150,
    completionDate: "2026",
  },
];

export function ProjectPromotions() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [promotionOptions, setPromotionOptions] = useState({
    spotlight: false,
    enhancedPage: false,
  });
  const [targetedPromotion, setTargetedPromotion] = useState<string | null>(
    null
  );
  const [duration, setDuration] = useState(30);

  const handlePromotionChange = (option: keyof typeof promotionOptions) => {
    setPromotionOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const calculatePrice = () => {
    let basePrice = 500000; // Base price per day in IDR
    let multiplier = 1;
    if (promotionOptions.spotlight) multiplier += 0.5;
    if (promotionOptions.enhancedPage) multiplier += 0.3;
    if (targetedPromotion) multiplier += 0.2;
    return basePrice * duration * multiplier;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Promote Your Project</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Project</CardTitle>
            <CardDescription>
              Choose the project you want to promote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) =>
                setSelectedProject(
                  sampleProjects.find((p) => p.id === value) || null
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {sampleProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotion Options</CardTitle>
            <CardDescription>
              Choose how you want to promote your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="spotlight"
                checked={promotionOptions.spotlight}
                onCheckedChange={() => handlePromotionChange("spotlight")}
              />
              <Label htmlFor="spotlight">Project Spotlight</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enhancedPage"
                checked={promotionOptions.enhancedPage}
                onCheckedChange={() => handlePromotionChange("enhancedPage")}
              />
              <Label htmlFor="enhancedPage">Enhanced Project Page</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Targeted Promotion</CardTitle>
            <CardDescription>Select your target audience</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={setTargetedPromotion}
              value={targetedPromotion || undefined}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="local" id="local" />
                <Label htmlFor="local">Local Buyers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="national" id="national" />
                <Label htmlFor="national">National Investors</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="international" id="international" />
                <Label htmlFor="international">International Investors</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotion Duration</CardTitle>
            <CardDescription>
              Select how long you want to promote your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Slider
              min={7}
              max={90}
              step={1}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              className="w-full"
            />
            <p className="mt-2 text-center">{duration} days</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              See how your promoted project will appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedProject ? (
              <div className="relative border p-4 rounded-lg">
                {promotionOptions.spotlight && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    Spotlight
                  </Badge>
                )}
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  width={300}
                  height={150}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="font-bold text-xl">{selectedProject.name}</h3>
                <p>{selectedProject.location}</p>
                <p className="mt-2">
                  Total Units: {selectedProject.totalUnits}
                </p>
                <p>Completion: {selectedProject.completionDate}</p>
                {promotionOptions.enhancedPage && (
                  <Badge className="mt-2 bg-blue-500">Enhanced Page</Badge>
                )}
                {targetedPromotion && (
                  <Badge className="mt-2 bg-green-500">
                    Targeted: {targetedPromotion}
                  </Badge>
                )}
              </div>
            ) : (
              <p>Select a project to see the preview</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Promotion Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Duration:</strong> {duration} days
            </p>
            <p>
              <strong>Total Price:</strong>{" "}
              {calculatePrice().toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={!selectedProject}>
              Promote Project
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
