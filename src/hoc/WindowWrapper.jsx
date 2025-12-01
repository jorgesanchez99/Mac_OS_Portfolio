import {useLayoutEffect, useRef} from "react";
import useWindowStore from "#store/window.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const {focusWindow, windows} = useWindowStore();
        const {isOpen, zIndex} = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            const element = ref.current;
            if (!element || !isOpen) return;

            element.style.display = "block";

            gsap.fromTo(
                element,
                {scale: 0.8, opacity: 0, y: 40},
                {scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out"}
            );

        }, [isOpen]);

        useGSAP(() => {
            const element = ref.current;
            if (!element) return;
            const [instance] = Draggable.create(element, {onPress: () => focusWindow(windowKey)});
            return () => instance.kill();
            // Está limpieza asegura que la instancia se destruya al desmontar el componente
        }, []);

        useLayoutEffect(() => {
            const element = ref.current;
            if (!element) return;
            element.style.display = isOpen ? "block" : "none";
        })


        return (
            <section id={windowKey} ref={ref} style={{zIndex}}
                     className="absolute">
                <Component {...props}/>
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};
export default WindowWrapper
