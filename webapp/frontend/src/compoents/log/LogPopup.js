// 팝업창 UI
import { useState } from "react";
import Swal from "sweetalert2";
import "./LogPopup.css";
import { useLogData } from "./useLogData";
import { FaFileCsv } from "react-icons/fa";

const LogPopup = () => {
    const { logs } = useLogData();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rank, setRank] = useState("");
    const [name, setName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [filteredLogs, setFilteredLogs] = useState([]);  // 필터 결과

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setRank("");
        setName("");
        setIdNumber("");
    };

    // 화면에 보이는 데이터만 다운로드
    const handleDownload = () => {
        const statusMap = {
            "login-success": "로그인 성공",
            "login-fail": "로그인 실패",
            "logout": "로그아웃"
        };

        let csvContent="날짜,이름,계급,군번,상태\n";

        displayedLogs.forEach(row => {
            csvContent += `${row.timestamp},${row.name},${row.rank},${row.id_number},${statusMap[row.status] || "알 수 없음"}\n`;
        });

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "log.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 검색 조건
    const handleSearch = () => {

        // 최소 하나라도 입력 안할 경우 경고
        if (!startDate && !endDate && !name && !rank && !idNumber) {
            Swal.fire({
                icon: "warning",
                title: "검색 조건이 없습니다.",
                text: "하나 이상의 검색 조건을 입력해주세요.",
                confirmButtonAriaLabel: "#3a5a8c",
                customClass: {
                     popup: "swal-custom-z"
                }
            });
            return;
        }

            const results = logs.filter((log) => {
                const logDate = new Date(log.timestamp.slice(0,10));

                //날짜 비교 startDate ~ endDate 사이
                const matchStartDate = startDate ? logDate >= new Date(startDate) : true;
                const matchEndDate = endDate ? logDate <= new Date(endDate) : true;

                // 이름 검색
                const matchName = name ? (log.name && log.name !== "-" && log.name.includes(name)) : true;

                // 계급 검색
                const matchRank = rank ? (log.rank && log.rank !== "-" && log.rank === rank) : true;

                // 군번 검색
                const matchId = idNumber ? (log.id_number && log.id_number !== "-" && log.id_number.includes(idNumber)) : true;

                return matchStartDate && matchEndDate && matchName && matchRank && matchId;
            });

            // 결과가 없을 때
            if (results.length === 0) {
                Swal.fire({
                    icon: "info",
                    title: "검색 결과 없음",
                    text: "조건에 맞는 로그가 없습니다.",
                    confirmButtonColor: "#3a5a8c",
                    customClass: {
                        popup: "swal-custom-z"
                    }
                });
            } else {
                //결과 있을때
                Swal.fire({
                    icon: 'success',
                    title: '조회 완료',
                    text: `${results.length}건의 결과가 조회되었습니다.`,
                    confirmButtonColor: "#3a5a8c",
                    customClass: {
                        popup: "swal-custom-z"
                    }
                });
            }

            setFilteredLogs(results);

    };

    const displayedLogs = filteredLogs.length > 0 ? filteredLogs : logs;

    return (
        <div className="log-popup">
            <div className="log-menu-container">
                <h2 style={{ marginBottom: "10px" }}>로그 관리</h2>
                    {/* 버튼은 위에 */}
                    <div className="log-menu-buttons">
                        <button onClick={handleReset}>초기화</button>
                        <button className="query" onClick={handleSearch}>조회</button>
                        <button className="download" onClick={handleDownload}>
                            <FaFileCsv style={{ color: "#28a745" }} />
                            다운로드
                        </button>
                    </div>

                    {/* 테이블 기반 메뉴 */}
                    <div className="inquiry">
                        <table className="log-inquiry-table">
                            <tbody>
                            <tr className="log-inquiry-row">
                                <td className="log-inquiry-label">입력 일자</td>
                                <td className="log-inquiry-field">
                                <div className="log-date-group">
                                    <input className="log-date-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                    <span className="log-date-separator">~</span>
                                    <input className="log-date-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                </td>

                                <td className="log-inquiry-label">이름</td>
                                <td className="log-inquiry-field">
                                    <input className="log-text-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </td>
                            </tr>

                            <tr className="log-inquiry-row">
                                    <td className="log-inquiry-label">계급</td>
                                    <td className="log-inquiry-field">
                                    <select className="log-select-input" value={rank} onChange={(e) => setRank(e.target.value)}>
                                        <option value="">전체</option>
                                        <option value="이병">이병</option>
                                        <option value="일병">일병</option>
                                        <option value="상병">상병</option>
                                        <option value="병장">병장</option>
                                    </select>
                                    </td>

                                <td className="log-inquiry-label">군번</td>
                                <td className="log-inquiry-field">
                                    <input className="log-text-input" type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            <div className="log-table-wrapper">
                <table className="log-table">
                    <thead>
                    <tr>
                        <th>날짜</th>
                        <th>이름</th>
                        <th>계급</th>
                        <th>군번</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                </table>

                <div className="log-table-body-scroll">
                    <table className="log-table">
                    <tbody>
                        {displayedLogs.map((log, idx) => (
                        <tr key={idx}>
                            <td>{log.timestamp}</td>
                            <td>{log.name}</td>
                            <td>{log.rank}</td>
                            <td>{log.id_number}</td>
                            <td className={`status ${log.status}`}>
                            {log.status === "login-success" ? "로그인 성공" :
                            log.status === "login-fail" ? "로그인 실패" :
                            "로그아웃"}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogPopup;