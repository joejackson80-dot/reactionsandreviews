-- Add likes column to reviews table
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;
-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL
);
-- Enable RLS for comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
-- Allow Public Read Access for comments
CREATE POLICY "Public comments are viewable by everyone" ON comments FOR
SELECT USING (true);
-- Allow Anon Insert for comments
CREATE POLICY "Anyone can post comments" ON comments FOR
INSERT WITH CHECK (true);
-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT UNIQUE NOT NULL
);
-- Enable RLS for newsletter
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
-- Allow Anon Insert for newsletter
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR
INSERT WITH CHECK (true);