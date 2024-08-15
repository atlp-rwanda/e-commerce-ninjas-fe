/* eslint-disable */

import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const FullScreenPdfView = ({ pdfUrl }) => {
  const pdfContainerRef = useRef(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    // adjustScale();
  }

  const adjustScale = () => {
    if (pdfContainerRef.current) {
      const containerWidth = pdfContainerRef.current.clientWidth;
      setScale(containerWidth / 600);
    }
  };

  const goToPrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  return (
    <div ref={pdfContainerRef} style={{width:'100%', height: '100%', overflow: 'auto' }}>
      <div className="pageNumber">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          <IoIosArrowBack className="pageNumber__icon"/>
        </button>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber}  />
        </Document>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          <IoIosArrowForward className="pageNumber__icon"/>
        </button>
      </div>
    </div>
  );
};
