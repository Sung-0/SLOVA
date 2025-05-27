import React, { useState } from "react";
import '../css/Sidebar.css';

function Sidebar() {
    const [activeTab, setActivaTab] = useState('risk');

    return(
        <div className="sidebar">
            <div className="tabs">
                <button
                    className={activeTab === 'risk' ? 'active' : ''}
                    onClick={() => setActivaTab('risk')}
                >
                    위험정보
                </button>
                <button
                    className={activeTab === 'region' ? 'active' : ''}
                    onClick={() => setActivaTab('region')}
                >
                    지역정보
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'risk' && (
                    <div className="risk-info">
                        <div className="box"> 위험 정보 1</div>
                        <div className="box"> 위험 정보 2</div>
                        <div className="box"> 위험 정보 3</div>
                    </div>
                )}

                {activeTab === 'region' &&(
                    <div className="region-info">
                        {[...Array(6)].map((_, i) => (
                            <div className="region-box" key={i}>
                                지역 정보 {i + 1}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;