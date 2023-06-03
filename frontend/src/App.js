import './App.css';
import CodeEditor from './Components/CodeEditor';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './Pages/Register/Register'
import LandingPage from './Pages/FirstPage/LandingPage';
import Login from './Pages/Login/LoginPage';


function App() {

  const initialData = {
    loggedin: false,
    studentData: {}
  }

  return (
    <div> 

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage> </LandingPage>}></Route>
        <Route path='/signup' element={<Register> </Register>}>  </Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
    
  );
}

export default App;
