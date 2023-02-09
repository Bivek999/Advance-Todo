import React from 'react'

const RenderTodo = ({key,data,deleteTodo}) => {

  return (
    <div>
        <h1>{data.note}</h1>
        <h3>{data.date.toLocaleString()}</h3>
        <button onClick={()=>{
            deleteTodo(key);
        }}>🚫❌</button>
    </div>
  )
}

export default RenderTodo