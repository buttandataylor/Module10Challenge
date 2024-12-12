const inquirer = require('inquirer');
const db = require('../db/db'); // Updated to reflect the new location

// Function to handle viewing all departments
const handleViewDepartments = async () => {
    const departments = await db.viewDepartments();
    console.table(departments);
};

// Function to handle viewing all roles
const handleViewRoles = async () => {
    const roles = await db.viewRoles();
    console.table(roles);
};

// Function to handle viewing all employees
const handleViewEmployees = async () => {
    const employees = await db.viewEmployees();
    console.table(employees);
};

// Function to handle adding a department
const handleAddDepartment = async () => {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:'
    });
    await db.addDepartment(name);
    console.log('Department added successfully!');
};

// Function to handle adding a role
const handleAddRole = async () => {
    const { title, salary, department_id } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the salary for this role:' },
        { type: 'input', name: 'department_id', message: 'Enter the department id:' }
    ]);
    await db.addRole(title, salary, department_id);
    console.log('Role added successfully!');
};

// Function to handle adding an employee
const handleAddEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter the employee’s first name:' },
        { type: 'input', name: 'last_name', message: 'Enter the employee’s last name:' },
        { type: 'input', name: 'role_id', message: 'Enter the role id for the employee:' },
        { type: 'input', name: 'manager_id', message: 'Enter the manager id for the employee (if any):' }
    ]);
    await db.addEmployee(first_name, last_name, role_id, manager_id);
    console.log('Employee added successfully!');
};

// Function to handle updating an employee role
const handleUpdateEmployeeRole = async () => {
    const employees = await db.viewEmployees();
    const roles = await db.viewRoles();

    const { employee_id, new_role_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select an employee to update:',
            choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.employee_id }))
        },
        {
            type: 'list',
            name: 'new_role_id',
            message: 'Select the new role for the employee:',
            choices: roles.map(role => ({ name: role.title, value: role.role_id }))
        }
    ]);

    await db.updateEmployeeRole(employee_id, new_role_id);
    console.log('Employee role updated successfully!');
};

// Function to handle the main menu
const mainMenu = async () => {
    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (choice) {
        case 'View all departments':
            await handleViewDepartments();
            break;
        case 'View all roles':
            await handleViewRoles();
            break;
        case 'View all employees':
            await handleViewEmployees();
            break;
        case 'Add a department':
            await handleAddDepartment();
            break;
        case 'Add a role':
            await handleAddRole();
            break;
        case 'Add an employee':
            await handleAddEmployee();
            break;
        case 'Update an employee role':
            await handleUpdateEmployeeRole();
            break;
        case 'Exit':
            process.exit();
    }

    mainMenu();
};

// Start the application
mainMenu();


