import type { ReactNode } from "react";
import clsx from "clsx";

// "max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto flex items-center justify-between py-4"

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("mx-auto max-w-6xl px-6", className)}>{children}</div>
  );
};

export default Container;
