import React, { Component } from 'react';
import departmentService from '../../../services/departmentService';
import grab from '../../../services/fetchService';
import { withRouter } from '../withRouter/withRouter';

class  UpdateDepartmentComponent extends Component {
    constructor(props){
        const jwt = localStorage.getItem("jwt");
        super(props)
    
        this.state = {
          
            deptNo:this.props.params.deptNo,
            deptName : '',
           parentDept :'',
           location : '',
           managerNo: '',
        

        }

        this.changeDeptNameHandler = this.changeDeptNameHandler.bind(this);
        this.changeParentDeptHandler = this.changeParentDeptHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeManagerNoHandler = this.changeManagerNoHandler.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
    }


    componentDidMount(){
       
        departmentService.getDepartmentById(this.state.deptNo).then((res) => {
            let department = res.data;
            this.setState({deptName:department.deptName, parentDept:department.parentDept,location:department.location,managerNo:department.managerNo});
            
        });
    }

    changeDeptNameHandler = (event) => {
        this.setState({deptName:event.target.value});
    }

    changeParentDeptHandler = (event) => {
        this.setState({parentDept:event.target.value});
    }

    changeLocationHandler = (event) => {
        this.setState({location:event.target.value});
    }

    changeManagerNoHandler = (event) => {
        this.setState({managerNo:event.target.value});
    }


    

    validate = () => {
        const regEx = /^[a-zA-Z ]{2,18}$/;
        const parentDept_regEx = /^[a-zA-Z ]{2,18}$/;
        const location_regEx = /^[a-zA-Z ]{2,18}$/;
        const managerNo_regEx = /^[0-9]+$/;
        // const phoneNumber_regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g;
        
        
        let deptNameError="";
        let parentDeptError="";
        let locationError="";
        let managerNoError="";
        
        if(!regEx.test(this.state.deptName)){
            deptNameError = "Department name should be 2-18 characters and should not contain special characters or numbers!"
        };

        if(!parentDept_regEx.test(this.state.parentDept)){
            parentDeptError = "Parent department should be 2-18 characters and should not contain special characters or numbers!"
        };

        if(!location_regEx.test(this.state.location)){
            locationError = "Location should be 2-18 characters and should not contain special characters or numbers!"

        };

        if(!managerNo_regEx.test(this.state.managerNo)){
            managerNoError = "Department manager employee id should be a number"

        }

        // if(!phoneNumber_regEx.test(this.state.phoneNumber)){
        //     phoneNumberError = "Phone number should be 10 digits long, should not contain lines or spaces"

        // }
        
        if (deptNameError || parentDeptError || locationError || managerNoError){
            this.setState({deptNameError,parentDeptError, locationError, managerNoError});
            
            return false;
        }
        return true;
    };


    updateDepartment = (e) => {
        
        e.preventDefault();
        const isValid = this.validate();
        

        if(isValid){
        
        let department = {deptName:this.state.deptName, parentDept:this.state.parentDept, location:this.state.location,managerNo:this.state.managerNo};
        console.log("department => " + JSON.stringify(department));

        grab(`/api/v1/departments/${this.state.deptNo}`,"PUT", this.jwt, department).then(res =>{
            this.props.navigate('/admin/departments');
        })

        } ;
     };


    cancel = (e) => {
        this.props.navigate('/admin/departments')
    }

   
    render() {
       
       return (
            <div className ="container">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'> Edit Department</h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> Department Name </label>
                                    <input placeholder='Department Name' name='deptName' className='form-control'
                                        value={this.state.deptName} onChange={this.changeDeptNameHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.deptNameError}</div>
                                 <div className='form-group'>   
                                    <label> Parent Department </label>
                                    <input placeholder='Department supervising this dept' name='parentDept' className='form-control'
                                        value={this.state.parentDept} onChange={this.changeParentDeptHandler}/>
                                </div>
                                <div style={{fontSize:12,color:"red"}}>{this.state.parentDeptError}</div>
                                <div className='form-group'>   
                                    <label> Location </label>
                                    <input placeholder='City where department is located ' name='mail' className='form-control'
                                        value={this.state.location} onChange={this.changeLocationHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.locationError}</div>
                                <div className='form-group'>   
                                    <label> Department Manager ID </label>
                                    <input placeholder='managerNo' id="inputmanagerNo" type="managerNo" name='managerNo' className='form-control'
                                        value={this.state.managerNo} onChange={this.changeManagerNoHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.managerNoError}</div>
                                {/* <div className='form-group'>   
                                    <label> Phone Number </label>
                                    <input placeholder='Phone' type="phone" name='Phone' className='form-control'
                                        value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.phoneNumberError}</div> */}
                                <div className='form-group'>
                                <button type="button" className='btn btn-success' onClick={this.updateDepartment}> Save </button>  
                                <button type="button" className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}> Return </button>
                                </div>
                                {/* <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}> Cancel </button>   */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(UpdateDepartmentComponent);