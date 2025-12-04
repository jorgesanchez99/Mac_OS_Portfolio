import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import {Download} from "lucide-react";

import {pdfjs, Document, Page} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const fileUrl = "files/CV_Jorge_Sanchez.pdf";

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header fijo de la ventana */}
      <div
        id="window-header"
        className="border-b border-slate-200 dark:border-slate-700"
      >
        <WindowControls target="resume"/>

        <h2 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
          CV_Jorge_Sanchez.pdf
        </h2>

        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
          title="Descargar CV"
        >
          <Download className="icon"/>
        </a>
      </div>

      {/* Contenido con scroll propio */}
      <div
        className="flex-1 overflow-auto
                   bg-gradient-to-br from-slate-100 to-slate-200
                   dark:from-slate-900 dark:to-slate-950
                   p-3 sm:p-4 md:p-6
                   flex items-start justify-center"
      >
        <div
          className="bg-white dark:bg-slate-950
                     rounded-xl shadow-2xl overflow-hidden
                     max-w-full"
        >
          <Document file={fileUrl}>
            <Page
              pageNumber={1}
              renderAnnotationLayer
              renderTextLayer
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
