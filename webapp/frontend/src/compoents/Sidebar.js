import { useState, useRef } from "react";
import '../css/Sidebar.css';
import { useSidebar } from "./context/SidebarContext";
import { scrollToTop } from "./sidebarInfo/SidebarUtil";
import SidebarRiskStatus from "./sidebarInfo/SidebarRiskStatus";
import SidebarResponseGuide from "./sidebarInfo/SidebarResponseGuide";
import SidebarCollaboration from "./sidebarInfo/SidebarCollaboration";

function Sidebar() {
    const { sidebarUnit, isSidebarOpen } = useSidebar();
    const [activeTab, setActiveTab] = useState('risk');
    const { name, img } =sidebarUnit || {};
    
    const tabContentRef = useRef(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        scrollToTop(tabContentRef);
    };

    return(
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-box">
                {/* Header */}
                <div className="sidebar-header">
                    {img && <img src={`/images/${img}`} alt={name} />}
                    {name && <span>{name}</span>}
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={activeTab === 'risk' ? 'active' : ''}
                        onClick={() => handleTabChange('risk')}
                    >
                        A. 위험 평가 및 현황
                    </button>
                    <button
                        className={activeTab === 'response' ? 'active' : ''}
                        onClick={() => handleTabChange('response')}
                    >
                        B. 대응 체계 및 행동 지침
                    </button>
                    <button
                        className={activeTab === 'cooperation' ? 'active' : ''}
                        onClick={() => handleTabChange('cooperation')}
                    >
                        C. 협력 체계 및 관리
                    </button>
                </div>

            {/* Tab Contents */}
                <div className="tab-content" ref={tabContentRef}>
                    {activeTab === 'risk' && (
                        <div className="risk-info">
                            <SidebarRiskStatus tabContentRef={tabContentRef} />
                        </div>
                    )}

                    {activeTab === 'response' &&(
                        <div className="risk-info">
                            <SidebarResponseGuide tabContentRef={tabContentRef} />
                        </div>
                    )}

                    {activeTab === 'cooperation' && (
                        <div className="risk-info">
                            <SidebarCollaboration tabContentRef={tabContentRef} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;