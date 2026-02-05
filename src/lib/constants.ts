export const CATEGORY_CONFIG: Record<string, { name: string; icon: string; color: string; description: string }> = {
    movies: {
        name: 'Movies',
        icon: '🎥',
        color: '#DC2626',
        description: 'In-depth film reviews, reactions, and cinema analysis',
    },
    books: {
        name: 'Books',
        icon: '📚',
        color: '#2563EB',
        description: 'Literary critiques, book summaries, and reading recommendations',
    },
    music: {
        name: 'Music',
        icon: '🎵',
        color: '#7C3AED',
        description: 'Album reviews, track reactions, and sonic breakdowns',
    },
    trending: {
        name: 'Trending Content',
        icon: '🔥',
        color: '#F59E0B',
        description: 'Viral video reactions, hot takes, and internet culture',
    },
    products: {
        name: 'Products',
        icon: '📦',
        color: '#10B981',
        description: 'Tech unboxings, gadget reviews, and consumer advice',
    },
};
