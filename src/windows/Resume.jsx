import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import {Download} from "lucide-react";

import {pdfjs,Document,Page} from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
    return <>

        <div id="window-header">
            <WindowControls target="resume"/>
            <h2>CV.pdf</h2>

            <a
            href="files/CV_Jorge_Sanchez.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
            title="Descargar CV"
            >
                <Download className="icon"/>
            </a>
        </div>

        <Document file="files/CV_Jorge_Sanchez.pdf" >
        <Page
            pageNumber={1}
            renderAnnotationLayer
        />
      </Document>
    </>
}

const ResumeWindow = WindowWrapper(Resume, "resume");


export default ResumeWindow
