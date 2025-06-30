import { createContext, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

const FacilityMarkContext = createContext();

export const useFacilityMark = () => useContext(FacilityMarkContext);

export const FacilityMarkProvider = ({ children }) => {
    const [facilityData, setFacilityData] = useState({ fire_police: [], hospitals: []});
    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        fire: false,
        police: false,
        hospital: false,
        armyHospital: false,
    });

    // 팝업 요소 ref 정의
    const popupRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('/facility/data?type=all')
        .then(res => {
            setFacilityData(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error loading facility data', err);
            setLoading(false);
        });
    }, []);

    return (
        <FacilityMarkContext.Provider
         value={{ facilityData, loading, isOpen, setIsOpen, filters, setFilters, popupRef, contentRef }}>
            {children}
        </FacilityMarkContext.Provider>
    );
};