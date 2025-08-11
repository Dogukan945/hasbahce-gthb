"use client";

import Link from "next/link";
import clsx from "clsx";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props as ButtonProps | LinkProps;

  const base = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary: "btn-primary focus:ring-red-500",
    accent: "btn-accent focus:ring-green-500",
    secondary: "btn-secondary focus:ring-gray-500",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-2.5",
    lg: "text-lg px-5 py-3",
  };

  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in (props as LinkProps) && (props as LinkProps).href) {
    const { href, ...anchorRest } = rest as Omit<LinkProps, "children"> & { href: string };
    return (
      <Link href={href} className={classes} {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}


