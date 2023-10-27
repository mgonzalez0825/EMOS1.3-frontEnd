import React, { Component } from 'react';
import EmployeeService from '../../../services/employeeService';
import { withRouter } from '../withRouter/withRouter';
import grab from '../../../services/fetchService';



class AddEmployeeDetailsComponent extends Component {
    
    constructor(props){
        super(props)
        
       
        this.state = {
           empId:this.props.params.empId,
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
            supervisor:false,
            salary:'',
            hireDate:''}
           
        
        }

       
        this.changeSsnHandler = this.changeSsnHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.changeEmployeeTypeHandler = this.changeEmployeeTypeHandler.bind(this);
        this.changePayRateHandler = this.changePayRateHandler.bind(this);
        this.changeSupervisorHandler = this.changeSupervisorHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeHireDateHandler = this.changeHireDateHandler.bind(this);
        
        this.addEmployeeDetails = this.addEmployeeDetails.bind(this);
    }

    

    componentDidMount(){
       
        EmployeeService.getEmployeeById(this.state.empId).then((res) => {
            let employee = res.data;
            this.setState({firstName:employee.firstName,lastName:employee.lastName,emailId:employee.emailId,password:employee.password,employeeDetails:
                            {ssn:employee.employeeDetails.ssn,phoneNumber:employee.employeeDetails.phoneNumber,employeeType:employee.employeeDetails.employeeType,
                            position:employee.employeeDetails.position,salary:employee.employeeDetails.salary,supervisor:employee.employeeDetails.supervisor,
                            payRate:employee.employeeDetails.payRate,hireDate:employee.employeeDetails.hireDate }});
        });
    }



    changeSsnHandler = (event) => {
        const newSsn = event.target.value;
      
        this.setState(prevState => ({
          employeeDetails: {
            ...prevState.employeeDetails,
            ssn: newSsn
          }
        }));
      }

      changePhoneNumberHandler = (event) => {
        const newPhoneNumber = event.target.value;
      
        this.setState(prevState => ({
          employeeDetails: {
            ...prevState.employeeDetails,
            phoneNumber: newPhoneNumber
          }
        }));
      }
    

    changePositionHandler = (event) => {
        const newPosition = event.target.value;
      
        this.setState(prevState => ({
          employeeDetails: {
            ...prevState.employeeDetails,
            position: newPosition
          }
        }));
      }
    
    changeSupervisorHandler = (event) => {
        const isChecked = event.target.checked;
      
        this.setState(prevState => ({
          employeeDetails: {
            ...prevState.employeeDetails,
            supervisor: isChecked
          }
        }));
      }
   
        
      changePayRateHandler = (event) => {
        const newPayRate =  event.target.value;
      
        
        this.setState(prevState => ({
          employeeDetails: {
            ...prevState.employeeDetails,
            payRate: newPayRate
          }
        }));
      }


      changeSalaryHandler = (event) => {
        const newSalary = event.target.value;
      
        this.setState(prevState => ({
          employeeDetails: {
            ...prevState.employeeDetails,
            salary: newSalary
          }
        }));
      }

      changeHireDateHandler = (event) => {
       
        const newHireDate = event.target.value;
      
        const today = new Date();
        const selectedDate = new Date(newHireDate);
        
        if (selectedDate > today){
          // Set the error message in state
            this.setState({ hireDateError: "Hire date cannot be in the future" });
        }else {
          // Clear the error message in state and update the hire date
          this.setState(prevState => ({
            employeeDetails: {
              ...prevState.employeeDetails,
              hireDate: newHireDate
            },
            hireDateError: ""
          }));
        }
        
      }
    
    

    changeEmployeeTypeHandler = (event) => {
        const newEmployeeType = event.target.value;
      
        this.setState(prevState => ({
          employeeDetails: {
            ...prevState.employeeDetails,
            employeeType: newEmployeeType
          }
        }));
      }
   
   


    validate = () => {
        const ssn_regEx = /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/g;
        const phoneNumber_regEx = /^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;
        const position_regEx = /^[a-zA-Z0-9\s\-.,()#&']+$/i;
        const payRate_regEx = /^\d+(\.\d{1,2})?$/;
        const salary_regEx = /^\d{1,9}(\.\d{1,2})?$/;
        const hireDate_regEx = /^\d{4}-\d{2}-\d{2}$/;
        ;
        
        
        
        
        
        let ssnError="";
        let phoneNumberError="";
        let positionError = "";
        let payRateError = "";
        let salaryError = "";
        let employeeTypeError = "";
        let hireDateError = "";



   

    if(!ssn_regEx.test(this.state.employeeDetails.ssn)){
            ssnError = "SSN should be three digits, a hyphen, two digits, another hyphen, and four digits!"
            
        }

    if(!phoneNumber_regEx.test(this.state.employeeDetails.phoneNumber)){
            phoneNumberError = "Please enter phone number format ,numbers only or numbers with dashes!"

        }

    if(!position_regEx.test(this.state.employeeDetails.position)){
          positionError = "Please select a job title"

      }

    if(!payRate_regEx.test(this.state.employeeDetails.payRate)){
        payRateError = "Please enter integer or decimal number with up to two digits after decimal point !"

    }

    if(!salary_regEx.test(this.state.employeeDetails.salary)){
      salaryError = "Please enter integer or decimal number with up to two digits after decimal point!"

      }
        
      

    if(!hireDate_regEx.test(this.state.employeeDetails.hireDate)){
      hireDateError = "Date must have a mm/dd/yyyy format!"
      
    }

     //if jobType is not selected prompt user to select job type 
     if (this.state.employeeDetails.employeeType === ''){
      this.setState({ employeeTypeError: "Please enter FT for full-time or PT for part-time!" });
      return;
    } else this.setState({ employeeTypeError:"" });

        
        if ( ssnError  || phoneNumberError || positionError || payRateError || salaryError || employeeTypeError || hireDateError){
            this.setState({ssnError,phoneNumberError,positionError,payRateError,hireDateError,salaryError,employeeTypeError});
            
            return false;
        }
        return true;
    };

   
 
    addEmployeeDetails = (e) => {
        
        e.preventDefault();
        const isValid = this.validate();
        

        if(isValid){
        
        
          let employeeDetails = {ssn:this.state.employeeDetails.ssn,employeeType:this.state.employeeDetails.employeeType,
                                  position:this.state.employeeDetails.position,phoneNumber:this.state.employeeDetails.phoneNumber,supervisor:this.state.employeeDetails.supervisor,
                                  salary:this.state.employeeDetails.salary,payRate:this.state.employeeDetails.payRate,hireDate:this.state.employeeDetails.hireDate}
         
        console.log("employee => " + JSON.stringify(employeeDetails));

            grab(`/api/v1/employees/add-details/${this.state.empId}`,"PUT", this.jwt, employeeDetails).then(res =>{
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
                        <h3 className='text-center'> Add Employee Details </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> SSN </label>
                                    <input type="text" name="ssn"  placeholder='xxx-xx-xxxx'  className='form-control'
                                        value={this.state.employeeDetails.ssn} onChange={this.changeSsnHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.ssnError}</div>
                                 <div className='form-group'>   
                                    <label> Position </label>
                                    <input placeholder='position' name='position'  type='text' className='form-control'
                                        value={this.state.employeeDetails.position} onChange={this.changePositionHandler}/>
                                </div>
                                <div style={{fontSize:12,color:"red"}}>{this.state.positionError}</div>
                                <div className='form-group'>   
                                    <label> Phone Number </label>
                                    <input placeholder='phone'  type="tel" name="phone" className='form-control'
                                        value={this.state.employeeDetails.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.phoneNumberError}</div>
                               
                                <div className='form-group'>   
                                    <label> <input type="checkbox" name="isSupervisor" 
                                        value={this.state.employeeDetails.supervisor} onClick={this.changeSupervisorHandler}
                                        checked={this.state.employeeDetails.supervisor}/>
                                              Check box if  {this.state.firstName} is an Admin. 
                                    </label>
                                        
                                </div>
                                <div className='form-group'>
                                <label> Employee Status:</label>  
                                    <select className='form-select' type='text' value={this.state.employeeDetails.employeeType} onChange={this.changeEmployeeTypeHandler}>
                                        <option value="">Select FT for Full-Time or PT for Part-Time </option>
                                        <option >{"FT"}</option>
                                        <option >{"PT"}</option>
                                      
                                    </select>
                                </div>
                                <div style={{fontSize:12,color:"red"}}>{this.state.employeeTypeError}</div> 
                                {/* <div className='form-group'>
                                    <label> Employee Type </label>
                                    <input placeholder='FT for FullTime PT for PartTime' name='employeeType' type='text' className='form-control'
                                        value={this.state.employeeDetails.employeeType} onChange={this.changeEmployeeTypeHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.employeeTypeError}</div> */}
                                <div className='form-group'>
                                    <label> Pay Rate </label>
                                    <input placeholder='hourly rate' name='payRate' type='number' step="0.01" className='form-control'
                                        value={this.state.employeeDetails.payRate} onChange={this.changePayRateHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.payRateError}</div>
                                <div className='form-group'>
                                    <label> Salary </label>
                                    <input placeholder='annual salary' name='salary' type='number' className='form-control'
                                        value={this.state.employeeDetails.salary} onChange={this.changeSalaryHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.salaryError}</div>
                                <div className='form-group'>
                                    <label> Hire Date </label>
                                    <input type = 'date'  className='form-control'
                                        value={this.state.employeeDetails.hireDate} onChange={this.changeHireDateHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.hireDateError}</div>
                                
                                
                                <div className='form-group'>
                                <button type="button" className='btn btn-success' onClick={this.addEmployeeDetails}> Save </button>  
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
    
    

export default withRouter(AddEmployeeDetailsComponent);






    

