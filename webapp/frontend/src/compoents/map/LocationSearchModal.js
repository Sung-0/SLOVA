import React, { useState } from 'react';
import '../../css/LocationSearchModal.css';
import LocationSelect from './LocationSelect';
// import axios from 'axios';

const LocationSearchModal = ({ isOpen, onClose, mapRef, setBoundaryGeojson }) => {
    /* 검색 핸들러 */
    //선택된 행정구역 상태
    const [sidoCode, setSidoCode] = useState('');
    const [sigunguCode, setSigunguCode] = useState('');
    const [emdCode, setEmdCode] = useState('');
    const [riCode, setRiCode] = useState('');

    const handleSearch = async () => {
        const bjdCode = riCode || emdCode || sigunguCode || sidoCode;

        if (!bjdCode){
            alert("행정구역을 선택하세요");
            return;
        }

        try{
            // 1. 중심좌표 요청
            const res = await fetch(`/api/location-center/${bjdCode}`);
            const { lat, lon } = await res.json();

            // 2. 지도 이동
            mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 12);

            // 3. 경계 요청
            const boundaryRes = await fetch(`/api/boundary/${bjdCode}`);
            const boundaryGeojson = await boundaryRes.json();

            // 4. 경계 상태 업데이트 (예시: Context나 props 사용)
            setBoundaryGeojson(boundaryGeojson);

        } catch (err) {
            console.error('검색 중 오류:', err);
            alert('검색 중 오류가 발생했습니다.');
        }
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
                        <LocationSelect
                            sidoCode={sidoCode}
                            setSidoCode={setSidoCode}
                            sigunguCode={sigunguCode}
                            setSigunguCode={setSigunguCode}
                            emdCode={emdCode}
                            setEmdCode={setEmdCode}
                            riCode={riCode}
                            setRiCode={setRiCode}
                        />

                        {/* 검색 버튼 */}
                        <div className='location-search-btn-wrap'>
                            <button className='location-search-btn' onClick={handleSearch}>검색</button>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default LocationSearchModal;