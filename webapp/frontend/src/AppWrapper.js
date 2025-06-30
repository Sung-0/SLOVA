import React, { useState } from 'react';
import App from './App';
import SecurityScreen from './SecurityScreen';
import './AppWrapper.css';
import { useUser } from './compoents/context/UserContext';
import Typewriter from 'typewriter-effect'; //타자기 효과 css

const AppWrapper = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { setUser, user } = useUser();

  const handleSuccess = (userData) => {
    setUser(userData);
    setAuthenticated(true);
    setShowPopup(true);

    // 3초 뒤 팝업 닫기
    setTimeout(() => setShowPopup(false), 3000);
  };

  return authenticated ? (
    <>
      {showPopup && user && (
        <div className='welcome-popup'>
          <div className='popup-content'>
            <h2>
              <Typewriter
                options={{ delay: 55}}
                onInit={(typewriter) => {
                  typewriter
                  .typeString(`환영합니다. ${user.rank} ${user.name} 님`)
                  .start();
                }}
              />
            </h2>
            <p>군번 {user.id_number}</p>
          </div>
        </div>
      )}
      <App />
    </>
  ) : (
    <SecurityScreen onSuccess={handleSuccess} />
  );
};

export default AppWrapper;