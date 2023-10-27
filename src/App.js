

import './App.css';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom';

import EmployeeComponent from './components/admin/employeeComponents/EmployeeComponent';
import HeaderComponent from './components/admin/HeaderComponent';
import FooterComponent from './components/admin/FooterComponent';
import DashboardComponent from './components/admin/dashboardComponents/DashboardComponent';
import DepartmentComponent from './components/admin/departmentComponents/DepartmentComponent'
import CreateJobComponent from './components/admin/jobsComponent/CreateJobComponent';
import JobsComponent from './components/admin/jobsComponent/JobsComponent';
import UpdateJobComponent from './components/admin/jobsComponent/UpdateJobComponent';
import ViewJobComponent from './components/admin/jobsComponent/ViewJobComponent';
import UpdateEmployeeComponent from './components/admin/employeeComponents/UpdateEmployeeComponent';
import CreateEmployeeComponent from './components/admin/employeeComponents/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/admin/employeeComponents/ViewEmployeeComponent';
import CreateDepartmentComponent from './components/admin/departmentComponents/CreateDepartmentComponent';
import UpdateDepartmentComponent from './components/admin/departmentComponents/UpdateDepartmentComponent';
import ViewDepartmentComponent from './components/admin/departmentComponents/ViewDepartmentComponent';
import AddEmployeeDetailsComponent from './components/admin/employeeComponents/AddEmployeeDetailsComponent';
import AddEventComponentDash from './components/admin/dashboardComponents/AddEventComponentDash';
import EditEventComponent from './components/admin/schedulerComponents/EditEventComponent';
import EditEventComponentDash from './components/admin/dashboardComponents/EditEventComponentDash';

import SchedulerComponent from './components/admin/schedulerComponents/schedulerComponent';
import AddEventComponent from './components/admin/schedulerComponents/AddEventComponent';
import SignOutComponent from './components/login/SignOutComponent';


//import EmployeeHeaderComponent from './components/employee/EmployeeHeaderComponent'
//import EmployeeDashboardComponent from './components/employee/dashboardComponents/EmployeeDashboardComponent';

import LoginComponent from './components/login/LoginComponent';
import PrivateRoute from './components/login/PrivateRoute';
import { useLocalState } from './util/useLocalStorage';
//import jwt_decode from "jwt-decode";


  //const [roles, setRoles] = useState(getRolesFromJWT());

 /* function getRolesFromJWT() {
    if(jwt){
      const decodedJwt = jwt_decode(jwt);
      return decodedJwt.authorities;
    }
      return [];
  }*/


  function ProtectedRoutes(){
    return (
      <div>
        
          <div className='container'>
            <HeaderComponent/>
              <div className="container">
                <Routes>
                   <Route path = '/dashboard' element = {<PrivateRoute><DashboardComponent/></PrivateRoute>}></Route>
                   <Route path = '/dashboard/add-event' element = {<PrivateRoute><AddEventComponentDash/></PrivateRoute>}></Route>
                   <Route path = '/departments' element = {<PrivateRoute><DepartmentComponent/></PrivateRoute>}></Route>
                   <Route path = '/departments/add-department' element = {<PrivateRoute><CreateDepartmentComponent/></PrivateRoute>}></Route>
                   <Route path = '/departments/update-department/:deptNo' element = {<PrivateRoute><UpdateDepartmentComponent/></PrivateRoute>}></Route>
                   <Route path = '/departments/view-department/:deptNo' element = {<PrivateRoute><ViewDepartmentComponent/></PrivateRoute>}></Route>
                   <Route path = '/jobs' element = {<PrivateRoute><JobsComponent/></PrivateRoute>}></Route>
                   <Route path = '/jobs/add-job' element = {<PrivateRoute><CreateJobComponent/></PrivateRoute>}></Route>
                   <Route path = '/jobs/update-job/:jobId' element = {<PrivateRoute><UpdateJobComponent/></PrivateRoute>}></Route>
                   <Route path = '/jobs/view-job/:jobId' element = {<PrivateRoute><ViewJobComponent/></PrivateRoute>}></Route>
                   <Route path = '/employees' element = {<PrivateRoute><EmployeeComponent/></PrivateRoute>}></Route>
                   <Route path = '/employees/add-employee' element = {<PrivateRoute><CreateEmployeeComponent/></PrivateRoute>}></Route>
                   <Route path = '/employees/update-employee/:empId' element = {<PrivateRoute><UpdateEmployeeComponent/></PrivateRoute>}></Route>
                   <Route path = '/employees/view-employee/:empId' element = {<PrivateRoute><ViewEmployeeComponent/></PrivateRoute>}></Route>
                   <Route path = '/employees/add-employee-details/:empId' element = {<PrivateRoute><AddEmployeeDetailsComponent/></PrivateRoute>}></Route>
                   <Route path = '/scheduler' element = {<PrivateRoute><SchedulerComponent/></PrivateRoute>}></Route>
                   <Route path = '/scheduler/add-event' element = {<PrivateRoute><AddEventComponent/></PrivateRoute>}></Route>
                   <Route path = '/scheduler/edit-event/:eventId' element = {<PrivateRoute><EditEventComponent/></PrivateRoute>}></Route>
                 <Route path = '/dashboard/edit-event/:eventId' element = {<PrivateRoute><EditEventComponentDash/></PrivateRoute>}></Route>
              </Routes>
                    
              </div>
            <FooterComponent/>
          </div>
        
        </div>
    )
    }
    
    function App() {
      const [jwt, setJwt] = useLocalState("","jwt");

      return (
        <div>
          <Router>
                 <Routes>
                 <Route path = '/' element = {<LoginComponent/>}></Route>
                  <Route path = 'login' element = {<LoginComponent/>}></Route>
                  <Route path = 'sign-out' element = {<SignOutComponent/>}></Route>
                  <Route path = 'admin/*' element = {<ProtectedRoutes/>}></Route>
                </Routes>
                <FooterComponent/>
          </Router>
        </div>
      );
    }



export default App;
