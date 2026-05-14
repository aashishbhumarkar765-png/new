import Link from "next/link";
import Image from "next/image";
import { Course } from "@/lib/types";
import { generateCourseStructuredData, getImageProps } from "@/lib/utils";

function priceLabel(price: number) {
  return price === 0 ? "Free" : `INR ${price}`;
}

export default function CourseCard({ course }: { course: Course }) {
  const courseStructuredData = generateCourseStructuredData(course);
  const imageProps = getImageProps(course.thumbnail, course.title, { width: 400, height: 225 });

  return (
    <article
      className="card card-soft h-100 fade-in-up"
      itemScope
      itemType="https://schema.org/Course"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: courseStructuredData,
        }}
      />
      <div className="position-relative">
        <Link href={`/courses/${course.slug}`} className="text-decoration-none">
          <Image
            {...imageProps}
            alt={course.title}
            className="course-image w-100"
            itemProp="image"
            priority={false}
            unoptimized
          />
        </Link>
        <span className="badge badge-level position-absolute top-0 start-0 m-3">
          {course.level}
        </span>
        {course.price === 0 && (
          <span className="badge bg-success position-absolute top-0 end-0 m-3">
            Free
          </span>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <Link href={`/courses/${course.slug}`} className="text-decoration-none">
          <h5 className="card-title text-dark" itemProp="name">
            {course.title}
          </h5>
        </Link>
        <p className="card-text text-secondary small" itemProp="description">
          {course.description}
        </p>
        <div className="mt-auto d-flex align-items-center justify-content-between">
          <span className="fw-semibold text-primary" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="INR" />
            <span itemProp="price">{course.price}</span>
            {priceLabel(course.price)}
          </span>
          <Link
            href={`/courses/${course.slug}`}
            className="btn btn-sm btn-outline-primary"
            aria-label={`View details for ${course.title}`}
          >
            View details →
          </Link>
        </div>
        <div className="mt-2">
          <small className="text-muted">
            <Link href="/courses" className="text-decoration-none">
              View all courses
            </Link>
          </small>
        </div>
      </div>
    </article>
  );
}
