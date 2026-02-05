import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Base URL
    const baseUrl = 'https://reactionsandreviews.com'; // Replace with actual domain

    // Fetch all published reviews
    const { data: reviews } = await supabase
        .from('reviews')
        .select('id, publish_date')
        .eq('status', 'published');

    // Dynamic routes
    const reviewRoutes = (reviews || []).map((review) => ({
        url: `${baseUrl}/review/${review.id}`,
        lastModified: new Date(review.publish_date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Static routes
    const routes = [
        '',
        '/reviews',
        '/submit',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    return [...routes, ...reviewRoutes];
}
