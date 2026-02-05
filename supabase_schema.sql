-- Create the reviews table
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    thumbnail TEXT DEFAULT '/movie-review.png',
    rating NUMERIC,
    views TEXT DEFAULT '0',
    duration TEXT DEFAULT '00:00',
    reviewer TEXT NOT NULL,
    publish_date TEXT DEFAULT to_char(now(), 'Month DD, YYYY'),
    description TEXT,
    video_embed TEXT,
    video_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (
        status IN ('pending', 'published', 'rejected', 'archived')
    )
);
-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
-- Create Policy: Allow Public Read Access for all reviews (simplifying for now to allow viewing pending reviews indiscriminately or filtering in app, 
-- ideally we'd restrict pending to admins, but for this step let's allow read)
CREATE POLICY "Public reviews are viewable by everyone" ON reviews FOR
SELECT USING (true);
-- Create Policy: Allow Anon Insert (for submissions)
CREATE POLICY "Anyone can submit a review" ON reviews FOR
INSERT WITH CHECK (true);
-- Create Policy: Allow All Actions for now (Simplification for "Admin" mode without Auth)
-- In a real app, you'd use authenticated roles. For this demo, we'll allow updates/deletes publically 
-- so the admin dashboard works without implementing a full auth system yet.
CREATE POLICY "Public full access" ON reviews FOR ALL USING (true);