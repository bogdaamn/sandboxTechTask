import React, { useState } from "react";
import axios from "axios";
import './EditEmployeeForm.css';
import { showNotification } from '../../utils/notificationUtils';

const EditEmployeeForm = ({ employee, onUpdate, onCancel, setNotification, setIsError }) => {
    const [initialFirstName] = useState(employee.firstName);
    const [initialLastName] = useState(employee.lastName);
    const [initialPosition] = useState(employee.position);
    const [initialSupervisorId] = useState(employee.supervisorId || "");
    const [initialCreationDate] = useState(employee.creationDate);

    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [position, setPosition] = useState(employee.position);
    const [supervisorId, setSupervisorId] = useState(employee.supervisorId || "");
    const [creationDate, setCreationDate] = useState(employee.creationDate);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedEmployee = {
            firstName,
            lastName,
            position,
            supervisorId: supervisorId || null,
            creationDate,
        };

        axios.put(`/api/employees/${employee.employeeId}`, updatedEmployee)
            .then(response => {
                onUpdate(response.data);
                showNotification(setNotification, setIsError, "Employee updated successfully!", true);
            })
            .catch(error => {
                let errorMessage = "Error updating employee.";
                if (error.response && error.response.data && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    errorMessage = Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages;
                }
                showNotification(setNotification, setIsError, errorMessage, false);
            });
    };

    const handleCancel = () => {
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setPosition(initialPosition);
        setSupervisorId(initialSupervisorId);
        setCreationDate(initialCreationDate);

        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: "none", boxShadow: "none", backgroundColor: "darkgray", display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '-30px' }}>
            <label style={{ color: 'black' }}>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                       style={{ border: '1px solid black', color: 'black' }} />
            </label>
            <label style={{ color: 'black' }}>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                       style={{ border: '1px solid black', color: 'black' }} />
            </label>
            <label style={{ color: 'black' }}>
                Position:
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required
                       style={{ border: '1px solid black', color: 'black' }} />
            </label>
            <label style={{ color: 'black' }}>
                Supervisor ID:
                <input type="number" value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)}
                       style={{ border: '1px solid black', color: 'black' }} />
            </label>
            <label style={{ color: 'black' }}>
                Creation Date (YYYY-MM-DD):
                <input type="text" value={creationDate} onChange={(e) => setCreationDate(e.target.value)} required
                       style={{ border: '1px solid black', color: 'black' }} />
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ border: '1px solid black', color: 'black', backgroundColor: 'transparent' }}>Save</button>
                <button type="button" onClick={handleCancel} style={{ border: '1px solid black', color: 'black', backgroundColor: 'transparent' }}>Cancel</button>
            </div>
        </form>
    );
};

export default EditEmployeeForm;
