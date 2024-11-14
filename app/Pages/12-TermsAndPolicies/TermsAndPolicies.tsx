"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeaderComponents from "../0-PageProperties/Header";
import { Footer } from "../0-PageProperties/Footer";

export function TermsAndPolicies() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderComponents />

      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Legal Information
        </h1>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          </TabsList>
          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>Last updated: May 1, 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    1. Acceptance of Terms
                  </h2>
                  <p>
                    By accessing or using Rumaku, you agree to be bound by these
                    Terms & Conditions. If you disagree with any part of the
                    terms, you may not access the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    2. Use of the Service
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You must be at least 18 years old to use Rumaku.</li>
                    <li>
                      You are responsible for maintaining the confidentiality of
                      your account and password.
                    </li>
                    <li>
                      You agree to provide accurate and complete information
                      when creating an account.
                    </li>
                    <li>
                      You must not use the service for any illegal or
                      unauthorized purpose.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    3. Property Listings
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Sellers are responsible for the accuracy of their
                      listings.
                    </li>
                    <li>
                      Rumaku reserves the right to remove any listing that
                      violates our policies.
                    </li>
                    <li>
                      We do not guarantee the accuracy or completeness of any
                      listing.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    4. Fees and Payments
                  </h2>
                  <p>
                    Rumaku charges a fee for successful property transactions.
                    The current fee structure is available on our pricing page.
                    We reserve the right to change our fees with prior notice to
                    users.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    5. Limitation of Liability
                  </h2>
                  <p>
                    Rumaku is not responsible for any damages or losses
                    resulting from your use of the service. We do not guarantee
                    the accuracy or completeness of any information on the
                    platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    6. Changes to Terms
                  </h2>
                  <p>
                    We reserve the right to modify these terms at any time. We
                    will provide notice of significant changes by posting an
                    announcement on our website.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>Last updated: May 1, 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    1. Information We Collect
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Personal information (name, email, phone number) when you
                      create an account.
                    </li>
                    <li>Property details when you create a listing.</li>
                    <li>
                      Usage data and analytics when you browse our website.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    2. How We Use Your Information
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide and improve our services.</li>
                    <li>
                      To communicate with you about your account or
                      transactions.
                    </li>
                    <li>
                      To send you marketing and promotional materials (with your
                      consent).
                    </li>
                    <li>To comply with legal obligations.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    3. Data Sharing
                  </h2>
                  <p>
                    We do not sell your personal information. We may share your
                    information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Service providers who help us operate our platform.</li>
                    <li>
                      Other users when necessary (e.g., when a buyer contacts a
                      seller).
                    </li>
                    <li>Legal authorities when required by law.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    4. Cookies and Tracking
                  </h2>
                  <p>
                    We use cookies and similar tracking technologies to improve
                    your browsing experience, analyze site traffic, and
                    understand where our audience is coming from.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    5. Your Rights
                  </h2>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal information we hold about you.</li>
                    <li>Correct any inaccurate information.</li>
                    <li>
                      Request deletion of your data (subject to legal
                      requirements).
                    </li>
                    <li>Opt-out of marketing communications.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    6. Data Security
                  </h2>
                  <p>
                    We implement appropriate technical and organizational
                    measures to protect your personal information. However, no
                    method of transmission over the Internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">
                    7. Changes to Privacy Policy
                  </h2>
                  <p>
                    We may update this privacy policy from time to time. We will
                    notify you of any changes by posting the new policy on this
                    page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at privacy@rumaku.com.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
