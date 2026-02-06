-- Add Social Links and Global Branding to site_settings
INSERT INTO site_settings (key, value)
VALUES (
        'social_links',
        '{"youtube": "#", "twitter": "#", "instagram": "#", "tiktok": "#"}'::jsonb
    ),
    (
        'site_branding',
        '{"motto": "Honest Reactions. Real Reviews. No Fluff.", "established": "2026"}'::jsonb
    ) ON CONFLICT (key) DO
UPDATE
SET value = EXCLUDED.value;
-- Create 'affiliate_clicks' table to track revenue performance
CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    destination_url TEXT NOT NULL,
    session_id TEXT
);
-- Enable RLS for click tracking
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a click" ON affiliate_clicks FOR
INSERT WITH CHECK (true);
CREATE POLICY "Public read analytics" ON affiliate_clicks FOR
SELECT USING (true);
-- Add 'last_viewed_at' to help with "Trending" algorithms
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS last_viewed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());