// Review Data Types and Sample Content
// This will be replaced with a CMS or database in production

export type ReviewType = 'quick-reaction' | 'full-review' | 'comparison' | 'retrospective';
export type Category = 'movies' | 'tech' | 'games' | 'music' | 'products';

export interface Review {
  id: string;
  slug: string;
  title: string;
  videoId: string; // YouTube video ID
  videoPlatform: 'youtube' | 'vimeo';
  category: Category;
  reviewType: ReviewType;
  rating: number; // 1-5
  ratingBreakdown?: {
    [key: string]: number;
  };
  publishDate: string;
  thumbnail: string;
  quickTake: string[];
  tags: string[];
  description?: string;
  featured?: boolean;
}

// Sample review data
export const reviews: Review[] = [
  {
    id: '1',
    slug: 'iphone-16-pro-review',
    title: 'iPhone 16 Pro - The Ultimate Upgrade?',
    videoId: 'dQw4w9WgXcQ',
    videoPlatform: 'youtube',
    category: 'tech',
    reviewType: 'full-review',
    rating: 4.5,
    ratingBreakdown: {
      design: 5,
      performance: 5,
      battery: 4,
      camera: 5,
      value: 3
    },
    publishDate: '2024-02-01',
    thumbnail: 'https://images.unsplash.com/photo-1592286927505-2fac0f134e68?w=800&h=450&fit=crop',
    quickTake: [
      'Best camera system in any smartphone',
      'All-day battery life finally achieved',
      'Premium price tag requires justification',
      'ProMotion display is buttery smooth'
    ],
    tags: ['apple', 'smartphone', 'flagship', 'tech'],
    description: 'After two weeks with the iPhone 16 Pro, here\'s my comprehensive review covering design, performance, camera quality, and whether it\'s worth the upgrade.',
    featured: true
  },
  {
    id: '2',
    slug: 'dune-part-2-reaction',
    title: 'Dune Part 2 - First Reaction',
    videoId: 'dQw4w9WgXcQ',
    videoPlatform: 'youtube',
    category: 'movies',
    reviewType: 'quick-reaction',
    rating: 5,
    publishDate: '2024-01-30',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop',
    quickTake: [
      'Visually stunning masterpiece',
      'Improves on the first film',
      'Epic score and sound design',
      'Must see in IMAX'
    ],
    tags: ['denis-villeneuve', 'sci-fi', 'epic', 'imax'],
    description: 'Just walked out of the theater. This is cinema at its finest.',
    featured: true
  },
  {
    id: '3',
    slug: 'ps5-slim-unboxing',
    title: 'PS5 Slim Unboxing & First Impressions',
    videoId: 'dQw4w9WgXcQ',
    videoPlatform: 'youtube',
    category: 'games',
    reviewType: 'quick-reaction',
    rating: 4,
    publishDate: '2024-01-28',
    thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=450&fit=crop',
    quickTake: [
      'Significantly smaller footprint',
      'Same great performance',
      'Detachable disc drive is smart',
      'Still pricey for what you get'
    ],
    tags: ['playstation', 'gaming', 'console', 'sony'],
    description: 'Unboxing the new PS5 Slim and my immediate thoughts on the redesign.',
    featured: false
  },
  {
    id: '4',
    slug: 'airpods-max-vs-sony-xm5',
    title: 'AirPods Max vs Sony XM5 - Ultimate Showdown',
    videoId: 'dQw4w9WgXcQ',
    videoPlatform: 'youtube',
    category: 'tech',
    reviewType: 'comparison',
    rating: 4,
    publishDate: '2024-01-25',
    thumbnail: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=450&fit=crop',
    quickTake: [
      'Sony wins on features and price',
      'AirPods Max better for Apple ecosystem',
      'Both have excellent sound quality',
      'Comfort goes to Sony'
    ],
    tags: ['headphones', 'audio', 'comparison', 'wireless'],
    description: 'After months with both headphones, here\'s my definitive comparison.',
    featured: false
  },
  {
    id: '5',
    slug: 'the-last-of-us-2-retrospective',
    title: 'The Last of Us Part 2 - 3 Years Later',
    videoId: 'dQw4w9WgXcQ',
    videoPlatform: 'youtube',
    category: 'games',
    reviewType: 'retrospective',
    rating: 4.5,
    publishDate: '2024-01-20',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
    quickTake: [
      'Story holds up incredibly well',
      'Graphics still stunning',
      'Gameplay loop remains engaging',
      'Divisive narrative is worth experiencing'
    ],
    tags: ['naughty-dog', 'playstation', 'story-driven', 'action'],
    description: 'Revisiting one of the most controversial games of the last decade.',
    featured: false
  },
  {
    id: '6',
    slug: 'macbook-pro-m3-review',
    title: 'MacBook Pro M3 Max - Creative Powerhouse',
    videoId: 'dQw4w9WgXcQ',
    videoPlatform: 'youtube',
    category: 'tech',
    reviewType: 'full-review',
    rating: 5,
    ratingBreakdown: {
      performance: 5,
      display: 5,
      battery: 5,
      design: 4,
      value: 4
    },
    publishDate: '2024-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=450&fit=crop',
    quickTake: [
      'Blazing fast for video editing',
      'Best laptop display available',
      'Battery life is unreal',
      'Expensive but worth it for pros'
    ],
    tags: ['apple', 'laptop', 'creative', 'professional'],
    description: 'A month with the M3 Max MacBook Pro for video production.',
    featured: true
  }
];

// Helper functions
export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find(review => review.slug === slug);
}

export function getReviewsByCategory(category: Category): Review[] {
  return reviews.filter(review => review.category === category);
}

export function getFeaturedReviews(): Review[] {
  return reviews.filter(review => review.featured);
}

export function getLatestReviews(limit: number = 6): Review[] {
  return reviews
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
}

export function getReviewsByType(type: ReviewType): Review[] {
  return reviews.filter(review => review.reviewType === type);
}

export const categories = [
  { id: 'movies', label: 'Movies', color: '#DC2626' },
  { id: 'tech', label: 'Tech', color: '#2563EB' },
  { id: 'games', label: 'Games', color: '#7C3AED' },
  { id: 'music', label: 'Music', color: '#059669' },
  { id: 'products', label: 'Products', color: '#D97706' }
];
