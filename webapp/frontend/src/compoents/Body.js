import React, { useContext, useEffect/*, useState */}  from "react";
import '../css/BodyRankToggle.css';
import VWorldMap from './map/VWorldMap.js';
import ZoomController from "./map/ZoomController.js";
import BodyRankToggle from "./BodyRankToggle.js";
import MapTypeToggle from "./MapTypeToggle";
import { ChangeMap } from "./map/ChangeMap.js";
import MarkLayer from "./map/mark/MarkLayer.js";
import { MapContext } from "./context/MapContext.js";
import MarkUi from "./map/mark/MarkUi.js";
import { useSidebar } from "./context/SidebarContext.js";
import { useSearch } from "./context/SearchContext.js";
import SearchBar from "./map/SearchBar.js";
import MarkerClickHandler from "./map/mark/MarkerClickHandler.js";
import MarkerHoverHandler from "./map/mark/MarkerHoverHandler.js";
// import LocationSearchModal from "./map/LocationSearchModal";
import FacilitySelector from "./map/mark/FacilitySelector.js";
import { FacilityMarkProvider } from "./context/FacilityMarkContext.js";
import FacilityMarkLayer from "./map/mark/FacilityMarkLayer.js";
// import { hidePopup } from "./map/mark/PopupUtils.js";
import { useMark } from "./context/MarkContext.js";
import FacilityPopup from "./map/mark/FacilityPopup.js";
import FacilityUi from "./map/mark/FacilityUi.js"
import { resetSidebar } from "./mapReset.js";

const Body = () => {
    const { map } = useContext(MapContext);
    const { isSidebarOpen,setIsSidebarOpen } = useSidebar();
    const { setSelectedUnit } = useSearch();
    const { popupRef, setHoverEnabled } = useMark();

    // 사이드바 열릴 때 호출
    useEffect(() => {
        if (!map || !isSidebarOpen) return;

        // 1. 사이드바 열릴 때 지도 크기 업데이트
        setTimeout(() => {
            map.updateSize();
        }, 310);


        // 2. 지도 클릭 이벤트 등록
        const onMapClick = (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
            if (!feature) {
                resetSidebar({
                    map,
                    popupRef,
                    setIsSidebarOpen,
                    setSelectedUnit,
                    setHoverEnabled,
                });
            }
        };
        map.on('singleclick', onMapClick);

        //이벤트 해제
        return () => {
            map.un('singleclick', onMapClick);
        };
    }, [ map, isSidebarOpen, setIsSidebarOpen, setSelectedUnit, popupRef, setHoverEnabled]);

    return (
        <FacilityMarkProvider>
                <div className="body">
                    <ZoomController />
                    
                    {/* 지도 유형 토글 버튼 - 왼쪽 상단 */}
                    <div className="map-type-toggle-container">
                        <MapTypeToggle />
                    </div>

                        <SearchBar />

                        <FacilitySelector />

                        <ChangeMap  />
                    {/* <div className="location-search-container">
                        <button className="menu-btn" onClick={() => setLocationModalOpen(true)}>
                            지역 검색
                        </button>
                        <LocationSearchModal
                            isOpen={isLocationModalOpen}
                            onClose={() => setLocationModalOpen(false)}
                        />
                    </div> */}

                    <div className="map-container">
                        <MarkUi />  
                        <FacilityUi />
                        <VWorldMap />
                        {map && (
                            <>
                            <MarkLayer map = {map} />
                            <FacilityMarkLayer map = {map} />
                            <FacilityPopup map = {map} />
                            <MarkerHoverHandler map = {map} />
                            <MarkerClickHandler map = {map} />
                            </>    
                        )}
                    </div>
                    <BodyRankToggle /> 
                </div>
            </FacilityMarkProvider>
    );
};

export default Body;