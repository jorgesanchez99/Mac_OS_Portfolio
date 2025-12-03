import {useRef} from "react";
import {Tooltip} from "react-tooltip";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

import {dockApps} from "#constants";
import useWindowStore from "#store/window.js";

const PINNED_MOBILE_APPS = 5; // cuántos iconos se muestran en mobile

const Dock = () => {

    const {openWindow, closeWindow, windows} = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(()=> {
        const dock = dockRef.current;
        if(!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const {left} = dock.getBoundingClientRect();

            icons.forEach((icon) =>{
                const {left: iconLeft, width} = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);

                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon,{
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out"
                });
            });
        };

        const handleMouseMove = (e) => {
            const {left} = dock.getBoundingClientRect();
            animateIcons(e.clientX- left);
        };

        const resetIcons = () => {
            icons.forEach((icon) => {
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    },[]);

    const toggleApp = (app) => {
        if(!app.canOpen) return;

        const appWindow = windows[app.id];
        if(!appWindow){
            console.log(`No window found for app: ${app.id}`);
            return;
        }

        if(appWindow.isOpen){
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({id, name, icon, canOpen}, index) => {
                    const appWindow = windows[id];
                    const isOpen = appWindow?.isOpen;
                    const hideOnMobile = index >= PINNED_MOBILE_APPS;

                    return (
                        <div
                            key={id}
                            className={`relative flex justify-center ${
                                hideOnMobile ? "hidden sm:flex" : ""
                            }`}
                        >
                            <button
                                type="button"
                                className={`dock-icon ${!canOpen ? "cursor-not-allowed" : ""}`}
                                aria-label={name}
                                aria-pressed={isOpen ? "true" : "false"}
                                data-tooltip-id="dock-tooltip"
                                data-tooltip-content={name}
                                data-tooltip-delay-show={150}
                                disabled={!canOpen}
                                onClick={() => toggleApp({id, canOpen})}
                            >
                                <img
                                    src={`/images/${icon}`}
                                    alt={name}
                                    loading="lazy"
                                    className={canOpen ? "" : "opacity-60"}
                                />
                            </button>

                            {/* Puntito de app abierta */}
                            {isOpen && (
                                <span
                                    className="
                                      pointer-events-none absolute -bottom-1
                                      h-1.5 w-1.5 rounded-full
                                      bg-white shadow-[0_0_6px_rgba(255,255,255,0.85)]
                                    "
                                />
                            )}
                        </div>
                    );
                })}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;
