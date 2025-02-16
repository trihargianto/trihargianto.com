import type { ReactNode } from "react";
import clsx from "clsx";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </div>
  );
};

export default Container;
