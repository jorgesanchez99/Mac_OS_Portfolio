import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components";
import useWindowStore from "#store/window.js";

function Text() {
    const {windows} = useWindowStore();
    const {data} = windows.txtfile;

    if (!data) return null;

    const {name, icon, description, subtitle, image} = data;

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
            {/* Header fijo */}
            <div
                id="window-header"
                className="border-b border-slate-200 dark:border-slate-700"
            >
                <WindowControls target="txtfile"/>
            </div>

            {/* Contenido con scroll */}
            <div
                className="flex-1 overflow-auto
                           bg-gradient-to-br from-slate-100 to-slate-200
                           dark:from-slate-900 dark:to-slate-950
                           p-4 sm:p-6 md:p-7"
            >
                <div
                    className="mx-auto max-w-3xl
                               bg-white dark:bg-slate-950
                               rounded-xl shadow-2xl border border-slate-200/70 dark:border-slate-800
                               p-5 sm:p-6 md:p-7"
                >
                    {/* Header con icono, nombre e imagen */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <img
                                src={icon}
                                alt={name}
                                className="w-8 h-8"
                            />
                            <div className="min-w-0">
                                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50 truncate">
                                    {name}
                                </h2>
                                {subtitle && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        {image && (
                            <img
                                src={image}
                                alt={name}
                                className="w-16 h-16 rounded-full object-cover shadow-lg
                                           border-2 border-slate-200 dark:border-slate-700 flex-shrink-0"
                            />
                        )}
                    </div>

                    {/* Contenido de texto */}
                    <div className="space-y-4 text-slate-700 dark:text-slate-100 leading-relaxed">
                        {description?.map((paragraph, index) => (
                            <p
                                key={`paragraph-${index}`}
                                className="text-sm sm:text-base"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
