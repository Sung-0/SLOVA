import React from 'react';
import '../../css/LocationSearchModal.css';
import LocationSelect from './LocationSelect';
import { useRegion } from '../context/RegionContext';
import { useMap } from '../context/MapContext';
import { useChangeMap } from '../context/ChangeMapContext'; 
import { handleSearch } from './RegionSearch';

const LocationSearchModal = ({ isOpen, onClose }) => {

    const {
        selectedLocation, boundaryLayer,
        setBoundaryGeojson, setBoundaryLayer
    } = useRegion();

    const { map } = useMap();
    const { mapType } = useChangeMap();
    const ol = window.ol;

    const onSearchClick = () => {
        handleSearch({
            selectedLocation, map, ol,
            boundaryLayer, setBoundaryGeojson,
            setBoundaryLayer, mapType
        });
    };
    if (!isOpen) return null;

    return (
            <div className="location-popup-container">
                <div className="location-popup-content">
                    <div className="location-popup-header">
                        <span className="popup-title">위치검색</span>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    {/* 검색 종류 비워둔 영역 */}
                    <div className='search-type-placeholder'>
                        <h5 className='page-title'>
                            <span>검색종류 : </span>
                            <select id='selectLocation' name='selectLocation'>
                                <option value="location1">행정구역 검색</option>
                                <option value="location2">경위도 좌표 검색</option>
                            </select>
                        </h5>
                    </div>

                    {/* 드롭 다운 테이블 */}
                    <div className="location-popup-body">
                            <LocationSelect />
                        {/* 검색 버튼 */}
                        <div className='location-search-btn-wrap'>
                            <button className='location-search-btn' onClick={onSearchClick}>검색</button>
                        </div>
                    </div>
                </div>
            </div>
        );
};
export default LocationSearchModal;