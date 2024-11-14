"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HeaderComponent from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";

const regions = ["Jakarta", "Bali", "Surabaya", "Bandung", "Yogyakarta"];
const propertyTypes = ["Apartment", "House", "Villa", "Land"];

export function MarketTrends() {
  const [selectedRegion, setSelectedRegion] = useState("Jakarta");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Apartment");

  const priceData = {
    datasets: [
      {
        data: [
          { name: "Jan", value: 2000000000 },
          { name: "Feb", value: 2050000000 },
          { name: "Mar", value: 2100000000 },
          { name: "Apr", value: 2080000000 },
          { name: "May", value: 2150000000 },
          { name: "Jun", value: 2200000000 },
        ],
      },
    ],
  };

  const demandData = {
    datasets: [
      {
        data: [
          { name: "Apartment", value: 40 },
          { name: "House", value: 30 },
          { name: "Villa", value: 20 },
          { name: "Land", value: 10 },
        ],
      },
    ],
  };

  const popularityData = {
    datasets: [
      {
        data: [
          { name: "Jakarta", value: 30 },
          { name: "Bali", value: 25 },
          { name: "Surabaya", value: 20 },
          { name: "Bandung", value: 15 },
          { name: "Yogyakarta", value: 10 },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponent />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Market Trends</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Region</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Select Property Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedPropertyType}
                onValueChange={setSelectedPropertyType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>
                Average property prices over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={priceData}
                config={{
                  "Average Price (IDR)": {
                    label: "Average Price (IDR)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="aspect-[16/9]"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Property Type Demand</CardTitle>
              <CardDescription>
                Demand distribution across property types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={demandData}
                config={{
                  "Demand (%)": {
                    label: "Demand (%)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="aspect-[16/9]"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Regional Popularity</CardTitle>
            <CardDescription>
              Popularity of different regions for property investment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={popularityData}
              config={{
                Popularity: {
                  label: "Popularity",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="aspect-[16/9]"
            />
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Market Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="insights">Key Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p>
                  The Indonesian property market has shown steady growth over
                  the past year, with a 5% increase in average property prices
                  across major cities. {selectedRegion} remains a hotspot for{" "}
                  {selectedPropertyType} investments, showing a 7%
                  year-over-year price appreciation.
                </p>
              </TabsContent>
              <TabsContent value="insights">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Apartments in urban centers are seeing increased demand due
                    to urbanization trends.
                  </li>
                  <li>
                    Coastal areas in Bali continue to attract premium prices for
                    villas and luxury properties.
                  </li>
                  <li>
                    Government infrastructure projects are boosting property
                    values in satellite cities.
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expert Commentary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Dr. Siti Rahayu"
                  />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Dr. Siti Rahayu</h3>
                  <p className="text-sm text-muted-foreground">
                    Chief Economist, Indonesia Property Institute
                  </p>
                  <p className="mt-2">
                    "The Indonesian property market is showing resilience
                    despite global economic challenges. We're seeing a shift
                    towards sustainable and smart home features, which is likely
                    to drive future demand and pricing."
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Budi Santoso"
                  />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Budi Santoso</h3>
                  <p className="text-sm text-muted-foreground">
                    Real Estate Market Analyst
                  </p>
                  <p className="mt-2">
                    "Investors should keep an eye on emerging areas in Greater
                    Jakarta and Surabaya. These regions are benefiting from
                    improved infrastructure and offer attractive returns on
                    investment."
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
