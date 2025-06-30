// 팝업 내부에 들어갈 HTML 생성 함수
// 1. MARK용 HTML
export const createPopupHTML = ({ name, img, personnel, area, featureText }) => {
    return `
        <div class="popup-card">
            <img src="/images/${img}" class="popup-img" />
            <div class="popup-info">
                <div class="mark-popup-title">${name}</div>
                <div class="popup-row">
                    <span class="popup-label">인원:</span>
                    <div class="popup-row-value">${personnel}명</div>
                </div>
                <div class="popup-row">
                    <span class="popup-label">면적:</span>
                    <div class="popup-row-value">${area}km²</div>
                </div>
                <div class="popup-row">
                    <span class="popup-label">임무:</span>
                    <div class="popup-row-value">${featureText}</div>
                </div>
            </div>
        </div>
    `;
};

// 2. Facility용 HTML
export const createFacilityPopupHTML = (props) => {
    const { name, type } = props;

    if(type === 'fire') {
        return `
            <div class="facility-popup-card">
                <div class="facility-popup-title">${name}</div>
                <div class="facility-popup-content">소방차 수: ${props.fire_engine}대</div>
                <div class="facility-popup-content">응급차 수: ${props.ambulance}대</div>
                <div class="facility-popup-content">전화번호: ${props.num}</div>
            </div>
        `;
    } else if (type === 'police') {
        return`
            <div class="facility-popup-card">
                <div class="facility-popup-title">${name}</div>
                <div class="facility-popup-content">전화번호: ${props.num}</div>
            </div>
        `;
    } else if (type === 'hospital' || type === 'armyHospital') {
        return `
            <div class="facility-popup-card">
                <div class="facility-popup-title">${name}</div>
                <div class="facility-popup-content">병상 수: ${props['hospital_bed']}개</div>
                <div class="facility-popup-content">현재 가용 병상 수: ${props.available_beds}개</div>
                <div class="facility-popup-content">응급실 병상 수: ${props['emergency_room']}개</div>
                <div class="facility-popup-content">의사 수: ${props.doctor}명</div>
                <div class="facility-popup-content">당직 의사 수: ${props.doctor_on_duty}명</div>
                <div class="facility-popup-content">전화번호: ${props.num}</div>
            </div>
        `;
    }
    return '';
};

// mark 전용 팝업 표시 함수
export const showPopup = ({ map, popupRef, contentRef, markerData }) => {

    if (!popupRef?.current || !contentRef?.current || !map) return;

    const {
        name, img, personnel, area, featureText, coordinate
    } = markerData;

    const overlay = new window.ol.Overlay({
        element: popupRef.current,
        autoPan: false,
        positioning: 'bottom-center',
        autoPanAnimation: { duration: 250 },
    });

    map.addOverlay(overlay);

    // 팝업 내용 삽입
    contentRef.current.innerHTML = createPopupHTML({ name, img, personnel, area, featureText });

    // 위치 설정 먼저
    overlay.setPosition(coordinate);
    
    // 위치 설정 이후에 팝업 표시
    popupRef.current.style.display = 'block';

    // 커서 원래대로
    map.getTargetElement().style.cursor = '';
};

//시설용 팝업 표시 함수
export const showFacilityPopup = ({ map, popupRef, contentRef, props, coordinate }) => {
    if (!popupRef?.current || !contentRef.current || !map) return;

    const overlay = new window.ol.Overlay({
        element: popupRef.current,
        autoPan: false,
        positioning: 'bottom-center',
        autoPanAnimation: { duration: 250},
    });

    map.addOverlay(overlay);
    const contentHTML = createFacilityPopupHTML(props);
    contentRef.current.innerHTML = contentHTML;
    overlay.setPosition(coordinate);
    popupRef.current.style.display = 'block';
    map.getTargetElement().style.current = '';
};

// 팝업을 숨기는 함수
export const hidePopup = ({ popupRef, map }) => {
    if (!popupRef?.current || !map) return;

    // 오버레이 위치 제거
    const overlays = map.getOverlays().getArray(); 
    overlays.forEach((overlay) => {
        if (overlay?.getElement?.() === popupRef.current) {
            map.removeOverlay(overlay); 
        }
    });

    popupRef.current.style.display = 'none';
    map.getTargetElement().style.current = 'pointer'; //기본값 복원
};