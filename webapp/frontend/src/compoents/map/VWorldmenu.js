import React, { useContext } from "react";
import { MapContext } from "./MapContext";
import { createGridLayer } from "./GridLayer";

const VWorldMenu = () => {

<<<<<<< HEAD
    /* 변수들들 */
    const { map } = useContext(MapContext) // Context에서 지도 객체 받아오기
    const ol = window.ol;
    let gridLayer = null; // 전역처럼 보존할 변수
=======
    /* 변수들 */
    const { map, isGridVisible, setIsGridVisible } = useContext(MapContext) // Context에서 지도 객체 받아오기
    const ol = window.ol;
>>>>>>> sung
    
    /* 격자 관련 */
    const handleGridToggle = () => {
        if (!map) return;

<<<<<<< HEAD
        if (gridLayer) {
            map.removeLayer(gridLayer);
            gridLayer = null;
        } else {
            gridLayer = createGridLayer(map);
            map.addLayer(gridLayer);
=======
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
>>>>>>> sung
        }
    };

    /* 지도 버튼 클릭 이벤트 */
    const addHybridMapLayers = (map, apiKey) => {
        if (!map) return;

<<<<<<< HEAD
        map.getLayers().clear();
=======

        map.getLayers().clear(); //전체 제거
>>>>>>> sung

        const satelliteLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url:`https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Satellite/{z}/{y}/{x}.jpeg`,
                crossOrigin: 'anonymous',
                zoom: 8,
            }),
        });

        const hybridLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Hybrid/{z}/{y}/{x}.png`,
                crossOrigin: 'anonymous',
                zoom: 8,
            }),
        });

        map.addLayer(satelliteLayer);
        map.addLayer(hybridLayer);
    };

    //브이월드 OpenLayers 에서 Base 레이어 교체하는 로직 
    const handleMapChange = (type) => {
        const apiKey = process.env.REACT_APP_V_WORLD_MAPS_API_KEY;
        if (!map) {
            console.error('지도 객체가 아직 준비되지 않았습니다.');
            return;
        }

<<<<<<< HEAD
        map.getLayers().clear(); // 기존 레이어 제거
=======
        map.getLayers().clear(); //전체 제거
>>>>>>> sung

        let layer;

        if (type === 'GRAPHIC') {
            layer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`,
                    crossOrigin: 'anonymous',
                }),
            });
            map.addLayer(layer);

<<<<<<< HEAD
            //초기 위치와 줌 레벨 설정
            map.getView().setZoom(8);
            map.getView().setCenter(ol.proj.fromLonLat([127.8, 36.5]));

        } else if (type === 'HYBRID'){
            addHybridMapLayers(map, apiKey);

            // 초기 위치와 줌 레벨 설정
            map.getView().setZoom(8);
            map.getView().setCenter(ol.proj.fromLonLat([127.8, 36.5]))
=======
            // 격자 유지
            if (isGridVisible) {
                const gridLayer = createGridLayer(map); // 다시 생성
                gridLayer.set('name', 'gridLayer');
                map.addLayer(gridLayer);
            }   

        } else if (type === 'HYBRID'){
            addHybridMapLayers(map, apiKey);
            
            // 격자 유지
            if (isGridVisible) {
                const gridLayer = createGridLayer(map); // 다시 생성
                gridLayer.set('name', 'gridLayer');
                map.addLayer(gridLayer);
            }   
>>>>>>> sung
        }
    };


    return (
        <div style={styles.menuContainer}>
            <div style={styles.buttonGroup}>
                <button onClick={() => handleMapChange("GRAPHIC")} style={styles.button}>
                    일반지도
                </button>
                <button onClick={() => handleMapChange("HYBRID")} style={styles.button}>
                    항공사진
                </button>
            </div>
            <div style={styles.buttonGroup}>
                <button style={styles.button}>
                    산사태
                </button>
                <button onClick={handleGridToggle} style={styles.button}>
                    격자
                </button>
            </div>
        </div>
    );
};

// 버튼 css 파일
const styles = {
    menuContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
<<<<<<< HEAD
    suttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
=======
    buttonGroup: {
        display: 'flex',
        gap: '5px'
>>>>>>> sung
    },
    button: {
        margin: '4px',
        padding: '6px 12px',
        fontSize: '14px',
        cursor: 'pointer',
        minWidth: '90px', // 버튼 너비 고정
        textAlign: 'center', // 가운데 정렬 
    },
};

export default VWorldMenu;