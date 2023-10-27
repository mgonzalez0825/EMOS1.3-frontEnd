import React, { Component } from 'react';
import { withRouter } from '../withRouter/withRouter';
import EmployeeService from '../../../services/employeeService';

class ViewEmployeeComponent extends Component {
   
    constructor(props){
        super(props)
        const empId = parseInt(this.props.params.empId);

        this.state = {
            empId: isNaN(empId) || empId < 1 || !Number.isInteger(empId) ? 1 : empId,
            employee: {}
        }
    }

    componentDidMount(){
        this.getEmployeeById();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.empId !== prevProps.params.empId) {
            this.setState({ empId: this.props.params.empId }, () => {
                this.getEmployeeById();
            });
        }
    }

    getEmployeeById = () => {
        EmployeeService.getEmployeeById(this.state.empId).then((res) => {
            this.setState({employee: res.data});
        })
    }

    cancel = (e) => {
        this.props.navigate('/admin/employees')
    }

    render() {
        return (
            <div>
                <div className='card border-info mb-3'  >
                <h3 className='text-center'> View Employee Details</h3>
                    <div className='card-body border'> 
                    <div className="card-body border text-info">
                        <h5 className="card-title text-muted">Employee ID:</h5>
                        <h5 className="card-text">{ this.state.employee.empId}</h5>

                        <h5 className="card-title text-muted">Dept Name:</h5>
                        <h5 className="card-text">{ this.state.employee.deptName }</h5>

                        <h5 className="card-title  text-muted">Full Name:</h5>
                        <h5 className="card-text">{ this.state.employee.firstName }  {this.state.employee.lastName}</h5>


                        <h5 className="card-title  text-muted">Email ID:</h5>
                        <h5 className="card-text">{ this.state.employee.emailId }</h5>

                        <h5 className="card-title  text-muted">Pay Rate:</h5>
                        <h5 className="card-text">{ this.state.employee.payRate}</h5>

                        <h5 className="card-title text-muted">Employee Type:</h5>
                        <h5 className="card-text">{ this.state.employee.employeeType}</h5>

                        <h5 className="card-title text-muted">Hire Date:</h5>
                        <h5 className="card-text">{ this.state.employee.hireDate}</h5>
 
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

export default withRouter(ViewEmployeeComponent);
