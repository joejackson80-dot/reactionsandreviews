-- Migration to enhance security with Role Based Access Control (RBAC)
-- 1. Create profiles table to store user roles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- 2. Profiles policies
-- Everyone can see profile names (safe)
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR
SELECT USING (true);
-- Users can only update their own profile
CREATE POLICY "Users can update own profile" ON profiles FOR
UPDATE USING (auth.uid() = id);
-- 3. Function to automatically create a profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$ BEGIN -- The first user to EVER sign up could be an admin, or we manually set it later.
    -- For now, default all to user.
INSERT INTO public.profiles (id, full_name, role)
VALUES (
        new.id,
        new.raw_user_meta_data->>'full_name',
        'user'
    );
RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
-- 4. Fix Reviews Security
-- Drop the dangerous "Public full access" policy
DROP POLICY IF EXISTS "Public full access" ON reviews;
-- Create Admin-only policy for sensitive actions (Update, Delete, Approve)
CREATE POLICY "Admins have full access" ON reviews FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1
        FROM profiles
        WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
    )
);
-- Public can still see published reviews (standard)
DROP POLICY IF EXISTS "Public reviews are viewable by everyone" ON reviews;
CREATE POLICY "Published reviews are viewable by everyone" ON reviews FOR
SELECT USING (
        status = 'published'
        OR (
            EXISTS (
                SELECT 1
                FROM profiles
                WHERE profiles.id = auth.uid()
                    AND profiles.role = 'admin'
            )
        )
    );
-- Anyone can still submit reviews (leads to pending)
DROP POLICY IF EXISTS "Anyone can submit a review" ON reviews;
CREATE POLICY "Anyone can submit a review" ON reviews FOR
INSERT WITH CHECK (true);