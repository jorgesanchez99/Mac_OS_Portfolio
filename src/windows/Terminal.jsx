import React from 'react'
import {techStack} from "#constants/index.js";
import {Check, Flag} from "lucide-react";

import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components";

const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal"/>
                <h2>Stack Tecnologico</h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">@jorgesanchez99 %</span>
                    Mi stack tecnologico :
                </p>

                <div className="label">
                    <p className="w-32">Categoria</p>
                    <p>Tecnologias</p>
                </div>

                <ul className="content">
                    {techStack.map(({category, items}) => (
                        <li key={category} className="flex items-center">
                            <Check className="check" size={20}/>
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i) => (
                                    <li key={i}>
                                        {item}
                                        {i < items.length - 1 ? ", " : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote">
                    <p>
                        <Check className="check" size={20}/>
                        5 de 5 tecnologias cargadas exitosamente (100%)
                    </p>

                    <p className="text-black">
                        <Flag size={15} fill="black"/>
                        Render time : 6 ms
                    </p>
                </div>

            </div>


        </>
    )
}

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow
