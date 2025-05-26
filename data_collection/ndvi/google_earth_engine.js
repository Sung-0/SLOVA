// 1. SHP 파일 업로드 후 자동 생성된 FeatureCollection 불러오기
var gyeongbuk = ee.FeatureCollection("projects/army-project-460401/assets/gyeongbuk");  // 이미 경상북도만 포함된 SHP

// 2. Sentinel-2 NDVI 계산
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(gyeongbuk)
  .filterDate('2022-07-01', '2022-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .map(function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return ndvi.copyProperties(image, ['system:time_start']);
  });

// 3. 평균 NDVI 계산
var meanNDVI = s2.mean();

// 4. 시각화 파라미터
var visParams = {
  min: 0,
  max: 1,
  palette: ['white', 'yellow', 'green'],
};

// 5. NDVI 시각화
Map.centerObject(gyeongbuk, 8);
Map.addLayer(meanNDVI.clip(gyeongbuk), visParams, 'Mean NDVI - Gyeongbuk');

// 6. GeoTIFF로 내보내기
Export.image.toDrive({
  image: meanNDVI.clip(gyeongbuk),
  description: 'Sentinel2_Mean_NDVI_Gyeongbuk_July2022',
  folder: 'GEE_exports',
  fileNamePrefix: 'sentinel2_ndvi_gyeongbuk_July2022',
  region: gyeongbuk.geometry(),
  scale: 10,
  crs: 'EPSG:5187',
  maxPixels: 1e13
});