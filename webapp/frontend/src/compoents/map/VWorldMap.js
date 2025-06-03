import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { MapContext } from '../context/MapContext';
import { RegionContext } from '../context/RegionContext';
import { createGridLayer } from './GridLayer'; 

const VWorldMap = () => {

    const mapElement = useRef(null);   // 지도 DOM 참조용

     // map 객체를 context에 저장할 setter
    const { setMap, map, isGridVisible, } = useContext(MapContext);
    const { boundaryGeojson, boundaryLayer, setBoundaryLayer} = useContext(RegionContext);

  // 지도 생성 함수 - useCallback으로 메모이제이션
     const createMap = useCallback(() => {
      const ol = window.ol;
        if (!ol || !mapElement.current) return;

        // 지도 객체 생성
        const mapInstance = new ol.Map({
        target: mapElement.current,  // ref.current 직접 사용
        layers: [
            new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: `http://api.vworld.kr/req/wmts/1.0.0/${process.env.REACT_APP_V_WORLD_MAPS_API_KEY}/Base/{z}/{y}/{x}.png`,
                crossOrigin: 'anonymous',
                minZoom: 7,
                maxZoom: 19,
              }),
            }),
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([127.8, 36.5]),
            zoom: 8,
            minZoom: 7,
            maxZoom: 19,
            extent: ol.proj.transformExtent(
            [124.0, 33.0, 132.0, 39.5],
            'EPSG:4326','EPSG:3857'
            )
          }),
        });

        setMap(mapInstance);
    }, [setMap]);

  // ol.js 스크립트 로딩 및 지도 생성 호출
    useEffect(() => {
        const existingScript = document.querySelector('script[src="https://openlayers.org/en/v4.6.5/build/ol.js"]');
        if (existingScript) {
        createMap();
        return;
        }

        const script = document.createElement('script');
        script.src = 'https://openlayers.org/en/v4.6.5/build/ol.js';
        script.onload = () => createMap();
        document.body.appendChild(script);

    }, [createMap]);

      // 경계선 그리기
     useEffect(() => {
      const ol = window.ol;
      if (!map || !boundaryGeojson) return;

      // 기존 경계 레이어 제거
      if (boundaryLayer) {
        map.removeLayer(boundaryLayer);
        setBoundaryLayer(null);
      }

      //GeoJSON에서 features 읽기
      const features = new ol.format.GeoJSON().readFeatures(boundaryGeojson, {
        featureProjection: 'EPSG:3857'
      });

      //Vector Source 생성
      const vectorSource = new ol.source.Vector({
        features: features,
      });

      //Vector Layer 생성
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 2,
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.2)',
          }),
        }),
      });

      // 지도에 레이어 추가
      map.addLayer(vectorLayer);

      //Context에 저장
      setBoundaryLayer(vectorLayer);
     }, [map, boundaryGeojson, boundaryLayer, setBoundaryLayer]);


    // 줌 변경에 따라 격자 다시 그리기
    useEffect(() => {
      if (!map || !isGridVisible) return;

      const view = map.getView();

      const handleZoomChange = () => {
        // 기존 격자 제거
        const layers = map.getLayers().getArray();
        const gridLayer = layers.find(layer => layer.get('name') === 'gridLayer');
        if (gridLayer) {
          map.removeLayer(gridLayer);
        }

        // 새로운 격자 생성 및 추가
        const newGridLayer = createGridLayer(map);
        newGridLayer.set('name', 'gridLayer');
        map.addLayer(newGridLayer);
      };
      // 줌 레벨 변경 이벤트 등록
      view.on('change:resolution', handleZoomChange);

      //cleanup
      return () => view.un('change:resolution', handleZoomChange);
    }, [map, isGridVisible]);

  return (
    <div
      id="vworldMap"
      ref={mapElement}
      style={{ width: '100%', height: '100%' }}
    />
  );
  
};

export default VWorldMap;
