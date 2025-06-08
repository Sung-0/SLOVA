import React from "react"; 
import "../css/ToggleMapButton.css";
import { FaMapMarkedAlt, FaSatellite } from "react-icons/fa";
import { useChangeMap } from "./context/ChangeMapContext";

function MapTypeToggle() {
  const { mapType, setMapType } = useChangeMap();


  const toggleMapType = () => {
    const newType = mapType === "BASE" ? "HYBRID" : "BASE";
    setMapType(newType);
  };

  const isGraphic = mapType === "BASE";

  return (
    <button
      className={`toggle-pill ${isGraphic ? "active" : ""}`}
      onClick={toggleMapType}
    >
      <span className="icon">{isGraphic ? <FaMapMarkedAlt /> : <FaSatellite />}</span>
      <span className="label">지도 유형</span>
      <span className="badge">{isGraphic ? "기본지도" : "항공사진"}</span>
    </button>
  );
}

export default MapTypeToggle;
