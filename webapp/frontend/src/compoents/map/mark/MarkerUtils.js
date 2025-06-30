import { showArmyToast } from "../TostManager";

export const handleMarkerClick = (marker, map, sidebarActions) => {
    const { name, rank, lon, lat, id, img } = marker;

    //지도 이동
    map.getView().animate({
        center: window.ol.proj.fromLonLat([lon, lat]),
        zoom: 13,
        duration: 500
    });

    // 팝업 및 토스트
    showArmyToast({ name, rank });

    //사이드바 갱신
    if (sidebarActions) {
        const {
            updateSidebarData,
            updateSidebarRank,
            updateSidebarUnit,
            setIsSidebarOpen
        } = sidebarActions;

        updateSidebarData(id);
        updateSidebarRank(rank);
        updateSidebarUnit({ name, img });
        setIsSidebarOpen(true);
    }
};