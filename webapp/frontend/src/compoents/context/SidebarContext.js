import { createContext, useState, useContext, useMemo } from "react";

const SidebarContext = createContext(null);

// Custom Hook: 컴포넌트에서 useSidebar()로 쉽게 사용 가능
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {

    const [sidebarData, setSidebarData] = useState(null); // 전체 데이터 저장
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 표시용
    const [ error, setError] = useState(null); // API 호출 실패 시 에러 메시지 저장
    const [rankOnly, setRankOnly] = useState(null); // rank만 저장
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 오픈
    const [sidebarUnit, setSidebarUnit] = useState(null); // 부대 정보 추가
    const [collapsed, setCollapsed] = useState(false); // 목차 축소 상태

    const updateSidebarData = async (id) => {
        setIsLoading(true); //로딩 시작
        setError(null); // 에러 초기화

        try {
            const res = await fetch(`/sidebar/data?id=${id}`);

            if (!res.ok) throw new Error('서버 응답 오류');

            const data = await res.json();

            setSidebarData(data); // 받아온 데이터 저장
        } catch (err) {
            console.error('Sidebar 데이터 로딩 실패:', err);
            setError(err.message || '알 수 없는 오류'); // 에러 상태 업데이트
            setSidebarData(null); // 데이터 초기화
        } finally {
            setIsLoading(false); // 로딩 종류
        }
    };

    //rank만 저장하는 함수
    const updateSidebarRank = (rank) => {
        setRankOnly(rank);
    };

    // 이름 이미지 저장
    const updateSidebarUnit = (unit) => {
        setSidebarUnit(unit);
    };

    const value = useMemo(() => ({
        sidebarData,         // 현재 사이드바에 표시할 데이터
        updateSidebarData,   // 마커 클릭 시 호출되는 업데이트 함수
        isLoading,           // 로딩 상태
        error,               // 에러 메시지
        rankOnly,
        updateSidebarRank,
        isSidebarOpen, 
        setIsSidebarOpen,
        sidebarUnit, 
        updateSidebarUnit,
        collapsed,
        setCollapsed,
    }), [sidebarData, isLoading, error, rankOnly, isSidebarOpen, sidebarUnit, collapsed]);

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};