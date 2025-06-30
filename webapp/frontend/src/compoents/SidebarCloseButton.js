import { FaChevronLeft } from "react-icons/fa";
import { useSidebar } from "./context/SidebarContext";
import '../css/SidebarCloseButton.css';
import { resetSidebar } from "./mapReset";
import { MapContext } from "./context/MapContext";
import { useSearch } from "./context/SearchContext";
import { useMark } from "./context/MarkContext";
import { useContext } from "react";


const SidebarCloseButton = () => {
    const { map } = useContext(MapContext);
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
    const { setSelectedUnit } = useSearch();
    const { popupRef, setHoverEnabled } = useMark();

    const handleSidebarClose = () => {
        resetSidebar({
            map,
            popupRef,
            setIsSidebarOpen,
            setSelectedUnit,
            setHoverEnabled,
        });
    };

    if (!isSidebarOpen) return null;

    return (
    <button className="sidebar-close-button" onClick={handleSidebarClose}>
      <FaChevronLeft />
    </button>
    );
};

export default SidebarCloseButton;