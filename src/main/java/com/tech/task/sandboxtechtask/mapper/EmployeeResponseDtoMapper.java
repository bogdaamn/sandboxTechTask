package com.tech.task.sandboxtechtask.mapper;

import com.tech.task.sandboxtechtask.model.Employee;
import com.tech.task.sandboxtechtask.rest.dto.EmployeeResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class EmployeeResponseDtoMapper {

    @Mapping(source = "id", target = "employeeId")
    @Mapping(source = "supervisor", target = "supervisorId", qualifiedByName = "mapSupervisorId")
    @Mapping(source = "creationDate", target = "creationDate", dateFormat = "yyyy-MM-dd")
    public abstract EmployeeResponseDto toDto(Employee employee);

    public abstract List<EmployeeResponseDto> toDtoList(List<Employee> employees);

    @Named("mapSupervisorId")
    public Long mapSupervisorId(Employee supervisor) {
        return supervisor != null ? supervisor.getId() : null;
    }
}