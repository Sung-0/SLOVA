import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { MapContext } from '../context/MapContext';


const VWorldMap = () => {

    const mapElement = useRef(null);   // 지도 DOM 참조용
    const { setMap } = useContext(MapContext)

  // 지도 생성 함수 - useCallback으로 메모이제이션
     const createMap = useCallback(() => {
      const ol = window.ol;
        if (!ol || !mapElement.current) return;

        // 지도 객체 생성
        const baseLayer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: `http://api.vworld.kr/req/wmts/1.0.0/${process.env.REACT_APP_V_WORLD_MAPS_API_KEY}/Base/{z}/{y}/{x}.png`,
            crossOrigin: 'anonymous',
            minZoom: 7,
            maxZoom: 18,
          }),
        });
        baseLayer.set('name', 'baseLayer');

        //지도 객체 생성
        const mapInstance = new ol.Map({
          target: mapElement.current,
          layers: [baseLayer],
          view: new ol.View({
            center: ol.proj.fromLonLat([128.2, 37.8]),
            zoom: 9,
            minZoom: 7,
            maxZoom: 18,
            extent: ol.proj.transformExtent(
              [124.0, 33.0, 132.0, 39.5],
              'EPSG:4326','EPSG:3857'
            ),
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

  return (
    <div
      id="vworldMap"
      ref={mapElement}
      style={{ width: '100%', height: '100%' }}
     />
  );
  
};

export default VWorldMap;
