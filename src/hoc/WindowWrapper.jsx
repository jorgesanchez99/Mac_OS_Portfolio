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

    // Animación de entrada cuando se abre la ventana
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

    // Draggable SOLO en pantallas grandes con puntero "fino" (mouse/trackpad)
    useGSAP(() => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      // min-width: 768px  -> tablet/desktop
      // pointer: fine     -> dispositivos con ratón / trackpad
      mm.add("(min-width: 768px) and (pointer: fine)", () => {
        const [instance] = Draggable.create(element, {
          dragClickables: true,         // importantísimo para que los botones internos funcionen
          onPress: () => focusWindow(windowKey),
        });

        // cleanup cuando deja de aplicar este media query
        return () => {
          if (instance) instance.kill();
        };
      });

      // cleanup general al desmontar el componente
      return () => mm.revert();
    }, [focusWindow, windowKey]);

    // Mostrar/ocultar ventana según isOpen
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
