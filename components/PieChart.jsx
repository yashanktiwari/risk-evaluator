// src/components/PieChart.js
'use client'

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, labels }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    let myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#828d8f", "#313e4e", "#999ea1", "#bfc3c6", "#37495e"
            ],
          },
        ],
      },
    });

    return (() => {
      myChart.destroy();
    })
  }, [ data, labels ]);

  return <canvas ref={ chartRef } />;
};

export default PieChart;
