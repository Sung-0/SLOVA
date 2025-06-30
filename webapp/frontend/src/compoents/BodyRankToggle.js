import React from "react";
import { useLandslide } from "./context/LandslideContext";
import LandslideLayer from "./map/LandslideLayer";
import '../css/Body.css';
import { RANK_INFO } from "./RANK_INFO";

const RANK_LABELS = Object.fromEntries(
    Object.entries(RANK_INFO).map(([rank, info]) => [rank, info.name])
);

const RANK_COLORS = Object.fromEntries(
    Object.entries(RANK_INFO).map(([rank, info]) => [rank, info.color])
);

export default function BodyRankToggle() {
    const { showLandslide, setShowLandslide } = useLandslide();

    const toggleChecked = () => {
        setShowLandslide(prev => !prev);
    };

    return (
        <>
        {/* 실제로 지도에 영향을 주는 레이어 컴포넌트 */}
        <LandslideLayer />

            {/* UI 컴포넌트 */}
            <div className="rank-toggle-container">
                <div className="rank-toggle-box">
                    <label className="rank-toggle-checkbox">
                        <input type='checkbox' checked={showLandslide} onChange={toggleChecked} />
                        산사태위험도
                    </label>
                </div>
                
                {showLandslide && (
                    <div className="legend-box">
                        <div className="legend-title">
                            <span className="legend-titles">위험도</span>
                            </div>
                        {Object.entries(RANK_LABELS).map(([rank, label]) => (
                            <div key={rank} className="legend-item">
                                <span
                                    className="legend-color"
                                    style={{backgroundColor: RANK_COLORS[rank]}}
                                />
                                {label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}