const inquirer = require('inquirer');
const sequelize = require('../config/connection'); // Importing the connection object

class CLI {
    constructor() {
        this.inquirer = inquirer;
    }
    
    async run() {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'InitialMenu',
                    message: 'Please select an option',
                    choices: ['View All Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
                }
            ]);

            switch(answers.InitialMenu) {
                case 'View All Departments':
                    this.viewDepartments();
                    break;
                case 'View all Roles':
                    this.viewRoles();
                    break;
                case 'View all Employees':
                    this.viewEmployees();
                    break;
                case 'Add a Department':
                    this.addDepartment();
                    break;
                case 'Add a Role':
                    this.addRole();
                    break;
                case 'Add an Employee':
                    this.addEmployee();
                    break;
                case 'Update an Employee Role':
                    this.updateEmployeeRole();
                    break;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async viewDepartments() {
        const { rows } = await sequelize.query('SELECT * FROM departments');
        console.log(rows);
    }

    async viewRoles() {
        const { rows } = await sequelize.query('SELECT * FROM roles');
        console.log(rows);
    }

    async viewEmployees() {
        const { rows } = await sequelize.query('SELECT * FROM employees');
        console.log(rows);
    }

    async addDepartment() {
        const departmentAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Please enter the name of the department you would like to add',
            },
        ]);
        const { rows } = await sequelize.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [departmentAnswers.department]);
        console.log(rows);
    }

    async addRole() {
        const roleAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Please enter the title of the new role ',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary of the new role ',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Please enter the department ID of the new role ',
            },
        ]);
        const { rows } = await sequelize.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [roleAnswers.title, roleAnswers.salary, roleAnswers.department_id]);
        console.log(rows);
    }

    async addEmployee() {
        const employeeAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter the first name of the new employee ',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the last name of the new employee ',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Please enter the new employees role ID ',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Please enter the new employees manager ID ',
            },
        ]);
        const { rows } = await sequelize.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [employeeAnswers.first_name, employeeAnswers.last_name, employeeAnswers.role_id, employeeAnswers.manager_id]);
        console.log(rows);
    }

    async updateEmployeeRole() {
        const updateAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Please enter the updated employee ID',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Please enter the updated role ID',
            },
        ]);
        const { rows } = await sequelize.query('UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *', [updateAnswers.role_id, updateAnswers.employee_id]);
        console.log(rows);
    }
}

module.exports = CLI;