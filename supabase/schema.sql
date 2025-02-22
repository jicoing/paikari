-- Create grocery_items table
CREATE TABLE grocery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create price_data table
CREATE TABLE price_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID REFERENCES grocery_items(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster searches
CREATE INDEX idx_grocery_items_name ON grocery_items USING GIN (to_tsvector('english', name));
CREATE INDEX idx_price_data_city ON price_data (city);
CREATE INDEX idx_price_data_item_id ON price_data (item_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for price_data
CREATE TRIGGER update_price_data_updated_at
    BEFORE UPDATE ON price_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
