import { Metadata } from 'next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    ogType?: 'website' | 'article';
    canonicalUrl?: string;
    noindex?: boolean;
}

export function generateMetadata({
    title = 'Shree Skills - Master New Skills & Advance Your Career',
    description = 'Learn programming, data structures, algorithms, web development, and more with expert-curated courses and roadmaps. Free and premium courses available.',
    keywords = [
        'online learning',
        'programming courses',
        'web development',
        'data structures',
        'algorithms',
        'coding tutorials',
        'tech skills',
        'career development',
        'free courses',
        'shree skills'
    ],
    ogImage = '/og-image.png',
    ogType = 'website',
    canonicalUrl,
    noindex = false,
}: SEOProps = {}): Metadata {
    const siteName = 'Shree Skills';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    return {
        title,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: 'Shree Skills Team' }],
        creator: 'Shree Skills',
        publisher: 'Shree Skills',
        robots: noindex ? 'noindex, nofollow' : 'index, follow',

        ...(canonicalUrl && {
            alternates: {
                canonical: `${baseUrl}${canonicalUrl}`,
            },
        }),

        openGraph: {
            title,
            description,
            siteName,
            type: ogType,
            url: canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl,
            images: [
                {
                    url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
        },

        metadataBase: new URL(baseUrl),
    };
}

// Page-specific SEO metadata generators
export const homePageSEO = (): Metadata => generateMetadata({
    title: 'Shree Skills - Master Programming, Web Development & More',
    description: 'Transform your career with expert-curated courses in programming, web development, DSA, and system design. Start learning today with free and premium courses.',
    keywords: [
        'online courses',
        'learn programming',
        'web development courses',
        'data structures algorithms',
        'coding bootcamp',
        'tech education',
        'free programming courses',
        'career advancement'
    ],
    canonicalUrl: '/',
});

export const coursesPageSEO = (): Metadata => generateMetadata({
    title: 'Courses - Shree Skills',
    description: 'Browse our comprehensive collection of programming and tech courses. From beginner to advanced, find the perfect course to advance your skills.',
    keywords: [
        'programming courses',
        'web development courses',
        'react courses',
        'node.js courses',
        'dsa courses',
        'system design courses'
    ],
    canonicalUrl: '/courses',
});

export const blogsPageSEO = (): Metadata => generateMetadata({
    title: 'Blog - Learning Resources & Tech Insights | Shree Skills',
    description: 'Read articles, tutorials, and insights on programming, career development, and technology. Stay updated with the latest trends and best practices.',
    keywords: [
        'tech blog',
        'programming tutorials',
        'coding tips',
        'career advice',
        'web development blog',
        'learning resources'
    ],
    canonicalUrl: '/blogs',
});

export const roadmapsPageSEO = (): Metadata => generateMetadata({
    title: 'Learning Roadmaps - Structured Paths to Success | Shree Skills',
    description: 'Follow our structured learning roadmaps to master skills systematically. Step-by-step guides for full-stack development, DSA, DevOps, and more.',
    keywords: [
        'learning roadmap',
        'career path',
        'full-stack roadmap',
        'dsa roadmap',
        'devops roadmap',
        'programming path',
        'skill development'
    ],
    canonicalUrl: '/roadmaps',
});

export const courseDetailSEO = (course: {
    title: string;
    description: string;
    slug: string;
    thumbnail?: string;
}): Metadata => generateMetadata({
    title: `${course.title} - Online Course | Shree Skills`,
    description: course.description,
    keywords: [
        course.title.toLowerCase(),
        'online course',
        'learn',
        'tutorial',
        'programming'
    ],
    ogImage: course.thumbnail || '/og-image.png',
    ogType: 'article',
    canonicalUrl: `/courses/${course.slug}`,
});

export const blogDetailSEO = (blog: {
    title: string;
    excerpt: string;
    slug: string;
    hero?: string;
    tags?: string[];
}): Metadata => generateMetadata({
    title: `${blog.title} | Shree Skills Blog`,
    description: blog.excerpt,
    keywords: blog.tags || ['blog', 'tech', 'programming'],
    ogImage: blog.hero || '/og-image.png',
    ogType: 'article',
    canonicalUrl: `/blogs/${blog.slug}`,
});

export const roadmapDetailSEO = (roadmap: {
    title: string;
    summary: string;
    slug: string;
}): Metadata => generateMetadata({
    title: `${roadmap.title} - Learning Roadmap | Shree Skills`,
    description: roadmap.summary,
    keywords: [
        roadmap.title.toLowerCase(),
        'roadmap',
        'learning path',
        'career guide',
        'skill development'
    ],
    ogType: 'article',
    canonicalUrl: `/roadmaps/${roadmap.slug}`,
});

// JSON-LD structured data generators
export const organizationStructuredData = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shree Skills',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
    description: 'Online learning platform for programming and tech skills',
    sameAs: [
        // Add social media links here when available
    ],
});

export const courseStructuredData = (course: {
    title: string;
    description: string;
    thumbnail?: string;
    price: number;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    image: course.thumbnail,
    offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
    },
    provider: {
        '@type': 'Organization',
        name: 'Shree Skills',
    },
});

export const articleStructuredData = (article: {
    title: string;
    description: string;
    hero?: string;
    date: string;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.hero,
    datePublished: article.date,
    author: {
        '@type': 'Organization',
        name: 'Shree Skills',
    },
    publisher: {
        '@type': 'Organization',
        name: 'Shree Skills',
        logo: {
            '@type': 'ImageObject',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
        },
    },
});
