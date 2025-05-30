import React from "react";
import '../css/Body.css';
import { MapProvider } from "./map/MapContext.js";
import VWorldMap from './map/VWorldMap.js';
import VWorldMenu from "./map/VWorldmenu.js";

const Body = () => {
    return (
        <MapProvider>
            <div className="body">
                <VWorldMenu z/>
                <div className="map-container">
                    <VWorldMap />
                </div>
            </div>
        </MapProvider>
    );
};

export default Body;