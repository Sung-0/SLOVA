import React, { useEffect, useRef} from "react";

const VideoPopup = ({ videoUrl, onclose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const handleEnded = () => onclose(); // 영상 끝나면 자동 닫기
        const video = videoRef.current;
        video?.addEventListener('ended', handleEnded);
        return () => {
            video?.removeEventListener('ended', handleEnded);
        };
    }, [onclose]);

    return (
        <div style={popupStyle}>
            <div style={{ ...innerStyle, position: 'relative' }}>
                <video ref={videoRef} src={videoUrl} controls autoPlay style={{ width: '100%'}} />
                <button onClick={onclose} style={closeButtonStyle} aria-label="닫기">
                    &times;
                </button>
            </div>
        </div>
    );
};

const popupStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw', height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 9999,
};

const innerStyle = {
  
  padding: 30,
  borderRadius: 8,
  maxWidth: '90%',
  width: 640,
};

const closeButtonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,  // 오른쪽 위로 위치 변경
  background: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#000',  // 검은색으로 변경
  fontWeight: 'bold',
  zIndex: 10,
};

export default VideoPopup;