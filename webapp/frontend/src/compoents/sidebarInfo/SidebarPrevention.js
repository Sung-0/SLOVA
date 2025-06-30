import React from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';

const getStatusColor = (status) => {
    switch (status) {
        case '정상': return '#4CAF50';
        case '부분 보수': return '#FFC107';
        case '점검 요망': return '#FF9800';
        case '일부 손상': return '#F44336';
        case '오작동 확인': return '#B71C1C';
        default: return '#9E9E9E';
    }
};

const getTextColor = (status) => {
    return status === '부분 보수' ? '#212121' : '#FFFFFF';
};

const SidebarPrevention = () => {
    const { sidebarData, isLoading, error } = useSidebar();

    // 로딩 중
    if (isLoading) return <div>로딩 중 ...</div>;

    // 에러 발생
    if (error) return <div>{error}</div>;

    //데이터 없을 때
    if (!sidebarData) return <div>마커를 선택해주세요.</div>;

    const preventionData = Array.isArray(sidebarData.prevention)
        ? sidebarData.prevention
        : [sidebarData.prevention];

    if (!preventionData.length) return <div>예상 데이터가 없습니다.</div>;

    return (
        <div className="sidebar-table">
            <table>
                <colgroup>
                    <col style={{ width: '16%' }} /> {/* 시설 이름 */}
                    <col style={{ width: '18%' }} /> {/* 위치 */}
                    <col style={{ width: '10%' }} />  {/* 연도 */}
                    <col style={{ width: '12%' }} /> {/* 상태 */}
                    <col style={{ width: '12%' }} /> {/* 유지보수 */}
                    <col style={{ width: '18%' }} /> {/* 담당자 */}
                    <col style={{ width: '14%' }} /> {/* 비고 */}
                </colgroup>
                <thead>
                    <tr>
                        <th>시설 이름</th>
                        <th>위치</th>
                        <th>건설 연도</th>
                        <th>현재 작동 상태</th>
                        <th>마지막 유지보수 날짜</th>
                        <th>담당자(연락처)</th>
                        <th>비고 (용량/성능)</th>
                    </tr>
                </thead>
                <tbody>
                    {preventionData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.location}</td>
                            <td>{item.built_year}</td>
                            <td>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    backgroundColor: getStatusColor(item.status),
                                    color: getTextColor(item.status),
                                    fontWeight: 'bold',
                                    fontSize: '0.875rem',
                                }}>
                                    {item.status}
                                </span>
                            </td>
                            <td>{item.last_maintenance}</td>
                            <td>
                                {item.manager.includes('(')
                                    ? <>
                                        {item.manager.split('(')[0].trim()}<br />
                                        ({item.manager.split('(')[1]}
                                    </>
                                    : item.manager}
                            </td>
                            <td>{item.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SidebarPrevention;