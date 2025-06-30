import React from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';

const SidebarRolesAndResponsibilities = () => {
    const { sidebarData, isLoading, error } = useSidebar();

    // 로딩 중
    if (isLoading) return <div>로딩 중 ...</div>;

    // 에러 발생
    if (error) return <div>{error}</div>;

    // 데이터 없을 때
    if (!sidebarData) return <div>마커를 선턱해주세요.</div>;

    const authorityData = sidebarData.authority
        ? Array.isArray(sidebarData.authority)
            ? sidebarData.authority
            : [sidebarData.authority]
        : [];

    const emergencyContactsData = sidebarData.emergencyContacts
        ? Array.isArray(sidebarData.emergencyContacts)
            ? sidebarData.emergencyContacts
            : [sidebarData.emergencyContacts]
        : [];

    if (authorityData.length === 0 && emergencyContactsData.length === 0) {
        return <div>예상 데이터가 없습니다.</div>
    }

    return (
        <div className="sidebar-table">
            {/* 주요 결정 권한 섹션 */}
            {authorityData.length > 0 && (
                <>
                    <h3>주요 결정 권한</h3>
                    <table className="sidebar-table">
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>담당자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authorityData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.type}</td>
                                    <td>{item.owner}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* 24시간 비상연락처 섹션 */}
            {emergencyContactsData.length > 0 && (
                <>
                <h3>24시간 비상연락처</h3>
                <table className="sidebar-table">
                    <thead>
                        <tr>
                            <th>직책</th>
                            <th>연락처</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emergencyContactsData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.role}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            )}
        </div>
    );
}

export default SidebarRolesAndResponsibilities;