import clsx from "clsx";

type Variant = "default" | "success" | "warning" | "info";

export default function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const variants: Record<Variant, string> = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
  };
  return (
    <span className={clsx("inline-block px-2.5 py-1 rounded-md text-sm font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}


