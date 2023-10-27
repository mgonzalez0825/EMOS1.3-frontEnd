import React, { Component } from 'react';
import jobsService from '../../../services/jobsService';
import { withRouter } from '../withRouter/withRouter';

class ViewJobComponent extends Component {
    
    constructor(props){
        super(props)
    
        this.state = {
            jobId:this.props.params.jobId,
            job : {}
        }
    
    
        
    }

    componentDidMount(){
        jobsService.getJobById(this.state.jobId).then((res) => {
            this.setState({job: res.data});
        })
    }

    cancel = (e) => {
        this.props.navigate('/admin/jobs')
    }
    
    render() {
        return (
            <div>
            <div className='card border-info mb-3'  >
            <h3 className='text-center'> View Job Details</h3>
                <div className='card-body border'> 
                <div className="card-body border text-info">
                    <h5 className="card-title text-muted">Job ID:</h5>
                    <h5 className="card-text">{ this.state.jobId}</h5>

                    <h5 className="card-title text-muted">Job Title:</h5>
                    <h5 className="card-text">{ this.state.job.jobTitle }</h5>

                    <h5 className="card-title text-muted">Job Status:</h5>
                    <h5 className="card-text">{ this.state.job.jobType }</h5>

                    <h5 className="card-title text-muted">Salary Range:</h5>
                    <h5 className="card-text">{ this.state.job.jobPayRange }</h5>


                    <h5 className="card-title text-muted">Job Description:</h5>
                    <h5 className="card-text">{ this.state.job.jobDescription }</h5>

                    <div className='text-center'>
                            <button type="button" className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}> RETURN </button>
                            </div>
                   
                </div>
                
                        
                </div>
                
            </div>
        </div>
        );
    }
}

export default withRouter(ViewJobComponent);