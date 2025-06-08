// 첫 진입 시 보여줄 기본 안내 UI
import React from "react";
import { FaChartBar, FaMountain, FaListOl, FaUsers, FaAmbulance } from 'react-icons/fa';
import '../../css/SiebarDefault.css';
import LandslideDountChart from "./LandslideDountChart";

function SidebarDefault() {
    return (
        <div className="sidbar-default">
            <h3 className="section-title">
                <FaChartBar className="icon" /> 
                <span className="text">A. 위험 평가 및 현황</span>
            </h3>

            <div className="info-grid">
                {/* 1. 산사태 위험 지역 등글별 수 */}
                <div className="info-card">
                    <div className="card-header">
                        <FaMountain className="icon" />
                        <h4>산사태 위험 지역 등급별 수</h4>
                    </div>
                    <div className="card-content">
                        {/* 여기에 추후 데이터 삽입 */}
                        <p>데이터 미제공</p>
                    </div>
                </div>

                {/* 2. 산사태 발생 높은 지역 순위 Top 5 */}
                <div className="info-card">
                    <div className="card-header">
                        <FaListOl className="icon" />
                        <h4>산사태 발생 이력 TOP5</h4>
                    </div>
                    <div className="card-content">
                        <LandslideDountChart />
                    </div>
                </div>

                {/* 3. 인명 피해 영향 수 */}
                <div className="info-card">
                    <div className="card-header">
                        <FaUsers className="icon" />
                        <h4>인명 피해 영향 수</h4>
                    </div>
                    <div className="card-content">
                        <p>데이터 미제공</p>
                    </div>
                </div>

                {/* 4. 응급 대응 시설 */}
                <div className="info-card">
                    <div className="card-header">
                        <FaAmbulance className="icon" />
                        <h4>응급 대응 시설</h4>
                    </div>
                    <div className="card-content">
                        <div class="impact-number">268개 시설</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarDefault;