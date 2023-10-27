import React, { Component } from 'react';

class EmployeeDashboardComponent extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            
        }
       }
   
    render() {
        return(
        <div>
        <h2 className="text-center">Dashboard Page</h2>
            <h3>Dashboard</h3>

            <div className="weekly-scheduler">
            <table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {/* {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.employee_id}</td>
              <td>{schedule.monday_start} - {schedule.monday_end}</td>
              <td>{schedule.tuesday_start} - {schedule.tuesday_end}</td>
              <td>{schedule.wednesday_start} - {schedule.wednesday_end}</td>
              <td>{schedule.thursday_start} - {schedule.thursday_end}</td>
              <td>{schedule.friday_start} - {schedule.friday_end}</td>
              <td>{schedule.saturday_start} - {schedule.saturday_end}</td>
              <td>{schedule.sunday_start} - {schedule.sunday_end}</td>
            </tr>
          ))} */}
        </tbody>
        </table>
        </div>
        </div>
        );
    };
};


export default EmployeeDashboardComponent;