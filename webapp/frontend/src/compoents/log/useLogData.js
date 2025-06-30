// 로그 데이터 요청 및 필터링
import { useEffect, useState } from "react";
import axios from "axios";

export const useLogData = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('/log/login');

                // 최신 날짜 기준으로 정렬
                const sortedLogs = response.data.logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setLogs(sortedLogs);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return { logs, loading, error };
};