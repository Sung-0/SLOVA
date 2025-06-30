import { useEffect } from "react";
import { FaListUl, FaBook, FaWalking, FaRoute } from 'react-icons/fa';
import { useSidebar } from "../context/SidebarContext";
import { scrollToSection } from "./SidebarUtil";
import { RANK_INFO } from "../RANK_INFO";
import SidebarTask from "./SidebarTask";
import SidebarAssembly from "./SidebarAssembly";
import SidebarRiskGuidance from "./SidebarRiskGuidance";

function SidebarResponseGuide({ tabContentRef }) {
    const { rankOnly, isSidebarOpen, collapsed, setCollapsed } = useSidebar();
    const rankData = RANK_INFO[rankOnly] || {};
    const rankName = rankData.name || "";
    const color = rankData.color || '#000';

    useEffect(() => {
        if(!tabContentRef?.current) return;

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
        scrollToSection(tabContentRef, id, collapsed, 0, 226);
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
                        <li onClick={() => handleTocClick('riskguidance')}>6. 등급별 행동 지침</li>
                        <li onClick={() => handleTocClick('task')}>7. 임무 역할 분담</li>
                        <li onClick={() => handleTocClick('assmbly')}>8. 대피 경로 및 집결치</li>
                    </ul>
                </div>
            )}


            {/* 6. 위험 등급별 행동 지침 */}
            <div id="riskguidance" className="info-grid">
                <h3 className="info-card-title">
                    <FaBook className="icon" />
                    <span className="text">
                        6. {" "}
                        <span style={{ color: color }}>
                            {rankName}
                        </span>{" "}
                         등급 행동 지침
                    </span>
                </h3>
            </div>
            <SidebarRiskGuidance />

            {/* 7. 임무 역할 분담 */}
            <div id="task" className="info-grid">
                <h3 className="info-card-title">
                    <FaWalking className="icon" />
                    <span className="text">7. 임무 역할 분담</span>
                </h3>
            </div>
            <SidebarTask />

            {/* 8. 대피 경로 및 집결지 */}
            <div id='assmbly' className="info-grid">
                <h3 className="info-card-title">
                    <FaRoute className="icon" />
                    <span className="text">8. 대피 경로 및 집결지</span>
                </h3>
            </div>
            <SidebarAssembly />

        </div>
    );
}
export default SidebarResponseGuide;