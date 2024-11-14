"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Home, Building, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Authentications() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const [sellerType, setSellerType] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const userTypes = [
    { label: "Buyer", href: "/routes/buyer-dashboard" },
    { label: "Property Owner", href: "/routes/user-profile-seller" },
    { label: "Property Developer", href: "/routes/developer-dashboard" },
    { label: "Agent", href: "/routes/agent-dashboard" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Rumaku
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Find your dream property or list your own
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">
                      Login
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-full">
                    {userTypes.map((type) => (
                      <DropdownMenuItem key={type.label} className="w-full">
                        <Link href={type.href} className="w-full block py-2">
                          Login as {type.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="text-sm text-center">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Choose your account type and fill in your details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  defaultValue="buyer"
                  onValueChange={setUserType}
                  className="flex justify-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Buyer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller" className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Seller
                    </Label>
                  </div>
                </RadioGroup>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="johndoe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                {userType === "seller" && (
                  <div className="space-y-2">
                    <Label htmlFor="sellerType">Seller Type</Label>
                    <Select onValueChange={setSellerType}>
                      <SelectTrigger id="sellerType">
                        <SelectValue placeholder="Select seller type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="propertyOwner">
                          Property Owner
                        </SelectItem>
                        <SelectItem value="propertyDeveloper">
                          Property Developer
                        </SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {userType === "seller" &&
                  sellerType === "propertyDeveloper" && (
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company" required />
                    </div>
                  )}
                {userType === "seller" && sellerType === "agent" && (
                  <div className="space-y-2">
                    <Label htmlFor="agency">Agency Name</Label>
                    <Input id="agency" placeholder="Your Agency" required />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {userType === "buyer" ? (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      Register as Buyer
                    </>
                  ) : (
                    <>
                      <Building className="h-4 w-4 mr-2" />
                      Register as{" "}
                      {sellerType
                        ? sellerType.replace(/([A-Z])/g, " $1").trim()
                        : "Seller"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
