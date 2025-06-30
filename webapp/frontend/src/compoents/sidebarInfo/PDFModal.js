import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useSidebar } from '../context/SidebarContext';
import { RANK_INFO } from '../RANK_INFO';
import './css/PDFModel.css';
import { FaFilePdf } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PDFModel = ({ isOpen, onClose }) => {
    const { rankOnly } = useSidebar();
    const [numPages, setNumPages] = useState(null);
    const rank = rankOnly;
    const rankName = RANK_INFO[rank]?.name;
    const rankColor = RANK_INFO[rank]?.color || '#000';

    const rankPdfFiles = {
        1: "/pdf/Safe.pdf",
        2: "/pdf/Safe.pdf",
        3: "/pdf/Warning.pdf",
        4: "/pdf/Warning.pdf",
        5: "/pdf/High_Risk.pdf",
    };
    
    const pdfFile = rankPdfFiles[rank] || "/pdf/Safe.pdf";

    return isOpen ? (
        <div className='model-overlay'>
            <div className='model-content'>
                <button onClick={onClose} className='close-button'>X</button>

                <div className='pdf-header'>
                <div className="pdf-title-container">
                    <h2 className="header-title">
                    <span style={{ color: '#000' }}>{rank}.</span>
                    <span style={{ color: rankColor }}> {rankName}</span>{' '}
                    <span style={{ color: '#000' }}>지침 상세</span>
                    </h2>
                </div>

                <a
                    href='/pdf/RiskGuidance.pdf'
                    download={`지침_${rankName}.pdf`}
                    className='chrome-download-button'
                    title='지침 다운로드'
                >
                    <FaFilePdf className="pdf-icon" />
                    다운로드
                </a>
                </div>

                <div className='pdf-scroll'>
                    <Document file={pdfFile} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                        {Array.from({ length: numPages }, (_, i) => (
                            <div key={`page_${i + 1}`} className="pdf-page-wrapper">
                                <Page
                                    pageNumber={i + 1}
                                    scale={1.8}
                                    renderMode="svg"
                                    renderAnnotationLayer={false}
                                    renderTextLayer={true}
                                />
                                <div className="page-number-text">- Page {i + 1} -</div>
                            </div>
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    ) : null;
};

export default PDFModel;
