import React, { Component } from 'react';
import DepartmentService from '../../../services/departmentService';
import { withRouter } from '../withRouter/withRouter';

class DepartmentComponent extends Component {
    
        constructor(props){
         super(props)
     
         this.state = {
             departments : []
         }
     
        
         this.addDepartment = this.addDepartment.bind(this);
        
     
        this.editDepartment = this.editDepartment.bind(this);
     
        this.deleteDepartment = this.deleteDepartment.bind(this);
     
        this.viewDepartment = this.viewDepartment.bind(this);
         
     }


     viewDepartment(deptNo){
        this.props.navigate(`/admin/departments/view-department/${deptNo}`);
    }

     editDepartment(deptNo){
        this.props.navigate(`/admin/departments/update-department/${deptNo}`);
    }

     deleteDepartment(deptNo){
        
        if (window.confirm("Are you sure you want to delete this department , all associated employees will be deleted !!!")){
        DepartmentService.deleteDepartment(deptNo).then( res => {
            this.setState({departments:this.state.departments.filter(department => department.deptNo !== deptNo)});
        
        });
    }
    }

    addDepartment(){
        this.props.navigate('/admin/departments/add-department');
    }

     componentDidMount(){
        DepartmentService.getAllDepartments().then((res) => {
            this.setState({departments: res.data});
        });
    }

    
   
    render() {
        return (
            <div>
                <h2 className="text-center">Department List</h2>

                    <button type="button" className="btn btn-primary" onClick={this.addDepartment}>Add Department +</button> 
             
                <div className='row'>
                      <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th> DEPARTMENT ID</th>
                                <th> DEPARTMENT NAME</th>
                                <th> HEAD DEPARTMENT </th>
                                <th> LOCATION</th>
                                <th> DEPARTMENT MANAGER ID </th>
                                <th> ACTIONS </th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.departments.map(
                                department => 
                                 <tr  key = {department.deptNo }>
                                    <td> {department.deptNo} </td>
                                    <td> {department.deptName} </td>
                                    <td> {department.parentDept} </td>
                                    <td> {department.location} </td>
                                    <td>{department.managerNo}</td>
                                    <td> <div className="mb-2">
                                         <button type="button" className="btn btn-info" onClick={() => this.editDepartment(department.deptNo)}> Edit </button>{ " "}
                                         <button type="button" className="btn btn-info" onClick={() => this.viewDepartment(department.deptNo)}> View Dept </button>{ " "}
                                          <button type="button" className="btn btn-danger" onClick={() => this.deleteDepartment(department.deptNo)}> Delete </button> 
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
};


export default withRouter(DepartmentComponent);