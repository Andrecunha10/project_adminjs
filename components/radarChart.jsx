import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useDataRport } from '../utils/useReportData.ts';
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
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
        text: '6 Produtos Mais Vendidos',
      },
    },
  };
  
  export function RadarChart({ startDate, endDate, selectDate}) {
    const { dataReport, error, isLoading } = useDataRport('products', startDate, endDate, selectDate);

    const data = {
        labels: dataReport?.label,
        datasets: [
          {
            label: 'Produtos em quantidade.',
            data: dataReport?.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    
    if (isLoading) return <p>Carregando...</p>
    if (error) return <p>Erro ao realizar requisição. Tente novamente.</p>
    return <Radar data={data} options={options}/>;
  }