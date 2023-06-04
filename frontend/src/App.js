import './App.css';
import { useState, useEffect } from 'react';
import CodeEditor from './Components/CodeEditor/CodeEditor';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Register from './Pages/Register/Register'
import LandingPage from './Pages/FirstPage/LandingPage';
import Login from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import axios from 'axios';


const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  return !!token;
};

const initialData = {
  loggedin: false,
  userData: {}
}

function App() {

  const [data, setData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() =>  {
    const checkAuthentication = async () => {
      if (isAuthenticated()) {
        setAuthenticated(true);
        const response = axios.get('http://localhost:3000/api/user/getUser', {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      try {
        const received = await response.json();
              if(received.msg === "User doesn't exist") return setData(initialData)
              return setData({loggedin: true, userData: received})
      } catch(error) {
          console.log("ERROR" + error)
      }
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Navigate to="/dashboard" /> : <LandingPage />}
          />
          <Route
            path="/signup"
            element={!authenticated ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!authenticated ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={authenticated ? <Dashboard data={data} /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
