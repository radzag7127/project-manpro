"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, Home, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";

export function OnBoardingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Rumaku
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/routes/listings" className="hover:underline">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/authentification"
                  className="hover:underline"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Sell Your Property with Rumaku
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful sellers on Indonesia's fastest-growing
            property marketplace. Reach millions of potential buyers and sell
            your property faster with Rumaku.
          </p>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-6 inline-block mb-4">
                <Image
                  src="/female1.jpg"
                  alt="Wide Reach Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Reach</h3>
              <p className="text-gray-600">
                Connect with millions of potential buyers across Indonesia
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-6 inline-block mb-4">
                <Image
                  src="/female2.jpg"
                  alt="Easy Listing Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Listing</h3>
              <p className="text-gray-600">
                List your property in minutes with our user-friendly platform
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-6 inline-block mb-4">
                <Image
                  src="/male1.jpg"
                  alt="Expert Support Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Get assistance from our team of property experts
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Sell?</h2>
          <Link href="/routes/authentification">
            <Button size="lg" className="text-lg px-8 py-6">
              Sell on our platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Seller Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-10">
                <Image
                  src="/prop5.jpg"
                  alt="Developer Background"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center justify-center">
                  <Building className="mr-2 h-6 w-6" />
                  Developer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Showcase your new developments and reach a wide audience of
                  potential buyers.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Bulk listing options
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Project spotlight features
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Analytics and reporting tools
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started as Developer</Button>
              </CardFooter>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-10">
                <Image
                  src="/prop3.jpg"
                  alt="Property Owner Background"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center justify-center">
                  <Home className="mr-2 h-6 w-6" />
                  Property Owner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  List your property directly and connect with potential buyers
                  without intermediaries.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Easy-to-use listing tools
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Direct communication with buyers
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Pricing guidance and market insights
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Get Started as Property Owner
                </Button>
              </CardFooter>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-10">
                <Image
                  src="/male2.jpg"
                  alt="Agent Background"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center justify-center">
                  <User className="mr-2 h-6 w-6" />
                  Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Expand your reach and grow your real estate business with our
                  powerful platform.
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Multiple listing management
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Client management tools
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                    Professional profile showcase
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started as Agent</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
