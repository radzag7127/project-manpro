"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";

export function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, subject, message });
    // Reset form fields
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponents />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="min-h-[150px]"
              />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span>info@rumaku.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary mt-1" />
                <span>
                  Rumaku Headquarters
                  <br />
                  Jl. Sudirman No. 123
                  <br />
                  Jakarta 12345, Indonesia
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Our Location</h3>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Rumaku Office Location"
                width={500}
                height={300}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I list my property on Rumaku?
              </AccordionTrigger>
              <AccordionContent>
                To list your property on Rumaku, you need to create a seller
                account. Once logged in, you can easily add your property
                details, upload photos, and set your pricing. Our team will
                review your listing before it goes live.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What are the fees for using Rumaku?
              </AccordionTrigger>
              <AccordionContent>
                Rumaku operates on a fair and transparent fee structure. We
                charge a small percentage of the final sale price only when your
                property is sold. There are no upfront costs or hidden fees for
                listing your property.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How long does it take for my listing to appear on the site?
              </AccordionTrigger>
              <AccordionContent>
                Once you submit your listing, our team typically reviews and
                approves it within 24-48 hours. After approval, your property
                will be immediately visible to potential buyers on our platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
