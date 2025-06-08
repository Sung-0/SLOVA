import React, { createContext, useContext, useEffect, useState } from "react";

export const LandslideContext = createContext(null);

export const useLandslide = () => useContext(LandslideContext);

export const LandslideProvider = ({ children }) => {
  const [showLandslide, setShowLandslide ] = useState(false);
  const [cachedGeojson, setCachedGeojson] = useState(null);

  useEffect(() => {
    const fetchLandslideGeoJSON = async () => {
      try {
        const response = await fetch("/landslide-rank/geojson");
        const geojson = await response.json();
        setCachedGeojson(geojson);
      } catch (err) {
        console.error('산사태 GeoJSON 불러오기 실패:', err);
      }
    };

    if (!cachedGeojson) fetchLandslideGeoJSON();
  }, [cachedGeojson]);

  return (
    <LandslideContext.Provider value={{ showLandslide, setShowLandslide, cachedGeojson}}>
      {children}
    </LandslideContext.Provider>
  );
};