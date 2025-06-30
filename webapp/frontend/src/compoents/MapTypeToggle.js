import React from "react"; 
import "../css/ToggleMapButton.css";
import { useChangeMap } from "./context/ChangeMapContext";

function MapTypeToggle() {
  const { mapType, setMapType } = useChangeMap();
  const isBase = mapType === "BASE";


  const toggleMapType = () => {
    const next = isBase ? "HYBRID" : "BASE";
    setMapType(next);
  };

  return (
    <div className="map-toggle-single" onClick={toggleMapType}>
      <img
        src={isBase ? "/map_hybrid.png" : "/map_base.png"}
        alt={isBase ? "위성 지도 미리보기" : "기본 지도 미리보기"}
        className="map-toggle-thumb"
      />
      <div
        className={`map-toggle-label-single ${isBase ? "label-hybrid" : "label-base"}`}
      >
        {isBase ? "위성" : "지도"}
      </div>
    </div>
  );
}

export default MapTypeToggle;
