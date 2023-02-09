import React, { useEffect, useRef, useState } from "react";
import { json } from "react-router-dom";
import Filter from "./Filter";
import RenderTodo from "./RenderTodo";
import './todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const inpRef = useRef();
  const dateRef = useRef();

  /*============================GET DATA FROM SERVER======================================= */
  useEffect(() => {
    const storedTodoData = async () => {
      const response = await fetch(
        `https://todo-c6ac9-default-rtdb.firebaseio.com/${localStorage.getItem("token")}.json`
      );
      const responseJson = await response.json();
    //   console.log("response json", responseJson);
      const getDatafromServer = [];
      for (const key in responseJson) {
        getDatafromServer.push(responseJson[key]);
      }
    //   console.log(getDatafromServer);
      setTodos(getDatafromServer);
    };
    storedTodoData();
  }, []);

 /*==================================ADD TASK====================================== */
  function addTodo(e) {
    e.preventDefault();
    const obj = {
      note: inpRef.current.value,
      date: dateRef.current.value,
      id: Math.random(),
    };
    // setTodos([...todos,obj]);
    setTodos((prev) => [...prev, obj]);
    const addnew = async () => {
      await fetch(
        `https://todo-c6ac9-default-rtdb.firebaseio.com/${localStorage.getItem("token")}.json`,
        {
          method: "POST",
          body: JSON.stringify(obj),
        }
      );
    };
    addnew();

    inpRef.current.value='';
    dateRef.current.value='';

  }

  /*===================================Delet Item=============================== */
  function deleteTodo(id) {
    const deleteFromServer = async () => {
      await fetch(
        `https://todo-c6ac9-default-rtdb.firebaseio.com/${localStorage.getItem("token")}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };
    deleteFromServer();

    const newtodo = todos.filter((k) => k.id !== id);
    // console.log(newtodo);

    async function addToBackEnd() {
      newtodo.map((curr) => {
        fetch(`https://todo-c6ac9-default-rtdb.firebaseio.com/${localStorage.getItem("token")}.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(curr),
        });
      });
    }
    addToBackEnd();
    setTodos(newtodo);
    // const addAgain=async ()=>{
    //      newtodo.map((cur)=>{
    //          fetch("https://todo-c6ac9-default-rtdb.firebaseio.com/bivektodo.json",{
    //         method: 'POST',
    //         body: JSON.stringify(cur),
    //     })
    // })
    // }
    // addAgain();
    // newtodo.map((e)=>{
    //     const addnew=async ()=>{
    //        await fetch("https://todo-c6ac9-default-rtdb.firebaseio.com/bivektodo.json",{
    //             method: 'POST',
    //             body: JSON.stringify(e),
    //         })
    //     }
    //     addnew();
    // })
  }

  // filtering object

const [filterValue,setFilterValue]=useState('all');
const [filterTodo,setFilterTodo]=useState([]);
  function onFilter(val){
    setFilterValue(val);
    if(val!=='all'){
        setFilterTodo(todos.filter((e)=>{
            const date=new Date(e.date);
            const month=date.getMonth();
            return Number(val)===Number(month);
        }))
    }
  }

  return (
    <div className="main">
        <div className="todo-form">
        <div className="input-section">
          <div className="filter-input">
          <h1>Filter </h1>
        <Filter onFilter={onFilter}/>
          </div>
      <div className="form-input">
        <h1>Add New Task</h1>
      <form onSubmit={addTodo}>
        <input ref={inpRef} placeholder="Enter a task" type="text" />
        <input type="date" ref={dateRef} required />
        <button type="submit">Add Task</button>
      </form>
      </div>
        </div>
        <div className="calender">
          <h1>Calender</h1>
          <br/>
          <table>
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wedday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
            </tr>
            <tr>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
            </tr>
            <tr>
              <td>29</td>
              <td>30</td>
              <td>31</td>
            </tr>
          </table>
        </div>
        </div>

      <div className="abcd">
        { filterValue==="all"&&todos.map((e) => {
          return <RenderTodo key={e.id} data={e} deleteTodo={deleteTodo} />;
        })}
        {
            filterValue!=='all'&&filterTodo.map((e) => {
                return <RenderTodo key={e.id} data={e} deleteTodo={deleteTodo} />;
              })}
      </div>

    </div>
  );
};

export default Todo;
