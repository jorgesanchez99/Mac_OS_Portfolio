import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components";
import {gallery, photosLinks} from "#constants/index.js";
import {useState} from "react";
import useWindowStore from "#store/window.js";

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState(photosLinks[0].id);
    const {openWindow} = useWindowStore();

    return (
        // Layout principal: columna + altura completa de la ventana
        <div className="flex flex-col h-full">
            {/* Header fijo dentro de la ventana (no scrollea) */}
            <div
                id="window-header"
                className="flex-shrink-0 relative z-10"
            >
                <WindowControls target="gallery"/>
                <h2>Galería</h2>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors">
                {/* Wrapper que permite que el contenido crezca */}
                <div className="min-h-full flex">
                    {/* Sidebar - Solo desktop (lg+) */}
                    <aside
                        className="hidden lg:flex lg:w-52 xl:w-56 flex-col
                                   bg-gray-50/50 dark:bg-slate-800/50
                                   border-r border-gray-200 dark:border-slate-700
                                   p-4 space-y-6 overflow-y-auto"
                    >
                        {/* Sección de categorías */}
                        <div>
                            <h3
                                className="text-xs font-semibold text-gray-400 dark:text-slate-400
                                           uppercase tracking-wider mb-3"
                            >
                                Albums
                            </h3>

                            <ul className="space-y-1">
                                {photosLinks.map(({id, icon, title}) => (
                                    <li key={id}>
                                        <button
                                            onClick={() => setSelectedCategory(id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg 
                                                        transition-all duration-200
                                                        ${
                                                            selectedCategory === id
                                                                ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-sm"
                                                                : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50"
                                                        }`}
                                        >
                                            <img
                                                src={icon}
                                                alt=""
                                                className="w-4 h-4 object-contain flex-shrink-0 opacity-80"
                                                aria-hidden="true"
                                            />

                                            <span className="text-sm font-medium truncate">
                                                {title}
                                            </span>

                                            {selectedCategory === id && (
                                                <span
                                                    className="ml-auto text-xs font-semibold
                                                               text-blue-600 dark:text-blue-400"
                                                >
                                                    {gallery.length}
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Info adicional */}
                        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 space-y-1">
                                <p className="font-medium">Total Photos</p>
                                <p className="text-lg font-bold text-gray-800 dark:text-slate-100">
                                    {gallery.length}
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Área principal */}
                    <div
                        className="flex-1 min-w-0
                                   bg-white/90 dark:bg-slate-900/90
                                   backdrop-blur-sm
                                   px-3 sm:px-4 md:px-5 lg:px-6
                                   py-3 sm:py-4 md:py-5"
                    >
                        {/* Header interno con título */}
                        <div className="mb-4 sm:mb-5">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <h2
                                    className="text-lg sm:text-xl font-bold
                                               text-gray-800 dark:text-slate-100"
                                >
                                    {photosLinks.find(p => p.id === selectedCategory)?.title || "Library"}
                                </h2>
                                <span
                                    className="text-xs sm:text-sm
                                               text-gray-500 dark:text-slate-400
                                               px-3 py-1 rounded-full
                                               bg-gray-100 dark:bg-slate-700/50"
                                >
                                    {gallery.length} {gallery.length === 1 ? "photo" : "photos"}
                                </span>
                            </div>
                        </div>

                        {/* Grid de imágenes */}
                        <div
                            className="grid gap-2.5 sm:gap-3 md:gap-3.5
                                       grid-cols-2 sm:grid-cols-3
                                       lg:grid-cols-3 xl:grid-cols-4
                                       pb-6"
                        >
                            {gallery.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => openWindow(`${item.fileType}${item.kind}`, item)}
                                    className="group relative aspect-square overflow-hidden rounded-xl
                                               bg-slate-100 dark:bg-slate-800
                                               shadow-sm hover:shadow-md
                                               ring-1 ring-slate-200 dark:ring-slate-700
                                               hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500
                                               transition-all duration-300 cursor-pointer"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={`Portfolio item ${item.id}`}
                                        className="w-full h-full object-cover
                                                   group-hover:scale-105
                                                   transition-transform duration-500 ease-out"
                                        loading="lazy"
                                    />

                                    <div className="absolute top-2 left-2">
                                        <span
                                            className="px-2 py-0.5 rounded-full text-[11px] font-semibold
                                                       bg-black/60 text-white backdrop-blur-sm"
                                        >
                                            #{item.id}
                                        </span>
                                    </div>

                                    <div
                                        className="hidden sm:flex absolute inset-0 items-end justify-end p-3
                                                   bg-gradient-to-t from-black/60 via-black/10 to-transparent
                                                   opacity-0 group-hover:opacity-100
                                                   transition-opacity duration-300"
                                    >
                                        <span
                                            className="px-2 py-1 rounded-full text-xs font-medium
                                                       bg-white/95 dark:bg-slate-900/95
                                                       text-slate-700 dark:text-slate-100 shadow-lg"
                                        >
                                            View
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GalleryWindow = WindowWrapper(Gallery, "gallery");
export default GalleryWindow;
