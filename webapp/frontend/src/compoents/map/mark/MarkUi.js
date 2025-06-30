import React from "react";
import { useMark } from "../../context/MarkContext";
import '../../../css/MarkUi.css';

const MarkUi = () => {
    const { popupRef, contentRef } = useMark();

    return (
        <div ref={popupRef} className="ol-popup mark-popup" style={{ display: 'none' }}>
             <div ref={contentRef}></div>
        </div>
    );
};

export default MarkUi;