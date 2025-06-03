export const createGridLayer = (map) => {
    if (!map) return null;

    const ol = window.ol;
    const view = map.getView();
    const zoom = view.getZoom();

    // 줌 레벨에 따라 격자 크기(m 단위) 결정
    let gridSize;

    if (zoom >= 13) {
        gridSize = 500;  // 확대 상태 (읍면동) -< 500m
    } else if (zoom >= 10){
        gridSize = 10000 // 10km
    } else if (zoom >= 7) {
        gridSize = 30000;  //30km
    } else {
        gridSize = 50000; // 50km
    }

    const extent = view.calculateExtent(map.getSize());
    const [minX, minY, maxX, maxY] = extent;

    const features = [];

    for (let x = minX; x < maxX; x += gridSize) {
        for (let y = minY; y < maxY; y += gridSize) {
            const rect = new ol.geom.Polygon([[
                [x, y],
                [x + gridSize, y],
                [x + gridSize, y + gridSize],
                [x, y + gridSize],
                [x, y]
            ]]);
            const feature = new ol.Feature({ geometry: rect });
            features.push(feature);
        }
    }

    const vectorSource = new ol.source.Vector({
        features: features,
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.4)',
                width: 1,
            }),
        }),
        name: 'gridLayer'
    });

    return vectorLayer;
};