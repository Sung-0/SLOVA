import React from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';

const SidebarAssembly = () => {
    const { sidebarData, isLoading, error } = useSidebar();

    if (isLoading) return <div>로딩 중 ....</div>;
    if (error) return <div>{error}</div>;
    if (!sidebarData) return <div>마커를 선택해주세요.</div>;

    const assemblyData = sidebarData.assembly
        ? Array.isArray(sidebarData.assembly)
            ? sidebarData.assembly
            : [sidebarData.assembly]
        : [];
    if (assemblyData.length === 0) <div>예상 데이터가 없습니다.</div>;

    return (
        <div className="sidebar-table">
            <table className="sidebar-table">
                <thead>
                    <tr>
                        <th>구역</th>
                        <th>1차 대피소</th>
                        <th>2차 대피소</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {assemblyData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.zone}</td>
                            <td>{item.shelter_1}</td>
                            <td>{item.shelter_2}</td>
                            <td>{item.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SidebarAssembly;