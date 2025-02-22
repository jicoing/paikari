import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type GroceryItem = {
  id: string
  name: string
  category: string
  unit: string
  created_at: string
}

export type PriceData = {
  id: string
  item_id: string
  city: string
  price: number
  updated_at: string
}

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata"
] as const

export type City = typeof cities[number]
