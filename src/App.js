import './App.css';
import Login from './Component/Login';
import Todo from './Component/Todo';
import User from './Component/User';
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/todo' element={<Todo/>} />
        <Route exact path='/user' element={<User/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
