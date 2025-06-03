import React  from "react";
import '../css/Body.css';
import VWorldMap from './map/VWorldMap.js';
import ZoomController from "./map/ZoomController.js";

const Body = () => {

    return (
            <div className="body">
                <ZoomController />
                <div className="map-container">
                    <VWorldMap />
                </div>
            </div>
    );
};

export default Body;