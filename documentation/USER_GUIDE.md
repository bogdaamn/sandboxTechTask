------------------------------------------------------  FRONTEND ---------------------------------------------------
On the screen you can see 2 buttons: List all and create.
• List all is the default one and here you can see the search bar.
• You can search by employeeName or by employeeId.
• If you click on the employee card(but not edit or delete button) you will be able to see all available information about this employee.
• If you want to edit information - click on edit button(left one). In the edit mode you can edit firstname, lastname, 
position, supervisorId and creation date(wasn't sure if this editable need clarification). In order to remove supervisor - leave 
supervisorId blank.
• If you want to delete employee use left button with the trash bin. But be sure that employee is not a 
supervisor for any other employee, because in that case you will receive error - ex. "Cannot delete supervisor with id 1. 
He supervises employees with ids: [3, 4, 5]. Change supervisor for the specified employees before proceeding." - . Current 
logic doesn't allow to delete the supervisor-employee in order not to break data structure in the db(can be discussed). 
If employee is not a supervisor it will be deleted.
• If you want to create new employee, please navigate to the create form by clicking "Create" button. All fields except 
supervisorId are required.
• If the flow gos as expected - you should see green notification in the right corner that operation was performed successfully.
If any error will occur - red notification wil be shown. 

------------------------------------------------------  BACKEND ---------------------------------------------------


AVAILABLE ENDPOINTS: 
• Get all employees - http://localhost:8080/api/employees (HttpMethod - GET)
• Get employee by Id - http://localhost:8080/api/employees/{id} (HttpMethod - GET)

• Create new employee - http://localhost:8080/api/employees (HttpMethod - POST)
(RequestBody:{
"firstName": "John",
"lastName": "Doe",
"position": "Developer",
"supervisorId": null,
"creationDate": "2023-09-30"
})
• Update employee - http://localhost:8080/api/employees/{id} (HttpMethod - PUT)
(RequestBody: {
"firstName": "Bobby",
"lastName": "Shorty",
"position": "Senior Super-Puper Developer",
"supervisorId": 3,
"creationDate": "2023-09-30"
})

• Delete employee - http://localhost:8080/api/employees/{id} (HttpMethod - DELETE)

------------------------------------------------------ DISCUSSION ------------------------------------------------------  
About the Supervisor(Optional) in tech-spek. In my opinion this could be done in 2 ways.
• First way - Supervisor can be a boolean value and based on this value we can set this employee to be a supervisor for 
any others in a separate table, but for me it seems verbose and the tech spek doesn't explicitly explain what type it should be.
• Second way - (chosen) supervisor is a long which represents the supervisor for the selected employee. One person can 
be a supervisor for several people, but currently one person can have only one supervisor, transition can be implemented 
and in this case the Director can also be a supervisor for the Developer(currently it is like Director -> Manager -> Developer). 

These approaches are different and in real world i would clarify this at the very beginning of the task. 

------------------------------------------------------ END ------------------------------------------------------


p.s. Have a great day! 