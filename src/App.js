import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import AddStudent from './Components/AddStudent';
import EditStudent from './Components/EditStudent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/add' element={<AddStudent/>} ></Route>
        <Route path='/edit' element={<EditStudent/>} ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
