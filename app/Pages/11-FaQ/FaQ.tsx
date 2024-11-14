'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HeaderComponents from '../0-PageProperties/Header'
import { Footer } from '../0-PageProperties/Footer'

interface FAQItem {
  question: string
  answer: string
  category: 'buyers' | 'sellers' | 'account' | 'technical'
}

const faqs: FAQItem[] = [
  {
    question: "How do I search for properties on Rumaku?",
    answer: "You can use the search bar on our homepage to look for properties by location, type, or price range. You can also use advanced filters to refine your search results.",
    category: "buyers"
  },
  {
    question: "Can I save properties I'm interested in?",
    answer: "Yes, you can save properties to your wishlist by clicking the 'Save' button on any property listing. You'll need to be logged in to use this feature.",
    category: "buyers"
  },
  {
    question: "How do I contact a seller about a property?",
    answer: "Each property listing has a 'Contact Seller' button. Click this to send a message directly to the seller through our platform.",
    category: "buyers"
  },
  {
    question: "How do I list my property on Rumaku?",
    answer: "To list your property, log in to your account, go to your dashboard, and click on 'Add New Listing'. Follow the prompts to enter your property details and upload photos.",
    category: "sellers"
  },
  {
    question: "What are the fees for listing a property?",
    answer: "Rumaku operates on a fair fee structure. We charge a small percentage only when your property is sold. There are no upfront costs for listing.",
    category: "sellers"
  },
  {
    question: "How long does it take for my listing to appear on the site?",
    answer: "Once submitted, listings are typically reviewed and approved within 24-48 hours. After approval, your property will be immediately visible to potential buyers.",
    category: "sellers"
  },
  {
    question: "How do I create an account on Rumaku?",
    answer: "Click on the 'Sign Up' button in the top right corner of the homepage. Fill in your details and choose whether you're registering as a buyer or seller.",
    category: "account"
  },
  {
    question: "How can I reset my password?",
    answer: "On the login page, click 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password.",
    category: "account"
  },
  {
    question: "Can I change my account type from buyer to seller or vice versa?",
    answer: "Yes, you can change your account type in your account settings. Note that additional verification may be required when switching to a seller account.",
    category: "account"
  },
  {
    question: "What should I do if I can't log in to my account?",
    answer: "First, ensure you're using the correct email and password. If you still can't log in, use the 'Forgot Password' feature. If issues persist, contact our support team.",
    category: "technical"
  },
  {
    question: "How do I report a technical issue or bug?",
    answer: "You can report technical issues through our 'Contact Us' page. Please provide as much detail as possible about the problem you're experiencing.",
    category: "technical"
  },
  {
    question: "Is my personal and financial information secure on Rumaku?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent.",
    category: "technical"
  }
]

export function BlockPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredFAQs = faqs.filter(faq => 
    (activeTab === 'all' || faq.category === activeTab) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background">
      <HeaderComponents/>

      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

        <div className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="buyers">For Buyers</TabsTrigger>
            <TabsTrigger value="sellers">For Sellers</TabsTrigger>
            <TabsTrigger value="account">Account Management</TabsTrigger>
            <TabsTrigger value="technical">Technical Support</TabsTrigger>
          </TabsList>
        </Tabs>

        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFAQs.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No FAQs found. Please try a different search term or category.
          </p>
        )}

        <div className="mt-12 text-center">
          <p className="mb-4">Can't find what you're looking for?</p>
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </main>
      <Footer/>
    </div>
  )
}