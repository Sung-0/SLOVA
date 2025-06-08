import React from "react";
import { useLandslide } from "./context/LandslideContext";
import LandslideLayer from "./map/LandslideLayer";
import '../css/Body.css';

const RANK_LABELS = {
    5: '매우 위험',
    4: '위험',
    3: '주의',
    2: '낮음',
    1: '매우 낮음',
};

const RANK_COLORS = {
  5: '#FF0000',
  4: '#FFA500',
  3: '#FFFF00',
  2: '#00FFFF',
  1: '#0000FF',
};

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
                        <div className="legend-title">실시간산사태위험도</div>
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