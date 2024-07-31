import React from "react";
import { Line } from "react-chartjs-2";

export function HistoricalCashflowChart({ chartData }) {
  return <Line data={chartData} />;
}
