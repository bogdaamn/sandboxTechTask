package com.tech.task.sandboxtechtask.rest.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeResponseDto {

    private Long employeeId;
    private String firstName;
    private String lastName;
    private String position;
    private Long supervisorId;
    private String creationDate;
}