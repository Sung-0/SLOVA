import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#8B5E3C', '#C1440E', '#E1B382', '#556B2F', '#A89F91'];

export default function LandslideDountChart() {
    const [charData, setCharData] = useState(null);

    useEffect(() => {
        fetch('/sidebar/landslide-summary')
        .then(res => res.json())
        .then(json => {
            const sorted = Object.entries(json.data)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

            const labels = sorted.map(([sido]) => sido);
            const values = sorted.map(([, count]) => count);

            setCharData({
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: COLORS
                }]
            });
        });
    }, []);

    if (!charData) return <div>로딩 중 ...</div>;

    return (
        <div style={{ width: '100%', maxWidth: 400, height: 250}}>
            <Doughnut
                data={charData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom'}
                    }
                }}
            />
        </div>
    );
}