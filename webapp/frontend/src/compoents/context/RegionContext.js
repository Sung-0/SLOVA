import { createContext, useContext, useState } from "react";

export const RegionContext = createContext(null);

export const useRegion = () => useContext(RegionContext);

export const RegionProvider = ({ children }) => {

    // 지역 선택 상태들
    const [sidoCode, setSidoCode] = useState('');
    const [sigunguCode, setSigunguCode] = useState('');
    const [emdCode, setEmdCode] = useState('');
    const [riCode, setRiCode] = useState('');

    // 행정구역 리스트 상태들
    const [sigunguList, setSigunguList] = useState([]);
    const [emdList, setEmdList] = useState([]);
    const [ riList, setRiList] = useState([]);

    // 경계그리드 리스트 상태들
    const [boundaryLayer, setBoundaryLayer] = useState(null);
    const [boundaryGeojson, setBoundaryGeojson] =useState(null); //경계 GeoJSON 상태 추가
                            
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <RegionContext.Provider value={{
            sidoCode, setSidoCode,
            sigunguCode, setSigunguCode,
            emdCode, setEmdCode,
            riCode, setRiCode,
            sigunguList, setSigunguList,
            emdList, setEmdList,
            riList, setRiList,
            boundaryGeojson, setBoundaryGeojson,
            boundaryLayer, setBoundaryLayer,
            selectedLocation, setSelectedLocation,
        }}>
            {children}
        </RegionContext.Provider>
    );
};