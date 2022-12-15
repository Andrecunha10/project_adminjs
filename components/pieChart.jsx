import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDataRport } from '../utils/useReportData.ts';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Vendas por categorias',
    },
  },
};

export function PieChart({startDate, endDate, selectDate}) {

const { dataReport, error, isLoading } = useDataRport('categories', startDate, endDate, selectDate);


const data = {
    labels: dataReport?.label,
    datasets: [
      {
        label: 'Vendas Por Categorias',
        data: dataReport?.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao realizar requisição. Tente novamente.</p>
  
  return <Pie data={data} options={options}/>


}