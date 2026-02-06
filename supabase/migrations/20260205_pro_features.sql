-- Add professional feature columns to reviews table
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS pros TEXT [] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS cons TEXT [] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS verdict TEXT,
    ADD COLUMN IF NOT EXISTS user_rating_avg NUMERIC DEFAULT 0,
    ADD COLUMN IF NOT EXISTS user_rating_count INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS gear_items JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT false;