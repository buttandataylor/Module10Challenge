-- Insert Departments
INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('HR');

-- Insert Roles
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Software Engineer', 90000, 1),
    ('Sales Manager', 70000, 2),
    ('HR Specialist', 60000, 3);

-- Insert Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Taylor', 'Martinez', 2, NULL),
    ('Juan', 'Corona', 3, 2);
