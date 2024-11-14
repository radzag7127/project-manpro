"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Book,
  FileText,
  HelpCircle,
  Home,
  Building,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";
import { LegalCenterFirstPages } from "../00-LegalCenter/LegalCenter1";
import Image from "next/image";

interface LegalArticle {
  id: string;
  title: string;
  summary: string;
  category: "regulation" | "guide" | "faq";
}

const legalArticles: LegalArticle[] = [
  {
    id: "1",
    title: "New Property Tax Regulations for 2024",
    summary:
      "Overview of the latest property tax changes affecting homeowners and investors in Indonesia.",
    category: "regulation",
  },
  {
    id: "2",
    title: "Understanding Property Ownership Rights in Indonesia",
    summary:
      "A comprehensive guide to different types of property ownership rights for locals and foreigners.",
    category: "guide",
  },
  {
    id: "3",
    title: "How to Legally Conduct a Property Transaction",
    summary:
      "Step-by-step guide to ensure your property purchase or sale is legally compliant.",
    category: "guide",
  },
  {
    id: "4",
    title: "Can foreigners own property in Indonesia?",
    summary:
      "Explanation of the rules and restrictions regarding foreign property ownership in Indonesia.",
    category: "faq",
  },
  {
    id: "5",
    title: "Recent Changes in Zoning Laws",
    summary:
      "Updates on zoning regulations that may affect property development and usage.",
    category: "regulation",
  },
  {
    id: "6",
    title: "What taxes do I need to pay when selling a property?",
    summary:
      "Breakdown of the various taxes involved in selling a property in Indonesia.",
    category: "faq",
  },
];

interface LegalSectionContent {
  question: string;
  answer: string;
  link?: string;
}

const userSpecificContent = {
  propertyOwners: [
    {
      question:
        "What are the legal requirements for listing a property for sale?",
      answer:
        "To list a property, you need: 1) Valid ownership certificate (SHM/SHGB), 2) Property tax payment proof (PBB), 3) Building permit (IMB), 4) Accurate property documentation and disclosure of any issues.",
      link: "/property-listing-requirements",
    },
    {
      question: "What taxes do I need to pay when selling my property?",
      answer:
        "Property sellers are required to pay: 1) Income tax (PPh) at 2.5% of the transaction value, 2) Local transfer tax if applicable, 3) Notary and legal fees for transfer documentation.",
      link: "/property-sale-taxes",
    },
    {
      question: "How do I legally transfer property ownership?",
      answer:
        "The process involves: 1) Sale and Purchase Deed (AJB) preparation, 2) Payment of taxes and fees, 3) Title deed transfer at the Land Office (BPN), 4) Registration of the new ownership certificate.",
      link: "/property-transfer-guide",
    },
  ],
  developers: [
    {
      question:
        "What permits are required before starting a development project?",
      answer:
        "Required permits include: 1) Location Permit (IL), 2) Environmental Impact Analysis (AMDAL), 3) Building Construction Permit (IMB), 4) Business Trading License (SIUP), 5) Company Registration Certificate (TDP).",
      link: "/development-permits",
    },
    {
      question: "What are the zoning and building regulations?",
      answer:
        "Key regulations cover: 1) Land use designation, 2) Building height restrictions, 3) Floor Area Ratio (FAR), 4) Building Coverage Ratio (BCR), 5) Green space requirements, 6) Parking provisions.",
      link: "/zoning-regulations",
    },
    {
      question: "What are the legal requirements for marketing pre-sale units?",
      answer:
        "Requirements include: 1) Valid development permits, 2) Land ownership certification, 3) Building specifications documentation, 4) Clear payment terms and schedules, 5) Buyer protection guarantees.",
      link: "/presale-requirements",
    },
  ],
  buyers: [
    {
      question: "What should I check before purchasing a property?",
      answer:
        "Essential checks include: 1) Property ownership status, 2) Building permits and certificates, 3) Tax payment history, 4) Property liens or disputes, 5) Zoning regulations, 6) Developer track record for new developments.",
      link: "/property-purchase-checklist",
    },
    {
      question:
        "What are the different types of property ownership in Indonesia?",
      answer:
        "Main ownership types are: 1) Hak Milik (Freehold), 2) Hak Guna Bangunan (Right to Build), 3) Hak Pakai (Right to Use), 4) Strata Title for apartments. Each has different rights and restrictions.",
      link: "/ownership-types",
    },
    {
      question: "What are the legal steps in the buying process?",
      answer:
        "The process includes: 1) Property verification, 2) Price negotiation, 3) Down payment agreement, 4) Sale and Purchase Agreement (PPJB), 5) Final deed transfer (AJB), 6) Certificate registration.",
      link: "/buying-process",
    },
  ],
  agents: [
    {
      question: "What are the legal requirements for property agents?",
      answer:
        "Requirements include: 1) Professional certification from REI/AREBI, 2) Business license if operating an agency, 3) Understanding of property laws and regulations, 4) Compliance with ethical standards.",
      link: "/agent-requirements",
    },
    {
      question: "What are the agent's legal responsibilities?",
      answer:
        "Key responsibilities: 1) Accurate property information disclosure, 2) Due diligence assistance, 3) Documentation handling, 4) Client confidentiality, 5) Transparent fee structures, 6) Ethical marketing practices.",
      link: "/agent-responsibilities",
    },
    {
      question: "How to legally handle property transactions?",
      answer:
        "Agents must: 1) Verify property documentation, 2) Facilitate proper agreement preparation, 3) Ensure compliance with regulations, 4) Maintain transaction records, 5) Guide clients through legal processes.",
      link: "/transaction-handling",
    },
  ],
};

const legalPartners = [
  "HukumOnline",
  "HHP Law",
  "ST Legal",
  "SSEK Law",
  "Makarim Law",
  "AHP Law",
  "HBT Legal",
  "GR Law Firm",
  "W&P Legal",
  "ABNR Law",
];

export function LegalCenters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(
        (prevPosition) => (prevPosition + 1) % (legalPartners.length * 200)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const filteredArticles = legalArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-background">
        <HeaderComponents />
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Legal Center</h1>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search legal topics..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
              <TabsTrigger value="guides">Legal Guides</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Card key={article.id}>
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        {article.category.charAt(0).toUpperCase() +
                          article.category.slice(1)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{article.summary}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">Read More</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regulations">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles
                  .filter((article) => article.category === "regulation")
                  .map((article) => (
                    <Card key={article.id}>
                      <CardHeader>
                        <CardTitle>{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{article.summary}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Read More</Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles
                  .filter((article) => article.category === "guide")
                  .map((article) => (
                    <Card key={article.id}>
                      <CardHeader>
                        <CardTitle>{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{article.summary}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Read More</Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="faqs">
              <Accordion type="single" collapsible className="w-full">
                {filteredArticles
                  .filter((article) => article.category === "faq")
                  .map((article) => (
                    <AccordionItem key={article.id} value={article.id}>
                      <AccordionTrigger>{article.title}</AccordionTrigger>
                      <AccordionContent>
                        {article.summary}
                        <Button variant="link" className="mt-2 p-0">
                          Read full answer
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </TabsContent>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                Legal Information Sections
              </h2>
              <Tabs defaultValue="property-owners" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger
                    value="property-owners"
                    className="flex items-center"
                  >
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

                <TabsContent value="property-owners">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Legal Information for Property Owners
                      </CardTitle>
                      <CardDescription>
                        Essential legal information for property owners in
                        Indonesia
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {userSpecificContent.propertyOwners.map(
                          (item, index) => (
                            <AccordionItem key={index} value={`po-${index}`}>
                              <AccordionTrigger>
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                {item.answer}
                                {item.link && (
                                  <Button variant="link" className="mt-2 p-0">
                                    <Link href={item.link}>Learn more</Link>
                                  </Button>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link href="/property-owner-legal-guide">
                          View Complete Guide
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="developers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Legal Information for Developers</CardTitle>
                      <CardDescription>
                        Key legal considerations for property developers in
                        Indonesia
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {userSpecificContent.developers.map((item, index) => (
                          <AccordionItem key={index} value={`dev-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                              {item.answer}
                              {item.link && (
                                <Button variant="link" className="mt-2 p-0">
                                  <Link href={item.link}>Learn more</Link>
                                </Button>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link href="/developer-legal-guide">
                          View Complete Guide
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="buyers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Legal Information for Buyers</CardTitle>
                      <CardDescription>
                        Essential legal aspects to consider when buying property
                        in Indonesia
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {userSpecificContent.buyers.map((item, index) => (
                          <AccordionItem key={index} value={`buy-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                              {item.answer}
                              {item.link && (
                                <Button variant="link" className="mt-2 p-0">
                                  <Link href={item.link}>Learn more</Link>
                                </Button>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link href="/buyer-legal-guide">
                          View Complete Guide
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="agents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Legal Information for Agents</CardTitle>
                      <CardDescription>
                        Legal guidelines to help agents assist their clients
                        effectively
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {userSpecificContent.agents.map((item, index) => (
                          <AccordionItem key={index} value={`agent-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                              {item.answer}
                              {item.link && (
                                <Button variant="link" className="mt-2 p-0">
                                  <Link href={item.link}>Learn more</Link>
                                </Button>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link href="/agent-legal-guide">
                          View Complete Guide
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </Tabs>
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">
              Essential Property Laws and Rights
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="mr-2" />
                    Property Ownership Laws
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    In Indonesia, there are several types of land titles,
                    including Hak Milik (freehold), Hak Guna Bangunan (right to
                    build), and Hak Pakai (right to use). Each type has
                    different rights and restrictions, especially for foreign
                    buyers.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Learn More</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2" />
                    Property Transaction Regulations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Property transactions in Indonesia involve several legal
                    steps, including due diligence, signing a conditional sale
                    and purchase agreement (PPJB), and transferring the title
                    deed. It's crucial to understand these steps to ensure a
                    smooth transaction.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Learn More</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Our Trusted Partners</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2" />
                  Legal Expertise Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Rumaku has partnered with top legal firms in Indonesia to
                  provide expert advice on property law matters.
                </p>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                  <div
                    className="flex w-max space-x-4 p-4"
                    style={{ transform: `translateX(-${scrollPosition}px)` }}
                  >
                    {legalPartners
                      .concat(legalPartners)
                      .map((partner, index) => (
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
              <CardFooter>
                <Button>Request a Consultation</Button>
              </CardFooter>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
