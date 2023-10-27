import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateDepartmentComponent from '../components/departmentComponents/CreateDepartmentComponent';

describe('CreateDepartmentComponent', () => {
  it('should render a form', () => {
    render(<CreateDepartmentComponent />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should set the state for deptName when input changes', () => {
    render(<CreateDepartmentComponent />);
    const input = screen.getByLabelText('Department Name:');
    fireEvent.change(input, { target: { value: 'Test Department' } });
    expect(input.value).toEqual('Test Department');
  });

  it('should set the state for parentDept when input changes', () => {
    render(<CreateDepartmentComponent />);
    const input = screen.getByLabelText('Parent Department:');
    fireEvent.change(input, { target: { value: 'Test Parent Department' } });
    expect(input.value).toEqual('Test Parent Department');
  });

  it('should set the state for location when input changes', () => {
    render(<CreateDepartmentComponent />);
    const input = screen.getByLabelText('Location:');
    fireEvent.change(input, { target: { value: 'Test Location' } });
    expect(input.value).toEqual('Test Location');
  });

  it('should set the state for managerNo when input changes', () => {
    render(<CreateDepartmentComponent />);
    const input = screen.getByLabelText('Manager Number:');
    fireEvent.change(input, { target: { value: '12345' } });
    expect(input.value).toEqual('12345');
  });

  it('should call saveDept function when save button is clicked', () => {
    const saveDeptMock = jest.fn();
    render(<CreateDepartmentComponent saveDept={saveDeptMock} />);
    const saveBtn = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveBtn);
    expect(saveDeptMock).toHaveBeenCalled();
  });

  it('should call navigate function when save button is clicked and input is valid', () => {
    const navigateMock = jest.fn();
    const saveDeptMock = jest.fn();
    render(
      <CreateDepartmentComponent saveDept={saveDeptMock} navigate={navigateMock} />
    );
    const saveBtn = screen.getByRole('button', { name: 'Save' });
    const deptNameInput = screen.getByLabelText('Department Name:');
    const parentDeptInput = screen.getByLabelText('Parent Department:');
    const locationInput = screen.getByLabelText('Location:');
    const managerNoInput = screen.getByLabelText('Manager Number:');

    fireEvent.change(deptNameInput, { target: { value: 'Test Department' } });
    fireEvent.change(parentDeptInput, {
      target: { value: 'Test Parent Department' },
    });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(managerNoInput, { target: { value: '12345' } });

    fireEvent.click(saveBtn);
    expect(saveDeptMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/admin/departments');
  });

  it('should call navigate function when cancel button is clicked', () => {
    const navigateMock = jest.fn();
    render(<CreateDepartmentComponent navigate={navigateMock} />);
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelBtn);
    expect(navigateMock).toHaveBeenCalledWith('/admin/departments');
  });
});

