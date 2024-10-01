package com.tech.task.sandboxtechtask.rest.dto;

import com.tech.task.sandboxtechtask.annotation.After1970;
import com.tech.task.sandboxtechtask.annotation.PositiveOrNull;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Getter
@Setter
public class EmployeeRequestDto {

    @NotBlank(message = "First name is mandatory")
    @Pattern(regexp = "^[A-Za-z]+$", message = "First name must contain only letters")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Last name must contain only letters")
    private String lastName;

    @NotBlank(message = "Position is mandatory")
    private String position;

    @PositiveOrNull
    private Long supervisorId;

    @NotNull(message = "Creation date is mandatory")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Creation date must be in the format YYYY-MM-DD")
    @After1970(message = "Creation date must not be earlier than 1970-01-01")
    private String creationDate;
}