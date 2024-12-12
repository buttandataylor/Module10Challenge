const inquirer = require('inquirer');
const db = require('./queries');

// Main Menu
async function mainMenu() {
    console.log('\n=== Employee Database Management ===\n');

    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Exit',
        ],
    });

    switch (action) {
        case 'View Departments':
            console.table(await db.getDepartments());
            break;
        case 'View Roles':
            console.table(await db.getRoles());
            break;
        case 'View Employees':
            console.table(await db.getEmployees());
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }

    mainMenu();
}

// Add Department
async function addDepartment() {
    const { name } = await inquirer.prompt({
        name: 'name',
        message: 'Department Name:',
    });
    await db.addDepartment(name);
    console.log('Department added successfully.');
}

// Add Role
async function addRole() {
    const departments = await db.getDepartments();
    const { title, salary, departmentId } = await inquirer.prompt([
        { name: 'title', message: 'Role Title:' },
        { name: 'salary', message: 'Salary:', validate: input => !isNaN(input) },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Department:',
            choices: departments.map(dep => ({
                name: dep.name,
                value: dep.id,
            })),
        },
    ]);
    await db.addRole(title, salary, departmentId);
    console.log('Role added successfully.');
}

// Add Employee
async function addEmployee() {
    const roles = await db.getRoles();
    const employees = await db.getEmployees();

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { name: 'firstName', message: 'First Name:' },
        { name: 'lastName', message: 'Last Name:' },
        {
            type: 'list',
            name: 'roleId',
            message: 'Role:',
            choices: roles.map(role => ({ name: role.title, value: role.id })),
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Manager:',
            choices: [
                { name: 'None', value: null },
                ...employees.map(emp => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id,
                })),
            ],
        },
    ]);
    await db.addEmployee(firstName, lastName, roleId, managerId);
    console.log('Employee added successfully.');
}

// Start the Application
mainMenu();
