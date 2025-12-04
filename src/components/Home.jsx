import {useRef} from "react";
import {gsap} from "gsap";
import {locations} from "#constants/index.js";
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";


const projects = locations.work?.children ?? []

const Home = () => {

    const {setActiveLocation} = useLocationStore()
    const {openWindow} = useWindowStore()
    const homeRef = useRef(null)


    const handleOpenProject = (project) => {
        setActiveLocation(project)
        openWindow("finder")
    }

 useGSAP(() => {
    gsap.registerPlugin(Draggable);

    const items = homeRef.current?.querySelectorAll(".folder") ?? [];
    if (!items.length) return;

    const mm = gsap.matchMedia();

    // Solo activar Draggable en dispositivos con puntero fino (mouse/trackpad)
    mm.add("(pointer: fine)", () => {
        const draggables = Draggable.create(items, {
            dragClickables: true,   // muy importante para que el click siga funcionando
        });

        // cleanup cuando deja de aplicar la media query
        return () => {
            draggables.forEach(d => d.kill());
        };
    });

    // cleanup general al desmontar
    return () => mm.revert();
}, { scope: homeRef });



    return (
        <section id="home" ref={homeRef}>

            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder",project.windowPosition)}
                        onClick={() => handleOpenProject(project)}
                    >
                        <img src="/images/folder.png" alt={`${project.name} folder icon`} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>


        </section>
    )
}
export default Home
