import React, { useContext }  from "react";
import '../css/BodyRankToggle.css';
import VWorldMap from './map/VWorldMap.js';
import ZoomController from "./map/ZoomController.js";
import BodyRankToggle from "./BodyRankToggle.js";
import MapTypeToggle from "./MapTypeToggle";
import { ChangeMap } from "./map/ChangeMap.js";
import MarkLayer from "./map/mark/MarkLayer.js";
import { MapContext } from "./context/MapContext.js";
import MarkUi from "./map/mark/MarkUi.js";

const Body = () => {
    const { map } = useContext(MapContext);

    return (
            <div className="body">
                <ZoomController />
                 
                {/* 지도 유형 토글 버튼 - 왼쪽 상단 */}
                <div className="map-type-toggle-container">
                    <MapTypeToggle />
                </div>

                    <ChangeMap  />

                <div className="map-container"> 
                    <MarkUi />  
                     <VWorldMap />
                     {map && <MarkLayer map ={map} />}    
                </div>
                <BodyRankToggle /> 
            </div>
    );
};

export default Body;