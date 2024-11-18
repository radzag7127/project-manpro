"use client";

import { useState } from "react";
import { ChevronDown, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const plans = [
  {
    name: "Basic Plan",
    description:
      "Access to essential analytics, including property views and inquiries.",
    features: [
      "Weekly reports summarizing property performance",
      "Entry-level insights into regional demand trends",
      "Basic data visualization tools",
    ],
    pricingText: "Starts at an affordable rate—contact us for details",
  },
  {
    name: "Advanced Plan",
    description:
      "Includes all features from the Basic Plan, plus enhanced analytics and customization.",
    features: [
      "Detailed regional demand analysis",
      "Competitor benchmarking",
      "Customizable monthly reports with pricing suggestions",
      "Advanced data filtering and segmentation",
    ],
    pricingText: "Ideal for growing businesses—ask for a personalized quote",
  },
  {
    name: "Pro Plan",
    description:
      "Our most comprehensive package, tailored for enterprise needs.",
    features: [
      "Full access to predictive analytics, including demand projections",
      "Dedicated account manager",
      "Promotional strategy consulting",
      "API access for seamless integration",
      "Priority support and quarterly strategy reviews",
    ],
    pricingText: "Tailored for enterprise needs—contact us for a consultation",
  },
];

const customServices = [
  {
    name: "Market Trends Report",
    description:
      "In-depth analysis of current market trends and future projections.",
  },
  {
    name: "Demand Heatmap",
    description:
      "Visual representation of property demand across different regions.",
  },
  {
    name: "Competitor Analysis",
    description:
      "Comprehensive review of your competition's strategies and performance.",
  },
];

const testimonials = [
  {
    name: "John Smith",
    company: "Green Developers",
    quote:
      "The insights from Rumaku's premium services helped us optimize our pricing strategy, resulting in a 20% increase in inquiries.",
  },
  {
    name: "Sarah Lee",
    company: "Skyline Properties",
    quote:
      "The predictive analytics have been a game-changer for our business. We're now able to anticipate market trends and stay ahead of the competition.",
  },
];

const faqs = [
  {
    question: "How do I sign up for a plan?",
    answer:
      "To sign up for a plan, simply click on the 'Get Pricing Details' button for the plan you're interested in. You'll be directed to a form where you can provide your information and specific needs. Our team will then reach out to you with personalized pricing and to guide you through the sign-up process.",
  },
  {
    question: "What types of insights are included?",
    answer:
      "Our premium services offer a range of insights, including property performance analytics, regional demand trends, competitor benchmarking, and predictive market analysis. The specific insights vary by plan, with more advanced features available in higher-tier plans.",
  },
  {
    question: "Can I customize my plan based on my needs?",
    answer:
      "We understand that every developer has unique needs. While we offer structured plans, we're happy to work with you to customize a solution that fits your specific requirements. Contact us to discuss how we can tailor our services to your business.",
  },
  {
    question: "How often are the reports and data updated?",
    answer:
      "Data is updated in real-time, with reports generated on a weekly or monthly basis depending on your plan. Custom reports can be scheduled according to your preferences.",
  },
];

export function PremiumPayments() {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-6">
        Rumaku Premium Services
      </h1>
      <p className="text-xl text-center mb-12">
        Unlock the power of data-driven insights for your property business
      </p>

      {/* Service Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc pl-5 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-4">
                {plan.pricingText}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Get Pricing Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Pricing for {plan.name}</DialogTitle>
                    <DialogDescription>
                      Fill out this form and we'll get back to you with
                      personalized pricing information.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="needs">Business Needs</Label>
                      <Textarea
                        id="needs"
                        placeholder="Tell us about your specific business needs"
                      />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit">Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Custom Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Custom Services and Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customServices.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Request Information
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-primary text-primary-foreground p-12 rounded-lg mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Choose Rumaku Premium Services?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Make Smarter Decisions
            </h3>
            <p>
              Leverage data-driven insights to inform your property strategies
            </p>
          </div>
          <div>
            <ChevronDown className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Increase Visibility</h3>
            <p>
              Boost your property listings' visibility and attract more
              potential buyers
            </p>
          </div>
          <div>
            <Check className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Maximize ROI</h3>
            <p>
              Optimize your strategies to achieve the best return on your
              investments
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Elevate Your Property Business?
        </h2>
        <p className="text-xl mb-6">
          Get in touch with us to learn more about how our premium services can
          help you succeed.
        </p>
        <Button size="lg">Contact Us Today</Button>
      </section>
    </div>
  );
}
