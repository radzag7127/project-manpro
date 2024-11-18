"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/routes/user-page" className="text-2xl font-bold">
          Rumaku
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/routes/listings" className="hover:underline">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/routes/about-us" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/routes/contact-us" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <UserCircle size={24} />
                    <ChevronDown size={16} className="ml-1" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/routes/property-owner-profile"
                      className="w-full"
                    >
                      Account Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/" className="w-full">
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
