// 팝업관련 코드 
import { useEffect } from "react";
import { useFacilityMark } from "../../context/FacilityMarkContext";
import { hidePopup, showFacilityPopup } from "./PopupUtils";

const FacilityPopup = ({ map }) => {
    const { popupRef, contentRef } = useFacilityMark();

    useEffect(() => {
        if (!map || !popupRef.current || !contentRef.current) return;

        // 3. 마우스 호버 핸들링
        const handlePointerMove = (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
            if (!feature) {
                hidePopup({ popupRef, map});
                return;
            }
            
            const type = feature.get('type');
            const coordinate = evt.coordinate;

            const zoom = map.getView().getZoom();
            if (zoom < 12) {
                popupRef.current.style.display = 'none';
                return;
            }

           const facilityTypes = ['hospital', 'armyHospital', 'fire', 'police'];
            
           if (facilityTypes.includes(type)) {
                const props = feature.getProperties();

                showFacilityPopup({
                    map,
                    popupRef,
                    contentRef,
                    props,
                    coordinate,
                });

            } else {
                hidePopup({ popupRef, map });
            }
        };

        map.on('pointermove', handlePointerMove);
   
        return () => {
            map.un('pointermove', handlePointerMove);
        };
    }, [map, contentRef, popupRef]);

    return null;

};

export default FacilityPopup;