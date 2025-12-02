import {useState, useEffect} from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import WindowControls from "#components/WindowControls.jsx";


function Image() {
    const {windows, closeWindow} = useWindowStore();
    const {data} = windows.imgfile;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Keyboard shortcut: ESC para cerrar ventana
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!data || !windows.imgfile.isOpen) return;

            if (e.key === 'Escape') {
                closeWindow('imgfile');
            }
        };

        if (windows.imgfile.isOpen) {
            globalThis.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            globalThis.removeEventListener('keydown', handleKeyDown);
        };
    }, [windows.imgfile.isOpen, data, closeWindow]);

    if (!data) return null;

    const {imageUrl, name} = data;

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <>
            <div id="window-header" className="border-b border-gray-200">
                <WindowControls target="imgfile"/>
            </div>

            <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto flex items-center justify-center p-4 sm:p-6 md:p-8">
                {/* Loading spinner */}
                {isLoading && !hasError && (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-500">Loading image...</p>
                    </div>
                )}

                {/* Error placeholder */}
                {hasError && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-700">Error al cargar la imagen</p>
                            <p className="text-sm text-gray-500 mt-1">{name}</p>
                        </div>
                    </div>
                )}

                {/* Imagen */}
                {!hasError && (
                    <div className={`relative max-w-full max-h-full group ${isLoading ? 'hidden' : ''}`}>
                        <img
                            src={imageUrl}
                            alt={name}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            className="max-w-full max-h-[65vh] w-auto h-auto object-contain rounded-lg shadow-2xl
                                     transition-all duration-300 ease-out
                                     hover:scale-105 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]
                                     border-4 border-white cursor-zoom-in"
                        />

                        {/* Overlay con nombre del archivo al hover */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                      p-4 rounded-b-lg pointer-events-none">
                            <p className="text-white text-sm font-medium truncate">{name}</p>
                            <div className="flex gap-3 mt-2 text-xs text-gray-300">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-white">ESC</kbd>
                                    {' '}Close
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow
