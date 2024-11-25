"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Users, Home, BarChart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    bio: "With over 15 years in real estate, Jane founded Rumaku to create a fair platform for all property owners.",
    imageUrl: "/female1.jpg" as string,
  },
  {
    name: "John Smith",
    role: "CTO",
    bio: "John brings 10 years of tech expertise, ensuring Rumaku stays at the forefront of proptech innovation.",
    imageUrl: "/male1.jpg" as string,
  },
  {
    name: "Alice Johnson",
    role: "Head of Operations",
    bio: "Alice's background in property management helps Rumaku deliver exceptional service to all users.",
    imageUrl: "/female2.jpg" as string,
  },
];

const milestones = [
  {
    year: "2020",
    title: "Rumaku Founded",
    description:
      "Launched with a mission to provide fair exposure for all property owners.",
  },
  {
    year: "2021",
    title: "100,000 Listings",
    description:
      "Reached a significant milestone in our growth and user trust.",
  },
  {
    year: "2022",
    title: "Expanded Nationwide",
    description:
      "Successfully launched operations across all major cities in Indonesia.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description:
      'Awarded "Most Innovative PropTech Platform" by Real Estate Association of Indonesia.',
  },
];

export function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderComponents />
      <main className="container mx-auto py-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image
            src="/RumakuLogo.png"
            alt="Rumaku Logo"
            width={48}
            height={48}
          />
          <h1 className="text-4xl font-bold">About Rumaku</h1>
        </div>

        {/* Company History and Mission */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4">
                Founded in 2020, Rumaku emerged from a vision to revolutionize
                the Indonesian real estate market. Our founders recognized the
                need for a platform that provides equal opportunities for all
                property owners, from individual sellers to large developers.
              </p>
              <p className="mb-4">
                What started as a small startup has now grown into a nationwide
                platform, connecting thousands of buyers with their dream
                properties and empowering sellers with the tools they need to
                succeed.
              </p>
              <Button asChild>
                <Link href="/routes/listings">Explore Our Listings</Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="/BackgroundNew.png"
                alt="Rumaku Office"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="mb-16 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Our Mission and Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Home className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Fair Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We ensure every property gets an equal chance to shine,
                  regardless of the seller's size or budget.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We build strong relationships with buyers, sellers, and agents
                  to create a thriving real estate community.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We believe in clear, honest communication and fair practices
                  throughout the property journey.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We continuously improve our platform to meet the evolving
                  needs of the real estate market.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="rounded-full mx-auto mb-4"
                  />
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Our Milestones
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-24 text-right mr-4">
                  <span className="text-lg font-semibold text-primary">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-grow border-t border-gray-300"></div>
                <div className="flex-shrink-0 w-64 ml-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">
            Join the Rumaku Community
          </h2>
          <p className="mb-6">
            Whether you're looking to buy, sell, or rent, Rumaku is here to
            support your real estate journey.
          </p>
          <Button asChild variant="secondary">
            <Link href="/routes/authentification">Get Started Today</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
