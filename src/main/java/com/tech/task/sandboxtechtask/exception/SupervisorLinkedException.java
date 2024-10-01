package com.tech.task.sandboxtechtask.exception;

import java.util.List;

public class SupervisorLinkedException extends RuntimeException {

    public SupervisorLinkedException(Long supervisorId, List<Long> linkedEmployeeIds) {
        super(String.format("Cannot delete supervisor with id %d. He supervises employees with ids: %s. "
                            + "Change supervisor for the specified employees before proceeding.", supervisorId, linkedEmployeeIds));
    }


}