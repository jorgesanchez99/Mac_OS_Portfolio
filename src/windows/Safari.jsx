import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    MoveRight,
    PanelLeft,
    PlusIcon,
    SearchIcon,
    Share,
    ShieldHalf,
} from "lucide-react";
import { javaShowcase } from "#constants/index.js";

const Safari = () => {
    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
            {/* Header estilo Safari/macOS */}
            <div
                id="window-header"
                className="border-b border-slate-200 dark:border-slate-800
                           bg-slate-100 dark:bg-slate-900/95
                           text-slate-900 dark:text-slate-50"
            >
                <WindowControls target="safari" />

                {/* CONTENIDO HEADER SOLO DESDE TABLET EN ADELANTE */}
                <div className="hidden sm:flex items-center gap-3 flex-1">
                    {/* Botón sidebar */}
                    <PanelLeft className="ml-4 icon" />

                    {/* Flechas navegación */}
                    <div className="flex items-center gap-1 ml-3">
                        <ChevronLeft className="icon" />
                        <ChevronRight className="icon" />
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="flex-1 flex items-center justify-center gap-3 px-2">
                        <ShieldHalf className="icon" />

                        <div
                            className="flex items-center gap-2
                                       bg-slate-800/80 dark:bg-slate-800/80
                                       border border-slate-700
                                       rounded-full px-3 py-1.5
                                       w-full max-w-xl"
                        >
                            <SearchIcon className="icon w-4 h-4 text-slate-300" />

                            <input
                                type="text"
                                placeholder="Search or enter website name"
                                className="flex-1 bg-transparent text-sm
                                           text-slate-100 placeholder:text-slate-400
                                           outline-none"
                            />
                        </div>
                    </div>

                    {/* Acciones derecha */}
                    <div className="flex items-center gap-4 pr-2">
                        <Share className="icon" />
                        <PlusIcon className="icon" />
                        <Copy className="icon" />
                    </div>
                </div>

                {/* HEADER SIMPLE PARA MOBILE */}
                <div className="sm:hidden ml-auto pr-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                    Java Showcase
                </div>
            </div>

            {/* Contenido principal con scroll */}
            <div className="flex-1 overflow-hidden bg-slate-100 dark:bg-slate-900/95">
                <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-10 pb-8 pt-6 space-y-8">
                    {/* Título sección */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-pink-500 dark:text-pink-400">
                        Java Showcase
                    </h2>

                    {/* Lista de proyectos */}
                    <div className="space-y-6 sm:space-y-7">
                        {javaShowcase.map(({ id, image, title, description, link }) => (
                            <article
                                key={id}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start
                                           bg-slate-200 dark:bg-slate-900/70
                                           border border-slate-700 dark:border-slate-800
                                           rounded-2xl px-4 py-4 sm:px-5 sm:py-5
                                           hover:bg-slate-50 dark:hover:bg-slate-800/80
                                           transition-colors"
                            >
                                {/* Imagen izquierda */}
                                <div className="shrink-0">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover
                                                   shadow-lg shadow-black/20 dark:shadow-black/40"
                                    />
                                </div>

                                {/* Texto derecha */}
                                <div className="space-y-1 sm:space-y-2">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        {link
                                            ? "Mini proyecto disponible"
                                            : "Próximamente mini proyecto"}
                                    </p>

                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
                                        {title}
                                    </h3>

                                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                                        {description}
                                    </p>

                                    {link && (
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm
                                                       text-sky-600 dark:text-sky-400
                                                       hover:text-sky-500 dark:hover:text-sky-300 mt-1"
                                        >
                                            Ver proyecto en GitHub
                                            <MoveRight className="icon-hover h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
