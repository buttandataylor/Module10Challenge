const { Pool } = require('pg');
const inquirer = require('inquirer');

// Configure the PostgreSQL connection
const pool = new Pool({
    user: 'taylormaadison',       
    host: 'localhost',            
    password: 'Bootcamp20241212', 
    port: 5432,                   
});

// Export a query function for executing SQL
module.exports = {
    query: (text, params) => pool.query(text, params),
    
    // Function to view all departments
    viewDepartments: async () => {
        const result = await pool.query('SELECT * FROM department');
        return result.rows;
    },
    
    // Function to view all roles
    viewRoles: async () => {
        const result = await pool.query(
            `SELECT role.id AS role_id, role.title, role.salary, department.name AS department 
            FROM role
            JOIN department ON role.department_id = department.id`
        );
        return result.rows;
    },
    
    // Function to view all employees
    viewEmployees: async () => {
        const result = await pool.query(
            `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, 
            role.title AS role, department.name AS department, role.salary, 
            employee.manager_id AS manager 
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id`
        );
        return result.rows;
    },
    
    // Function to add a department
    addDepartment: async (name) => {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    },
    
    // Function to add a role
    addRole: async (title, salary, department_id) => {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    },
    
    // Function to add an employee
    addEmployee: async (first_name, last_name, role_id, manager_id) => {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    },
    
    // Function to update an employee role
    updateEmployeeRole: async (employee_id, new_role_id) => {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
    }
};
