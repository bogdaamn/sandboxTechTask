package com.tech.task.sandboxtechtask.mapper;

import com.tech.task.sandboxtechtask.model.Employee;
import com.tech.task.sandboxtechtask.rest.dto.EmployeeRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class EmployeeRequestDtoMapper {

    @Mapping(source = "supervisorId", target = "supervisor", qualifiedByName = "mapSupervisor")
    @Mapping(source = "creationDate", target = "creationDate", dateFormat = "yyyy-MM-dd")
    public abstract Employee toEntity(EmployeeRequestDto employeeRequestDto);

    @Named("mapSupervisor")
    public Employee mapSupervisor(Long supervisorId) {
        if (supervisorId == null) {
            return null;
        }

        Employee supervisor = new Employee();
        supervisor.setId(supervisorId);
        return supervisor;
    }


}