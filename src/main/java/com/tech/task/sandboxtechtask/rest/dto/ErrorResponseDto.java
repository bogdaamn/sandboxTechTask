package com.tech.task.sandboxtechtask.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ErrorResponseDto {

    private final LocalDateTime timestamp;
    private final int status;
    private final String error;
    private final List<String> messages;
    private final String path;

    public ErrorResponseDto(LocalDateTime timestamp,
                            int status,
                            String error,
                            String message,
                            String path) {
        this(timestamp, status, error, List.of(message), path);
    }
}
