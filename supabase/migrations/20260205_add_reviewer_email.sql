-- Add reviewer_email column to reviews table
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS reviewer_email TEXT;