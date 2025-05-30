// React의 Context API를 사용하여 map 객체를 전역에서 공유할 수 있게 설정
import React, { createContext, useState, useContext } from 'react';

// MapContext는 map 객체를 저장할 수 있는 컨텍스트(공유 저장소)입니다
export const MapContext = createContext(null);

// 다른 컴포넌트에서 쉽게 map 객체를 사용할 수 있도록 하는 훅
export const useMap = () => useContext(MapContext);

// MapProvider 정의 및 export 추가
export const MapProvider = ({ children }) =>{
    const [map, setMap] = useState(null);
    const [isGridVisible, setIsGridVisible] = useState(false); // 격자 상태 추가

    return (
        <MapContext.Provider value={{ map, setMap, isGridVisible, setIsGridVisible}}>
            {children}
        </MapContext.Provider>
    );
};