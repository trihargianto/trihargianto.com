import React from "react";
import { Link } from "gatsby";
import clsx from "clsx";

type ButtonVariantTypes = "primary" | "secondary" | "tertiary";

type ButtonSizeTypes = "xs" | "sm" | "md";

export type ButtonPropTypes = {
  children: React.ReactNode;
  variant?: ButtonVariantTypes;
  size?: ButtonSizeTypes;
  isRounded?: boolean;
  isActive?: boolean;
  as?: "button" | "a";
  href?: string;
  className?: string;
} & React.ComponentProps<"button" | "a">;

const buttonClasses = {
  variant: (variant: ButtonVariantTypes) => {
    const variantClasses: { [key: string]: string } = {
      primary:
        "text-white bg-blue-500 border-blue-500 border hover:bg-blue-600 dark:bg-blue-800 dark:border-transparent dark:hover:bg-blue-900",
      secondary:
        "text-slate-600 bg-slate-200 border-slate-300 border hover:bg-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-900 dark:text-slate-200",
    };

    return variantClasses[variant];
  },

  size: (size: ButtonSizeTypes) => {
    const sizeClasses: { [key: string]: string } = {
      xs: "px-2 py-1.5 text-sm",
      sm: "px-3 py-2",
      md: "px-4 py-2.5",
    };

    return sizeClasses[size];
  },
};

const Button = ({
  variant = "primary",
  size = "md",
  as = "button",
  children,
  className,
  href,
  ...restProps
}: ButtonPropTypes) => {
  const Element = as === "a" ? Link : as;

  return (
    /** @ts-expect-error unknown type */
    <Element
      className={clsx([
        "rounded-md transition-colors",
        buttonClasses.variant(variant),
        buttonClasses.size(size),
        className,
      ])}
      {...(href ? { to: href } : {})}
      {...restProps}
    >
      {children}
    </Element>
  );
};

export default Button;
