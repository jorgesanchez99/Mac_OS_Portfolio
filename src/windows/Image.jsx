import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import WindowControls from "#components/WindowControls.jsx";


function Image() {
    const {windows} = useWindowStore();
    const {data} = windows.imgfile;

    if (!data) return null;

    const {imageUrl, name} = data;

    return (
        <>
            <div id="window-header" className="border-b border-gray-200">
                <WindowControls target="imgfile"/>
            </div>

            <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="relative max-w-full max-h-full group">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl
                                 transition-all duration-300 ease-out
                                 hover:scale-105 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]
                                 border-4 border-white"
                    />

                    {/* Overlay con nombre del archivo al hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                  p-4 rounded-b-lg">
                        <p className="text-white text-sm font-medium truncate">{name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow
