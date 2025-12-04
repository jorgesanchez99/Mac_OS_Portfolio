import {WindowControls} from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {socials} from "#constants/index.js";
import {Mail} from "lucide-react";

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact"/>
                <h2>Contáctame</h2>
            </div>

            <div className="px-6 md:px-10 py-8 md:py-10">
                <div className="max-w-4xl mx-auto space-y-10">
                    {/* Perfil */}
                    <section
                        className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
                        <div className="shrink-0">
                            <img
                                src="/images/jorge.jpg"
                                alt="Jorge Sánchez"
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-lg
                           ring-4 ring-white dark:ring-slate-800 border border-gray-200 dark:border-slate-700"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                                    Hola, soy Jorge
                                </p>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
                                    Programador Backend • Full-Stack en formación
                                </h3>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base max-w-xl">
                                Me especializo en desarrollo backend con Java y actualmente estoy fortaleciendo mis
                                bases en frontend y herramientas modernas del ecosistema web.
                                Si quieres colaborar, revisar código o simplemente conectar, aquí tienes mis datos de
                                contacto.
                            </p>

                            {/* Email */}
                            <a
                                href="mailto:jorgesanchez99dev@gmail.com"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border
                           border-slate-200 dark:border-slate-700
                           bg-white dark:bg-slate-800
                           shadow-sm hover:shadow-md
                           hover:border-sky-300 dark:hover:border-sky-400
                           transition-all"
                            >
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300">
                  <Mail size={18}/>
                </span>
                                <span className="font-medium text-slate-800 dark:text-slate-100 text-sm md:text-base">
                  jorgesanchez99dev@gmail.com
                </span>
                            </a>
                        </div>
                    </section>

                    {/* Redes */}
                    <section className="space-y-4">
                        {/* fila título + texto extra */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-slate-500 dark:text-slate-300">
                                Conecta conmigo
                            </h4>
                            <p className="text-xs text-slate-400 dark:text-slate-400">
                                Respondo más rápido por LinkedIn y correo.
                            </p>
                        </div>

                        {/* botones tipo pill */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {socials.map(({id, bg, link, icon, text}) => (
                                <a
                                    key={id}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={text}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             text-sm font-semibold text-white shadow-md
                             hover:shadow-lg hover:-translate-y-[1px]
                             active:translate-y-[1px] transition-all"
                                    style={{backgroundColor: bg}}
                                >
                                    <img src={icon} alt={text} className="w-4 h-4"/>
                                    <span>{text}</span>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Footer info */}
                    <footer
                        className="pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-wrap items-center justify-between gap-2">
                        <p>✨ Siempre abierto a nuevas oportunidades y colaboraciones.</p>
                        <p>🇵🇪 Perú · Disponible para trabajo remoto.</p>
                    </footer>
                </div>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
