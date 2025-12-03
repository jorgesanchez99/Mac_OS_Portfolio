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


    const handleOpenProject = (project) => {
        setActiveLocation(project)
        openWindow("finder")
    }

    useGSAP(()=>{
        Draggable.create(".folder");
    },[])


    return (
        <section id="home">

            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder",project.windowPosition)}
                        onClick={() => handleOpenProject(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleOpenProject(project);
                            }
                        }}
                    >
                        <img src="/images/folder.png" alt="" />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>


        </section>
    )
}
export default Home
