import React from "react";
import { FaHandPointDown } from 'react-icons/fa'
import { useSidebar } from "../context/SidebarContext";
import './css/SidebarLandslideRank.css';
import { RANK_INFO } from '../RANK_INFO';

const SidebarLandslideRank = () => {
  const { rankOnly } = useSidebar();

  if (!rankOnly) return null;

  const rank = typeof rankOnly === 'number' ? rankOnly : 1;
  const rankData = RANK_INFO[rank] || RANK_INFO[1];
  const rankList = [1, 2, 3, 4, 5];

  return (
    <div className="sidebar-rank-box">
      <h3 className="sidebar-rank-title">위험도 등급 체계</h3>

      <div className="rank-group">
        {rankList.map((r) => {
          const data = RANK_INFO[r];
          return (
            <div className="rank-item" key={r}>
              <div className="rank-icon">
                {r === rank ? <FaHandPointDown size={20} color="#333" /> : null}
              </div>
              <div
                className="rank-badge"
                style={{
                  backgroundColor: data.color,
                  color: data.textColor,
                  fontWeight: r === rank ? "bold" : "normal",
                }}
              >
                {data.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* 설명 줄 */}
      <p
        className="rank-description"
        style={{
          fontWeight: rank >= 3 ? 'bold' : 'normal',
          color:
          rank >= 5
            ? "#D8000C"
            : rank === 4
            ? "#FF8C00"
            : "#666",
          marginTop: '12px'
        }}
      >
        {rankData.emoji} {rankData.name} : {rankData.description}
      </p>
     
    </div>
  );
};

export default SidebarLandslideRank;