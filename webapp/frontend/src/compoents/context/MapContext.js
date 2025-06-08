import React, { createContext, useContext, useState } from 'react';

// 1. Context 객체 생성
export const MapContext = createContext(null);

// 2. Context를 사용하는 커스텀 훅
export const useMap = () => useContext(MapContext);

// 3. Provider 정의
export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
