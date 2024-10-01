package com.tech.task.sandboxtechtask.annotation;

import com.tech.task.sandboxtechtask.annotation.validator.After1970Validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = After1970Validator.class)
@Documented
public @interface After1970 {

    String message() default "Date must not be earlier than 1970-01-01";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}