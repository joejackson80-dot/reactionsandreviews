-- STEP 1: First, let's check if views column has any non-numeric data
-- Run this first to see what we're dealing with:
-- SELECT views FROM reviews WHERE views !~ '^\d+$' LIMIT 10;
-- STEP 2: Update any non-numeric views to '0' before conversion
UPDATE reviews
SET views = '0'
WHERE views !~ '^\d+$'
    OR views IS NULL;
-- STEP 3: Now safely convert to INTEGER
ALTER TABLE reviews
ALTER COLUMN views TYPE INTEGER USING views::integer;
-- STEP 4: Set default value
ALTER TABLE reviews
ALTER COLUMN views
SET DEFAULT 0;