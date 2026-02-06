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
    const baseUrl = 'https://reactionsandreviews.vercel.app';

    if (!review) {
        return {
            title: 'Review Not Found | Reactions and Reviews',
            description: 'The requested review could not be found.',
        };
    }

    const title = `${review.title} - Review & Analysis`;
    const description = review.description || `Read our detailed review of ${review.title}. Professional analysis, key highlights, and honest opinions.`;
    const imageUrl = review.thumbnail?.startsWith('http') ? review.thumbnail : `${baseUrl}${review.thumbnail || '/logo.jpg'}`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'video.movie',
            url: `${baseUrl}/review/${id}`,
            images: [{
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: review.title
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [imageUrl],
        },
        alternates: {
            canonical: `${baseUrl}/review/${id}`,
        }
    };
}

export default async function ReviewPage({ params }: Props) {
    const id = params.id;
    const review = await getReview(id);
    const baseUrl = 'https://reactionsandreviews.vercel.app';

    // Prepare JSON-LD structured data
    const jsonLd = review ? {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Review',
                'itemReviewed': {
                    '@type': 'Thing',
                    'name': review.title,
                    'image': review.thumbnail,
                },
                'author': {
                    '@type': 'Person',
                    'name': review.reviewer || 'Reactions and Reviews Team',
                },
                'reviewRating': {
                    '@type': 'Rating',
                    'ratingValue': review.rating || 0,
                    'bestRating': 5,
                    'worstRating': 1,
                },
                'publisher': {
                    '@type': 'Organization',
                    'name': 'Reactions and Reviews',
                    'logo': {
                        '@type': 'ImageObject',
                        'url': `${baseUrl}/logo.jpg`
                    }
                },
                'datePublished': review.publish_date,
                'description': review.description,
            },
            {
                '@type': 'VideoObject',
                'name': review.title,
                'description': review.description,
                'thumbnailUrl': review.thumbnail,
                'uploadDate': review.publish_date,
                'duration': review.duration || 'PT2M', // Fallback duration ISO format
                'embedUrl': review.video_embed,
                'interactionStatistic': {
                    '@type': 'InteractionCounter',
                    'interactionType': 'https://schema.org/WatchAction',
                    'userInteractionCount': parseInt(review.views?.replace(/[^0-9]/g, '') || '0')
                }
            }
        ]
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
