import { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // Animación de entrada
    useGSAP(() => {
      const element = ref.current;
      if (!element || !isOpen) return;

      element.style.display = "block";

      gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }, [isOpen]);

    // Draggable solo en >= 768px y solo arrastrando desde el header
    useGSAP(() => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const header = element.querySelector("#window-header");

        const [instance] = Draggable.create(element, {
          //trigger: header || element, // si no hay header, usa toda la ventana
          onPress: () => focusWindow(windowKey),
        });

        // cleanup para ESTE media query
        return () => {
          if (instance) instance.kill();
        };
      });

      // cleanup general cuando se desmonta el componente
      return () => mm.revert();
    }, [focusWindow]);

    // Mostrar / ocultar según isOpen
    useLayoutEffect(() => {
      const element = ref.current;
      if (!element) return;
      element.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
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
