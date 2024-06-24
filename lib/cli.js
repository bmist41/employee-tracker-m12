const inquirer = require('inquirer');
const pool = require('./config/connectionn'); // Do I need a database connection

class CLI {
    constructor() {
        this.inquirer = inquirer;
    }
    
    async run() {
        const inquirer = await import('inquirer');
        return inquirer.default
            .prompt([
                {
                    type: 'list',
                    name: 'InitialMenu',
                    message: 'Please select an option',
                    choices: ['View All Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
                },
        
            ])
            .then((answers) => {
                switch(answers.InitialMenu) {
                    case 'View All Departments':
                        pool.query('SELECT * FROM departments', function (_err, {rows}) {
                            console.log(rows);
                        });
                        break;
                    case 'View all Roles':
                        pool.query('SELECT * FROM roles', function (err, {rows}) {
                            console.log(rows);
                        });
                        break;
                    case 'View all Employees':
                        pool.query('SELECT * FROM employees', function (err, {rows}) {
                            console.log(rows);
                        });
                        break;
                    case 'Add a Department':
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'department',
                                message: 'Please enter the name of the department you would like to add',
                            },
                        ])
                        .then((answers) => {
                            pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.department], function (err, {rows}) {
                                console.log(rows);
                            });
                        });
                        break;
                    case 'Add a Role':
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'title',
                                message: 'Please enter the title of the role you would like to add',
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: 'Please enter the salary of the role you would like to add',
                            },
                            {
                                type: 'input',
                                name: 'department_id',
                                message: 'Please enter the department ID of the role you would like to add',
                            },
                        ])
                        .then((answers) => {
                            pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id], function (err, {rows}) {
                                console.log(rows);
                            });
                        });
                        break;
                    case 'Add an Employee':
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'first_name',
                                message: 'Please enter the first name of the employee you would like to add',
                            },
                            {
                                type: 'input',
                                name: 'last_name',
                                message: 'Please enter the last name of the employee you would like to add',
                            },
                            {
                                type: 'input',
                                name: 'role_id',
                                message: 'Please enter the role ID of the employee you would like to add',
                            },
                            {
                                type: 'input',
                                name: 'manager_id',
                                message: 'Please enter the manager ID of the employee you would like to add',
                            },
                        ])
                        .then((answers) => {
                            pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function (err, {rows}) {
                                console.log(rows);
                            });
                        });
                        break;
                    case 'Update an Employee Role':
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'employee_id',
                                message: 'Please enter the employee ID of the employee you would like to update',
                            },
                            {
                                type: 'input',
                                name: 'role_id',
                                message: 'Please enter the role ID you would like to update for the employee',
                            },
                        ])
                        .then((answers) => {
                            pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id], function (err, {rows}) {
                                console.log(rows);
                            });
                        });
                        break;
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }
}

module.exports = CLI;
