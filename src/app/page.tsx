"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { CityPriceComparison } from "@/components/city-price-comparison"
import { ModeToggle } from "@/components/mode-toggle"
import type { GroceryItem } from "@/lib/supabase"

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null)

  return (
    <main className="min-h-screen p-4 md:p-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Paikari</h1>
        <ModeToggle />
      </nav>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">
            Paikari
          </h2>
          <p className="text-lg text-muted-foreground">
            Get real-time price comparisons for groceries in major Indian cities
          </p>
        </section>

        <SearchBar onItemSelect={setSelectedItem} />
        
        <CityPriceComparison selectedItem={selectedItem} />
      </div>
      <footer className="text-sm text-gray-500 text-center">
        The displayed data is sourced from the <a href="https://data.gov.in" className="text-blue-500 underline">data.gov.in</a> open-source platform.
        <div className="text-center text-sm text-gray-500 mt-2">
          Support me at <a href="https://buymeacoffee.com/jicoing" className="text-blue-500 underline">buymeacoffee.com/jicoing</a>
        </div>
      </footer>
    </main>
  )
}
