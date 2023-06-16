import './App.css';
import CodeEditor from './Components/CodeEditor/CodeEditor';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Register from './Pages/Register/Register'
import LandingPage from './Pages/FirstPage/LandingPage';
import Login from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Guard from './Guard/Guard';
import GuardAuthenticated from './Guard/GuardAuthenticated';
import AssignmentTeacher from './Components/Assignments/AssignmentTeacher';
import AssignmentStudent from './Components/Assignments/AssignmentStudent';
import CreateAssignment from './Components/Assignments/CreateAssignment';


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
          <Route 
            path="/view/:assignment_id"
            element={<Guard><AssignmentTeacher/></Guard>}
             />
             <Route 
            path="/submission/:assignment_id"
            element={<Guard><AssignmentStudent/></Guard>}
             />
             <Route
             path="/createAssignment"
             element={<Guard><CreateAssignment/> </Guard>}
              />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
