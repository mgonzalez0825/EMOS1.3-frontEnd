import React, { Component } from 'react';
import { withRouter } from '../withRouter/withRouter';
import JobsService from '../../../services/jobsService';

class JobsComponent extends Component {
    
    constructor(props){
        super(props)
    
        this.state = {
            jobs : []
        }
    
        this.addJob = this.addJob.bind(this);
    
       this.editJob = this.editJob.bind(this);
    
       this.deleteJob = this.deleteJob.bind(this);
    
       this.viewJob = this.viewJob.bind(this);
        
    }
    
    viewJob(jobId){
        this.props.navigate(`/admin/jobs/view-job/${jobId}`);
    }

    editJob(jobId){
        this.props.navigate(`/admin/jobs/update-job/${jobId}`);
    }

    deleteJob(jobId){
    
        if (window.confirm("Are you sure you want to delete this job, all the info will be lost?")){
        JobsService.deleteJob(jobId).then( res => {
            this.setState({jobs:this.state.jobs.filter(job => job.jobId !== jobId)});
        
    });
    }
    }

    componentDidMount(){
        JobsService.getAllJobs().then((res) => {
            this.setState({jobs: res.data});
            return console.log(this.state.jobs)
        });
    }

    addJob(){
        this.props.navigate('/admin/jobs/add-job');
    }
    
    cancel = (e) => {
        this.props.navigate('/admin/jobs')
    }

    render() {
        return (
            <div>
            <h2 className="text-center">Jobs List</h2>

                <button type="button" className="btn btn-primary" onClick={this.addJob}>Add Job +</button> 
         
            <div className='row'>
                  <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th> Job Title</th>
                            <th> Job Type </th>
                            <th> Pay Range</th>
                            <th> Job Description</th>
                            <th> Department Name</th>
                            <th> Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.jobs.map(
                            job => 
                             <tr  key = {job.jobId }>
                                <td> {job.jobTitle } </td>
                                <td> {job.jobType} </td>
                                <td>{job.jobPayRange}</td>
                                <td> {job.jobDescription} </td>
                                <td> {job.deptName} </td>
                                <td> <div className="mb-2">
                                     <button type="button" className="btn btn-info" onClick={() => this.editJob(job.jobId)}> Edit </button>{ " "}
                                     <button type="button" className="btn btn-info" onClick={() => this.viewJob(job.jobId)}> View Job </button>{ " "}
                                      <button type="button" className="btn btn-danger" onClick={() => this.deleteJob(job.jobId)}> Delete </button> 
                                    </div>
                                </td>
                            </tr>
                            )
                       } 
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default  withRouter(JobsComponent);