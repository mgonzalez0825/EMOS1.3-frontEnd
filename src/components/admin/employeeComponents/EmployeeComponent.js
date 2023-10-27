import React, { Component } from 'react';
import EmployeeService from '../../../services/employeeService';
import { withRouter } from '../withRouter/withRouter';


class EmployeeComponent extends Component {
   constructor(props){
    super(props)

    this.state = {
        employees : []
    }

    this.addEmployee = this.addEmployee.bind(this);
   
    this.addEmployeeDetails = this.addEmployeeDetails.bind(this);

   this.editEmployee = this.editEmployee.bind(this);

   this.deleteEmployee = this.deleteEmployee.bind(this);

   this.viewEmployee = this.viewEmployee.bind(this);
    
}
   
editEmployee(empId){
    this.props.navigate(`/admin/employees/update-employee/${empId}`);
}

addEmployeeDetails(empId){
    this.props.navigate(`/admin/employees/add-employee-details/${empId}`);
}

deleteEmployee(empId){
    
    
    if (window.confirm("Are you sure you want to delete this employee, all the info will be lost?")){
    EmployeeService.deleteEmployee(empId).then( res => {
        this.setState({employees:this.state.employees.filter(employee => employee.empId !== empId)});
    
});
}
}

viewEmployee(empId){
    this.props.navigate(`/admin/employees/view-employee/${empId}`);
}



   componentDidMount(){
        EmployeeService.getAllEmployees().then((res) => {
            this.setState({employees: res.data});
            return console.log(this.state.employees)
        });
    }

    addEmployee(){
        this.props.navigate('/admin/employees/add-employee');
    }

    
    
    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>

                    <button type="button" className="btn btn-primary" onClick={this.addEmployee}>Add Employee +</button> 
             
                <div className='row'>
                      <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th> Name</th>
                                <th> Email address </th>
                                <th> Department Name</th>
                                <th> Position</th>
                                <th>Employee Status</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                employee => 
                                 <tr  key = {employee.empId }> 
                                    <td> {employee.firstName + " " + employee.lastName} </td>
                                    <td> {employee.emailId} </td>
                                    <td>{employee.deptName}</td>
                                    <td> {employee.employeeDetails.position} </td>
                                    <td> {employee.employeeDetails.employeeType} </td>
                                    <td> <div className="mb-2">
                                         <button type="button" className="btn btn-info flex-shrink-1 mx-1" onClick={() => this.editEmployee(employee.empId)}> Edit </button>{ " "}
                                         <button type="button" className="btn btn-info flex-shrink-1 mx-1" onClick={() => this.addEmployeeDetails(employee.empId)}> Add Info+ </button>{ " "}
                                         <button type="button" className="btn btn-info flex-shrink-1 mx-1" onClick={() => this.viewEmployee(employee.empId)}> View Employee </button>{ " "}
                                          <button type="button" className="btn btn-danger flex-shrink-1 mx-1" onClick={() => this.deleteEmployee(employee.empId)}> Delete </button> 
                                        </div>
                                    </td>
                                </tr>
                                )
                           } 
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(EmployeeComponent);