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

interface Agent {
  id: string;
  name: string;
  image: string;
  description: string;
  specialization: string;
  experience: number;
}

const sampleAgent: Agent = {
  id: "1",
  name: "Jane Doe",
  image: "/placeholder.svg?height=200&width=200",
  description:
    "Experienced real estate agent specializing in luxury properties",
  specialization: "Luxury Properties",
  experience: 10,
};

const regions = ["Jakarta", "Bali", "Surabaya", "Bandung", "Yogyakarta"];
const propertyTypes = ["Residential", "Commercial", "Industrial", "Land"];

export function AgentPromotings() {
  const [agent, setAgent] = useState<Agent>(sampleAgent);
  const [promotionOptions, setPromotionOptions] = useState({
    homepageHighlight: false,
    searchPriority: false,
  });
  const [targetedRegions, setTargetedRegions] = useState<string[]>([]);
  const [targetedPropertyTypes, setTargetedPropertyTypes] = useState<string[]>(
    []
  );
  const [duration, setDuration] = useState(30);

  const handlePromotionChange = (option: keyof typeof promotionOptions) => {
    setPromotionOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleRegionChange = (region: string) => {
    setTargetedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const handlePropertyTypeChange = (type: string) => {
    setTargetedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const calculatePrice = () => {
    let basePrice = 100000; // Base price per day in IDR
    let multiplier = 1;
    if (promotionOptions.homepageHighlight) multiplier += 0.5;
    if (promotionOptions.searchPriority) multiplier += 0.3;
    multiplier +=
      targetedRegions.length * 0.1 + targetedPropertyTypes.length * 0.1;
    return basePrice * duration * multiplier;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Promote Your Agent Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Agent Information</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={agent.name}
                onChange={(e) =>
                  setAgent((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={agent.description}
                onChange={(e) =>
                  setAgent((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={agent.specialization}
                onChange={(e) =>
                  setAgent((prev) => ({
                    ...prev,
                    specialization: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={agent.experience}
                onChange={(e) =>
                  setAgent((prev) => ({
                    ...prev,
                    experience: parseInt(e.target.value),
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
                id="homepageHighlight"
                checked={promotionOptions.homepageHighlight}
                onCheckedChange={() =>
                  handlePromotionChange("homepageHighlight")
                }
              />
              <Label htmlFor="homepageHighlight">Homepage Highlight</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="searchPriority"
                checked={promotionOptions.searchPriority}
                onCheckedChange={() => handlePromotionChange("searchPriority")}
              />
              <Label htmlFor="searchPriority">Search Priority</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Targeted Audience</CardTitle>
            <CardDescription>
              Select your target regions and property types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Target Regions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {regions.map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region}`}
                        checked={targetedRegions.includes(region)}
                        onCheckedChange={() => handleRegionChange(region)}
                      />
                      <Label htmlFor={`region-${region}`}>{region}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Property Types</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
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
              </div>
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
              </TabsList>
              <TabsContent value="homepage">
                {promotionOptions.homepageHighlight ? (
                  <div className="border p-4 rounded-lg">
                    <Badge className="mb-2">Featured Agent</Badge>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Enable Homepage Highlight to see the preview</p>
                )}
              </TabsContent>
              <TabsContent value="search">
                <div className="border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-bold">{agent.name}</h3>
                      <p className="text-sm">{agent.specialization}</p>
                      <p className="text-sm text-muted-foreground">
                        {agent.experience} years experience
                      </p>
                    </div>
                  </div>
                  {promotionOptions.searchPriority && (
                    <Badge className="mt-2">Top Result</Badge>
                  )}
                </div>
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
