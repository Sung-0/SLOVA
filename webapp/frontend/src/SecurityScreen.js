import React, { useState, useEffect } from 'react';
import './SecurityScreen.css';
import Swal from 'sweetalert2';

const SecurityScreen = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [shake, setShake] = useState(false);

  // 현재 잠금 상태인지 계산
  const isLocked = lockedUntil && Date.now() < lockedUntil;

  useEffect(() => {
    // 로컬 저장된 잠금 정보 불러오기
    const savedErrorCount = localStorage.getItem('errorCount');
    const savedLockedUntil = localStorage.getItem('lockedUntil');

    if (savedErrorCount) setErrorCount(Number(savedErrorCount));
    if (savedLockedUntil) setLockedUntil(Number(savedLockedUntil));
  }, []);

  // 흔들림 효과
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  //제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      setShowPrompt(true);
      triggerShake();
      return;
    }

    // 1. 해제 코드 검사
    if (code === '1234567890') {
      localStorage.removeItem('lockedUntil');
      localStorage.removeItem('errorCount');
      setLockedUntil(null);
      setErrorCount(0);
      setCode('');
      
      Swal.fire({
        icon: 'success',
        title: '잠금 해제 완료',
        text: "잠금이 성공적으로 해제되었습니다.",
        confirmButtonText:"확인"
      });
      return;
    }

    // 2. 잠겨있는 경우 막기
    if (isLocked) {
      triggerShake();
      return;
    }

    // 3. 서버에 로그인 코드 검증
    try {
      const response = await fetch('/security/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 성공 시 로컬 저장소 초기화
        localStorage.removeItem('errorCount');
        localStorage.removeItem('lockedUntil');
        setErrorCount(0);
        setLockedUntil(null);
        onSuccess(result.user);
      } else {
        handleLoginError();
      }
    } catch (err) {
      console.error('Login failed:', err);
      handleLoginError();
    }
  };

  // 로그인 실패 시 처리
  const handleLoginError = () => {
    setShowPrompt(false);
    triggerShake();

    const newCount = errorCount + 1;
    setErrorCount(newCount);
    localStorage.setItem('errorCount', newCount);

    if (newCount >= 3) {
      const lockEnd = Date.now() + 10 * 60 * 1000; // 10분 잠금
      setLockedUntil(lockEnd);
      localStorage.setItem('lockedUntil', lockEnd);
    }

    setCode('');
  };

  return (
    <div className="security-container">
      <main className="security-body">
        <p
          className={
            isLocked
              ? "security-error"
              : errorCount > 0
              ? "security-error"
              : showPrompt
              ? "security-message"
              : "security-message security-hidden"
          }
        >
          {isLocked
            ? "관리자에게 문의하세요."
            : errorCount > 0
            ? `보안코드가 틀렸습니다 (${errorCount}/3)`
            : "보안코드를 입력하세요"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className={`security-input-wrapper ${shake ? 'shake' : ''}`}
          style={
            isLocked
              ? {
                  opacity: 0.5,
                  filter: 'grayscale(1)',
                }
              : {}
          }
          >
            <input
              type="password"
              className="security-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="보안코드"
              disabled={false}
               style={
                isLocked
                 ? {
                    cursor: 'not-allowed',
                    caretColor: 'transparent',         // 커서 안 보이게
                    color: 'transparent',              // 입력값 안 보이게
                    textShadow: '0 0 0 #aaa'           // 시각적 가림
                  }
                 : {}
               }
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default SecurityScreen;
