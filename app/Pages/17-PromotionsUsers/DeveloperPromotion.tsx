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

interface Developer {
  id: string;
  name: string;
  image: string;
  description: string;
  establishedYear: number;
  completedProjects: number;
}

const sampleDeveloper: Developer = {
  id: "1",
  name: "Rumah Indah Developers",
  image: "/placeholder.svg?height=200&width=200",
  description:
    "Leading property developer specializing in eco-friendly residential complexes",
  establishedYear: 1995,
  completedProjects: 50,
};

const regions = ["Jakarta", "Bali", "Surabaya", "Bandung", "Yogyakarta"];
const buyerDemographics = [
  "First-time Buyers",
  "Luxury Buyers",
  "Investors",
  "Retirees",
];

export function PromoteDevelopers() {
  const [developer, setDeveloper] = useState<Developer>(sampleDeveloper);
  const [promotionOptions, setPromotionOptions] = useState({
    featuredDeveloper: false,
    searchBoost: false,
  });
  const [targetedRegions, setTargetedRegions] = useState<string[]>([]);
  const [targetedDemographics, setTargetedDemographics] = useState<string[]>(
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

  const handleDemographicChange = (demographic: string) => {
    setTargetedDemographics((prev) =>
      prev.includes(demographic)
        ? prev.filter((d) => d !== demographic)
        : [...prev, demographic]
    );
  };

  const calculatePrice = () => {
    let basePrice = 200000; // Base price per day in IDR
    let multiplier = 1;
    if (promotionOptions.featuredDeveloper) multiplier += 0.5;
    if (promotionOptions.searchBoost) multiplier += 0.3;
    multiplier +=
      targetedRegions.length * 0.1 + targetedDemographics.length * 0.1;
    return basePrice * duration * multiplier;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Promote Your Developer Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Developer Information</CardTitle>
            <CardDescription>Update your company profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={developer.name}
                onChange={(e) =>
                  setDeveloper((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={developer.description}
                onChange={(e) =>
                  setDeveloper((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="establishedYear">Established Year</Label>
              <Input
                id="establishedYear"
                type="number"
                value={developer.establishedYear}
                onChange={(e) =>
                  setDeveloper((prev) => ({
                    ...prev,
                    establishedYear: parseInt(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="completedProjects">Completed Projects</Label>
              <Input
                id="completedProjects"
                type="number"
                value={developer.completedProjects}
                onChange={(e) =>
                  setDeveloper((prev) => ({
                    ...prev,
                    completedProjects: parseInt(e.target.value),
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
                id="featuredDeveloper"
                checked={promotionOptions.featuredDeveloper}
                onCheckedChange={() =>
                  handlePromotionChange("featuredDeveloper")
                }
              />
              <Label htmlFor="featuredDeveloper">Featured Developer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="searchBoost"
                checked={promotionOptions.searchBoost}
                onCheckedChange={() => handlePromotionChange("searchBoost")}
              />
              <Label htmlFor="searchBoost">Search Boost</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Targeted Reach</CardTitle>
            <CardDescription>
              Select your target regions and buyer demographics
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
                <Label>Buyer Demographics</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {buyerDemographics.map((demographic) => (
                    <div
                      key={demographic}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`demographic-${demographic}`}
                        checked={targetedDemographics.includes(demographic)}
                        onCheckedChange={() =>
                          handleDemographicChange(demographic)
                        }
                      />
                      <Label htmlFor={`demographic-${demographic}`}>
                        {demographic}
                      </Label>
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
                {promotionOptions.featuredDeveloper ? (
                  <div className="border p-4 rounded-lg">
                    <Badge className="mb-2">Featured Developer</Badge>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={developer.image}
                        alt={developer.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{developer.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {developer.description}
                        </p>
                        <p className="text-sm">
                          Established: {developer.establishedYear}
                        </p>
                        <p className="text-sm">
                          Completed Projects: {developer.completedProjects}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Enable Featured Developer to see the preview</p>
                )}
              </TabsContent>
              <TabsContent value="search">
                <div className="border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={developer.image}
                      alt={developer.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-bold">{developer.name}</h3>
                      <p className="text-sm">{developer.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {developer.completedProjects} completed projects
                      </p>
                    </div>
                  </div>
                  {promotionOptions.searchBoost && (
                    <Badge className="mt-2">Boosted Result</Badge>
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
