import React, { useEffect, useRef, useState } from 'react'
import { json } from 'react-router-dom';
import RenderTodo from './RenderTodo';

const Todo = () => {
    const [todos,setTodos]=useState([]);
    const [error,setError]=useState('');
    const inpRef=useRef();
    const dateRef=useRef();

    useEffect(()=>{
        const storedTodoData=async()=>{
            const response= await fetch("https://todo-c6ac9-default-rtdb.firebaseio.com/bivektodo.json")
            const responseJson=await response.json();
            console.log('response json',responseJson);
            const getDatafromServer=[];
            for(const key in responseJson){
              getDatafromServer.push(responseJson[key]);
              
            }
            console.log('',getDatafromServer);
            setTodos(getDatafromServer);
      
          };
          storedTodoData();
    },[])
    function addTodo(e){
        e.preventDefault();
        const obj={
            note: inpRef.current.value,
            date: dateRef.current.value,
            id: Math.random(),
        }
        // setTodos([...todos,obj]);
        setTodos((prev)=>[...prev,obj]);
        const addnew=async ()=>{
            await fetch("https://todo-c6ac9-default-rtdb.firebaseio.com/bivektodo.json",{
                method: 'POST',
                body: JSON.stringify(obj),
            })
        }
        addnew();
    }
    function deleteTodo(key){
        const newtodo=todos.filter((k)=>{
            if(k.id!==key){
                return k;
            }
        });
        const deleteData=async ()=>{
            await fetch("https://todo-c6ac9-default-rtdb.firebaseio.com/bivektodo.json",{
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: 'demo',

        })
        deleteData();
    }
        newtodo.map((e)=>{
            const addnew=async ()=>{
               await fetch("https://todo-c6ac9-default-rtdb.firebaseio.com/bivektodo.json",{
                    method: 'POST',
                    body: JSON.stringify(e),
                })
            }
            addnew();
        })

    }
  return (
    
    <div className="main">
    <form onSubmit={addTodo}>
    <input
      ref={inpRef}      
      placeholder="Enter a task"
      type="text"
    />
    <input type='date' ref={dateRef} required />
    <button type='submit'>Add Task</button>
    </form>

    <div>
        {todos.map((e)=>{
            return <RenderTodo key={e.id}  data={e} deleteTodo={deleteTodo} />
        })}
    </div>
    
  </div>
  )
}

export default Todo