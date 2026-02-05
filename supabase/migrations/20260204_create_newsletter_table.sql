-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
-- Policy: Allow anyone to subscribe (insert)
CREATE POLICY "Allow public newsletter subscription" ON newsletter_subscribers FOR
INSERT TO public WITH CHECK (true);
-- Policy: Allow only service_role (admins/internal) to view subscribers
-- (Implicitly denies select to public since no policy grants it)
CREATE POLICY "Allow service_role to view subscribers" ON newsletter_subscribers FOR
SELECT TO service_role USING (true);
-- Optional: Allow authenticated users to view/delete their own subscription?
-- For now, keep it simple. Only admins see the list.