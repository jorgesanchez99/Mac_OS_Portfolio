import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import clsx from "clsx";

const ThemeToggle = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();

  const getNextTheme = (current) => {
    if (current === "light") return "dark";
    if (current === "dark") return "system";
    return "light"; // cuando es 'system' o cualquier otra cosa
  };

  const handleClick = () => {
    setTheme(getNextTheme(theme));
  };

  const getIconAndLabel = () => {
    if (theme === "light") {
      return { Icon: Sun, label: "Cambiar a tema oscuro" };
    }
    if (theme === "dark") {
      return { Icon: Moon, label: "Usar tema del sistema" };
    }
    // system por defecto
    return { Icon: Monitor, label: "Cambiar a tema claro" };
  };

  const { Icon, label } = getIconAndLabel();

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={clsx(
        "flex h-7 w-7 items-center justify-center rounded-full",
        "bg-white/30 text-gray-800 shadow-sm ring-1 ring-black/5",
        "backdrop-blur-md transition-colors",
        "hover:bg-white/60 dark:hover:bg-gray-800/80",
        "dark:bg-gray-900/50 dark:text-gray-100 dark:ring-white/10",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-sky-500 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
        className
      )}
    >
      <span className="sr-only">{label}</span>
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
