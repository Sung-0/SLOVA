import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rankMap = {
    1: { label: '매우 낮음', color: '#0000FF' }, //파랑
    2: { label: '낮음', color: '#00FFFF' }, // 시안
    3: { label: '주의', color: '#FFFF00' }, // 노랑
    4: { label: '위험', color: '#FFA500' }, // 오렌지
    5: { label: '매우 위험', color: '#FF0000' } // 빨강
};

export const showArmyToast = ({ name, rank }) => {
    const risk = rankMap[rank] || { label: '알 수 없음', color: '#999'};

    toast(
        <div style={{ color: '#fff' }}>
            <span style={{fontSize: '12px', fontWeight: 'bold'}}>부대 선택</span><br />
            <strong>📍 {name} 선택했습니다. </strong>
            위험도: <span style={{fontWeight: 'bold'}}>{risk.label}</span>
        </div>,
        {
            position: 'bottom-center',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide,
            style: {
                backgroundColor: risk.color,
                width: '600px', // 가로 너비 조정
                minHeight: '60px',
                fontSize: '16px',
            },
            icon: '⚠️',
        }
    );
};