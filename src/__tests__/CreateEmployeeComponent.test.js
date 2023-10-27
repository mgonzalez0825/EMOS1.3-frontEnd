import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateEmployeeComponent from '../components/employeeComponents/CreateEmployeeComponent';

describe('CreateEmployeeComponent', () => {
  test('renders department select with initial value', async () => {
    render(<CreateEmployeeComponent />);

    // Wait for departments to load
    await screen.findByText(/Select a department/);

    // Find department select
    const select = screen.getByLabelText('Department:');
    expect(select).toBeInTheDocument();

    // Check initial selected value
    expect(select.value).toBe('');
  });

  test('shows error if no department is selected', async () => {
    render(<CreateEmployeeComponent />);

    // Wait for departments to load
    await screen.findByText(/Select a department/);

    // Find submit button
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();

    // Click submit button without selecting department
    fireEvent.click(submitButton);

    // Check if error message is shown
    expect(screen.getByText(/Please select a department/)).toBeInTheDocument();
  });

  test('allows user to select a department', async () => {
    render(<CreateEmployeeComponent />);

    // Wait for departments to load
    await screen.findByText(/Select a department/);

    // Find department select
    const select = screen.getByLabelText('Department:');
    expect(select).toBeInTheDocument();

    // Select a department
    fireEvent.change(select, { target: { value: '1' } });

    // Check if department is selected
    expect(select.value).toBe('1');
  });

  test('shows error message if form is submitted with invalid inputs', async () => {
    render(<CreateEmployeeComponent />);

    // Wait for departments to load
    await screen.findByText(/Select a department/);

    // Find submit button
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();

    // Fill in invalid inputs
    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalid_email' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'invalid_password' } });

    // Click submit button
    fireEvent.click(submitButton);

    // Check if error messages are shown
    expect(screen.getByText(/First Name should be/)).toBeInTheDocument();
    expect(screen.getByText(/Last Name should be/)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
    expect(screen.getByText(/Password should be/)).toBeInTheDocument();
  });
});
