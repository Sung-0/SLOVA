import React, { useState } from "react";
import '../css/Sidebar.css';
import SidebarDefault from "./sidebarInfo/SidebarDefault";

function Sidebar() {
    const [activeTab, setActiveTab] = useState('risk');

    return(
        <div className="sidebar">
            <div className="sidebar-box">
                <div className="tabs">
                    <button
                        className={activeTab === 'risk' ? 'active' : ''}
                        onClick={() => setActiveTab('risk')}
                    >
                        A. 위험 평가 및 현황
                    </button>
                    <button
                        className={activeTab === 'response' ? 'active' : ''}
                        onClick={() => setActiveTab('response')}
                    >
                        B. 대응 체계 및 행동 지침
                    </button>
                    <button
                        className={activeTab === 'cooperation' ? 'active' : ''}
                        onClick={() => setActiveTab('cooperation')}
                    >
                        C. 협력 체계 및 관리
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'risk' && (
                        <div className="risk-info">
                            <SidebarDefault />
                        </div>
                    )}

                    {activeTab === 'response' &&(
                        <div className="response-info">
                            {[...Array(6)].map((_, i) => (
                                <div className="response-box" key={i}>
                                    지역 정보 {i + 1}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;