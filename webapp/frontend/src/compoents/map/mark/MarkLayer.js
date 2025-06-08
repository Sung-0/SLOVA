import { useEffect } from "react";
import { useMark } from "../../context/MarkContext";
import { useChangeMap } from "../../context/ChangeMapContext";
import { onMarkerClick } from "./MarkInteraction";

const MarkLayer = ({ map }) => {
    const { markers, popupRef, contentRef } = useMark();
    const { mapType } = useChangeMap();

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#0000FF'; // 파랑
      case 2: return '#00FFFF'; // 시안
      case 3: return '#FFFF00'; // 노랑
      case 4: return '#FFA500'; // 오렌지
      case 5: return '#FF0000'; // 빨강
      default: return '#CCCCCC'; // 회색 (등급 없을 때)
    }
  };

    useEffect(() => {
        const ol = window.ol;
       if (!map || !markers.length) return;

        // 기존 마커 레이어 제거 (중복 방지)
        const existingLayer = map.getLayers().getArray().find(layer => layer.get('name') === 'markLayer');
        if (existingLayer) {
            map.removeLayer(existingLayer);
        }

        // Feature 배열 생성
        const features = markers.map(({ lat, lon, name, img, rank }) => {
            const feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
                name, img, rank,
                type: 'mark',
            });

            // 동그라미 스타일 + 텍스트 설정
            feature.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 10,
                    fill: new ol.style.Fill({ color: getRankColor(rank)}),
                    stroke: new ol.style.Stroke({ color: '#000', width: 1 }),
                }),
                text: new ol.style.Text({
                    text: rank.toString(), // rank 숫자를 문자열로 변화해 중앙 표시
                    font: 'bold 12px sans-serif',
                    fill: new ol.style.Fill({ color: '#fff' }),
                    stroke: new ol.style.Stroke({ color: '#000', width:2 }),
                    textAlign: 'center',
                    textBaseline: 'middle',
                    offsetY: 0, //중앙 위치
                }),
            }));

            return feature;
        });

        // Vector source와 레이어 생성
        const vectorSource = new ol.source.Vector({ features});
        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            name: 'markLayer',
        });

        map.addLayer(vectorLayer);

        //팝업 오버레이 생성
        const overlay = new ol.Overlay({
            element: popupRef.current,
            autoPan: false,
            autoPanAnimation: { duration: 250 },
        });
        map.addOverlay(overlay);

        // 마우스 호버 이벤트 팝업
        const handlePointerMove = (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
            if (feature && feature.get('type') === 'mark') {
                const coordinate = evt.coordinate;
                const name = feature.get('name');
                const img = feature.get('img');

                contentRef.current.innerHTML = `<div><img src="/images/${img}" width="50" /><br/>${name}</div>`;
                overlay.setPosition(coordinate);
                popupRef.current.style.display = 'block';

                // 커서 스타일 추가
                map.getTargetElement().style.cursor = 'pointer';
            } else {
                popupRef.current.style.display = 'none';
                overlay.setPosition(undefined);

                // 커서 원래대로
                map.getTargetElement().style.cursor = '';
            }
        };

        map.on('pointermove', handlePointerMove);

        // 마커 클릭 이벤트 등록
        const handleClick = (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);

             if (feature && feature.get('type') === 'mark') {
                const name = feature.get('name');
                const rank = feature.get('rank');
                const lonLat = feature.getGeometry().getCoordinates();
                const [lon, lat] = window.ol.proj.toLonLat(lonLat);

                const marker = { name, rank, lon, lat};

                onMarkerClick(marker, map); 
            }
        };

        map.on('singleclick', handleClick);

        // 정리
        return () => {
            map.un('pointermove', handlePointerMove);
            map.un('singleclick', handleClick) // 클릭 이벤트 제거
            map.removeLayer(vectorLayer);
            map.removeOverlay(overlay);
        };
    }, [map, markers, popupRef, contentRef, mapType]);

    return null;
    };

export default MarkLayer;