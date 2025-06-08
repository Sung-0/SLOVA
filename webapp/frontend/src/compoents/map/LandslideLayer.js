import { useEffect, useRef } from "react";
import { useMap } from "../context/MapContext";
import { useLandslide } from "../context/LandslideContext";
import { useChangeMap } from "../context/ChangeMapContext";

const LandslideLayer = () => {
  const { map } = useMap();
  const { showLandslide, cachedGeojson } = useLandslide();
  const { mapType } = useChangeMap();
  const landslideLayerRef = useRef(null);

  useEffect(() => {
    if (!map || !cachedGeojson) return;

    const ol = window.ol;

    // 중복 제거
    const existingLayer = map.getLayers().getArray().find(layer => layer.get('name') === 'landslideLayer');
    if(existingLayer) {
      map.removeLayer(existingLayer);
    }

    //레이어 없을 경우 최초 생성
      if (!landslideLayerRef.current) {
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(cachedGeojson, {
          featureProjection: "EPSG:3857",
        });

        const vectorSource = new ol.source.Vector({ features });

        const vectorLayer = new ol.layer.Vector({
          name: 'landslideLayer',
          source: vectorSource,
          style: (feature) => {
            const rank = feature.get("rank");
            const fillColor = {
              1: "rgba(0, 0, 255, 0.55)",
              2: "rgba(110, 248, 248, 0.55)",
              3: "rgba(253, 253, 111, 0.55)",
              4: "rgba(255, 165, 0, 0.55)",
              5: "rgba(255, 0, 0, 0.55)",
            }[rank] || "rgba(150, 150, 150, 0.55)";

            return new ol.style.Style({
              fill: new ol.style.Fill({ color: fillColor }),
            });
          },
        });

        landslideLayerRef.current = vectorLayer;
      }

      //showLandslide 상태에 따라 지도에 추가/ 제거
      if (showLandslide) {
        if (!map.getLayers().getArray().includes(landslideLayerRef.current)){
            map.addLayer(landslideLayerRef.current);
        }
      } else {
        if (map.getLayers().getArray().includes(landslideLayerRef.current)){
            map.removeLayer(landslideLayerRef.current);
        }
      }
  }, [map, mapType, showLandslide, cachedGeojson]);

  return null;
};

export default LandslideLayer;
