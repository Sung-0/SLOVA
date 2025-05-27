import React from "react";
import '../css/Footer.css';
import { FaGithub, FaInstagram, FaRegStickyNote } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-social">
                <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href="https://instagram.com/your-instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://your-notion-page" target="_blank" rel="noopener noreferrer"><FaRegStickyNote /></a>
            </div>

            <div className="footer-links">
                <a href='/terms'>이용약관</a>
                <a href="/privacy">개인정보처리방침</a>
                <a href="/contact">Contact us</a>
            </div>

            <div className="footer-bottom">
                <p>산사태 위험 예측 시스템 © 2025</p>
            </div>
        </footer>
    );
};

export default Footer;