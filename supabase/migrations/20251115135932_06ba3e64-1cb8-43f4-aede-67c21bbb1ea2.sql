-- Add bedrooms and beds columns to listings table
ALTER TABLE public.listings 
ADD COLUMN bedrooms integer NOT NULL DEFAULT 1,
ADD COLUMN beds integer NOT NULL DEFAULT 1;

-- Add check constraints to ensure positive values
ALTER TABLE public.listings
ADD CONSTRAINT bedrooms_positive CHECK (bedrooms > 0),
ADD CONSTRAINT beds_positive CHECK (beds > 0);