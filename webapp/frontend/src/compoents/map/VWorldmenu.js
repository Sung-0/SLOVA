import { useContext } from "react";
import { MapContext } from "../context/MapContext";
import { RegionContext } from "../context/RegionContext";
import { createGridLayer } from "./GridLayer";

export const useVWorldMenuActions = () => {
    /* 변수들 */
    const { map, isGridVisible, setIsGridVisible} = useContext(MapContext);
    const { boundaryGeojson, setBoundaryLayer } = useContext(RegionContext);
    const ol = window.ol;

    /* 격자  */
    const handleGridToggle = () => {

        if (!map) return;

         if (isGridVisible) {
            const layers = map.getLayers().getArray();
            const target = layers.find(l => l.get('name') === 'gridLayer');
            if (target) map.removeLayer(target);
            setIsGridVisible(false);
        } else {
            const gridLayer = createGridLayer(map);
            gridLayer.set('name', 'gridLayer');
            map.addLayer(gridLayer);
            setIsGridVisible(true);
        }
    };

    /* 항공사진 코드 */
    const addHybridMapLayers = (map, apiKey) => {
        map.getLayers().clear(); //전체 제거
        const satelliteLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url:`https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Satellite/{z}/{y}/{x}.jpeg`,
                crossOrigin: 'anonymous',
            }),
        });

        const hybridLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Hybrid/{z}/{y}/{x}.png`,  
                crossOrigin: 'anonymous',  
            }),       
        });

        map.addLayer(satelliteLayer);
        map.addLayer(hybridLayer);
    };

    /* 지도 버튼 클릭 이벤트 */
    const handleMapChange = (type) => {

        const apiKey = process.env.REACT_APP_V_WORLD_MAPS_API_KEY;
        if (!map) return;

        map.getLayers().clear() //전체 제거

        if (type === 'GRAPHIC') {
            const baseLayer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url:`https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`,
                    crossOrigin: 'anonymous',
                }),
            });
            map.addLayer(baseLayer);
        } else if (type === 'HYBRID') {
            addHybridMapLayers(map, apiKey);
        }

        // 격자 유지
        if (isGridVisible) {
            const gridLayer = createGridLayer(map);
            gridLayer.set('name', 'gridLayer');
            map.addLayer(gridLayer);
        }

        // 기존 경계 레이어 유지
        if (boundaryGeojson) {
            const vectorSource = new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(boundaryGeojson, {
                    featureProjection: 'EPSG:3857',
                }),
            });

            const boundaryLayer = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 2,
                    }),
                    fill: new ol.style.Fill({
                         color: 'rgba(255, 0, 0, 0.1)',
                    }),
                }),
            });

            boundaryLayer.set('name', 'boundaryLayer');
            map.addLayer(boundaryLayer);
            setBoundaryLayer(boundaryLayer);
        }
    };

    const zoomToNationwide = () => {
        if (!map) return;
        const center = ol.proj.fromLonLat([127.5, 36.5]);
        map.getView().setCenter(center);
        map.getView().setZoom(7.5);
    };

    return {
        handleGridToggle,
        handleMapChange,
        zoomToNationwide,
    };
};