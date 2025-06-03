import React, { useEffect, useState } from "react";
import '../css/HeaderBotton.css';
import { useVWorldMenuActions } from "./map/VWorldmenu";
import resetIcon from "../assets/reset.png"; 
import LocationSearchModal from "./map/LocationSearchModal";

function HeaderBotton() {
    const [currentTime, setCurrentTime] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    //실시간 시간 표시
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatTime = now.toLocaleTimeString("ko-KR", {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            const formatDate = now.toLocaleDateString("ko-KR").replace(/\./g, ". ");
            setCurrentTime(`현재 시간: ${formatDate} ${formatTime}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const {
        handleGridToggle,
        handleMapChange,
        zoomToNationwide,
    } = useVWorldMenuActions();

    return(
        <div className="header-inner-bottom">
            <div className="header-bottom-left" />
            <div className="header-bottom-center">{currentTime}</div>
            <div className="header-bottom-right">
                <button className="menu-btn" onClick={handleGridToggle}>격자</button>
                <button className="menu-btn" onClick={() => setModalOpen(true)}>위치검색</button>
                    <LocationSearchModal 
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                    /> 
                <button className="menu-btn" onClick={() => alert('정보보기 기능은 검색 이후 동작 예정')}>정보보기</button>
                <button className="menu-btn" onClick={() => handleMapChange("GRAPHIC")}>기본지도</button>
                <button className="menu-btn" onClick={() => handleMapChange("HYBRID")}>항공사진</button>
                <button className="menu-btn" onClick={zoomToNationwide}>전국지도</button>
                <button className="menu-btn icon-only" >
                    <a href="/">
                        <img src={resetIcon} alt="초기화" className="btn-icon" />
                    </a>
                </button>
            </div>
        </div>
    );
};

export default HeaderBotton;