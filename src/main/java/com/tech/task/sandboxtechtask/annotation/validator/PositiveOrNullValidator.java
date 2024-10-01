package com.tech.task.sandboxtechtask.annotation.validator;

import com.tech.task.sandboxtechtask.annotation.PositiveOrNull;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PositiveOrNullValidator implements ConstraintValidator<PositiveOrNull, Long> {

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        return value == null || value > 0;
    }
}
