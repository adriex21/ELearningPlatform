import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './Pages/Register/Register'
import LandingPage from './Pages/FirstPage/LandingPage';
import Login from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Guard from './Guard/Guard';
import GuardAuthenticated from './Guard/GuardAuthenticated';
import AssignmentTeacher from './Components/Assignments/AssignmentTeacher';
import CreateAssignment from './Components/Assignments/CreateAssignment';
import EditAssignment from './Components/Assignments/EditAssignment';
import Submission from './Components/Submissions/Submission';
import ViewSubmissions from './Components/Submissions/ViewSubmissions';
import GradeSubmission from './Components/Submissions/GradeSubmission'
import AssignmentsPage from './Pages/Assignments/AssignmentsPage';
import Courses from './Pages/Courses/Courses';
import ViewCourse from './Components/Courses/ViewCourse';
import CreateCourse from './Components/Courses/CreateCourse';
import CreateModule from './Components/Modules/CreateModule';
import ViewModule from './Components/Modules/ViewModule';


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
            element={<Guard><Submission/></Guard>}
             />
             <Route
             path="/createAssignment"
             element={<Guard><CreateAssignment/> </Guard>}
              />
              <Route
              path="/editAssignment/:assignment_id"
              element={<Guard><EditAssignment/></Guard>}
               />
               <Route
               path="/viewSubmissions/:assignment_id" 
               element={<Guard><ViewSubmissions/></Guard>}
               />
               <Route
               path='/grade/:submission_id'
               element={<Guard> <GradeSubmission/> </Guard>}
               />
               <Route
               path='/assignments'
               element={<Guard><AssignmentsPage/></Guard>}
               />
               <Route
               path='/courses'
               element={<Guard><Courses/></Guard>}
               />
               <Route
               path="/viewCourse/:course_id"
               element={<Guard><ViewCourse/></Guard>}
               />
               <Route
               path="/createCourse"
               element={<Guard><CreateCourse/></Guard>}
               /> <Route
               path="/createModule/:course_id"
               element={<Guard><CreateModule/></Guard>}
               />
               <Route
               path='/viewModule'
               element={<Guard><ViewModule/></Guard>}
               />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
