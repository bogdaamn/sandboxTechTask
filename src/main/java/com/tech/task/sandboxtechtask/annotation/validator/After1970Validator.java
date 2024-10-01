package com.tech.task.sandboxtechtask.annotation.validator;

import com.tech.task.sandboxtechtask.annotation.After1970;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class After1970Validator implements ConstraintValidator<After1970, String> {

    @Override
    public void initialize(After1970 constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        LocalDate date = LocalDate.parse(value);
        LocalDate earliestAllowedDate = LocalDate.of(1970, 1, 1);

        return !date.isBefore(earliestAllowedDate);
    }
}