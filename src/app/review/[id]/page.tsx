import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ReviewClient from './ReviewClient';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// Fetch review data for metadata
async function getReview(id: string) {
    const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .single();
    return data;
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const id = params.id;
    const review = await getReview(id);

    if (!review) {
        return {
            title: 'Review Not Found | Reactions and Reviews',
            description: 'The requested review could not be found.',
        };
    }

    return {
        title: `${review.title} - Review & Analysis | Reactions and Reviews`,
        description: review.description || `Read our detailed review of ${review.title}. Professional analysis, key highlights, and honest opinions.`,
        openGraph: {
            title: review.title,
            description: review.description,
            type: 'article',
            images: [review.thumbnail || '/default-review-thumb.jpg'], // Fallback image
        },
        twitter: {
            card: 'summary_large_image',
            title: review.title,
            description: review.description,
            images: [review.thumbnail || '/default-review-thumb.jpg'],
        }
    };
}

export default async function ReviewPage({ params }: Props) {
    const id = params.id;
    const review = await getReview(id);

    // Prepare JSON-LD structured data
    const jsonLd = review ? {
        '@context': 'https://schema.org',
        '@type': 'Review',
        'itemReviewed': {
            '@type': 'Thing',
            'name': review.title,
        },
        'author': {
            '@type': 'Person',
            'name': review.reviewer || 'Reactions and Reviews Team',
        },
        'reviewRating': {
            '@type': 'Rating',
            'ratingValue': review.rating || 0,
            'bestRating': 5,
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Reactions and Reviews',
        },
        'datePublished': review.publish_date,
        'description': review.description,
    } : null;

    return (
        <>
            {/* Inject JSON-LD */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            <ReviewClient reviewId={id} initialReviewData={review} />
        </>
    );
}
