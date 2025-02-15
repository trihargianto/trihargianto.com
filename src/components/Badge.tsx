import clsx from "clsx";

export default function Badge({ children, isActive = false }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs",
        "border-1",
        isActive
          ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white/90 border-transparent"
          : "bg-gray-50 border-gray-200 dark:border-transparent text-gray-500 dark:bg-white/10 dark:text-white/60",
      )}
    >
      {children}
    </span>
  );
}
