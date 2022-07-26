import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useHttpClient } from '../../../../CustomHooks/httpClient';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {

  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Line?? Chart',
    },
    scales: {
        y: {
            suggestedMin: 50,
            suggestedMax: 100,

            ticks: {
              stepSize: 20
            }
        }
      }
  },

};


const ModalNganhChart = () => {
  const {data: hosoperNganh} = useHttpClient('https://admission1-api.azurewebsites.net/api/TongHop/HosoperNganh');
  
  const labels = hosoperNganh.map((item) => item.maNganh);
  const countperNganh = hosoperNganh.map((item) => item.hosoCount)
  console.log("perDay", countperNganh);

  const data = {
    labels,
    datasets: [
      {
        label: 'Ho so per Day',
        data: countperNganh,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels,
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
    
  };

  return (
     <Bar options={options} data={data} />
  )
}
export default ModalNganhChart;
