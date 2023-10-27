import React, { Component } from 'react';
import employeeService from '../../../services/employeeService';
import { withRouter } from '../withRouter/withRouter';
import departmentService from '../../../services/departmentService';
import grab from '../../../services/fetchService';


class CreateEmployeeComponent extends Component {
    constructor(props){
        const jwt = localStorage.getItem("jwt");
        super(props)
    
        this.state = {
            departments:[],
            firstName : '',
            lastName :'',
            emailId : '',
            password:'',
            employeeDetails:{ 
                ssn:'',
                phoneNumber:'',
                position:'',
                employeeType:'',
                payRate:'',
                supervisor:'false',
                salary:'',
                hireDate:''},
            department: {deptNo:''}

        }

       

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeDeptNoHandler = this.changeDeptNoHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount(){
        departmentService.getAllDepartments().then((res) => {
            this.setState({departments: res.data});
            
        });
    }


    
    changeFirstNameHandler = (event) => {
        this.setState({firstName:event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName:event.target.value});
    }

    changeEmailIdHandler = (event) => {
        this.setState({emailId:event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password:event.target.value});
    }

       changeDeptNoHandler = (event) => {
        const selectedDeptNo = event.target.value;
    
        this.setState({
                department: {
                    ...this.state.department,
                    deptNo: selectedDeptNo,
        }
    })
    }

    

    

    validate = () => {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        const firstName_regEx = /^[a-zA-Z]{2,25}$/g;
        const lastName_regEx = /^[a-zA-Z]{2,25}$/g;
        const password_regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g;
       
        
        let firstNameError="";
        let lastNameError="";
        let emailIdError="";
        let passwordError="";
        let phoneNumberError = "";
        let deptNoError = "";

        if(!regEx.test(this.state.emailId)){
            emailIdError = "Invalid email";
        };

        if(!firstName_regEx.test(this.state.firstName)){
            firstNameError = "First Name should be 2-25 characters and should not contain special characters or numbers!"

        }

        if(!lastName_regEx.test(this.state.lastName)){
            lastNameError = "Last Name should be 2-25 characters and should not contain special characters or numbers!"

        }

        if(!password_regEx.test(this.state.password)){
            passwordError = "Password should be 8-15 characters,contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric digit,and 1 special character!"

        }

        //if department is not selected prompt user to select department 
        if (this.state.department.deptNo === ''){
            this.setState({ deptNoError: "Please select a department" });
            return;
        } else this.setState({ deptNoError: "" });
        
        
        if (emailIdError || firstNameError || lastNameError || passwordError || phoneNumberError || deptNoError){
            this.setState({firstNameError,lastNameError, emailIdError, passwordError,phoneNumberError,deptNoError});
            
            return false;
        }
        return true;
    };

   
    saveEmployee = (e) => {
        
        e.preventDefault();
        const isValid = this.validate();
        

        if (this.state.departments.length === 0) {
            // If there are no departments, show an error message and do not submit the form
            this.setState({ deptNoError: "There are not departments available. Please create a department first." });
            return;
        }


        if(isValid){
        
        let employee = {firstName:this.state.firstName, lastName:this.state.lastName, emailId:this.state.emailId,password:this.state.password,employeeDetails:this.state.employeeDetails,department:this.state.department};//this.state.phoneNumber
        console.log("employee => " + JSON.stringify(employee));


        grab("/api/v1/employees","POST", this.jwt, employee).then(employee =>{
            this.props.navigate('/admin/employees');
        })
        } 
     }


    cancel = (e) => {
        this.props.navigate('/admin/employees')
    }
    
    render() {
        return (
            <div className ="container">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'> Add New Employee</h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                <label> Department:</label>  
                                    <select className='form-select' type='text' value={this.state.department.deptNo} onChange={this.changeDeptNoHandler}>
                                        <option value="">Select a department </option>
                                        {this.state.departments.map((department) => (
                                        <option key={department.deptNo} value={department.deptNo}>{department.deptName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.deptNoError}</div>

                                <div className='form-group'>
                                    <label> First Name </label>
                                    <input placeholder='First Name' name='firstName' className='form-control'
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.firstNameError}</div>
                                 <div className='form-group'>   
                                    <label> Last Name </label>
                                    <input placeholder='Last Name' name='lastName' className='form-control'
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                </div>
                                <div style={{fontSize:12,color:"red"}}>{this.state.lastNameError}</div>
                                <div className='form-group'>   
                                    <label> Email Address </label>
                                    <input placeholder='Email ' type="email" name='Email' className='form-control'
                                        value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.emailIdError}</div>
                                <div className='form-group'>   
                                    <label> Password </label>
                                    <input placeholder='Password' id="inputPassword" type="password" name='Password' className='form-control'
                                        value={this.state.password} onChange={this.changePasswordHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.passwordError}</div>
                                
                                <div className='form-group'>
                                <button type="button" className='btn btn-success' onClick={this.saveEmployee}> Save </button>  
                                <button type="button" className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}> Return </button>
                                </div>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateEmployeeComponent);