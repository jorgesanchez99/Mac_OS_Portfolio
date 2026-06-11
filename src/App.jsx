import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

import { Welcome, NavBar, Dock, Home } from "#components";
import useWindowStore from "#store/window.js";
import { WINDOW_CONFIG } from "#constants/index.js";

gsap.registerPlugin(Draggable);

// Cada ventana viaja en su propio chunk y se descarga al abrirse por primera vez.
const WINDOW_COMPONENTS = {
    terminal: lazy(() => import("#windows/Terminal.jsx")),
    safari: lazy(() => import("#windows/Safari.jsx")),
    resume: lazy(() => import("#windows/Resume.jsx")),
    finder: lazy(() => import("#windows/Finder.jsx")),
    txtfile: lazy(() => import("#windows/Text.jsx")),
    imgfile: lazy(() => import("#windows/Image.jsx")),
    contact: lazy(() => import("#windows/Contact.jsx")),
    gallery: lazy(() => import("#windows/Gallery.jsx")),
};

const WINDOW_KEYS = Object.keys(WINDOW_CONFIG);

// Indicador mientras se descarga el chunk de una ventana por primera vez
// (sobre todo el CV, que arrastra react-pdf). Transitorio y no bloqueante.
const WindowFallback = () => (
    <div
        role="status"
        aria-label="Cargando ventana"
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
    >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
    </div>
);

// Monta la ventana recién cuando se abre por primera vez; luego la mantiene
// montada (WindowWrapper alterna display) para preservar la posición de drag
// y que las reaperturas sean instantáneas.
const DeferredWindow = ({ windowKey }) => {
    const hasOpened = useWindowStore((s) => s.windows[windowKey].hasOpened);

    const LazyWindow = WINDOW_COMPONENTS[windowKey];
    if (!hasOpened || !LazyWindow) return null;

    return (
        <Suspense fallback={<WindowFallback />}>
            <LazyWindow />
        </Suspense>
    );
};

DeferredWindow.propTypes = {
    windowKey: PropTypes.string.isRequired,
};

const App = () => {
    return (
        <main>
            <NavBar />
            <Welcome />
            <Dock />
            <Home />
            {WINDOW_KEYS.map((key) => (
                <DeferredWindow key={key} windowKey={key} />
            ))}
        </main>
    );
};

export default App;
