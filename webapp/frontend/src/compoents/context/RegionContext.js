import { createContext, useContext, useState } from "react";
import { fromLonLat } from 'ol/proj'
import { useMap } from "./MapContext";

export const RegionContext = createContext(null);

export const useRegion = () => useContext(RegionContext);

export const RegionProvider = ({ children }) => {

    const { map } = useMap();
    const ol = window.ol;

    // 지역 선택 상태들
    const [sidoCode, setSidoCode] = useState('');
    const [sigunguCode, setSigunguCode] = useState('');
    const [emdCode, setEmdCode] = useState('');
    const [riCode, setRiCode] = useState('');
    

    // 행정구역 리스트 상태들
    const [sigunguList, setSigunguList] = useState([]);
    const [emdList, setEmdList] = useState([]);
    const [ riList, setRiList] = useState([]);

    const [boundaryLayer, setBoundaryLayer] = useState(null);
    const [boundaryGeojson, setBoundaryGeojson] =useState(null); //경계 GeoJSON 상태 추가
                            
    const [selectedLocation, setSelectedLocation] = useState(null);

    // 시도 선택 핸들러
    const handleSidoChange = async (code) => {
        setSidoCode(code);
        setSigunguCode('');
        setEmdCode('');
        setRiCode('');
        setSigunguList([]);
        setEmdList([]);
        setRiList([]);

        if (code) {
            try {
                const res = await fetch(`/api/sigungu/${code}`);
                const data = await res.json();

                setSigunguList(data);
                // 최소한 code 만 전달
                setBoundaryGeojson(null); //경계 초기화
            } catch (error) {
                console.error('시군구 리스트 로딩 실패:', error);
            }
        }
    };

    //시군구 선택 핸들러
    const handleSigunguChange = async (code) => {

        setSigunguCode(code);
        setEmdCode('');
        setRiCode('');
        setEmdList([]);
        setRiList([]);

        if (code) {
            try {
                const res = await fetch(`/api/emd/${code}`);
                const data = await res.json();
                setEmdList(data);
                setBoundaryGeojson(null);
            } catch (error) {
                console.error('읍면동 리스트 로딩 실패', error);
            }
        }
    };

    //읍면동 선택 핸들러
    const handleEmdChange = async (code) => {
        setEmdCode(code);
        setRiCode('');
        setRiList([]);

        if (code) {
            // 읍/면일 경우 리 리스트 로딩
            try {
                const selected = emdList.find(item => item.code === code);
                if (selected && (selected.name.endsWith('읍') || selected.name.endsWith('면'))) {
                    const res = await fetch(`/api/ri/${code}`);
                    const data =await res.json();
                    setRiList(data);
                }
                setBoundaryGeojson(null);
            } catch (error) {
                console.error('리 리스트 로딩 실패:', error)
            }
        }
    };

    //리 선택 핸들러
    const handleRiChange = (code) => {
        setRiCode(code);
        setBoundaryGeojson(null);
    };

    // handleSearc 함수 추가
    const handleSearch = async () => {
        if (!selectedLocation || !selectedLocation.code) {
            alert('행정구역을 선택하세여!');
            return;
        }

        const { code, lat, lon } = selectedLocation;

        try {
            const centerRes = lat && lon
            ? { lat, lon}
            : await (await fetch(`/api/location-center/${code}`)).json();

            const coords = fromLonLat([
                parseFloat(centerRes.lon),
                parseFloat(centerRes.lat),
            ]);
            
            if (!map) return;

            let zoomLevel = 12;
            if (code.length === 2) zoomLevel =8;         // 시도
            else if (code.length === 5) zoomLevel = 10;  // 시군구
            else if (code.length === 8) zoomLevel = 12;  // 읍면동
            else if (code.length === 10) zoomLevel = 13; // 리리

            map.getView().setCenter(coords);
            map.getView().setZoom(zoomLevel);

            const boundaryRes = await fetch(`/api/boundary/${code}`);
            if (!boundaryRes.ok) {
                throw new Error('경계 데이터를 찾을 수 없습니다.');
            }
            const boundaryGeojson = await boundaryRes.json();
            setBoundaryGeojson(boundaryGeojson);

            // 기존 레이어 제거
            if (boundaryLayer) {
                map.removeLayer(boundaryLayer);
            }

            //새 레이어 생성
            const vectorSource = new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(boundaryGeojson, {
                    featureProjection: 'EPSG:3857',
                }),
            });

            const vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 2,
                    }),
                    fill: new ol.style.Fill({
                            color: 'rgba(255, 0, 0, 0.1)',
                    }),
                }),
            });

            vectorLayer.set('name', 'boundaryLayer');
            map.addLayer(vectorLayer);
            setBoundaryLayer(vectorLayer); // 상태 저장 
                
        } catch (err){
            console.error('검색 오류:', err);
            alert("검색 중 오류가 발생했습니다.");
        }
    };

    return (
        <RegionContext.Provider value={{
            sidoCode, setSidoCode,
            sigunguCode, setSigunguCode,
            emdCode, setEmdCode,
            riCode, setRiCode,
            sigunguList, setSigunguList,
            emdList, setEmdList,
            riList, setRiList,
            handleSidoChange, handleSigunguChange,
            handleEmdChange, handleRiChange,
            boundaryGeojson, setBoundaryGeojson,
            boundaryLayer, setBoundaryLayer,
            selectedLocation, setSelectedLocation,
            handleSearch
        }}>

            {children}
        </RegionContext.Provider>
    );
};