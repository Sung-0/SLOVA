import React from "react";
import { useFacilityMark } from "../../context/FacilityMarkContext";
import "../../../css/FacilityPopup.css";

const FacilityUi = () => {
    const { popupRef, contentRef } = useFacilityMark();

    return (
        <div
            ref={popupRef}
            className="ol-popup facility-popup"
            style={{ display: "none" }}
        >
            <div ref={contentRef}></div>
        </div>
    );
};

export default FacilityUi;