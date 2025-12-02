import {Draggable} from "gsap/Draggable";
import gsap from "gsap";
gsap.registerPlugin(Draggable);

import {Welcome, NavBar, Dock} from "#components";
import {Safari, Terminal,Resume} from "#windows";

const App = () => {
    return (
        <main>
            <NavBar />
            <Welcome />
            <Dock />
            <Terminal />
            <Safari />
            <Resume />
        </main>
    )
}
export default App
