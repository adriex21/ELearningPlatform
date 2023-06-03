import './App.css';
import CodeEditor from './Components/CodeEditor';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './Pages/Register/Register'


function App() {

  const initialData = {
    loggedin: false,
    studentData: {}
  }

  return (
    <div> 

      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register> </Register>}>  </Route>
      </Routes>
      </BrowserRouter>
     
    </div>
    
  );
}

export default App;
