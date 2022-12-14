import {useState, useEffect} from 'react';
import moment from 'moment';
import { BarChart } from './barChart';
import { PieChart } from './pieChart';
import { RadarChart } from './radarChart';

const inputStyle = {
    padding: '5px 10px',
    fontSize: '1.2em',
    border: '2px solid #333',
    borderRadius: 10    
};

const col = {
    width: '50%',
    float: 'left',
    boxSizing: 'border-box',
    padding: '5px'
};
const item = {
    width: '100%',
};

const Dashboard = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectDate, setSelectDate] = useState("7");
   

    useEffect(() => {
        if(selectDate !== 'custom') {
            setStartDate('');
            setEndDate('');
        }
    }, [selectDate]);

    return (
        <>
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 5,
                    textAlign: 'right',
                    padding: '5px 10px',
                    boxSizing: 'border-box',
                }}
            >
                <input 
                    type='date'
                    disabled={selectDate !== 'custom'}
                    value={startDate}
                    onChange = {(e) => setStartDate(e.target.value)}
                    style={inputStyle}
                    max={endDate === '' ? moment().format('YYYY-MM-DD') : endDate}
                />
                <input 
                    type='date'
                    disabled={selectDate !== 'custom'}
                    value={endDate}
                    onChange = {(e) => setEndDate(e.target.value)}
                    style={inputStyle}
                    min={startDate}
                    max={moment().format('YYYY-MM-DD')}
                />
                <select 
                    style={inputStyle}
                    onChange = {(e) => setSelectDate(e.target.value)}                
                >
                    <option value='custom'>Customizado</option>
                    <option value='7' selected>7 dias</option>
                    <option value='15'>15 dias</option>
                    <option value='30'>1 m??s</option>
                    <option value='180'>6 mes??s</option>
                    <option value='360'>1 ano</option>
                </select>
            </div>
            <div>
                <div style={col}>

                    <PieChart startDate={startDate} endDate={endDate} selectDate={selectDate}/>                  
                </div>
                <div style={col}>
                    <RadarChart startDate={startDate} endDate={endDate} selectDate={selectDate}/>
                </div>
                <div style={{
                    ...col,
                    width: '100%'
                }}>
                    <BarChart startDate={startDate} endDate={endDate} selectDate={selectDate}/>
                </div>
            </div>
        </>
    );
}

export default Dashboard;