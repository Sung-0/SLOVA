import { useEffect } from "react";
import { useMark } from "../../context/MarkContext";
import { RANK_INFO } from "../../RANK_INFO";
import { useSearch } from "../../context/SearchContext";

const getRankColor = (rank) => RANK_INFO[rank]?.color || '#CCCCCC';

const MarkLayer = ({ map }) => {
    const { markers } = useMark();
    const { selectedSido } = useSearch();

    useEffect(() => {
       if (!map || !selectedSido) return;

       const ol = window.ol;

        // 기존 마커 레이어 제거 (중복 방지)
        const existingLayer = map.getLayers().getArray().find(layer => layer.get('name') === 'markLayer');
        if (existingLayer) {
            map.removeLayer(existingLayer);
        }

        // 시도 코드로 마커 필터링
        const filteredMarkers = markers.filter(
            marker => String(marker.sd_cd) === String(selectedSido.value)
        );

        // Feature 배열 생성
        const features = filteredMarkers.map(({ lat, lon, ...rest }) => {
            const feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
                ...rest,
                type: 'mark',
            });

            // 동그라미 스타일 + 텍스트 설정
            feature.setStyle(
                new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 10,
                        fill: new ol.style.Fill({ color: getRankColor(rest.rank)}),
                        stroke: new ol.style.Stroke({ color: '#000', width: 1 }),
                }),
                text: new ol.style.Text({
                    text: rest.rank.toString(), // rank 숫자를 문자열로 변화해 중앙 표시
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
        const vectorSource = new ol.source.Vector({ features });
        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            name: 'markLayer',
            zIndex: 50,
        });

        map.addLayer(vectorLayer);
        return () => map.removeLayer(vectorLayer);
    }, [map, markers, selectedSido]);

    return null;
};

export default MarkLayer;