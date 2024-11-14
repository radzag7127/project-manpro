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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PropertyOwner {
  id: string;
  name: string;
  image: string;
  description: string;
  propertyCount: number;
  location: string;
}

const samplePropertyOwner: PropertyOwner = {
  id: "1",
  name: "John Smith",
  image: "/placeholder.svg?height=200&width=200",
  description:
    "Experienced property owner with a diverse portfolio of residential and commercial properties",
  propertyCount: 5,
  location: "Jakarta",
};

const propertyTypes = ["Residential", "Commercial", "Industrial", "Land"];

export function PropertyOwnerPromotions() {
  const [propertyOwner, setPropertyOwner] =
    useState<PropertyOwner>(samplePropertyOwner);
  const [promotionOptions, setPromotionOptions] = useState({
    homepagePlacement: false,
    enhancedSearchVisibility: false,
    agentEngagement: false,
  });
  const [targetedPropertyTypes, setTargetedPropertyTypes] = useState<string[]>(
    []
  );
  const [duration, setDuration] = useState(30);

  const handlePromotionChange = (option: keyof typeof promotionOptions) => {
    setPromotionOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handlePropertyTypeChange = (type: string) => {
    setTargetedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const calculatePrice = () => {
    let basePrice = 150000; // Base price per day in IDR
    let multiplier = 1;
    if (promotionOptions.homepagePlacement) multiplier += 0.5;
    if (promotionOptions.enhancedSearchVisibility) multiplier += 0.3;
    if (promotionOptions.agentEngagement) multiplier += 0.2;
    multiplier += targetedPropertyTypes.length * 0.1;
    return basePrice * duration * multiplier;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Promote Your Property Owner Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Property Owner Information</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={propertyOwner.name}
                onChange={(e) =>
                  setPropertyOwner((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={propertyOwner.description}
                onChange={(e) =>
                  setPropertyOwner((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="propertyCount">Number of Properties</Label>
              <Input
                id="propertyCount"
                type="number"
                value={propertyOwner.propertyCount}
                onChange={(e) =>
                  setPropertyOwner((prev) => ({
                    ...prev,
                    propertyCount: parseInt(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={propertyOwner.location}
                onChange={(e) =>
                  setPropertyOwner((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotion Options</CardTitle>
            <CardDescription>
              Choose how you want to promote your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="homepagePlacement"
                checked={promotionOptions.homepagePlacement}
                onCheckedChange={() =>
                  handlePromotionChange("homepagePlacement")
                }
              />
              <Label htmlFor="homepagePlacement">Homepage Placement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enhancedSearchVisibility"
                checked={promotionOptions.enhancedSearchVisibility}
                onCheckedChange={() =>
                  handlePromotionChange("enhancedSearchVisibility")
                }
              />
              <Label htmlFor="enhancedSearchVisibility">
                Enhanced Search Visibility
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agentEngagement"
                checked={promotionOptions.agentEngagement}
                onCheckedChange={() => handlePromotionChange("agentEngagement")}
              />
              <Label htmlFor="agentEngagement">Agent Engagement</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>
              Select the types of properties you own
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={targetedPropertyTypes.includes(type)}
                    onCheckedChange={() => handlePropertyTypeChange(type)}
                  />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotion Duration</CardTitle>
            <CardDescription>
              Select how long you want to promote your profile
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
              See how your promoted profile will appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="homepage" className="w-full">
              <TabsList>
                <TabsTrigger value="homepage">Homepage</TabsTrigger>
                <TabsTrigger value="search">Search Results</TabsTrigger>
                <TabsTrigger value="agent">Agent View</TabsTrigger>
              </TabsList>
              <TabsContent value="homepage">
                {promotionOptions.homepagePlacement ? (
                  <div className="border p-4 rounded-lg">
                    <Badge className="mb-2">Featured Property Owner</Badge>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={propertyOwner.image}
                        alt={propertyOwner.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-lg">
                          {propertyOwner.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {propertyOwner.description}
                        </p>
                        <p className="text-sm">
                          Location: {propertyOwner.location}
                        </p>
                        <p className="text-sm">
                          Properties: {propertyOwner.propertyCount}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Enable Homepage Placement to see the preview</p>
                )}
              </TabsContent>
              <TabsContent value="search">
                <div className="border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={propertyOwner.image}
                      alt={propertyOwner.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-bold">{propertyOwner.name}</h3>
                      <p className="text-sm">{propertyOwner.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {propertyOwner.propertyCount} properties
                      </p>
                    </div>
                  </div>
                  {promotionOptions.enhancedSearchVisibility && (
                    <Badge className="mt-2">Enhanced Visibility</Badge>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="agent">
                {promotionOptions.agentEngagement ? (
                  <div className="border p-4 rounded-lg">
                    <Badge className="mb-2">Seeking Agent Collaboration</Badge>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={propertyOwner.image}
                        alt={propertyOwner.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-bold">{propertyOwner.name}</h3>
                        <p className="text-sm">{propertyOwner.location}</p>
                        <p className="text-sm">
                          Properties: {propertyOwner.propertyCount}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Looking for agents to help promote and sell properties
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Enable Agent Engagement to see the preview</p>
                )}
              </TabsContent>
            </Tabs>
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
            <Button className="w-full">Promote Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
