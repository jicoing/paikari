import { supabase, type GroceryItem, type PriceData } from './supabase'

export async function searchGroceryItems(query: string): Promise<GroceryItem[]> {
  const { data, error } = await supabase
    .from('grocery_items')
    .select('*')
    .textSearch('name', query)
    .limit(10)

  if (error) {
    console.error('Error searching grocery items:', error)
    return []
  }

  return data || []
}

export async function getPriceData(itemId: string): Promise<PriceData[]> {
  const { data, error } = await supabase
    .from('price_data')
    .select('*')
    .eq('item_id', itemId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching price data:', error)
    return []
  }

  return data || []
}

export async function getLatestPrices(itemId: string): Promise<Record<string, number>> {
  const prices = await getPriceData(itemId)
  
  return prices.reduce((acc, price) => {
    if (!acc[price.city] || new Date(price.updated_at) > new Date(acc[price.city])) {
      acc[price.city] = price.price
    }
    return acc
  }, {} as Record<string, number>)
}
