import './App.css';
import Login from './Component/Login';
import Todo from './Component/Todo';
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/todo' element={<Todo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
