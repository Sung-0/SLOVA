import { useEffect } from "react";
import { handleMarkerClick } from "./MarkerUtils";
import { useSidebar } from "../../context/SidebarContext";
import { useChangeMap } from "../../context/ChangeMapContext";
import { useSearch } from "../../context/SearchContext";
import { useMark } from "../../context/MarkContext";
import { showPopup } from "./PopupUtils";

const MarkerClickHandler = ({ map }) => {
    const { updateSidebarData, updateSidebarRank, updateSidebarUnit, setIsSidebarOpen } = useSidebar();
    const { mapType } = useChangeMap();
    const { setSelectedUnit } = useSearch();
    const { popupRef, contentRef, setHoverEnabled } = useMark();

    useEffect(() => {
        if (!map || typeof map.forEachFeatureAtPixel !== 'function') return;

        const ol = window.ol;

        const handleClick = (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
            if (feature && feature.get('type') === 'mark') {
                const geometryCoord = feature.getGeometry().getCoordinates();

                // 팝업용 데이터
                const popupData = {
                    name: feature.get('name'),
                    img: feature.get('img'),
                    personnel: feature.get('personnel'),
                    area: feature.get('area'),
                    featureText: feature.get('features'),
                    coordinate: geometryCoord,
                };

                const [lon, lat] = ol.proj.toLonLat(geometryCoord);

                // 지도 이동 및 사이드바용 데이터
                const sidebarData = {
                    name: feature.get('name'),
                    rank: feature.get('rank'),
                    id: feature.get('id'),
                    img: feature.get('img'),
                    lon,
                    lat,
                };

                // 호버 비활성화
                setHoverEnabled(false);

                // 지도 이동 + 사이드바
                handleMarkerClick(sidebarData, map, {
                    updateSidebarData,
                    updateSidebarRank,
                    updateSidebarUnit,
                    setIsSidebarOpen,
                });

                // 팝업 고정 표시(지도 이동 후)
                setTimeout(() => {
                    showPopup({
                        map,
                        popupRef,
                        contentRef,
                        markerData: popupData,
                    });
                    //커서 복원
                    map.getTargetElement().style.cursor='';
                }, 300); // 지도 이동 후 약간의 딜레이
                

                // 검색창 상태 변경
                setSelectedUnit({ value: popupData.name, label: popupData.name });
            }
        };

        map.on('singleclick', handleClick);
        return () => {
            map.un('singleclick', handleClick);
        };
    }, [
        map, mapType, 
        updateSidebarData, updateSidebarRank, updateSidebarUnit, setIsSidebarOpen, 
        setSelectedUnit, setHoverEnabled, popupRef, contentRef]);

    return null;
};

export default MarkerClickHandler;