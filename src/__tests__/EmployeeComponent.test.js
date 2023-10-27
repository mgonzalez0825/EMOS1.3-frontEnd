import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmployeeComponent from '../components/employeeComponents/EmployeeComponent';
import EmployeeService from '../services/employeeService';

jest.mock('../services/employeeService');

describe('EmployeeComponent', () => {
  const employees = [
    
      
      {empId: 1,
        firstName:"Manuel",
        lastName:"Gonzalez",
        emailId:"manuggq@icloud.com",
        password:"KJNknW21!",
        employeeDetails:{
        ssn:"",
        phoneNumber:"",
        position:"",
        employeeType:"",
        payRate:"",
        supervisor:"false",
        salary:"",
        hireDate:""},
        department:{
            deptNo:5
        }
        },
      {
          empId: 2,
            firstName:"Stefan",
            lastName:"Bart",
            emailId:"manuggq@icloud.com",
            password:"KJNknW21!",
            employeeDetails:{
            ssn:"",
            phoneNumber:"",
            position:"",
            employeeType:"",
            payRate:"",
            supervisor:"false",
            salary:"",
            hireDate:""},
            department:{
                deptNo:5
            }
        },
    
  ];

  beforeEach(() => {
    EmployeeService.getAllEmployees.mockResolvedValue({ data: employees });
  });

  it('should display a list of employees', async () => {
    const { findByText } = render(<EmployeeComponent />);
    const employee1 = await findByText('Manuel Gonzalez');
    const employee2 = await findByText('Stefan Bart');
    expect(employee1).toBeInTheDocument();
    expect(employee2).toBeInTheDocument();
  });

  it('should navigate to add employee page when add employee button is clicked', async () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<EmployeeComponent navigate={navigateMock} />);
    const addEmployeeButton = getByText('Add Employee +');
    fireEvent.click(addEmployeeButton);
    expect(navigateMock).toHaveBeenCalledWith('/admin/employees/add-employee');
  });

  it('should navigate to edit employee page when edit button is clicked', async () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<EmployeeComponent navigate={navigateMock} />);
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    expect(navigateMock).toHaveBeenCalledWith('/admin/employees/update-employee/1');
  });

  it('should navigate to add employee details page when add info button is clicked', async () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<EmployeeComponent navigate={navigateMock} />);
    const addInfoButton = getByText('Add Info+');
    fireEvent.click(addInfoButton);
    expect(navigateMock).toHaveBeenCalledWith('/admin/employees/add-employee-details/1');
  });

  it('should navigate to view employee page when view employee button is clicked', async () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<EmployeeComponent navigate={navigateMock} />);
    const viewEmployeeButton = getByText('View Employee');
    fireEvent.click(viewEmployeeButton);
    expect(navigateMock).toHaveBeenCalledWith('/admin/employees/view-employee/1');
  });

  it('should delete an employee when delete button is clicked and confirmation is accepted', async () => {
    const { getByText } = render(<EmployeeComponent />);
    const deleteButton = getByText('Delete');
    window.confirm = jest.fn(() => true);
    fireEvent.click(deleteButton);
    expect(EmployeeService.deleteEmployee).toHaveBeenCalledWith(1);
  });
});
