import { showArmyToast } from "../TostManager";

export const onMarkerClick = (marker, map) => {
    const { lat, lon, name, rank } = marker;

    // 지도 이동
    map.getView().animate({
        center: window.ol.proj.fromLonLat([lon, lat]),
        zoom: 11,
        duration: 500
    });
    showArmyToast({ name, rank });
};