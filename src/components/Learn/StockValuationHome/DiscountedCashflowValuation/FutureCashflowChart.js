import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

export function DCFValueChart({ chartData }) {
  const options = {
    indexAxis: "y",
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => `$${value}`, // Display the actual value
        color: "white", // Color of the displayed value
        clip: true,
      },
    },
  };

  return <Bar options={options} data={chartData} plugins={[ChartDataLabels]} />;
}
