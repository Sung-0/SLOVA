import React, { useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import './css/sidebar_table_full.css';
import VideoPopup from "./VideoPopup";

const SidebarLandslideHistory = () => {
    const { sidebarData, isLoading, error } = useSidebar();
    const [selectedVideo, setSelectedVideo] = useState(null);

    // 로딩 중
    if (isLoading) return <div>로딩 중...</div>;

    // 에러 발생
    if (error) return <div>{error}</div>;

    //데이터 없을 때
    if (!sidebarData) return <div>마커를 선택해주세요.</div>;

    const landslideHistoryData = sidebarData.landslide
        ? Array.isArray(sidebarData.landslide)
            ? sidebarData.landslide
            : [sidebarData.landslide]
        : [];

    if (landslideHistoryData.length === 0) return <div>예상 데이터가 없습니다.</div>;

    return (
        <div className="sidebar-table">
            <table className="sidebar-table">
                <colgroup>
                    <col style={{ width: '10%' }} /> {/* 위치 */}
                    <col style={{ width: '20%' }} /> {/* 위험도 */}
                    <col style={{ width: '10%' }} /> {/* 위험 이유 */}
                    <col style={{ width: '10%' }} /> {/* 과거 이력 */}
                    <col style={{ width: '40%' }} /> {/* 위험 이유 */}
                </colgroup>
                <thead>
                    <tr>
                        <th>일시</th>
                        <th>원인</th>
                        <th>피해 인원 (명)</th>
                        <th>피해 규모 (ha)</th>
                        <th>대응결과</th>
                    </tr>
                </thead>
                <tbody>
                    {landslideHistoryData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.datetime}</td>
                             <td>
                                {item.video_url ? (
                                    <span
                                        onClick={() => setSelectedVideo(item.video_url)}
                                        style={{ 
                                            color: 'blue', 
                                            cursor: 'pointer', 
                                            textDecoration: 'underline' 
                                        }}
                                        title="영상 보기"
                                    >
                                        {item.cause}
                                    </span>
                                ) : (
                                    item.cause
                                )}
                            </td>
                            <td>{item.casualties} 명</td>
                            <td>{item.area} ha</td>
                            <td>{item.response}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedVideo && (
                <VideoPopup
                    videoUrl={selectedVideo}
                    onclose={() => setSelectedVideo(null)}
                />
            )}
        </div>
    );
};

export default SidebarLandslideHistory;