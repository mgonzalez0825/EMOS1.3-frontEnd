import React, { Component } from 'react';
import { withRouter } from '../withRouter/withRouter';
import DepartmentService from '../../../services/departmentService';


class ViewDepartmentComponent extends Component {
   
    constructor(props){
        super(props)
    
        this.state = {
            deptNo:this.props.params.deptNo,
            department : {}
        }
    
    
        
    }

    componentDidMount(){

        DepartmentService.getDepartmentById(this.state.deptNo).then((res) => {
            this.setState({department: res.data});

        })
    }

    cancel = (e) => {
        this.props.navigate('/admin/departments')
    }

    render() {
        return (
            <div>
                <div className='card border-info mb-3'  >
                <h3 className='text-center'> View Department Details</h3>
                    <div className='card-body border'> 
                    <div className="card-body border text-info">
                        <h5 className="card-title text-muted">Department ID:</h5>
                        <h5 className="card-text">{ this.state.department.deptNo}</h5>

                        <h5 className="card-title text-muted">Department Name:</h5>
                        <h5 className="card-text">{ this.state.department.deptName }</h5>

                        <h5 className="card-title text-muted">Department to which it reports to :</h5>
                        <h5 className="card-text">{ this.state.department.parentDept }</h5>

                        <h5 className="card-title text-muted">Department Location:</h5>
                        <h5 className="card-text">{ this.state.department.location }</h5>

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

export default withRouter(ViewDepartmentComponent);