package com.tech.task.sandboxtechtask.service;

import com.tech.task.sandboxtechtask.exception.EmployeeNotFoundException;
import com.tech.task.sandboxtechtask.exception.SupervisorLinkedException;
import com.tech.task.sandboxtechtask.exception.SupervisorNotFoundException;
import com.tech.task.sandboxtechtask.mapper.EmployeeRequestDtoMapper;
import com.tech.task.sandboxtechtask.mapper.EmployeeResponseDtoMapper;
import com.tech.task.sandboxtechtask.model.Employee;
import com.tech.task.sandboxtechtask.repository.EmployeeRepository;
import com.tech.task.sandboxtechtask.rest.dto.EmployeeRequestDto;
import com.tech.task.sandboxtechtask.rest.dto.EmployeeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeResponseDtoMapper employeeResponseDtoMapper;
    private final EmployeeRequestDtoMapper employeeRequestDtoMapper;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<EmployeeResponseDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employeeResponseDtoMapper.toDtoList(employees);
    }

    public EmployeeResponseDto getEmployeeById(Long employeeId) {
        Employee employee = findEmployeeById(employeeId);
        return employeeResponseDtoMapper.toDto(employee);
    }

    public EmployeeResponseDto createEmployee(EmployeeRequestDto employeeRequestDTO) {
        checkIfSupervisorExists(employeeRequestDTO.getSupervisorId());
        Employee newEmployee = employeeRepository.save(employeeRequestDtoMapper.toEntity(employeeRequestDTO));
        return employeeResponseDtoMapper.toDto(newEmployee);
    }

    public EmployeeResponseDto updateEmployee(Long employeeId, EmployeeRequestDto employeeRequestDto) {
        Employee employee = findEmployeeById(employeeId);

        employee.setFirstName(employeeRequestDto.getFirstName());
        employee.setLastName(employeeRequestDto.getLastName());
        employee.setPosition(employeeRequestDto.getPosition());
        employee.setCreationDate(LocalDate.parse(employeeRequestDto.getCreationDate(), formatter));

        if (employeeRequestDto.getSupervisorId() != null) {
            Employee supervisor = findSupervisorById(employeeRequestDto.getSupervisorId());
            employee.setSupervisor(supervisor);
        } else {
            employee.setSupervisor(null);
        }
        Employee updatedEmployee = employeeRepository.save(employee);

        return employeeResponseDtoMapper.toDto(updatedEmployee);
    }


    public void deleteEmployeeById(Long employeeId) {
        Employee employee = findEmployeeById(employeeId);
        List<Employee> supervisedEmployees = employeeRepository.findBySupervisorId(employeeId);

        if (!supervisedEmployees.isEmpty()) {
            List<Long> supervisedEmployeeIds = supervisedEmployees.stream()
                    .map(Employee::getId)
                    .toList();

            throw new SupervisorLinkedException(employeeId, supervisedEmployeeIds);
        }
        employeeRepository.delete(employee);
    }

    private Employee findEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException(String.format("Employee with id %d is not found", employeeId)));
    }

    private Employee findSupervisorById(Long supervisorId) {
        return employeeRepository.findById(supervisorId).orElseThrow(
                () -> new SupervisorNotFoundException(String.format("Supervisor with id %s does not exist", supervisorId)));
    }

    private void checkIfSupervisorExists(Long supervisorId) {
        if (supervisorId != null) {
            findSupervisorById(supervisorId);
        }
    }
}