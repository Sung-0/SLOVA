import { hidePopup } from "./map/mark/PopupUtils";

// 지도 초기화 및 사이드바 닫기
export const resetSidebar = ({
    map,
    popupRef,
    setIsSidebarOpen,
    setSelectedUnit,
    setHoverEnabled,
}) => {
    if (!map) return;

    //사이드바 닫기
    setIsSidebarOpen(false);

    //선택 초기화
    setSelectedUnit(null);
    setHoverEnabled(true);

    //팝업 닫기
    hidePopup({ popupRef, map });

    // 커서 복구
    map.getTargetElement().style.cursor = 'pointer';

    //초기 위치로 view 복귀
    const view = map.getView();
    const targetCenter = window.ol.proj.fromLonLat([128.2, 37.8]);

    view.animate({
        center: targetCenter,
        zoom: 9,
        duration: 500,
    });

    //지도 크기 재계산
    setTimeout(() => {
        map.updateSize();
    }, 510);
};