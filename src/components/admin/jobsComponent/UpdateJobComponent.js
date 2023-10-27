import React, { Component } from 'react';
import jobsService from '../../../services/jobsService';
import departmentService from '../../../services/departmentService';
import { withRouter } from '../withRouter/withRouter';
import grab from '../../../services/fetchService';

class UpdateJobComponent extends Component {
   
    constructor(props){
        const jwt = localStorage.getItem("jwt");
        super(props)
    
        this.state = {
            jobId:this.props.params.jobId,
            departments:[],
            jobTitle : '',
            jobType :'',
            jobPayRange : '',
            jobDescription:'',
            department: {deptNo:''}

        }


        this.changeJobTitleHandler = this.changeJobTitleHandler.bind(this);
        this.changeJobTypeHandler = this.changeJobTypeHandler.bind(this);
        this.changeJobPayRangeHandler = this.changeJobPayRangeHandler.bind(this);
        this.changeJobDescriptionHandler = this.changeJobDescriptionHandler.bind(this);
        this.changeDeptNoHandler = this.changeDeptNoHandler.bind(this);
        this.saveJob = this.saveJob.bind(this);
    }

    componentDidMount(){
       
            jobsService.getJobById(this.state.jobId).then((res) => {
                let job = res.data;
                this.setState({jobTitle:job.jobTitle, jobType:job.jobType, jobPayRange:job.jobPayRange,jobDescription:job.jobDescription});
                
            });
    
            departmentService.getAllDepartments().then((res) => {
                this.setState({departments: res.data});
                
            });
        }
        

    changeJobTitleHandler = (event) => {
        this.setState({jobTitle:event.target.value});
    }

    changeJobTypeHandler = (event) => {
        this.setState({jobType:event.target.value});
    }

    changeJobPayRangeHandler = (event) => {
        this.setState({jobPayRange:event.target.value});
    }

    changeJobDescriptionHandler = (event) => {
        this.setState({jobDescription:event.target.value});
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
        const job_Title_regEx = /^[a-zA-Z\s]+$/;
        const job_Pay_Range_regEx = /^\$?(\d{1,3}(,\d{3})*(\.\d+)?)\s*(k|K|thousand|million|m|billion|B)?\s*-\s*\$?(\d{1,3}(,\d{3})*(\.\d+)?)\s*(k|K|thousand|million|m|billion|B)?$/;
        const job_Description_regEx = /^[a-zA-Z0-9\s.,:;!?"'()-]*$/;
       
        
        let jobTitleError="";
        let jobTypeError="";
        let jobPayRangeError="";
        let jobDescriptionError="";
        let deptNoError = "";

        if(!job_Title_regEx.test(this.state.jobTitle)){
            jobTitleError = "Job title should not contain any numbers or special characters! ";
        };

        

        if(!job_Description_regEx.test(this.state.jobDescription)){
            jobDescriptionError = "Job description has invalid characters!"

        }

        if(!job_Pay_Range_regEx.test(this.state.jobPayRange)){
            jobPayRangeError = "Should be in the form $50,000 - $75,000 or 50k-75K!"

        }

        //if department is not selected prompt user to select department 
        if (this.state.department.deptNo === ''){
            this.setState({ deptNoError: "Please select a department" });
            return;
        } else this.setState({ deptNoError: "" });


         //if jobType is not selected prompt user to select job type 
         if (this.state.jobType === ''){
            this.setState({ jobTypeError: "Please select a job status" });
            return;
        } else this.setState({ jobTypeError:"" });
        
        
        if (jobTitleError || jobDescriptionError || jobTypeError || jobPayRangeError || deptNoError){
            this.setState({jobTitleError,jobTypeError, jobDescriptionError, jobPayRangeError,deptNoError});
            
            return false;
        }
        return true;
    };
   

    saveJob = (e) => {
        
        e.preventDefault();
        const isValid = this.validate();
        

        if (this.state.departments.length === 0) {
            // If there are no departments, show an error message and do not submit the form
            this.setState({ deptNoError: "There are not departments available. Please create a department first." });
            return;
        }


        if(isValid){
        
        let job = {jobTitle:this.state.jobTitle, jobType:this.state.jobType, jobPayRange:this.state.jobPayRange,jobDescription:this.state.jobDescription,department:this.state.department};
        console.log("job => " + JSON.stringify(job));



        grab(`/api/v1/jobs/${this.state.jobId}`,"PUT", this.jwt, job).then(res =>{
            this.props.navigate('/admin/jobs');
        })
        } 
     }


     cancel = (e) => {
        this.props.navigate('/admin/jobs')
    }


    render() {
        return (
            <div className ="container">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'> Edit Job</h3>
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
                                    <label> Job Title </label>
                                    <input placeholder='Job Title' name='jobTitle' className='form-control'
                                        value={this.state.jobTitle} onChange={this.changeJobTitleHandler}/>
                                </div>
                                <div className='form-group' style={{fontSize:12,color:"red"}}>{this.state.jobTitleError}</div>
                                
                                <div className='form-group'>
                                <label> Job Type:</label>  
                                    <select className='form-select' type='text' value={this.state.jobType} onChange={this.changeJobTypeHandler}>
                                        <option value="">Select FT for Full-Time or PT for Part-Time </option>
                                        <option >{"FT"}</option>
                                        <option >{"PT"}</option>
                                      
                                    </select>
                                </div>
                                <div style={{fontSize:12,color:"red"}}>{this.state.jobTypeError}</div> 
                                 
                                <div className='form-group'>   
                                    <label> Pay Range </label>
                                    <input placeholder='annual salary pay range' name='payRange' className='form-control'
                                        value={this.state.jobPayRange} onChange={this.changeJobPayRangeHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.jobPayRangeError}</div>
                                <div className='form-group'>   
                                    <label> Job Desription </label>
                                    <input placeholder='enter job description' name='jobDescription' className='form-control'
                                        value={this.state.jobDescription} onChange={this.changeJobDescriptionHandler}/>
                                </div>
                                <div className='form-group'style={{fontSize:12,color:"red"}}>{this.state.jobDescriptionError}</div>
                                
                                <div className='form-group'>
                                <button type="button" className='btn btn-success' onClick={this.saveJob}> Save </button>  
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

export default withRouter(UpdateJobComponent);