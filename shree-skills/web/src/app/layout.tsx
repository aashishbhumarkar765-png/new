import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import { generateOrganizationStructuredData } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Shree Skills - Learn Job-Ready Skills with Expert Mentors",
    template: "%s | Shree Skills"
  },
  description: "Master job-ready skills with structured courses, interactive roadmaps, and personalized mentorship. Learn Full Stack, DSA, DevOps, AI/ML, and more with industry experts.",
  keywords: [
    "online courses",
    "job-ready skills",
    "programming courses",
    "software development",
    "coding bootcamp",
    "full stack development",
    "data structures algorithms",
    "Java backend development",
    "Python data science",
    "DevOps AWS",
    "AI ML basics",
    "spoken english",
    "english for interview",
    "learn german",
    "learn japanese",
    "career development",
    "tech skills",
    "software engineering",
    "web development",
    "mobile development",
    "cloud computing",
    "machine learning",
    "artificial intelligence",
    "mentorship",
    "career guidance"
  ],
  authors: [{ name: "Shree Skills Team" }],
  creator: "Shree Skills",
  publisher: "Shree Skills",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shreeskills.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Shree Skills - Master Job-Ready Tech Skills",
    description: "Transform your career with expert-led courses in programming, data science, DevOps, and AI. Join 25k+ learners building real-world skills.",
    url: 'https://shreeskills.com',
    siteName: 'Shree Skills',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shree Skills - Learn Job-Ready Skills',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shree Skills - Master Job-Ready Tech Skills",
    description: "Transform your career with expert-led courses. Join 25k+ learners building real-world skills.",
    images: ['/og-image.jpg'],
    creator: '@shreeskills',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: organizationStructuredData,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ErrorBoundary>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </ErrorBoundary>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </body>
    </html>
  );
}
