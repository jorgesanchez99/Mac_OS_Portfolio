import {locations} from "#constants/index.js";
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import {useRef} from "react";


const projects = locations.work?.children ?? []

const Home = () => {

    const {setActiveLocation} = useLocationStore()
    const {openWindow} = useWindowStore()
    const listRef = useRef(null);


    const handleOpenProject = (project) => {
        setActiveLocation(project)
        openWindow("finder")
    }

    useGSAP(() => {
        if (!listRef.current) return;
        const folders = listRef.current.querySelectorAll(".folder");
        const instances = Draggable.create(folders);
        return () => instances.forEach(instance => instance.kill());
    }, [])


    return (
        <section id="home">

            <ul ref={listRef}>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder",project.windowPosition)}
                        onClick={() => handleOpenProject(project)}
                    >
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>


        </section>
    )
}
export default Home
