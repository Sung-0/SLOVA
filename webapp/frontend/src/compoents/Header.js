import React, {useEffect, useState } from "react";
import '../css/Header.css';
import logo from '../assets/logo.png'; //로고 이미지
import { useUser } from "./context/UserContext";
import axios from "axios"; //로그아웃
import LogModal from "./log/LogModel";
import { FiLogOut, FiFileText } from "react-icons/fi";

function Header(){

    const [currentTime, setCurrentTime] = useState("");
    const { user } = useUser();
    const [showLogPopup,setShowLogPopup] = useState(false);

    const openLogPopup = () => setShowLogPopup(true);
    const closeLogPopup = () => setShowLogPopup(false);
  
    //실시간 시간 표시
    useEffect(() => {
        const baseTime = new Date('2023-07-09T15:45:00');

        const start = Date.now();

        const updateTime = () => {
            const now = new Date();
            const elapsed = now.getTime() - start;
            const customTime = new Date(baseTime.getTime() + elapsed);

            const formatTime = customTime.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });

            const formatDate = customTime.toLocaleDateString('ko-KR').replace(/\./g, ".");

            setCurrentTime(`현재 시간: ${formatDate} ${formatTime}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // 로그아웃 로직
    const handleLogout = async () => {
        if (!user) return;

        try{
            await axios.post("security/logout", { user }); // Flask 로그아웃 요청
            localStorage.removeItem("user"); // 저장된 사용자 정보 제거
            window.location.reload(); // 새로고침
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    
    return(
        <header className="header">
            <div className="header-inner-merged">
                 {/* 좌측: 로고 + 시스템 제목 */}
                <div className="header-left">
                    <a href="/">
                        <img src={logo} alt='Logo' className="logo" />
                    </a>
                    <h1 className="title">산사태 위험 예측 시스템</h1>
                </div>

                {/* 중앙: 현재 시간 */}
                <div className="current-time">{currentTime}</div>

                {/* 우측: 로그아웃 로그 기록 사용자 정보*/}
                <div className="header-right">
                    {/* 로그아웃 버튼 */}
                    <button className="header-btn" onClick={handleLogout}>
                        <FiLogOut style={{ marginRight: "6px" }} />
                        <span className="span-text">로그아웃</span>
                    </button>

                    {/* 로그 기록 버튼 (권한 있을 때만 표시) */}
                    {user?.authority === "1" &&(
                        <button className="header-btn" onClick={openLogPopup}>
                            <FiFileText style={{ marginRight: "6px" }} />
                            <span className="span-text">로그 기록</span>
                        </button>
                    )}

                    {/* 사용자 정보 */}
                    <div className="user-info">
                        {user && (
                            <>
                            <img
                                src={`/rank-icons/${user.rank_icon}`}
                                alt={user.rank}
                                className="rank-icon"
                            />
                            <span className="user-name">{user.name}님</span>
                            </>
                        )}
                    </div>
                </div>

                {/* 로그 팝업 모달 */}
                {showLogPopup && <LogModal onClose={closeLogPopup} />}
            </div>

        </header>
    );
}

export default Header;