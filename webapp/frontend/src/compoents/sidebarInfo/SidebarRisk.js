import React from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';
import { RANK_INFO } from "../RANK_INFO";

const SidebarRisk = () => {
    const { sidebarData, rankOnly, isLoading, error } = useSidebar();

    if (isLoading) return <div>로딩 중 ...</div>;
    if (error) return <div>{error}</div>;
    if (!sidebarData) return <div>마커를 선택해주세요.</div>;

    const riskLevelName = RANK_INFO[rankOnly]?.name;

    const riskdData = sidebarData.risk
        ? Array.isArray(sidebarData.risk)
            ? sidebarData.risk.filter(item => item.risk_level === riskLevelName)
            : sidebarData.risk.risk_level === riskLevelName
                ? [sidebarData.risk]
                : []
        : [];

    if (riskdData.length === 0) return <div>해당 위험 등급의 데이터가 없습니다.</div>;

    const { color, textColor } = RANK_INFO[rankOnly] || {};

    return (
        <div className="sidebar-table">
            <table className="sidebar-table">
                <colgroup>
                    <col style={{ width: '25%' }} /> {/* 위치 */}
                    <col style={{ width: '15%' }} /> {/* 위험도 */}
                    <col style={{ width: '20%' }} /> {/* 위험 이유 */}
                    <col style={{ width: '40%' }} /> {/* 과거 이력 */}
                </colgroup>
                <thead>
                    <tr>
                        <th>위치</th>
                        <th>위험도</th>
                        <th>위험 이유</th>
                        <th>과거 이력</th>
                    </tr>
                </thead>
                <tbody>
                    {riskdData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.location}</td>
                            <td>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        borderRadius: '999px',
                                        backgroundColor: color,
                                        color: textColor,
                                        fontWeight: 'bold',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                 {item.risk_level}
                                </span>
                            </td>
                            <td>{item.cause}</td>
                            <td>{item.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SidebarRisk;
