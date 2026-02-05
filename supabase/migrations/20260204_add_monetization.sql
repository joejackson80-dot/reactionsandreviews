-- Migration to add monetization fields to reviews table
-- Add article_content column for written reviews/transcripts
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS article_content TEXT;
-- Add affiliate_link column for monetization URLs
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS affiliate_link TEXT;
-- Add tags column for better organization (optional but good for SEO)
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS tags TEXT [];
-- Update RLS policies (if needed) to ensure these are readable by everyone and editable by admins
-- (Assuming existing policies cover "all columns" for update/select, which is standard)