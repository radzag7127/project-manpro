"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LegalCenterFirstPages } from "./LegalCenter1";

const LegalCenterFirstPage = () => {
  return <LegalCenterFirstPages />;
};

const legalNews = [
  {
    id: 1,
    title: "New Regulations for Foreign Property Ownership in Indonesia",
    date: "2024-03-15",
    summary:
      "The Indonesian government has announced new regulations that will make it easier for foreigners to own property in the country...",
    link: "/news/foreign-property-ownership",
  },
  {
    id: 2,
    title: "Updates to Property Tax Laws in Jakarta",
    date: "2024-03-10",
    summary:
      "Jakarta's regional government has implemented changes to property tax calculations, affecting both residential and commercial properties...",
    link: "/news/jakarta-property-tax-update",
  },
  {
    id: 3,
    title: "New Sustainable Building Standards for Developers",
    date: "2024-03-05",
    summary:
      "The Ministry of Public Works and Housing has introduced new standards for sustainable building practices, impacting future property developments...",
    link: "/news/sustainable-building-standards",
  },
];

const legalPartners = [
  "HukumOnline",
  "Hadiputranto, Hadinoto & Partners",
  "Soemadipradja & Taher",
  "SSEK Legal Consultants",
  "Makarim & Taira S.",
  "Assegaf Hamzah & Partners",
  "Hiswara Bunjamin & Tandjung",
  "Ginting & Reksodiputro",
  "Widyawan & Partners",
  "Ali Budiardjo, Nugroho, Reksodiputro",
];

export function LegalCenterSecondPages() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(
        (prevPosition) => (prevPosition + 1) % (legalPartners.length * 200)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Rumaku Legal Center</h1>
          <p className="text-xl">
            Your comprehensive guide to property laws and expert legal resources
            in Indonesia
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <LegalCenterFirstPage />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Latest Legal News and Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalNews.map((news) => (
              <Card key={news.id}>
                <CardHeader>
                  <CardTitle>{news.title}</CardTitle>
                  <CardDescription>{news.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{news.summary}</p>
                  <Button asChild variant="outline">
                    <Link href={news.link} className="flex items-center">
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Our Legal Partners</h2>
          <Card>
            <CardContent className="p-6">
              <p className="mb-4">
                Rumaku has partnered with top legal firms in Indonesia to
                provide expert advice on property law matters. Our partners
                include:
              </p>
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div
                  className="flex w-max space-x-4 p-4"
                  style={{ transform: `translateX(-${scrollPosition}px)` }}
                >
                  {legalPartners.concat(legalPartners).map((partner, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 rounded-lg border p-4 w-[200px]"
                    >
                      <h3 className="font-semibold">{partner}</h3>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Need Professional Legal Advice?
          </h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                Connect with one of our partner legal firms for expert advice
                tailored to your specific property law needs.
              </p>
              <Button asChild>
                <Link
                  href="/connect-legal-expert"
                  className="flex items-center"
                >
                  Connect with a Legal Expert{" "}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
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
