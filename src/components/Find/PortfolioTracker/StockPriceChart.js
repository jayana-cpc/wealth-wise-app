import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const StockPriceChart = ({ priceData, changeColor }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Extract dates and open prices from priceData
  const dates = priceData.results.map((dataPoint) =>
    new Date(dataPoint.t).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
  );
  const openPrices = priceData.results.map((dataPoint) => dataPoint.o);
  const minY = Math.min(...openPrices);
  const maxY = Math.max(...openPrices);

  const suggestedMin = minY - 1;
  const suggestedMax = maxY + 1;

  useEffect(() => {
    if (chartRef.current && priceData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates, // Use the dates as labels
          datasets: [
            {
              label: "1 Month Price",
              data: openPrices,
              borderColor: changeColor,
              borderWidth: 1,
              fill: true,
              backgroundColor: changeColor === 'green' ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 0, 0, 0.1)",
              showLine: true,
              pointRadius: 0,
              pointHoverRadius: 0,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false, // Hide the x-axis
            },
            y: {
              display: false, // Hide the y-axis
              beginAtZero: true,
              min: suggestedMin, // Set the minimum y-axis value
              max: suggestedMax, // Set the maximum y-axis value
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [dates, openPrices, suggestedMin, suggestedMax, priceData, changeColor]);

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 0 }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default StockPriceChart;
