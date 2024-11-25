"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Eye,
  MessageSquare,
  BarChart2,
  Download,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeaderComponent from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";
import Link from "next/link";

// Mock data
const overviewData = {
  totalViews: 15000,
  inquiryCount: 450,
  conversionRate: 8.5,
};

const topPerformingListings = [
  {
    id: 1,
    title: "Luxury Villa in Bali",
    views: 2500,
    inquiries: 75,
    conversions: 15,
  },
  {
    id: 2,
    title: "Modern Apartment in Jakarta",
    views: 2000,
    inquiries: 60,
    conversions: 12,
  },
  {
    id: 3,
    title: "Beachfront Property in Lombok",
    views: 1800,
    inquiries: 55,
    conversions: 10,
  },
];

const userBehaviorTrends = [
  { day: "Mon", views: 1200 },
  { day: "Tue", views: 1400 },
  { day: "Wed", views: 1600 },
  { day: "Thu", views: 1800 },
  { day: "Fri", views: 2000 },
  { day: "Sat", views: 2200 },
  { day: "Sun", views: 1900 },
];

const regionalDemand = [
  {
    city: "Jakarta",
    demand: 80,
    trend: "+5%",
    properties: 150,
  },
  {
    city: "Bali",
    demand: 70,
    trend: "+8%",
    properties: 120,
  },
  {
    city: "Surabaya",
    demand: 60,
    trend: "+3%",
    properties: 90,
  },
  {
    city: "Bandung",
    demand: 50,
    trend: "+4%",
    properties: 75,
  },
];

const campaignPerformance = [
  {
    name: "Luxury Villas",
    views: 5000,
    clicks: 750,
    inquiries: 150,
    roi: 12.5,
  },
  {
    name: "City Apartments",
    views: 4500,
    clicks: 600,
    inquiries: 120,
    roi: 10.8,
  },
  {
    name: "Beachfront Homes",
    views: 3800,
    clicks: 520,
    inquiries: 95,
    roi: 9.2,
  },
];

export function DeveloperDataPremiums() {
  const [timeFrame, setTimeFrame] = useState("7d");

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Developer Dashboard</h1>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Property Views
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overviewData.totalViews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inquiry Count
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overviewData.inquiryCount}
              </div>
              <p className="text-xs text-muted-foreground">
                +15.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overviewData.conversionRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Interaction Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Interaction Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="top-listings" className="space-y-4">
              <TabsList>
                <TabsTrigger value="top-listings">
                  Top Performing Listings
                </TabsTrigger>
                <TabsTrigger value="user-behavior">
                  User Behavior Trends
                </TabsTrigger>
              </TabsList>
              <TabsContent value="top-listings">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Listing</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Inquiries</TableHead>
                      <TableHead>Conversions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformingListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">
                          {listing.title}
                        </TableCell>
                        <TableCell>{listing.views}</TableCell>
                        <TableCell>{listing.inquiries}</TableCell>
                        <TableCell>{listing.conversions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="user-behavior">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userBehaviorTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Regional Demand */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Regional Demand</CardTitle>
            <CardDescription>
              Property demand across major cities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regionalDemand.map((region, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{region.city}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Demand Index
                        </span>
                        <span className="font-bold">{region.demand}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Trend
                        </span>
                        <span className="text-green-600">{region.trend}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Active Listings
                        </span>
                        <span>{region.properties}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Trends and Pricing Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Market Trends and Pricing Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Based on our data analysis, we recommend the following pricing
              strategies:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Luxury Villas: $500,000 - $750,000</li>
              <li>City Apartments: $150,000 - $300,000</li>
              <li>Beachfront Properties: $400,000 - $600,000</li>
            </ul>
            <p>
              These recommendations are based on current market trends and user
              behavior patterns.
            </p>
          </CardContent>
        </Card>

        {/* Promotional Campaign Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Promotional Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Inquiries</TableHead>
                  <TableHead>ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignPerformance.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>{campaign.views}</TableCell>
                    <TableCell>{campaign.clicks}</TableCell>
                    <TableCell>{campaign.inquiries}</TableCell>
                    <TableCell>{campaign.roi}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Target Audience Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Target Audience Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Key demographics of users engaging with your listings:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Age Group: 30-45 years old</li>
              <li>Location: Major cities (Jakarta, Surabaya, Bandung)</li>
              <li>Average Budget: $200,000 - $500,000</li>
              <li>Preferences: Modern apartments and family homes</li>
            </ul>
          </CardContent>
        </Card>

        {/* Custom Data Reports */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Custom Data Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="mr-2 h-4 w-4" /> Export Report
              </Button>
            </div>
            <p>
              Generate custom reports based on your specific needs and time
              frames.
            </p>
          </CardContent>
        </Card>

        {/* Call-to-Action for Additional Services */}
        <Card>
          <CardHeader>
            <CardTitle>Unlock Advanced Analytics</CardTitle>
            <CardDescription>
              Get deeper insights with our premium data services for detailed
              market forecasting and competitive analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/routes/premium-payment-page">
              <Button>Explore Premium Services</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
}
