import React from 'react';
import Select from 'react-select';
import { useSearch } from "../context/SearchContext";
import { SIDO_LIST } from './sido';
import { useMap } from "../context/MapContext";
import { useMark } from "../context/MarkContext";
import { handleMarkerClick } from "./mark/MarkerUtils";
import { useSidebar } from "../context/SidebarContext";
import { showPopup } from './mark/PopupUtils';
import '../../css/SearchBar.css';

const SearchBar = () => {
    const { map } = useMap();
    const { markers, popupRef, contentRef, setHoverEnabled } = useMark();
    const { updateSidebarData, updateSidebarRank, updateSidebarUnit, isSidebarOpen, setIsSidebarOpen } = useSidebar();
    const { selectedUnit, setSelectedUnit, selectedSido, setSelectedSido } = useSearch();

    // 시도 옵션 구성
    const sidoOptions = SIDO_LIST.map(sido => ({
        value: sido.code,
        label: sido.name
    }));

    // 시도 선택 -> 부대 선택 초기화
    const handleSidoChange = (selectedOption) => {
        setSelectedSido(selectedOption);
        setSelectedUnit(null);
    };

    // 해당 시도의 부대만 필터링 
    const filteredMarkers = markers.filter(
    marker => String(marker.sd_cd) === String(selectedSido?.value)
    );

    //부대 옵션 구성
    const unitOptions = filteredMarkers.map(marker => ({
        value: marker.name,
        label: (
            <div className="unit-option">
                <img
                    src={`/images/${marker.img}`}
                    alt={marker.name}
                    className="unit-icon" 
                />
                <span>{marker.name}</span>
            </div>
        ),
        markerData: marker
    }));

    // 부대 선택 -> 지도 이동 및 팝업 오픈
    const handleUnitChange = (selectedOption) => {
        // 1. 상태 업데이트
        setSelectedUnit(selectedOption);

        // 2. 마커 찾기
        const marker = markers.find(m => m.name === selectedOption?.value);
        if (!marker || !map) return;

        // 3. 좌표 변환
        const ol = window.ol;
        const coordinate = ol.proj.fromLonLat([marker.lon, marker.lat]);

        // 4. 팝업용 데이터 구성
        const popupData = {
            name: marker.name,
            img: marker.img,
            personnel: marker.personnel,
            area: marker.area,
            featureText: marker.features,
            coordinate,
        };

        // 5. 사이드바용 데이터 구성
        const sidebarData = {
            name: marker.name,
            rank: marker.rank,
            id: marker.id,
            img: marker.img,
            lon: marker.lon,
            lat: marker.lat,
        };

        // 6. 호버 비활성화
        setHoverEnabled(false);

        // 7. 지도 이동 + 사이드바 처리
        handleMarkerClick(sidebarData, map, {
            updateSidebarData,
            updateSidebarRank,
            updateSidebarUnit,
            setIsSidebarOpen
        });

        // 8. 팝업 고정 표시
        setTimeout(() => {
            showPopup({
                map,
                popupRef,
                contentRef,
                markerData: popupData
            });

            map.getTargetElement().style.cursor = '';
        }, 300); // 지도 애니메이션 이후 딜레이

    };

    return (
        <div className={`search-bar-container ${isSidebarOpen ? 'collapsed' : ''}`}>
            <Select
                options={sidoOptions}
                value={selectedSido}
                onChange={handleSidoChange}
                placeholder="시도 선택"
                className="search-dropdown sido"
                classNamePrefix="search-dropdown"
            />
            <Select
                options={unitOptions}
                value={selectedUnit}
                onChange={handleUnitChange}
                placeholder="부대 선택"
                className="search-dropdown unit"
                classNamePrefix="search-dropdown"
                isDisabled={!selectedSido}
            />
        </div>
    );
};

export default SearchBar;