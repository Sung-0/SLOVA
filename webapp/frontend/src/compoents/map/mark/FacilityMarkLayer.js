import { useEffect } from "react";
import { useFacilityMark } from "../../context/FacilityMarkContext";
import { useSearch } from "../../context/SearchContext";
import fireIcon from "../../../assets/fire-fighting.png";
import policeIcon from "../../../assets/police.png";
import hospitalIcon from "../../../assets/hospital.png";
import armyHospitalIcon from "../../../assets/army_hospital.png"

const iconMap = {
    fire: fireIcon,
    police: policeIcon,
    hospital: hospitalIcon,
    armyHospital: armyHospitalIcon,
};

const getFacilityType = (cd, name) => {
    if (cd === 1 || cd === "1") return "fire";
    if (cd === 2 || cd === "2") return "police";
    if (cd === 3 || cd === "3") {
        return name.startsWith('국') ? "armyHospital" : "hospital";
    }
    return null;
};

const FacilityMarkLayer = ({ map }) => {
    const { selectedSido } = useSearch();
    const { facilityData, filters } = useFacilityMark();

    useEffect(() => {
        if (!map || !selectedSido) return;

        const ol = window.ol;

        //기존 마커 레이어 제거
        const existingLayer = map.getLayers().getArray().find(layer => layer.get('name') === 'FacilityLayer');
        if (existingLayer) {
            map.removeLayer(existingLayer);
        }

        // 병합하여 하나의 배열로
        const combinedMarkers = [
            ...facilityData.fire_police
                .map(f => ({ ...f, type: getFacilityType(f.cd, f.name) }))
                .filter(f => filters[f.type]),

            ...facilityData.hospitals
                .map(h => ({ ...h, type: getFacilityType(h.cd, h.name) }))
                .filter(h => filters[h.type]),
        ];

        // 시도 코드 필터링
        const filteredMarkers = combinedMarkers.filter(
            m => String(m.sd_cd) === String(selectedSido.value)
        );

        // Feature 생성
        const features = filteredMarkers.map((data) => {
            const { lat, lon, type, ...rest } = data;

            const feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
                type,
                ...rest,
            });

            const icon = iconMap[type];

            if (icon) {
                feature.setStyle(
                    new ol.style.Style({
                        image: new ol.style.Icon({
                            src: icon,
                            scale: 0.085, // 아이콘 크기 조절
                            anchor: [0.5, 1], // 중심 정렬
                            imgSize: [550, 490],
                        }),
                    })
                );
            }

            return feature;
        });

        // 백터 소스와 레이어 생성
        const vectorSource = new ol.source.Vector({ features });
        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            name: 'FacilityLayer',
            zIndex: 5,
        });

        map.addLayer(vectorLayer);

        return () => map.removeLayer(vectorLayer);
    }, [map, facilityData, filters, selectedSido]);

    return null;
}

export default FacilityMarkLayer;