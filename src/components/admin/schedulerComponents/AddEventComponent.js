

import React, { Component } from 'react';
import moment from 'moment';
// import schedulerService from '../../../services/schedulerService';
import employeeService from '../../../services/employeeService';
import jobsService from '../../../services/jobsService';
import { withRouter } from '../withRouter/withRouter';
import grab from '../../../services/fetchService';

class AddEventComponent extends Component {
  constructor(props) {
    const jwt = localStorage.getItem("jwt");
    super(props);
  

    this.state = {
      eventJobs: [],
      eventEmployees: [],
      eventJob: '',
      eventEmployee: '',
      eventStartDate: moment(this.props.selectedDate).format('YYYY-MM-DDTHH:mm'),
      eventEndDate: moment(this.props.selectedDate).format('YYYY-MM-DDTHH:mm'),
      job: { jobId: ''},
      employee: { empId: '' },
      jobIdError: '',
      empIdError: '',
      eventStartTimeError: '',
      eventEndTimeError: ''
    }

    this.changeEmployeeHandler = this.changeEmployeeHandler.bind(this);
    this.changeJobHandler = this.changeJobHandler.bind(this);
    this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
    this.changeEndTimeHandler = this.changeEndTimeHandler.bind(this);
    this.changeJobIdHandler = this.changeJobIdHandler.bind(this);
    this.changeEmpIdHandler = this.changeEmpIdHandler.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

  }

  componentDidMount() {

    jobsService.getAllJobs().then((res) => {
      this.setState({ eventJobs: res.data });
    });

    employeeService.getAllEmployees().then((res) => {
      this.setState({ eventEmployees: res.data });
    });

  }

  changeEmployeeHandler = (event) => {
    this.setState({employee: event.target.value});
  }

  changeJobHandler = (event) => {
    this.setState({job: event.target.value});
  }

  changeStartTimeHandler = (event) => {
    this.setState({eventStartDate: event.target.value});
  }

  changeEndTimeHandler = (event) => {
    this.setState({eventEndDate: event.target.value});
  }

  changeJobIdHandler = (event) => {
    const selectedJobId = event.target.value;

    jobsService.getJobById(selectedJobId)
      .then(response => {
 
        const job = response.data;
        this.setState({
          
          job: {
            jobId: selectedJobId,
          },

          eventJob: job.jobTitle,
        });
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  };

  changeEmpIdHandler = (event) => {
    const selectedEmployeeId = event.target.value;

    employeeService.getEmployeeById(selectedEmployeeId)
      .then(response => {

        const employee = response.data;
        this.setState({
          
          employee: {
          
            empId: selectedEmployeeId,
          
          },
          eventEmployee: employee.firstName + " " + employee.lastName,
        });
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  };

  validate = () => {

    let eventStartTimeError = "";
    let eventEndTimeError = "";
    let jobIdError = "";
    let empIdError = "";

    if (!this.state.eventStartDate) {
      
      eventStartTimeError = "Please enter a start time.";
    }

    if (!this.state.eventEndDate) {
      
      eventEndTimeError = "Please enter an end time.";
    }

    if (this.state.job.jobId === ''){
      this.setState({ jobIdError: "Please select a job." });
      return;
  } else this.setState({ jobIdError: "" });

  if (this.state.employee.empId === ''){
    this.setState({ empIdError: "Please select an employee." });
    return;
} else this.setState({ empIdError: "" });

    if (eventStartTimeError || eventEndTimeError || jobIdError || empIdError){
      this.setState({eventStartTimeError, eventEndTimeError, jobIdError, empIdError});

      return false;
    }
    return true;
  };

  saveEvent = (e) => {
    
    e.preventDefault();
    const isValid = this.validate();

    if (this.state.eventJobs.length === 0) {
      this.setState({ jobIdError: "There are no jobs available. Please create a job first." });
      return;
    }

    if (this.state.eventEmployees.length === 0){
      this.setState({ empId: "There is no employee available. You must add an employee first."});
      return;
    }

    if (isValid) {

      let event = {eventStartDate:this.state.eventStartDate, 
                    eventEndDate:this.state.eventEndDate, 
                    jobs:this.state.job, 
                    employee:this.state.employee, 
                    eventJob: this.state.eventJob,
                    eventEmployee: this.state.eventEmployee};

        console.log("event => " + JSON.stringify(event));



        grab("/api/v1/scheduler", "POST", this.jwt, event).then(res =>{
          this.props.navigate('/admin/scheduler');
        })
        } 
  }

  cancel = (e) => {
    this.props.navigate('/admin/scheduler')
  }

  render() {
    return (
      <div className ="container">
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'> Add New Event</h3>
            <div className='card-body'>
              <form>
                <div className='form-group'>
                  <label> Assignment </label>
                  <select className='form-select' type='text' value={this.state.job.jobId} onChange={this.changeJobIdHandler}>
                                        <option value="">Select a job </option>
                                        {this.state.eventJobs.map((job) => (
                                        <option key={job.jobId} value={job.jobId}>{job.jobTitle}</option>
                                        
                                        ))}
                                    </select>
                                    
                </div>
                <div style={{fontSize:12,color:"red"}}>{this.state.jobIdError}</div> 
                <div className='form-group'>   
                  <label> Employee </label>
                  <select className='form-select' type='hidden' value={this.state.employee.empId} onChange={this.changeEmpIdHandler}>
                                        <option value="">Assign an employee</option>
                                        {this.state.eventEmployees.map((employee) => (
                                        <option key={employee.empId} value={employee.empId}>{employee.firstName + " " + employee.lastName}</option>
                                        ))}
                                    </select>
                </div>
                <div style={{fontSize:12,color:"red"}}>{this.state.empIdError}</div> 
                <div className='form-group'>   
                  <label> Start Time </label>
                  <input type="datetime-local" placeholder='Start Time' name='eventStartDate' className='form-control'
                    value={this.state.eventStartDate} onChange={this.changeStartTimeHandler}/>
                </div>
                <div style={{fontSize:12,color:"red"}}>{this.state.eventStartTimeError}</div> 
                <div className='form-group'>   
                  <label> End Time </label>
                  <input type="datetime-local" placeholder='End Time' name='eventEndDate' className='form-control'
                    value={this.state.eventEndDate} onChange={this.changeEndTimeHandler}/>
                </div>
                <div style={{fontSize:12,color:"red"}}>{this.state.eventEndTimeError}</div> 
                <div className='form-group'>
                  <button type="button" className='btn btn-success' onClick={this.saveEvent}> Save </button>  
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

export default withRouter(AddEventComponent);
