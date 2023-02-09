import React from 'react';
import './renderTodo.css';

const RenderTodo = ({data,deleteTodo}) => {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days=[
    'SUN',
    'Mon',
    'TUE',
    'WED',
    'TRUR',
    'FRI',
    'SAT',
    
  ]

  // get full year 1999 
  // getMonth start giving output from 0 to 11;
  // 
  const date = new Date(data.date);
  const day=date.getDay();
  // console.log(days[day]);
  const yearStr = String(date.getFullYear()).slice(2);
  const str = `${date.getDate()} ${months[date.getMonth()]} ${yearStr}`;

  return (
    <div className='parts'>
        <h1>{data.note}</h1>

        <h3><span>{days[day]} </span> { str }</h3>
        {/* {console.log(deleteTodo(data.id))} */}
        <button onClick={()=>{
            deleteTodo(data.id);
        }}>🚫Delete❌</button>
    </div>
  )
}

export default RenderTodo