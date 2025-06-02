import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { MapContext } from './MapContext';
import { createGridLayer } from './GridLayer'; 

const VWorldMap = () => {

    const mapElement = useRef(null);   // 지도 DOM 참조용
    const { setMap, map,isGridVisible } = useContext(MapContext); // map 객체를 context에 저장할 setter

  // 지도 생성 함수 - useCallback으로 메모이제이션
     const createMap = useCallback(() => {
        const ol = window.ol;
        if (!ol || !mapElement.current) return;

        // 지도 객체 생성
        const map = new ol.Map({
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

        setMap(map);
    }, [setMap]);

  // 스크립트 로딩 및 지도 생성 호출
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
