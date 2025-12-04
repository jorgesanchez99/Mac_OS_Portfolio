import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components";
import {gallery, photosLinks} from "#constants/index.js";
import {useState} from "react";
import useWindowStore from "#store/window.js";

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState(photosLinks[0].id);
    const {closeWindow} = useWindowStore();

    return (
        <>
            {/* Header desktop - Controles tradicionales macOS (oculto en mobile) */}
            <div id="window-header" className="hidden sm:flex">
                <WindowControls target="gallery"/>
                <h2 className="text-sm font-medium text-gray-700">Photos</h2>
            </div>

            {/* Header mobile - Botón Back (solo visible en mobile) */}
            <div className="sm:hidden flex items-center px-4 py-3 bg-white border-b border-gray-200">
                {/* Botón Back con flecha */}
                <button
                    onClick={() => closeWindow('gallery')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700
                             active:text-blue-800 transition-colors"
                >
                    {/* Flecha izquierda */}
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span className="text-base font-medium">Back</span>
                </button>

                {/* Título centrado */}
                <h1 className="flex-1 text-center text-base font-semibold text-gray-800 pr-16">
                    Photos
                </h1>
            </div>

            {/* Contenedor principal con layout flex */}
            <div className="flex h-full overflow-hidden bg-gray-50">

                {/* Sidebar - Oculta en mobile, visible en tablet+ */}
                <aside
                    className="hidden sm:flex sm:w-48 md:w-56 flex-col bg-white border-r border-gray-200 p-4 space-y-6">

                    {/* Sección de categorías */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Albums
                        </h3>

                        <ul className="space-y-1">
                            {photosLinks.map(({id, icon, title}) => (
                                <li key={id}>
                                    <button
                                        onClick={() => setSelectedCategory(id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg 
                                                 transition-all duration-200 group
                                                 ${selectedCategory === id
                                            ? 'bg-blue-100 text-blue-700 shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {/* Icono */}
                                        <img
                                            src={icon}
                                            alt={title}
                                            className="w-4 h-4 object-contain flex-shrink-0"
                                        />

                                        {/* Título */}
                                        <span className="text-sm font-medium truncate">
                                            {title}
                                        </span>

                                        {/* Contador de fotos (solo en categoría activa) */}
                                        {selectedCategory === id && (
                                            <span className="ml-auto text-xs font-semibold text-blue-600">
                                                {gallery.length}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info adicional */}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500 space-y-1">
                            <p className="font-medium">Total Photos</p>
                            <p className="text-lg font-bold text-gray-800">{gallery.length}</p>
                        </div>
                    </div>
                </aside>

                {/* Área principal de la galería */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50/30">
                    <div className="p-4 sm:p-6 md:p-8 space-y-6">

                        {/* Header de la galería - Mobile category selector */}
                        <div className="space-y-4">
                            {/* Selector de categorías en mobile */}
                            <div className="sm:hidden">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg
                                             text-sm font-medium text-gray-700 focus:outline-none focus:ring-2
                                             focus:ring-blue-500 focus:border-transparent"
                                >
                                    {photosLinks.map(({id, title}) => (
                                        <option key={id} value={id}>
                                            {title} ({gallery.length})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Título de la categoría actual */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {photosLinks.find(p => p.id === selectedCategory)?.title || 'Library'}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {gallery.length} {gallery.length === 1 ? 'photo' : 'photos'}
                                </span>
                            </div>
                        </div>

                        {/* Grid de imágenes - Responsive */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                            {gallery.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative aspect-square overflow-hidden rounded-lg
                                             bg-white shadow-md hover:shadow-xl transition-all duration-300
                                             cursor-pointer"
                                >
                                    {/* Imagen */}
                                    <img
                                        src={item.img}
                                        alt={`Portfolio item ${item.id}`}
                                        className="w-full h-full object-cover group-hover:scale-110
                                                 transition-transform duration-500 ease-out"
                                    />

                                    {/* Overlay en hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0
                                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                        {/* Botón de acción en hover */}
                                        <div className="absolute bottom-3 right-3">
                                            <button
                                                className="p-2 bg-white/90 backdrop-blur-sm rounded-full
                                                         hover:bg-white transition-colors shadow-lg"
                                                title="View full size"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-gray-700"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Número de imagen */}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full
                                                         text-xs font-semibold text-gray-700 shadow-lg">
                                                #{item.id}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mensaje si no hay imágenes (placeholder futuro) */}
                        {gallery.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <svg
                                    className="w-16 h-16 text-gray-300 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-600 mb-2">No photos yet</h3>
                                <p className="text-sm text-gray-500">Photos will appear here when added</p>
                            </div>
                        )}

                    </div>
                </main>

            </div>

        </>
    )
}

const GalleryWindow = WindowWrapper(Gallery, "gallery")
export default GalleryWindow
