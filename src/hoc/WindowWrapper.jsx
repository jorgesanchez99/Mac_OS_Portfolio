import { useRef } from "react";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Animación de entrada que se reproduce cada vez que la ventana se abre.
const useWindowEntrance = (ref, isOpen) => {
  useGSAP(() => {
    const element = ref.current;
    if (!element || !isOpen) return;

    gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [isOpen]);
};

// Draggable SOLO en pantallas grandes con puntero "fino" (mouse/trackpad).
const useWindowDrag = (ref, windowKey, focusWindow) => {
  useGSAP(() => {
    const element = ref.current;
    if (!element) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (pointer: fine)", () => {
      const [instance] = Draggable.create(element, {
        dragClickables: true, // importantísimo para que los botones internos funcionen
        onPress: () => focusWindow(windowKey),
      });

      return () => instance?.kill();
    });

    return () => mm.revert();
  }, [windowKey, focusWindow]);
};

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const isOpen = useWindowStore((s) => s.windows[windowKey].isOpen);
    const zIndex = useWindowStore((s) => s.windows[windowKey].zIndex);
    const ref = useRef(null);

    useWindowEntrance(ref, isOpen);
    useWindowDrag(ref, windowKey, focusWindow);

    // Visibilidad declarativa: React aplica el display en el commit, antes de
    // los layout effects, así la animación de entrada siempre corre sobre un
    // elemento ya visible. Una sola fuente de verdad.
    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex, display: isOpen ? "block" : "none" }}
        className="absolute"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
