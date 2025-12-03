import dayjs from "dayjs";
import {useState, useEffect} from "react";
import {navIcons, navLinks} from "#constants";
import useWindowStore from "#store/window.js";
import clsx from "clsx";

const NavBar = () => {
    const [currentTime, setCurrentTime] = useState(dayjs());
    const {openWindow} = useWindowStore();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="flex h-11 items-center justify-between px-4 text-xs md:text-sm">
            {/* IZQUIERDA */}
            <div className="flex items-center gap-3">
                <img
                    src="/images/logo.svg"
                    alt="logo"
                    className="h-4 w-4 md:h-5 md:w-5"
                />

                <p className="font-semibold text-[11px] md:text-sm">
                    Jorge&apos;s Portfolio
                </p>

                {/* Links: ocultos en cel, visibles desde sm (>=640px) */}
                <ul className="hidden items-center gap-4 sm:flex">
                    {navLinks.map(({id, name, type}) => (
                        <li
                            key={id}
                            onClick={() => openWindow(type)}
                            className="cursor-pointer text-[11px] md:text-xs hover:opacity-80"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>



            {/* DERECHA */}
            <div className="flex items-center gap-3">
                <ul className="flex items-center gap-2 md:gap-3">
                    {navIcons.map(({id, img}, index) => {
                        // index 0 y 1 → siempre visibles
                        // index 2 → solo desde sm (tablet / desktop)
                        // index >= 3 → solo desde lg (desktop grande)

                        return (
                            <li
                                key={id}
                                className={clsx(
                                    "flex items-center Move…",
                                    index === 2 && "hidden sm:flex",
                                    index >= 3 && "hidden lg:flex"
                                )}
                            >
                                <img
                                    src={img}
                                    className="icon-hover h-4 w-4 md:h-5 md:w-5"
                                    alt={`icon-${id}`}
                                />
                            </li>
                        );
                    })}
                </ul>


                {/* Hora completa: solo tablet/desktop (>= md) */}
                <time className="hidden md:inline-block w-40 text-right">
                    {currentTime.format("ddd MMM D h:mm A")}
                </time>

                {/* Hora corta: solo celular (< md) */}
                <time className="inline-block w-16 text-right md:hidden">
                    {currentTime.format("h:mm A")}
                </time>
            </div>
        </nav>
    );
};

export default NavBar;
