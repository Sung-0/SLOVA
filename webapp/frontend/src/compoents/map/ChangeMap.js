import { useEffect } from "react";
import { useMap } from "../context/MapContext";
import { useChangeMap } from "../context/ChangeMapContext";
import { useRegion } from "../context/RegionContext";

export const ChangeMap = () => {
  const { map } = useMap();
  const { mapType } = useChangeMap();
  const { boundaryGeojson, setBoundaryLayer } = useRegion();

  useEffect(() => {
    if (!map) return;
    const ol = window.ol;
    const apikey = process.env.REACT_APP_V_WORLD_MAPS_API_KEY;

      // 기존 레이어 남기고 배경 지도만 제거
      const layersToKeep = map.getLayers().getArray().filter(layer => {
        const name = layer.get('name');
        return name === 'markLayer' || name === 'landslideLayer' || name === 'boundaryLayer' || name === 'FacilityLayer';
      });

      map.getLayers().clear(); // 전체 클리어
      layersToKeep.forEach(layer => map.addLayer(layer)); // 유지할 레이어 다시 추가

      // 지도 레이어 설정
      if (mapType === "BASE") {
        const baseLayer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: `https://api.vworld.kr/req/wmts/1.0.0/${apikey}/Base/{z}/{y}/{x}.png`,
            crossOrigin: "anonymous",
          }),
        });
        baseLayer.set('name', 'baseLayer');
        map.addLayer(baseLayer);
      }

      if (mapType === "HYBRID") {
        const satelliteLayer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: `https://api.vworld.kr/req/wmts/1.0.0/${apikey}/Satellite/{z}/{y}/{x}.jpeg`,
            crossOrigin: "anonymous",
          }),
        });
        satelliteLayer.set('name', 'satelliteLayer');

        const hybridLayer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: `https://api.vworld.kr/req/wmts/1.0.0/${apikey}/Hybrid/{z}/{y}/{x}.png`,
            crossOrigin: "anonymous",
          }),
        });
        hybridLayer.set('name', 'hybridLayer');

        map.addLayer(satelliteLayer);
        map.addLayer(hybridLayer);
      }

      // 위치검색 레이어
      if (boundaryGeojson) {
        const vectorSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(boundaryGeojson, {
            featureProjection: "EPSG:3857",
          }),
        });

        const boundaryLayer = new ol.layer.Vector({
          source: vectorSource,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({ color: "red", width: 2 }),
            fill: new ol.style.Fill({ color: "rgba(255, 0, 0, 0.1)" }),
          }),
        });

        boundaryLayer.set("name", "boundaryLayer");
        map.addLayer(boundaryLayer);
        setBoundaryLayer(boundaryLayer);
      }

    }, [mapType, map, boundaryGeojson, setBoundaryLayer]);
};