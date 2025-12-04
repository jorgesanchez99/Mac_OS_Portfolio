import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import clsx from "clsx";
import PropTypes from "prop-types";

const ThemeToggle = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();

  const getNextTheme = (current) => {
    if (current === "light") return "dark";
    if (current === "dark") return "system";
    return "light"; // cuando es 'system' o cualquier otra cosa
  };

  const handleClick = () => {
    const nextTheme = getNextTheme(theme);
    setTheme(nextTheme);
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
      title={label}
      className={clsx(
        // Tamaño más grande para móviles (área táctil mínima 44x44px)
        "relative z-50",
        "flex h-10 w-10 items-center justify-center rounded-full",
        "md:h-8 md:w-8",
        // Estilos base
        "bg-white/50 text-gray-800 shadow-md ring-1 ring-black/10",
        "backdrop-blur-md transition-all duration-200",
        // Hover y active states
        "hover:bg-white/70 hover:shadow-lg active:scale-90",
        "dark:hover:bg-gray-700/70",
        // Dark mode
        "dark:bg-gray-800/50 dark:text-gray-100 dark:ring-white/10",
        // Focus
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        // Asegurar que sea clicable
        "cursor-pointer touch-manipulation",
        className
      )}
    >
      <Icon className="h-5 w-5 md:h-4 md:w-4 pointer-events-none" aria-hidden="true" />
    </button>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string,
};

export default ThemeToggle;
