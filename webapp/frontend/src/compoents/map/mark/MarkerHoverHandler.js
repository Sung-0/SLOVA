import { useEffect } from "react";
import { useMark } from "../../context/MarkContext";
import { showPopup, hidePopup } from "./PopupUtils";

const MarkerHoverHandler = ({ map }) => {
    const { popupRef, contentRef, hoverEnabled } = useMark();

    useEffect(() => {
        if (!map || !popupRef.current || !contentRef.current) return;

        const handlePointerMove = (evt) => {
            if (!hoverEnabled) return; //상태에 따라 비활성화

            const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);

            if (feature && feature.get('type') === 'mark') {
                const coordinate = evt.coordinate;
                const name = feature.get('name');
                const img = feature.get('img');
                const personnel = feature.get('personnel');
                const area = feature.get('area');
                const featureText = feature.get('features');

                // 공통 팝업 함수 사용
                showPopup({
                    map,
                    popupRef,
                    contentRef,
                    markerData: {
                        name,
                        img,
                        personnel,
                        area,
                        featureText,
                        coordinate,
                    },
                });

                // 커서 스타일 추가
                map.getTargetElement().style.cursor = 'pointer';
           } else {
                hidePopup({ popupRef, map });
                // 커서 원래대로
                map.getTargetElement().style.cursor = '';
           }
        };

        map.on('pointermove', handlePointerMove);
        return () => {
            map.un('pointermove', handlePointerMove);
        };
    }, [map, popupRef, contentRef, hoverEnabled]);

    return null;
};

export default MarkerHoverHandler;