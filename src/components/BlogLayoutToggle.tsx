import { useState, useEffect } from "react";

type LayoutView = "masonry" | "list";

interface BlogLayoutToggleProps {
  onLayoutChange: (layout: LayoutView) => void;
  defaultLayout?: LayoutView;
}

export default function BlogLayoutToggle({
  onLayoutChange,
  defaultLayout = "masonry",
}: BlogLayoutToggleProps) {
  const [activeLayout, setActiveLayout] = useState<LayoutView>(defaultLayout);

  // Load saved preference from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem("blogLayout") as LayoutView;
    if (savedLayout && (savedLayout === "masonry" || savedLayout === "list")) {
      setActiveLayout(savedLayout);
      onLayoutChange(savedLayout);
    }
  }, [onLayoutChange]);

  const handleLayoutChange = (layout: LayoutView) => {
    setActiveLayout(layout);
    localStorage.setItem("blogLayout", layout);
    onLayoutChange(layout);
  };

  return (
    <div
      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg"
      role="group"
      aria-label="Blog layout toggle"
    >
      {/* Masonry View */}
      <button
        onClick={() => handleLayoutChange("masonry")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
          activeLayout === "masonry"
            ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
        aria-pressed={activeLayout === "masonry"}
        aria-label="Grid view"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
        <span>Grid</span>
      </button>

      {/* List View */}
      <button
        onClick={() => handleLayoutChange("list")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
          activeLayout === "list"
            ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
        aria-pressed={activeLayout === "list"}
        aria-label="List view"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
          />
        </svg>
        <span>List</span>
      </button>
    </div>
  );
}
