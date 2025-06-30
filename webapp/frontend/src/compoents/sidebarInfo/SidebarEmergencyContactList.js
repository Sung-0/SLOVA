import React from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';

const SidebarEmergencyContactList = () => {
    const { sidebarData, isLoading, error } = useSidebar();

    // 로딩 중
    if (isLoading) return <div>로딩 중 ...</div>;

    // 에러 발생
    if (error) return <div>{error}</div>;

    // 데이터 없을 때
    if (!sidebarData) return <div>마커를 선택해주세요.</div>;

    const contactsData = sidebarData.contacts
        ? Array.isArray(sidebarData.contacts)
            ? sidebarData.contacts
            : [sidebarData.contacts]
        : [];

    const collaborationData = sidebarData.collaboration
        ? Array.isArray(sidebarData.collaboration)
            ? sidebarData.collaboration
            : [sidebarData.collaboration]
        : [];

    if (contactsData.length === 0 && collaborationData.length === 0) {
        return <div>예상 데이터가 없습니다.</div>;
    }

    return (
        <div className="sidebar-table">
            {/* 비상 연락처 섹션 */}
            {contactsData.length > 0 && (
                <>
                    <h3>비상 연락처</h3>
                    <table className="sidebar-table">
                        <thead>
                            <tr>
                                <th>기관</th>
                                <th>연락처</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactsData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.org}</td>
                                    <td>{item.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* 기관별 협업 역할 섹션 */}
            {collaborationData.length > 0 &&(
                <>
                    <h3>기관별 협업 역할</h3>
                    <table className="sidebar-table">
                        <thead>
                            <tr>
                                <th>기관</th>
                                <th>지원 내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collaborationData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.org}</td>
                                    <td>{item.support}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default SidebarEmergencyContactList;