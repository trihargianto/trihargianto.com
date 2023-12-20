import React from "react";
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
  className?: string;
} & React.ComponentProps<"button" | "a">;

const buttonClasses = {
  base: "rounded-sm",

  variant: (variant: ButtonVariantTypes) => {
    const variantClasses: { [key: string]: string } = {
      primary:
        "text-white bg-blue-500 border-blue-500 border hover:bg-blue-600",
      secondary:
        "text-slate-600 bg-slate-200 border-slate-300 border hover:bg-slate-300",
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
  ...restProps
}: ButtonPropTypes) => {
  const Element = as;

  return (
    /** @ts-expect-error unknown type */
    <Element
      className={clsx([
        buttonClasses.base,
        buttonClasses.variant(variant),
        buttonClasses.size(size),
        className,
      ])}
      {...restProps}
    >
      {children}
    </Element>
  );
};

export default Button;
