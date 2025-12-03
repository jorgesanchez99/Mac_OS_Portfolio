import {Draggable} from "gsap/Draggable";
import gsap from "gsap";
gsap.registerPlugin(Draggable);

import {Welcome, NavBar, Dock, Home} from "#components";
import {Safari, Terminal, Resume, Finder, Text, Image, Contact, Gallery} from "#windows";

const App = () => {
    return (
        <main>
            <NavBar />
            <Welcome />
            <Dock />
            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <Image />
            <Contact />
            <Home />
            <Gallery />
        </main>
    )
}
export default App
