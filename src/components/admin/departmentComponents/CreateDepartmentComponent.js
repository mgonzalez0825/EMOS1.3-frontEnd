import React, { Component } from 'react';
import grab from '../../../services/fetchService';
import { withRouter } from '../withRouter/withRouter';

class  CreateDepartmentComponent extends Component {
    constructor(props){
        const jwt = localStorage.getItem("jwt");
        super(props)
    
        this.state = {
          
           deptName : '',
           parentDept :'',
           location : '',
           managerNo: '',
        

        }

        this.changeDeptNameHandler = this.changeDeptNameHandler.bind(this);
        this.changeParentDeptHandler = this.changeParentDeptHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeManagerNoHandler = this.changeManagerNoHandler.bind(this);
        this.saveDept = this.saveDept.bind(this);
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

    
    //validation function for user input user regex expressions

    validate = () => {
        const regEx = /^[a-zA-Z ]{2,25}$/;
        const parentDept_regEx = /^[a-zA-Z ]{2,25}$/;
        const location_regEx = /^[a-zA-Z ]{2,25}$/;
        const managerNo_regEx = /^[0-9]+$/;
       
        
        
        let deptNameError="";
        let parentDeptError="";
        let locationError="";
        let managerNoError="";
        
        if(!regEx.test(this.state.deptName)){
            deptNameError = "Department name should be 2-25 characters and should not contain special characters or numbers!"
        };

        if(!parentDept_regEx.test(this.state.parentDept)){
            parentDeptError = "Parent department should be 2-25 characters and should not contain special characters or numbers!"
        };

        if(!location_regEx.test(this.state.location)){
            locationError = "Location should be 2-25 characters and should not contain special characters or numbers!"

        };

        if(!managerNo_regEx.test(this.state.managerNo)){
            managerNoError = "Department manager employee id should be a number"

        }

       
        
        if (deptNameError || parentDeptError || locationError || managerNoError){
            this.setState({deptNameError,parentDeptError, locationError, managerNoError});
            
            return false;
        }
        return true;
    };

    changeJwtHandler = (jwt) => {
        this.setState({jwt: jwt});
    }

    saveDept = (e) => {

        e.preventDefault();
        const isValid = this.validate();
        

        if(isValid){
        
        let department = {deptName:this.state.deptName, parentDept:this.state.parentDept, location:this.state.location,managerNo:this.state.managerNo,employees:this.state.employees};
        console.log("department => " + JSON.stringify(department));

        grab("/api/v1/departments","POST", this.jwt, department).then(department =>{
            this.props.navigate('/admin/departments');
        });
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
                        <h3 className='text-center'> Add New Department</h3>
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
                               
                                <div className='form-group'>
                                <button type="button" className='btn btn-success' onClick={this.saveDept}> Save </button>  
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


export default withRouter(CreateDepartmentComponent);