-- Create the site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
-- Public read access
CREATE POLICY "Site settings are viewable by everyone" ON site_settings FOR
SELECT USING (true);
-- Full access for now (simplification)
CREATE POLICY "Full access to settings for everyone" ON site_settings FOR ALL USING (true);
-- Insert default media kit contact email
INSERT INTO site_settings (key, value)
VALUES (
        'media_kit_contact_email',
        '"joejackson80@gmail.com"'
    ) ON CONFLICT (key) DO NOTHING;