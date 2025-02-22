"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cities } from "@/lib/supabase"
import type { GroceryItem } from "@/lib/supabase"
import { getLatestPrices } from "@/lib/api"

interface CityPriceComparisonProps {
  selectedItem: GroceryItem | null
}

export function CityPriceComparison({ selectedItem }: CityPriceComparisonProps) {
  const [prices, setPrices] = React.useState<Record<string, number>>({})
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function fetchPrices() {
      if (!selectedItem) {
        setPrices({})
        return
      }

      setLoading(true)
      try {
        const latestPrices = await getLatestPrices(selectedItem.id)
        setPrices(latestPrices)
      } catch (error) {
        console.error('Error fetching prices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [selectedItem])

  if (!selectedItem) {
    return (
      <div className="text-center text-muted-foreground">
        Search for a grocery item to see price comparison
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">
        Prices for {selectedItem.name}
        <span className="ml-2 text-sm text-muted-foreground">
          (per {selectedItem.unit})
        </span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <Card key={city}>
            <CardHeader>
              <CardTitle>{city}</CardTitle>
              <CardDescription>Latest price information</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 w-24 bg-muted rounded" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {prices[city] ? `₹${prices[city].toFixed(2)}` : 'N/A'}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    per {selectedItem.unit}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
