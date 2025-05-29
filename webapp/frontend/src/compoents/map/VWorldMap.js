import React, { useEffect, useRef } from 'react';

const VWorldMap = () => {
  // 지도 DOM을 참조하기 위한 ref 생성
  const mapElement = useRef(null);

  useEffect(() => {
    // 이미 스크립트가 로드 되었는지 확인
    const existingScript = document.querySelector('script[src="https://openlayers.org/en/v4.6.5/build/ol.js"]');
    if (existingScript) return; // 중복 방지

    // OpenLayers 라이브러리 스크립트를 동적으로 로드
    const script = document.createElement('script');
    script.src = 'https://openlayers.org/en/v4.6.5/build/ol.js'; // OpenLayers v4
    script.onload = () => {
      const ol = window.ol;
      if (!ol || !mapElement.current) return; // 로딩 실패 시 중단

      // OpenLayers Map 객체 생성
      new ol.Map({
        // 지도를 렌더링할 대상 DOM 요소의 id
        target: 'vworldMap',

        // 지도에 표시할 타일 레이어 설정
        layers: [
          new ol.layer.Tile({
            source: new ol.source.XYZ({
              // 브이월드 WMTS 타일 서버 URL (Base 지도)
              url: `http://api.vworld.kr/req/wmts/1.0.0/${process.env.REACT_APP_V_WORLD_MAPS_API_KEY}/Base/{z}/{y}/{x}.png`,
              crossOrigin: 'anonymous', // CORS 에러 방지
            }),
          }),
        ],

        // 지도 뷰 설정 (중심 좌표 및 확대 레벨)
        view: new ol.View({
          center: ol.proj.fromLonLat([127.8, 36.5]), // 대한민국 중심 좌표
          zoom: 8, // 초기 확대 레벨
        }),
      });
    };

    // 스크립트를 body에 삽입
    document.body.appendChild(script);
  }, []);

  return (
    // 지도가 렌더링될 div 요소
    <div
      id="vworldMap"
      ref={mapElement}
      style={{ width: '100%', height: '100hv'}}
    />
  );
};

export default VWorldMap;
