'use client';

import { useState } from 'react';
import styles from './CategoryFilter.module.css';


import { CATEGORY_CONFIG } from '@/lib/constants';

const categories = [
    { id: 'all', name: 'All Reviews', icon: '🎬', color: '#C8C8C8' },
    ...Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
        id,
        ...config
    }))
];

interface CategoryFilterProps {
    onFilterChange: (categoryId: string) => void;
}

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId);
        onFilterChange(categoryId);
    };

    return (
        <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}>Browse by Category</h2>
            <div className={styles.categoryGrid}>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`${styles.categoryCard} ${activeCategory === category.id ? styles.categoryActive : ''
                            }`}
                        onClick={() => handleCategoryClick(category.id)}
                        style={{
                            '--category-color': category.color,
                        } as React.CSSProperties}
                    >
                        <span className={styles.categoryIcon}>{category.icon}</span>
                        <span className={styles.categoryName}>{category.name}</span>
                        <div className={styles.categoryGlow}></div>
                    </button>
                ))}
            </div>
        </div>
    );
}
