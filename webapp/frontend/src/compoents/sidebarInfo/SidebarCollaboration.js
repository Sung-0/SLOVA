import { useEffect } from "react";
import { FaListUl, FaPhoneAlt, FaUserTie } from 'react-icons/fa';
import { useSidebar } from "../context/SidebarContext";
import { scrollToSection } from "./SidebarUtil";
import SidebarEmergencyContactList from "./SidebarEmergencyContactList";
import SidebarRolesAndResponsibilities from "./SidebarRolesAndResponsibilities";

function SidebarCollaboration({ tabContentRef }) {
     const { isSidebarOpen, collapsed, setCollapsed  } = useSidebar();

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
        el.addEventListener('scroll', handleScroll, { passive: true});

        return () => el.removeEventListener('scroll', handleScroll);
     }, [tabContentRef, setCollapsed]);

     const handleTocClick = (id) => {
        scrollToSection(tabContentRef, id, collapsed, 0, 183);
     };

    return (
        <div className="sidebar-default">
            {/* 목차 영역*/}
            {isSidebarOpen && (
                <div className={`sidebar-toc ${collapsed ? "collapsed" : ''}`}>
                    <h3 className="toc-title">
                        <FaListUl className="title-icon" />
                        <span>목차</span>
                    </h3>
                    <ul className="toc-list">
                        <li onClick={() => handleTocClick('emergency')}>9. 비상 연락망 및 협업 체계</li>
                        <li onClick={() => handleTocClick('roles')}>10. 책임 및 권한</li>
                    </ul>
                </div>
            )}


            {/* 9. 비상 연락망 및 협업 체계 */}
            <div id="emergency" className="info-grid">
                <h3 className="info-card-title">
                    <FaPhoneAlt className="icon" />
                    <span className="text">9. 비상 연락망 및 협업 체계</span>
                </h3>
            </div>
            <SidebarEmergencyContactList />

            {/* 10. 책임 및 권한 */}
            <div id="roles" className="info-grid">
                <h3 className="info-card-title">
                    <FaUserTie className="icon" />
                    <span className="text">10. 책임 및 권한</span>
                </h3>
            </div>
            <SidebarRolesAndResponsibilities />
        </div>
    );
}

export default SidebarCollaboration;