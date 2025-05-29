import React from "react";
import '../css/Body.css';
import VWorldMap from './map/VWorldMap.js';

const Body = () => {
    return (
        <div className="body">
            <div className="map-container">
                 <VWorldMap />
            </div>
        </div>
    );
};

export default Body;