const db = require('./db');

class Database {
    // Fetch all departments
    async getDepartments() {
        const result = await db.query('SELECT * FROM department');
        return result.rows;
    }

    // Fetch all roles
    async getRoles() {
        const result = await db.query(`
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            JOIN department ON role.department_id = department.id
        `);
        return result.rows;
    }

    // Fetch all employees
    async getEmployees() {
        const result = await db.query(`
            SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, 
                   r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
        `);
        return result.rows;
    }

    // Add a department
    async addDepartment(name) {
        await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
    }

    // Add a role
    async addRole(title, salary, departmentId) {
        await db.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, departmentId]
        );
    }

    // Add an employee
    async addEmployee(firstName, lastName, roleId, managerId) {
        await db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [firstName, lastName, roleId, managerId]
        );
    }

    // Fetch the total utilized budget for a department
    async viewTotalUtilizedBudget(departmentId) {
        const result = await db.query(
            `SELECT SUM(r.salary) AS total_budget 
             FROM employee e
             JOIN role r ON e.role_id = r.id
             WHERE r.department_id = $1`,
            [departmentId]
        );
        return result.rows[0].total_budget;
    }
}

module.exports = new Database();


