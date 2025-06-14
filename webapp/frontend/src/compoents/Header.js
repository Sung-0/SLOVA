import React from "react";
import '../css/Header.css';
import {FaSearch, FaDownload} from 'react-icons/fa'; // 아이콘
import logo from '../assets/logo.png'; //로고 이미지
import HeaderBotton from "./HeaderBotton";

function Header(){
    return(
        <header className="header">
            {/* 상단 */}
            <div className="header-inner-top">
                <div className="header-left">
                    <a href="/">
                        <img src={logo} alt='Logo' className="logo" />
                    </a>
                    <h1 className="title">산사태 위험 예측 시스템</h1>
                </div>
                <div className="header-right">
                    <div className="search-box">
                        <input type="text" placeholder="위치 검색" />
                        <FaSearch className="icon search-icon" />
                    </div>
                    <button className="export-btn">
                        <FaDownload className="icon" />
                    </button>
                </div>
            </div>
        
            {/* 하단 */}
                <HeaderBotton />
        </header>
    );
}

export default Header;