"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Building,
  ShoppingBag,
  UserCheck,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface LegalSectionProps {
  title: string;
  description: string;
  items: {
    question: string;
    answer: string;
    link?: string;
  }[];
}

export function LegalCenterFirstPages() {
  const [activeTab, setActiveTab] = useState("property-owners");

  const LegalSection = ({ title, description, items }: LegalSectionProps) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.answer}
                {item.link && (
                  <Link
                    href={item.link}
                    className="flex items-center text-primary hover:underline mt-2"
                  >
                    Learn more <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );

  const propertyOwnersContent = [
    {
      question:
        "What are the legal requirements for listing a property for sale in Indonesia?",
      answer:
        "To list a property for sale in Indonesia, you must have clear ownership documentation, including a certificate of ownership (SHM or SHGB). You'll also need to provide accurate property details and disclose any known issues.",
      link: "/property-listing-requirements",
    },
    {
      question: "How does the property transfer process work?",
      answer:
        "The property transfer process involves several steps: agreement between buyer and seller, due diligence, preparation of a deed of sale by a notary, payment of taxes and fees, and registration of the transfer with the National Land Office.",
      link: "/property-transfer-process",
    },
    {
      question: "What taxes do I need to pay when selling a property?",
      answer:
        "As a seller, you're typically responsible for paying a 5% income tax on the sale value. There may also be additional local taxes or fees depending on the property's location.",
      link: "/property-sale-taxes",
    },
  ];

  const developersContent = [
    {
      question:
        "What permits are required for property development in Indonesia?",
      answer:
        "Developers typically need to obtain several permits, including a location permit (Izin Lokasi), environmental permit (AMDAL), building construction permit (IMB), and others depending on the project's scale and location.",
      link: "/development-permits",
    },
    {
      question: "How do zoning regulations affect property development?",
      answer:
        "Zoning regulations determine land use and building specifications in different areas. They can affect the type of development allowed, maximum building height, floor area ratio, and other aspects of your project.",
      link: "/zoning-regulations",
    },
    {
      question:
        "What are the legal requirements for foreign investment in property development?",
      answer:
        "Foreign investors can participate in property development through a foreign investment company (PT PMA). There are restrictions on land ownership, but long-term land use rights (HGB) can be obtained for development purposes.",
      link: "/foreign-investment-property",
    },
  ];

  const buyersContent = [
    {
      question: "What are the steps involved in buying property in Indonesia?",
      answer:
        "The process typically involves property selection, price negotiation, due diligence, signing a conditional sale and purchase agreement, payment, deed of sale execution, and title transfer registration.",
      link: "/property-buying-steps",
    },
    {
      question: "Can foreigners buy property in Indonesia?",
      answer:
        "Foreigners can purchase apartments (not landed houses) under a 'right to use' (Hak Pakai) title. They cannot own freehold property directly but may set up a PT PMA for certain property investments.",
      link: "/foreigner-property-ownership",
    },
    {
      question:
        "What should I know about property financing and mortgages in Indonesia?",
      answer:
        "Mortgages are available from Indonesian banks, with terms typically up to 20 years. Interest rates and down payment requirements may be higher for foreign buyers. It's important to shop around and understand the terms offered by different banks.",
      link: "/property-financing",
    },
  ];

  const agentsContent = [
    {
      question:
        "What are the legal responsibilities of a real estate agent in Indonesia?",
      answer:
        "Agents must provide accurate information about properties, disclose known defects, maintain client confidentiality, and adhere to ethical standards set by professional associations like REI (Real Estate Indonesia).",
      link: "/agent-responsibilities",
    },
    {
      question:
        "How can agents assist clients with the legal aspects of property transactions?",
      answer:
        "Agents should be familiar with basic property laws, guide clients through the transaction process, recommend trusted legal professionals when needed, and ensure all necessary documents are in order.",
      link: "/agent-legal-assistance",
    },
    {
      question:
        "What certifications or licenses do real estate agents need in Indonesia?",
      answer:
        "While there's no mandatory national licensing system, many reputable agents obtain certification from organizations like REI or AREBI (Association of Indonesian Real Estate Brokers). Some local governments may require business licenses for real estate agencies.",
      link: "/agent-certifications",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/RumakuLogo.png"
              alt="Rumaku Logo"
              width={40}
              height={40}
            />
            <h1 className="text-3xl font-bold">Rumaku Legal Center</h1>
          </div>
          <p className="text-xl">
            Your guide to property laws and regulations in Indonesia
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="property-owners" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Property Owners
            </TabsTrigger>
            <TabsTrigger value="developers" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Developers
            </TabsTrigger>
            <TabsTrigger value="buyers" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Buyers
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4" />
              Agents
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="property-owners">
              <h2 className="text-2xl font-bold mb-4">
                Legal Information for Property Owners
              </h2>
              <LegalSection
                title="Selling Your Property"
                description="Essential legal information for property owners looking to sell their property in Indonesia."
                items={propertyOwnersContent}
              />
            </TabsContent>

            <TabsContent value="developers">
              <h2 className="text-2xl font-bold mb-4">
                Legal Information for Developers
              </h2>
              <LegalSection
                title="Property Development Regulations"
                description="Key legal considerations for property developers in Indonesia."
                items={developersContent}
              />
            </TabsContent>

            <TabsContent value="buyers">
              <h2 className="text-2xl font-bold mb-4">
                Legal Information for Buyers
              </h2>
              <LegalSection
                title="Property Buying Guide"
                description="Important legal aspects to consider when buying property in Indonesia."
                items={buyersContent}
              />
            </TabsContent>

            <TabsContent value="agents">
              <h2 className="text-2xl font-bold mb-4">
                Legal Reference for Agents
              </h2>
              <LegalSection
                title="Agent Responsibilities and Guidelines"
                description="Legal information to help agents assist their clients effectively."
                items={agentsContent}
              />
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Need Professional Legal Advice?
          </h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                While this guide provides general information, it's always
                recommended to consult with a qualified legal professional for
                specific advice tailored to your situation.
              </p>
              <Button asChild>
                <Link href="/find-legal-expert">Find a Legal Expert</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
