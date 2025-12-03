import useWindowStore from "#store/window.js";
import { ArrowLeft } from "lucide-react";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  const handleClose = () => closeWindow(target);

  return (
    <div id="window-controls" className="flex items-center gap-2">
      {/* Mobile: botón "Regresar" */}
      <button
        type="button"
        onClick={handleClose}
        className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 sm:hidden"
      >
        <ArrowLeft className="h-4 w-4 text-blue-700" />
        <span className="text-blue-700">Regresar</span>
      </button>

      {/* Desktop: 3 puntitos estilo macOS */}
      <div className="hidden items-center gap-2 sm:flex">
        <button
          type="button"
          className="close"
          onClick={handleClose}
          aria-label="Cerrar ventana"
        />
        <div className="minimize" aria-hidden="true" />
        <div className="maximize" aria-hidden="true" />
      </div>
    </div>
  );
};

export default WindowControls;
