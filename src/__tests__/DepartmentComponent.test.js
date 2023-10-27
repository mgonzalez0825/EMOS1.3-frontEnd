import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import DepartmentComponent from '../components/departmentComponents/DepartmentComponent';

jest.mock('axios');

describe('DepartmentComponent', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  it('should render the DepartmentComponent component', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<DepartmentComponent />, { wrapper: MemoryRouter });
    expect(screen.getByText('Department List')).toBeInTheDocument();
  });

  it('should render the table header with all columns', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<DepartmentComponent />, { wrapper: MemoryRouter });

    expect(screen.getByText('DEPARTMENT ID')).toBeInTheDocument();
    expect(screen.getByText('DEPARTMENT NAME')).toBeInTheDocument();
    expect(screen.getByText('HEAD DEPARTMENT')).toBeInTheDocument();
    expect(screen.getByText('LOCATION')).toBeInTheDocument();
    expect(screen.getByText('DEPARTMENT MANAGER ID')).toBeInTheDocument();
    expect(screen.getByText('ACTIONS')).toBeInTheDocument();
  });

  it('should render the add department button', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<DepartmentComponent />, { wrapper: MemoryRouter });
    expect(screen.getByText('Add Department +')).toBeInTheDocument();
  });

  it('should render the departments data in the table', async () => {
    const mockDepartments = [
      {
        deptNo: 1,
        deptName: 'Department 1',
        parentDept: 'Parent Department 1',
        location: 'Location 1',
        managerNo: 'Manager No 1',
      },
      {
        deptNo: 2,
        deptName: 'Department 2',
        parentDept: 'Parent Department 2',
        location: 'Location 2',
        managerNo: 'Manager No 2',
      },
    ];

    axios.get.mockResolvedValue({ data: mockDepartments });
    render(<DepartmentComponent />, { wrapper: MemoryRouter });

    expect(await screen.findByText('Department 1')).toBeInTheDocument();
    expect(screen.getByText('Parent Department 1')).toBeInTheDocument();
    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Manager No 1')).toBeInTheDocument();

    expect(screen.getByText('Department 2')).toBeInTheDocument();
    expect(screen.getByText('Parent Department 2')).toBeInTheDocument();
    expect(screen.getByText('Location 2')).toBeInTheDocument();
    expect(screen.getByText('Manager No 2')).toBeInTheDocument();
  });

  it('should navigate to add department page when add department button is clicked', () => {
    const historyMock = { push: jest.fn() };
    axios.get.mockResolvedValue({ data: [] });
    render(<DepartmentComponent history={historyMock} />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText('Add Department +'));
    expect(historyMock.push).toHaveBeenCalledWith('/admin/departments/add-department');
  });

  it('should navigate to edit department page when edit button is clicked', async () => {
    const mockDepartments = [
      {
        deptNo: 1,
        deptName: 'Department 1',
        parentDept: 'Parent Department 1',
        location: 'Location 1',
        managerNo: 'Manager No 1',
      },
    ];

    const historyMock = { push: jest.fn() };
    axios.get.mockResolvedValue({ data: mockDepartments });
    render(<DepartmentComponent history={historyMock} />, { wrapper: MemoryRouter });

    fireEvent.click(await screen.findByText('Edit'));
    expect(historyMock.push).toHaveBeenCalledWith('/admin/departements/add-department')})

});
