'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, SlidersHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface Property {
  id: string
  title: string
  price: number
  location: string
  type: string
  imageUrl: string
  description: string
  rating: number
  traditional: boolean
  spiritual: boolean
}

const properties: Property[] = [
  { id: '1', title: 'Modern Apartment in Jakarta', price: 500000000, location: 'Jakarta', type: 'Apartment', imageUrl: '/placeholder.svg?height=200&width=300', description: 'Sleek and modern apartment in the heart of Jakarta.', rating: 4.5, traditional: false, spiritual: false },
  { id: '2', title: 'Traditional Balinese Villa', price: 2000000000, location: 'Bali', type: 'Villa', imageUrl: '/placeholder.svg?height=200&width=300', description: 'Experience the beauty of Balinese culture in this traditional villa.', rating: 4.8, traditional: true, spiritual: true },
  { id: '3', title: 'Spacious Family House in Bandung', price: 1500000000, location: 'Bandung', type: 'House', imageUrl: '/placeholder.svg?height=200&width=300', description: 'Perfect for families, close to schools and amenities.', rating: 4.2, traditional: false, spiritual: false },
  { id: '4', title: 'Spiritual Retreat in Ubud', price: 1800000000, location: 'Bali', type: 'Villa', imageUrl: '/placeholder.svg?height=200&width=300', description: 'Find peace and tranquility in this spiritual haven.', rating: 4.9, traditional: false, spiritual: true },
  { id: '5', title: 'Modern Condo with City View', price: 750000000, location: 'Jakarta', type: 'Apartment', imageUrl: '/placeholder.svg?height=200&width=300', description: 'Enjoy breathtaking city views from this modern condo.', rating: 4.3, traditional: false, spiritual: false },
  { id: '6', title: 'Traditional Javanese House', price: 1200000000, location: 'Yogyakarta', type: 'House', imageUrl: '/placeholder.svg?height=200&width=300', description: 'Experience authentic Javanese architecture and culture.', rating: 4.7, traditional: true, spiritual: false },
]

export default function ListingsPage() {
  const [sortBy, setSortBy] = useState('relevance')
  const [filteredProperties, setFilteredProperties] = useState(properties)

  const handleSort = (criteria: string) => {
    setSortBy(criteria)
    let sorted = [...filteredProperties]
    if (criteria === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating)
    } else {
      sorted = [...properties]
    }
    setFilteredProperties(sorted)
  }

  const applyFilters = (filters: any) => {
    let filtered = properties.filter(property => 
      (!filters.type || property.type === filters.type) &&
      (!filters.location || property.location === filters.location) &&
      (!filters.minPrice || property.price >= filters.minPrice) &&
      (!filters.maxPrice || property.price <= filters.maxPrice) &&
      (!filters.traditional || property.traditional) &&
      (!filters.spiritual || property.spiritual)
    )
    setFilteredProperties(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Rumaku</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/listings" className="hover:underline">Listings</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/login" className="hover:underline">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Property Listings</h1>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div className="w-full md:w-2/3 flex items-center gap-2">
            <Input placeholder="Search properties..." className="flex-grow" />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="w-full md:w-1/3 flex justify-end items-center gap-2">
            <Select value={sortBy} onValueChange={handleSort}>
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Sort by Rating</option>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                  <SheetDescription>
                    Adjust the filters to find your perfect property.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <Select onValueChange={(value) => applyFilters({ type: value })}>
                    <option value="">Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                  </Select>
                  <Select onValueChange={(value) => applyFilters({ location: value })}>
                    <option value="">Location</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bali">Bali</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                  </Select>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Min Price" onChange={(e) => applyFilters({ minPrice: Number(e.target.value) })} />
                    <Input type="number" placeholder="Max Price" onChange={(e) => applyFilters({ maxPrice: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="traditional" onCheckedChange={(checked) => applyFilters({ traditional: checked })} />
                      <label htmlFor="traditional">Traditional</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="spiritual" onCheckedChange={(checked) => applyFilters({ spiritual: checked })} />
                      <label htmlFor="spiritual">Spiritual</label>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <Image src={property.imageUrl} alt={property.title} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle>{property.title}</CardTitle>
                <p className="text-muted-foreground">{property.location}</p>
                <p className="font-bold mt-2">{property.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                <p className="mt-2 text-sm">{property.description}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{property.rating.toFixed(1)}</span>
                </div>
                {property.traditional && <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 mt-2">Traditional</span>}
                {property.spiritual && <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-800 mt-2">Spiritual</span>}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Rumaku. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/terms" className="hover:underline mr-4">Terms of Service</Link>
            <Link href="/privacy" className="hover:underline mr-4">Privacy Policy</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}