import { techStack } from "#constants/index.js";
import { ChevronRight, Flag } from "lucide-react";

import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Stack Tecnologico</h2>
      </div>

      <div className="techstack">
        {/* Prompt estilo terminal */}
        <p className="mb-3 font-mono text-xs sm:text-sm">
          <span className="font-bold">@jorgesanchez99 %</span>{" "}
          Mi stack tecnologico incluye:
        </p>

        {/* Lista de categorías + tecnologías */}
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="mb-4 sm:mb-3">
              {/* Cabecera de categoría */}
              <div className="flex items-center gap-2">
                <ChevronRight className="check" size={18} />
                <h3>{category} </h3>
              </div>

              {/* Lista de tecnologías */}
              <ul className="mt-1 ml-6 list-disc space-y-0.5 text-xs sm:text-sm">
                {items.map((item, i) => (
                  <li key={i}>
                      {item}
                      {i<items.length -1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Footnote */}
        <div className="footnote mt-2">
          <p>
            <ChevronRight className="check" size={20} />
            {techStack.length} de {techStack.length} tecnologias cargadas
            exitosamente (100%)
          </p>

          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time : 3 ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
