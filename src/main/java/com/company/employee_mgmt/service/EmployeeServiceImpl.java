package com.company.employee_mgmt.service;

import com.company.employee_mgmt.model.Employee;
import com.company.employee_mgmt.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;

    // Dependency Injection
    public EmployeeServiceImpl(EmployeeRepository repository) {
        this.repository = repository;
    }

    // CREATE
    @Override
    public Employee createEmployee(Employee employee) {
        return repository.save(employee);
    }

    // READ ALL
    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // READ BY ID
    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // UPDATE
    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = repository.findById(id).orElse(null);

        if (employee != null) {
            employee.setFirstName(employeeDetails.getFirstName());
            employee.setLastName(employeeDetails.getLastName());
            employee.setEmail(employeeDetails.getEmail());
            employee.setDepartment(employeeDetails.getDepartment());
            employee.setSalary(employeeDetails.getSalary());

            return repository.save(employee);
        }

        return null;
    }

    // DELETE
    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}