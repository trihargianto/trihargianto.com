import { motion } from "framer-motion";

const DarkModeSwitcher = () => {
  const toggleTheme = () => {
    const element = document.documentElement;
    element.classList.toggle("dark");

    const isDark = element.classList.contains("dark");

    if (isDark) {
      document.documentElement.setAttribute("data-theme", "catppuccin-frappe");
    } else {
      document.documentElement.setAttribute("data-theme", "one-light");
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <motion.button
      type="button"
      className="flex p-1 cursor-pointer"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>

      <span className="ml-2 inline-block lg:hidden">Switch Theme</span>
    </motion.button>
  );
};

export default DarkModeSwitcher;
