import axios from 'axios';

const DEPT_API_BASE_URL = "http://localhost:8080/api/v1/departments";

class DepartmentService {

    getAllDepartments(){
        return axios.get(DEPT_API_BASE_URL);
    }

    createDepartment(department){
        return axios.post(DEPT_API_BASE_URL,department)
    }

    getDepartmentById(deptNo){
        return axios.get(DEPT_API_BASE_URL + '/' + deptNo);
    }

    updateDepartment(department,deptNo){
        return axios.put(DEPT_API_BASE_URL + '/' + deptNo, department);
    }

    deleteDepartment(deptNo){
        return axios.delete(DEPT_API_BASE_URL + '/' + deptNo);
    }
}

export default new DepartmentService()