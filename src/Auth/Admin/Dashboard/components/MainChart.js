import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import axios from '../../../../api/TongHop';
import { useHttpClient } from '../../../../CustomHooks/httpClient';
import useAxios from '../../../../CustomHooks/useAxios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Hồ sơ theo ngày',
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      }

    }
  },
};


const MainChart = () => {
  const {data: hosoperDay} = useHttpClient('https://admission1-api.azurewebsites.net/api/TongHop/GetHosoperDay');
  const [response] = useAxios({
      axiosInstance: axios,
      url : "GetHosoperDay",
      method: "GET",
  });

  let labels = [];
  response.forEach(item => labels.push(item.create_Date));
  let countperDay = [];
  response.forEach(item => countperDay.push(item.countperDay))

  // const labels = [0]
  // hosoperDay.map((item) => labels.push(item.create_Date));
  hosoperDay.map((item) => countperDay.push(item.countperDay));

  const data = {
    labels,
    datasets: [
      {
        label: 'Hồ sơ',
        data: countperDay,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.2
      },
    ],
    
  };

  return (
     <Line options={options} data={data} />
  )
}
export default MainChart;
