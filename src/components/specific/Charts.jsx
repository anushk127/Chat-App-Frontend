/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  //   plugins,
  PointElement,
  Tooltip,
} from 'chart.js';
import { orange, purple, purpleLight } from '../../constants/color';
import { getLast7Days } from '../../lib/features';

ChartJS.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      //   display: false,
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      //   display: false,
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Messages',
        data: value,
        fill: false,
        borderColor: purple,
        backgroundColor: purpleLight,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [purpleLight, orange],
        borderColor: [purple, orange],
        offset: 30,
      },
    ],
  };
  return (
    <Doughnut
      style={{
        zIndex: 10,
      }}
      data={data}
      options={doughnutChartOptions}
    />
  );
};

export { LineChart, DoughnutChart };
