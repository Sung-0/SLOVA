import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RANK_INFO } from '../RANK_INFO' ;

const rankMap = Object.fromEntries(
    Object.entries(RANK_INFO).map(([rank, info]) => [rank, { label: info.name, color: info.color }])
);

export const showArmyToast = ({ name, rank }) => {
    const risk = rankMap[rank] || { label: '알 수 없음', color: '#999'};

        // 등급이 3일 때 글자색 검정, 나머지는 흰색
    const textColor = rank === 3 ? '#000' : '#fff';

    toast(
        <div style={{ color: textColor }}>
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