package com.company.employee_mgmt.repository;

import com.company.employee_mgmt.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Custom query
    List<Employee> findByDepartment(String department);
}