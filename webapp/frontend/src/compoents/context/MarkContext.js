import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from 'axios';

// 1. Context 객체 생성
export const MarkContext = createContext(null);

// 2. Context를 사용하는 커스텀 훅
export const useMark = () => useContext(MarkContext);

// 3. Provider 정의
export const MarkProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 팝업 요소를 위한 ref 정의
    const popupRef = useRef(null);
    const contentRef = useRef(null);

    //마커 데이터를 백엔드에서 가져오기
    useEffect(() => {
        axios.get('/army/mark')
        .then(res => {
            setMarkers(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching markers:', err);
            setError(err);
            setLoading(false);
        });
    }, []);

    return (
        <MarkContext.Provider 
        value={{ 
            markers, selectedMarker,
            setSelectedMarker, loading,
            error, popupRef,
            contentRef
            }}>
            {children}
        </MarkContext.Provider>
    );
};