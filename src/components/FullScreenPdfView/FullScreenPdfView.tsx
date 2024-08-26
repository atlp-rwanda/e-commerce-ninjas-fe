/* eslint-disable */

import React, { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const FullScreenPdfView = ({ pdfUrl, open, onClose }) => {
  const pdfContainerRef = useRef(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    if (open) {
      setPageNumber(1); // Reset to the first page when opening
    }
  }, [open]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    adjustScale();
  }

  const adjustScale = () => {
    if (pdfContainerRef.current) {
      const containerWidth = pdfContainerRef.current.clientWidth;
      setScale(containerWidth / 245);
    }
  };

  const goToPrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  if (!open) return null;

  return (
    <div className="view__pdf">
      <div ref={pdfContainerRef}>
        <div className="pageNumber">
          <Button onClick={goToPrevPage} disabled={pageNumber <= 1} sx={{color:"#ff6d18"}}>
            <IoIosArrowBack className="pageNumber__icon" />
          </Button>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
          <Button onClick={goToNextPage} disabled={pageNumber >= numPages} sx={{color:"#ff6d18"}}>
            <IoIosArrowForward className="pageNumber__icon" />
          </Button>
        </div>
      </div>
      <IoCloseCircleOutline
        onClick={onClose}
        className="close__icon"
      />
    </div>
  );
};
