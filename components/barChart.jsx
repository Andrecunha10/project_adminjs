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
import { useDataRport } from '../utils/useReportData.ts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Usuários nos últimos 12 meses',
      },
    },
  };

  
export const BarChart = ({ startDate, endDate, selectDate }) => {
  const { dataReport, error, isLoading } = useDataRport('users', startDate, endDate, selectDate);

  
const data = {
    labels: dataReport?.label,
    datasets: [
      {
        label: 'Usuários em quantidade.',
        data: dataReport?.data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };  
  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao realizar requisição. Tente novamente.</p>
  return <Bar options={options} data={data} />;
}