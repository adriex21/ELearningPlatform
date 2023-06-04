import './App.css';
import CodeEditor from './Components/CodeEditor/CodeEditor';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Register from './Pages/Register/Register'
import LandingPage from './Pages/FirstPage/LandingPage';
import Login from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Guard from './Guard/Guard';
import GuardAuthenticated from './Guard/GuardAuthenticated';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<GuardAuthenticated><LandingPage /></GuardAuthenticated>}
          />
          <Route
            path="/signup"
            element={<GuardAuthenticated><Register/></GuardAuthenticated>}
          />
          <Route
            path="/login"
            element={<GuardAuthenticated><Login/></GuardAuthenticated>}
          />
          <Route
            path="/dashboard"
            element={<Guard><Dashboard/></Guard>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
