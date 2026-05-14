import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  primary: "btn btn-brand",
  secondary: "btn btn-accent",
  outline: "btn btn-outline-dark",
  ghost: "btn btn-link text-decoration-none"
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button {...props} className={`${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
