import React from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';

const SidebarTask = () => {
    const { sidebarData, isLoading, error } = useSidebar();

    // 로딩 중
    if (isLoading) return <div>로딩 중 ...</div>;

    // 에러 발생
    if (error) return <div>{error}</div>;

    // 데이터 없을 때
    if (!sidebarData) return <div>마커를 선턱해주세요.</div>;

    const taskData = sidebarData.task
        ? Array.isArray(sidebarData.task)
            ? sidebarData.task
            : [sidebarData.task]
        :[];
    if (taskData.length === 0) return <div>예상 데이터가 없습니다.</div>;

    return (
        <div className="sidebar-table">
            <table className="sidebar-table">
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>담당자 (부서)</th>
                        <th>역할</th>
                    </tr>
                </thead>
                <tbody>
                    {taskData.map((item, index) =>(
                        <tr key={index}>
                            <td>{item.category}</td>
                            <td>{item.officer}</td>
                            <td>{item.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SidebarTask;