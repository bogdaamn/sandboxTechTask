package com.tech.task.sandboxtechtask.annotation;

import com.tech.task.sandboxtechtask.annotation.validator.PositiveOrNullValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PositiveOrNullValidator.class)
@Documented
public @interface PositiveOrNull {

    String message() default "Value must be positive or null";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
