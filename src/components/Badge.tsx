import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  isActive?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
  dataTagName?: string;
};

export default function Badge({
  children,
  isActive = false,
  isClickable = false,
  className = "",
  ...props
}: BadgeProps) {
  const badgeClasses = clsx(
    "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs",
    "border-1",
    isActive
      ? "bg-gray-200 text-black dark:bg-slate-800 dark:text-white border-transparent"
      : "bg-gray-50 border-gray-200 dark:border-transparent text-gray-500 dark:bg-white/10 dark:text-white/60",
  );

  if (isClickable) {
    return (
      <button
        className={clsx([
          badgeClasses,
          className,
          "cursor-pointer",
          "hover:bg-gray-200 hover:text-black hover:dark:bg-slate-800 hover:dark:text-white border-transparent",
        ])}
        {...props}
      >
        {children}
      </button>
    );
  }

  return <span className={badgeClasses}>{children}</span>;
}
