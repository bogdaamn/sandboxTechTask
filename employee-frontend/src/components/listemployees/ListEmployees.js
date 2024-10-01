import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './ListEmployees.css';
import EditEmployeeForm from '../editemployee/EditEmployeeForm';
import { showNotification } from '../../utils/notificationUtils';

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [expandedEmployeeIds, setExpandedEmployeeIds] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState('id');
    const [searchTerm, setSearchTerm] = useState('');

    const [notification, setNotification] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios.get('/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                let errorMessage = "Error getting employees.";

                if (error.response && error.response.data && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    errorMessage = Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages;
                }

                showNotification(setNotification, setIsError, errorMessage, false);
            });
    }, []);

    const toggleEmployeeDetails = (employeeId) => {
        if (expandedEmployeeIds.includes(employeeId)) {
            setExpandedEmployeeIds(expandedEmployeeIds.filter(id => id !== employeeId));
        } else {
            setExpandedEmployeeIds([...expandedEmployeeIds, employeeId]);
        }
    };

    const handleDelete = (employeeId) => {
        axios.delete(`/api/employees/${employeeId}`)
            .then(() => {
                setEmployees(employees.filter(emp => emp.employeeId !== employeeId));

                showNotification(setNotification, setIsError, "Employee deleted successfully!", true);
            })
            .catch(error => {
                let errorMessage = "Error deleting employee.";

                if (error.response && error.response.data && error.response.data.messages) {
                    const errorMessages = error.response.data.messages;
                    errorMessage = Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages;
                }
                showNotification(setNotification, setIsError, errorMessage, false);
            });
    };

    const handleEditClick = (employeeId) => {
        setEditingEmployeeId(employeeId);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        setEmployees(employees.map(emp =>
            emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp
        ));
        setEditingEmployeeId(null);
    };

    const handleCancelEdit = () => {
        setEditingEmployeeId(null);
    };

    const filterEmployees = () => {
        if (!searchTerm) return employees;
        return employees.filter(employee => {
            if (searchCriteria === 'id') {
                return employee.employeeId.toString().includes(searchTerm);
            } else if (searchCriteria === 'name') {
                const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
                return fullName.includes(searchTerm.toLowerCase());
            }
            return false;
        });
    };

    return (
        <div>
            <h2 style={{ marginTop: '30px' }}>List of Employees</h2>

            <div className="search-container">
                <select
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                >
                    <option value="id">Search by ID</option>
                    <option value="name">Search by Name</option>
                </select>

                <input
                    type="text"
                    placeholder={`Search by ${searchCriteria}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Notification */}
            {notification && (
                <div className={`notification ${isError ? 'error' : 'success'}`}>
                    {notification}
                </div>
            )}

            <ul style={{paddingLeft: '0', listStyleType: 'none'}}>
                {filterEmployees().map(employee => (
                    <li key={employee.employeeId} style={{marginBottom: '20px'}}>
                    <div className="employee-card" onClick={() => toggleEmployeeDetails(employee.employeeId)}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                                    {employee.firstName} {employee.lastName}
                                </span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditClick(employee.employeeId);
                                        }}
                                        className="employee-button"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(employee.employeeId);
                                        }}
                                        className="employee-button"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            </div>

                            {expandedEmployeeIds.includes(employee.employeeId) && !editingEmployeeId && (
                                <div className="employee-details">
                                    <p>ID: {employee.employeeId}</p>
                                    <p>Position: {employee.position}</p>
                                    {employee.supervisorId && (
                                        <p>Supervisor ID: {employee.supervisorId}</p>
                                    )}
                                    <p>Creation Date: {employee.creationDate}</p>
                                </div>
                            )}

                            {editingEmployeeId === employee.employeeId && (
                                <EditEmployeeForm
                                    employee={employee}
                                    onUpdate={handleUpdateEmployee}
                                    onCancel={handleCancelEdit}
                                    setNotification={setNotification}
                                    setIsError={setIsError}
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListEmployees;
