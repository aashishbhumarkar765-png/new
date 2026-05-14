import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export default function Loading({ size = "md", className, text }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("d-flex flex-column align-items-center justify-content-center p-4", className)}>
      <div
        className={cn(
          "border-4 border-primary border-top-transparent rounded-circle loading",
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-3 text-muted small">{text}</p>
      )}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card-soft p-4">
      <div className="d-flex align-items-center mb-3">
        <div className="bg-light rounded" style={{ width: '60px', height: '60px' }}></div>
        <div className="ms-3 flex-grow-1">
          <div className="bg-light rounded mb-2" style={{ height: '20px', width: '80%' }}></div>
          <div className="bg-light rounded" style={{ height: '16px', width: '60%' }}></div>
        </div>
      </div>
      <div className="bg-light rounded mb-2" style={{ height: '16px', width: '100%' }}></div>
      <div className="bg-light rounded mb-2" style={{ height: '16px', width: '90%' }}></div>
      <div className="bg-light rounded" style={{ height: '16px', width: '70%' }}></div>
    </div>
  );
}

export function LoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="row g-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col-md-6 col-lg-4">
          <LoadingCard />
        </div>
      ))}
    </div>
  );
}
