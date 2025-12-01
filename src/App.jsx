import {Draggable} from "gsap/Draggable";
import gsap from "gsap";
gsap.registerPlugin(Draggable);

import {Welcome, NavBar, Dock} from "#components";
import {Terminal} from "#windows";

const App = () => {
    return (
        <main>
            <NavBar />
            <Welcome />
            <Dock />
            <Terminal />
        </main>
    )
}
export default App
