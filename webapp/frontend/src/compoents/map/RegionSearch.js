import { fromLonLat } from 'ol/proj';

export const handleSearch = async ({
    selectedLocation, map, ol,
    boundaryLayer, setBoundaryGeojson,
    setBoundaryLayer , mapType,
}) => {
    console.log('지도 타입:', mapType);
    if (!selectedLocation || !selectedLocation.code) {
        alert("행정구역을 선택하세요!");
        return;
    }

    const { code, lat, lon } =selectedLocation;

    try {
        const centerRes = 
        lat && lon
        ? { lat, lon}
        : await (await fetch(`/api/location-center/${code}`)).json();

        const coords = fromLonLat([
            parseFloat(centerRes.lon),
            parseFloat(centerRes.lat),
        ]);

        if (!map) return;

        const codeStr = String(code);
        let zoomLevel = 12;
        if (codeStr.length === 2) zoomLevel =9;
        else if (codeStr.length === 5) zoomLevel = 11;
        else if (codeStr.length === 8) zoomLevel = 13;
        else if (codeStr.length === 10) zoomLevel = 14;

        map.getView().setCenter(coords);
        map.getView().setZoom(zoomLevel);

        const boundaryRes = await fetch(`/api/boundary/${code}`);
        if (!boundaryRes.ok) {
            throw new Error('경계 데이터를 찾을 수 없습니다.');
        }
        
        const boundaryGeojson = await boundaryRes.json();
        setBoundaryGeojson(boundaryGeojson);

        if (boundaryLayer) {
            map.removeLayer(boundaryLayer);
        }

        const vectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(boundaryGeojson, {
                featureProjection: 'EPSG:3857',
            }),
        });

        const vectorLayer = new ol.layer.Vector({
            name: boundaryLayer,
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
        setBoundaryLayer(vectorLayer);
    } catch (err) {
        console.error('검색 오류:', err);
        alert('검색 중 오류가 발생했습니다.');
    }
};