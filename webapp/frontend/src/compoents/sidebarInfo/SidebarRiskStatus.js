// 첫 진입 시 보여줄 기본 안내 UI
import { useEffect } from "react";
import { FaListUl, FaMountain, FaListOl, FaUsers, FaShieldAlt, FaHistory } from 'react-icons/fa';
import { useSidebar } from "../context/SidebarContext";
import { scrollToSection } from "./SidebarUtil";
import './css/SidebarDetail.css';
import SidebarLandslideRank from './SidebarLandslideRank'
import SidebarRisk from "./SidebarRisk";
import SidebarEstimated from "./SidebarEstimated";
import SidebarPrevention from "./SidebarPrevention";
import SidebarLandslideHistory from "./SidebarLandslideHistory";

function SidebarRiskStatus({ tabContentRef }) {
    const { isSidebarOpen, collapsed, setCollapsed  } = useSidebar();

    // 스크롤 시 목차 축소
    useEffect(() => {
        if (!tabContentRef?.current) return;

        const handleScroll = () => {
            const scrollY = tabContentRef.current.scrollTop;
            if (scrollY > 50) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        const el = tabContentRef.current;
        el.addEventListener('scroll', handleScroll, { passive: true });

        return () => el.removeEventListener('scroll', handleScroll);
    }, [tabContentRef, setCollapsed]);

    const handleTocClick = (id) => {
        scrollToSection(tabContentRef, id, collapsed, 0, 312);
    };

    return (
        <div className="sidebar-default">
            {/* 목차 영역 */}
            {isSidebarOpen && (
                <div className={`sidebar-toc ${collapsed ? "collapsed" : ''}`}>
                    <h3 className="toc-title">
                        <FaListUl className="title-icon" />
                        <span>목차</span>
                    </h3>
                    <ul className="toc-list">
                        <li onClick={() => handleTocClick('rank')}>1. 산사태 위험 지역 등급 및 현황</li>
                        <li onClick={() => handleTocClick('risk')}>2. 부대 내 취약 지점 현황</li>
                        <li onClick={() => handleTocClick('estimated')}>3. 예상 피해 규모</li>
                        <li onClick={() => handleTocClick('prevention')}>4. 방재시설 현황</li>
                        <li onClick={() => handleTocClick('history')}>5. 과거 산사태 이력</li>
                    </ul>
                </div>
            )}

            <div id='rank' className="info-grid">
                {/* 1. 산사태 위험도 등급 및 현황 */}
                <h3 className="info-rank-title">
                    <FaMountain className="icon" />
                    <span className="text">1. 산사태 위험 지역 등급 및 현황</span>
                </h3>         
            </div>
            <SidebarLandslideRank />

            {/* 2. 부대 내 취약 지점 현황 */}
            <div id='risk' className="info-grid">
                <h3 className="info-card-title">
                    <FaListOl className="icon" />
                    <span className="text">2. 부대 내 취약 지점 현황</span>
                </h3>
            </div>
            <SidebarRisk />

            {/* 3. 예상 피해 규모 */}
            <div id='estimated' className="info-grid">
                <h3 className="info-card-title">
                    <FaUsers className="icon" />
                    <span className="text">3. 예상 피해 규모</span>
                </h3>
            </div>
            <SidebarEstimated />

            {/* 4. 방재시설 현황 */}
            <div id='prevention' className="info-grid">
                <h3 className="info-card-title">
                    <FaShieldAlt className="icon" />
                    <span className="text">4. 방재시설 현황</span>
                </h3>
            </div>
            <SidebarPrevention />

            {/* 5. 과거 산사태 이력 */}
            <div id='history' className="info-grid">
                <h3 className="info-card-title">
                    <FaHistory className="icon" />
                    <span className="text">5. 과거 산사태 이력</span>
                </h3>
            </div>
            <SidebarLandslideHistory />

        </div>
    );
}

export default SidebarRiskStatus;