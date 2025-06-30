import React from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';
import { RANK_INFO } from "../RANK_INFO";

const SidebarEstimated = () => {
    const { sidebarData, rankOnly, isLoading, error } = useSidebar();

    // 로딩 중
    if (isLoading) return <div>로딩 중 ...</div>;

    // 에러 발생
    if (error) return <div>{error}</div>;

    // 데이터 없을 때
    if (!sidebarData) return <div>마커를 선택해주세요.</div>;

    const riskLevelName = RANK_INFO[rankOnly]?.name;

    const estimatedData = sidebarData.estimated
        ? Array.isArray(sidebarData.estimated)
        ? sidebarData.estimated.filter(item => item.risk_level === riskLevelName)
        : sidebarData.estimated.risk_level === riskLevelName
            ? [sidebarData.estimated]
            : []
        : [];

    if (estimatedData.length === 0) return <div>해당 위험 등급의 데이터가 없습니다.</div>;

    const { color, textColor } = RANK_INFO[rankOnly] || {};

    return (
        <div className="sidebar-table">
            <table style={{ width: '100%', borderCollapse: 'collapse'}}>
                <colgroup>
                    <col style={{ width: '15%' }} /> {/* 위치 */}
                    <col style={{ width: '20%' }} /> {/* 위험도 */}
                    <col style={{ width: '40%' }} /> {/* 위험 이유 */}
                    <col style={{ width: '15%' }} /> {/* 과거 이력 */}
                </colgroup>
                <thead>
                    <tr>
                        <th>위험도 등급</th>
                        <th>인명 피해</th>
                        <th>시설 피해</th>
                        <th>복구 비용</th>
                    </tr>
                </thead>
                <tbody>
                    {estimatedData.map((item, index) => (
                        <tr key={index}>
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
                            <td>{item.people}</td>
                            <td>{item.facility}</td>
                            <td>{item.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SidebarEstimated;