import React from "react";
import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut, Line } from "react-chartjs-2";
// import { Line } from 'react-chartjs-2';
import { useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);
// ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ paid, unpaid }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Payment chart",
      },
    },
  };

  const data = {
    labels: ["paid", "unpaid"],
    datasets: [
      {
        label: "payments data",
        data: [paid, unpaid],
        backgroundColor: ["#23ac76", "#de535e"],
        borderColor: ["#23ac76", "#de535e"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export function LineChart({amounts}) {
   
  
    
    //////////////////////////////////////
  const canvasRef = React.useRef(null);
  const month = new Date().getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const chartData = {
    labels: months,
    datasets: [
      {
        label: `no of invoices per month`,
        data: amounts,
        borderColor: "#23ac76",
        backgroundColor: "#23ac76",
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    // Destroy any existing chart on update to avoid canvas conflicts
    if (canvasRef.current) {
      const chartInstance = ChartJS.getChart(canvasRef.current);
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [chartData]);

  return <Line data={chartData} />;
}
export default PieChart;
