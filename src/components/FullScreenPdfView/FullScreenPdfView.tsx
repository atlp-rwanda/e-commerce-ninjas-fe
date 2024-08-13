/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { Document, Page,pdfjs } from "react-pdf";
import { FaExpand } from "react-icons/fa"; 

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
export const FullScreenPdfView = ({ pdfUrl,onClose }) => {
  const pdfContainerRef = useRef(null);

  useEffect(()=>{

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().finally(onClose);
          console.log("Escape")
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

      if (pdfContainerRef.current) {
        const element = pdfContainerRef.current;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { 
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { 
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { 
          element.msRequestFullscreen();
        }
      };
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
  },[onClose])

  return (
    <div  ref={pdfContainerRef}>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
