import React  from "react";
import '../css/Body.css';
import VWorldMap from './map/VWorldMap.js';
import ZoomControls from "./map/ZoomControls";

const Body = () => {

    return (
            <div className="body">
                <ZoomControls />
                <div className="map-container">
                    <VWorldMap />
                </div>
            </div>
    );
};

export default Body;