import { type ClassValue, clsx } from "clsx";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility for generating structured data
export function generateStructuredData(type: string, data: Record<string, unknown>) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return JSON.stringify(baseData, null, 2);
}

// Utility for generating course structured data
export function generateCourseStructuredData(course: {
  title: string;
  description: string;
  price?: number;
  rating?: number;
  reviewCount?: number;
}) {
  return generateStructuredData("Course", {
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Shree Skills",
      url: "https://shreeskills.com"
    },
    offers: {
      "@type": "Offer",
      price: course.price || "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    aggregateRating: course.rating ? {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      reviewCount: course.reviewCount || 0
    } : undefined
  });
}

// Utility for generating organization structured data
export function generateOrganizationStructuredData() {
  return generateStructuredData("Organization", {
    name: "Shree Skills",
    url: "https://shreeskills.com",
    logo: "https://shreeskills.com/logo.png",
    description: "Learn job-ready skills with structured courses and roadmaps designed for real careers.",
    sameAs: [
      "https://twitter.com/shreeskills",
      "https://linkedin.com/company/shreeskills",
      "https://facebook.com/shreeskills"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      availableLanguage: "English"
    }
  });
}

// Utility for lazy loading images
export function getImageProps(src: string, alt: string, options: { width?: number; height?: number; priority?: boolean } = {}) {
  return {
    src,
    alt,
    width: options.width || 800,
    height: options.height || 600,
    priority: options.priority || false,
    placeholder: "blur" as const,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
  };
}

// Utility for SEO-friendly URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Utility for reading time calculation
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Utility for formatting dates
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Utility for generating meta tags
export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article';
}): Metadata {
  const baseUrl = 'https://shreeskills.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const imageUrl = image || `${baseUrl}/og-image.jpg`;

  return {
    title: `${title} | Shree Skills`,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Shree Skills',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@shreeskills',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
