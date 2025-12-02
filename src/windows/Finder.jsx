import {WindowControls} from "#components/index.js";
import {Search} from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useLocationStore from "#store/location.js";
import {locations} from "#constants/index.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";

function Finder() {
    const {openWindow} = useWindowStore();
    const {activeLocation, setActiveLocation} = useLocationStore();

    const renderList = (items, name) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id} onClick={() => setActiveLocation(item)}
                        className={clsx(
                            item.id === activeLocation?.id ? "active" : "not-active",
                        )}
                    >
                        <img src={item.icon} className="w-4" alt={item.name}/>
                        <p className="text-sm font-medium truncate">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

    const openItem = (item) => {
        if (item.fileType === "pdf") return openWindow('resume');
        if (item.kind === "folder") return setActiveLocation(item);
        if (["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "_blank");

        openWindow(`${item.fileType}${item.kind}`, item);
    };

    return (
        <>

            <div id="window-header">
                <WindowControls target="finder"/>
                <Search className="icon"/>
            </div>


            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList(Object.values(locations), "Favoritos")}
                    {renderList(locations.work.children, "Proyectos")}
                </div>

                <ul className="content">
                    {activeLocation?.children.map((item) => (
                        <li
                            key={item.id}
                            className={`${item.position} cursor-pointer`}
                            onClick={() => openItem(item)}
                        >
                            <img src={item.icon} alt={item.name}/>
                            <p>{item.name}</p>
                        </li>
                    ))

                    }
                </ul>
            </div>
        </>
    )

}

const FinderWindow = WindowWrapper(Finder, "finder");


export default FinderWindow
