"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchGroceryItems } from "@/lib/api"
import type { GroceryItem } from "@/lib/supabase"

interface SearchBarProps {
  onItemSelect: (item: GroceryItem) => void
}

type Category = 'fruits' | 'vegetables' | 'essentials' | 'grains';

const categoryIcons: { [key in Category]: string } = {
  fruits: '🍏',
  vegetables: '🥕',
  essentials: '🛒',
  grains: '🌾',
};

export function SearchBar({ onItemSelect }: SearchBarProps) {
  const [query, setQuery] = React.useState("")
  const [items, setItems] = React.useState<GroceryItem[]>([])
  const [loading, setLoading] = React.useState(false)
  const [suggestions, setSuggestions] = React.useState<{ name: string; category: Category }[]>([])
  const [error, setError] = React.useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent | string) => {
    if (typeof e === 'string') {
      setQuery(e)
    } else {
      e.preventDefault()
      if (!query.trim()) return
    }

    setLoading(true)
    try {
      const results = await searchGroceryItems(query)
      setItems(results)
      if (results.length === 1) {
        onItemSelect(results[0])
      }
    } catch (error) {
      setError('An error occurred while searching. Please try again.')
      setItems([]) // Clear items on error
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    try {
      const allSuggestions: { name: string; category: Category }[] = [
        { name: 'Rice', category: 'grains' },
        { name: 'Apple', category: 'fruits' },
        { name: 'Onion', category: 'vegetables' },
        { name: 'Tomato', category: 'vegetables' },
        { name: 'Potato', category: 'vegetables' },
        { name: 'Wheat', category: 'grains' },
        { name: 'Sugar', category: 'essentials' },
        { name: 'Mustard Oil', category: 'essentials' },
        { name: 'Green Chilli', category: 'vegetables' },
        { name: 'Brinjal', category: 'vegetables' },
        { name: 'Carrot', category: 'vegetables' },
        { name: 'Cabbage', category: 'vegetables' },
        { name: 'Grapes', category: 'fruits' },
        { name: 'Snakeguard', category: 'vegetables' },
        { name: 'Banana', category: 'fruits' },
        { name: 'Cauliflower', category: 'vegetables' },
        { name: 'Guava', category: 'fruits' },
        { name: 'Cucumbar', category: 'vegetables' },
        { name: 'Orange', category: 'fruits' },
        { name: 'Coconut', category: 'essentials' },
        { name: 'Ginger(Dry)', category: 'essentials' },
        { name: 'Turmeric', category: 'essentials' },
        { name: 'Garlic', category: 'vegetables' },
        { name: 'Spinach', category: 'vegetables' },
        { name: 'Cotton', category: 'essentials' },
        { name: 'Lemon', category: 'fruits' },
        { name: 'Coriander', category: 'essentials' },
        { name: 'Pumpkin', category: 'vegetables' },
        { name: 'Capsicum', category: 'vegetables' },
        { name: 'Sweet Pumpkin', category: 'vegetables' },
        { name: 'Maize', category: 'grains' },
      ];
      const filteredSuggestions = allSuggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setError(null) // Clear any previous errors
    } catch (err) {
      setError('An error occurred while fetching suggestions. Please try again.')
      setSuggestions([]) // Clear suggestions on error
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="w-full h-12 p-4 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          size="sm"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {error && <div className="text-red-500 absolute mt-1">{error}</div>} {/* Display error message */}
      {suggestions.length > 0 && (
        <div className="absolute mt-1 w-full rounded-md border bg-popover shadow-md">
          <ul className="py-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-accent"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                <span>{categoryIcons[suggestion.category]} </span> {/* Render the icon */}
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {items.length > 0 && (
        <div className="absolute mt-12 w-full rounded-md border bg-popover shadow-md">
          <ul className="py-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer px-4 py-2 hover:bg-accent"
                onClick={() => {
                  onItemSelect(item)
                  setItems([])
                  setQuery(item.name)
                }}
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">
                  {item.category} • {item.unit}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
