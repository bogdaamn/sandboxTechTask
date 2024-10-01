package com.tech.task.sandboxtechtask.repository;

import com.tech.task.sandboxtechtask.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findBySupervisorId(Long employeeId);
}