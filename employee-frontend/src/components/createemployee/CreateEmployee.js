import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.css';
import { showNotification } from '../../utils/notificationUtils';

const CreateEmployee = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [supervisorId, setSupervisorId] = useState('');
    const [creationDate, setCreationDate] = useState('');

    const [notification, setNotification] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (supervisorId && (!/^[1-9]\d*$/.test(supervisorId))) {
            showNotification(setNotification, setIsError, "Supervisor ID must be a positive number or null.", false);
            return;
        }

        const newEmployee = { firstName, lastName, position, supervisorId, creationDate };

        axios.post('/api/employees', newEmployee)
            .then(response => {
                showNotification(setNotification, setIsError, "Employee created successfully!", true);

                setFirstName('');
                setLastName('');
                setPosition('');
                setSupervisorId('');
                setCreationDate('');

                onSubmit();
            })
            .catch(error => {
                let errorMessage = "Error creating employee.";

                if (error.response && error.response.data && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    errorMessage = Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages;
                }
                showNotification(setNotification, setIsError, errorMessage, false);
            });

    };

    return (
        <div style={{ position: 'relative' }}>
            <form onSubmit={handleSubmit} style={{ marginTop: '30px', maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: 'grey', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        value={position}
                        onChange={e => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Supervisor ID:</label>
                    <input
                        type="text"
                        value={supervisorId}
                        onChange={e => setSupervisorId(e.target.value)}
                    />
                </div>
                <div>
                    <label>Creation Date:</label>
                    <input
                        type="date"
                        value={creationDate}
                        onChange={e => setCreationDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            {notification && (
                <div className={`notification ${isError ? 'error' : 'success'}`}>
                    {notification}
                </div>
            )}
        </div>
    );
};

export default CreateEmployee;
