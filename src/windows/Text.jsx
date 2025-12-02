import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components";
import useWindowStore from "#store/window.js";


function Text() {
    const {windows} = useWindowStore();
    const {data} = windows.txtfile;

    // Si no hay data, no renderizar nada
    if (!data) {
        return null;
    }

    const {name, icon, description, subtitle, image} = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile"/>
            </div>

            <div className="p-6 overflow-y-auto h-full bg-white">
                {/* Header con icono, nombre e imagen (si existe) */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="flex items-center gap-3 flex-1">
                        <img src={icon} alt={name} className="w-8 h-8" />
                        <div>
                            <h2 className="text-xl font-semibold">{name}</h2>
                            {/* Subtitle (si existe) */}
                            {subtitle && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Imagen como avatar (si existe) */}
                    {image && (
                        <img
                            src={image}
                            alt={name}
                            className="w-15 h-15 rounded-full object-cover shadow-lg border-2 border-gray-200"
                        />
                    )}
                </div>

                {/* Contenido de texto */}
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    {description?.map((paragraph, index) => (
                        <p key={`paragraph-${index}`} className="text-sm">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow
