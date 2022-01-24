const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'employeedb',
    password: 'password'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected to mysql');
    startingQuestion()
});

function startingQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'startingQuestion',
            message: 'What would you like to do?',
            choices: ['View All', 'View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employees Role', 'Done']
        }
    ]).then(answer => {
        if (answer.startingQuestion === 'View All') {
            viewAll()
        } else if (answer.startingQuestion === 'View Departments') {
            viewDepartments()
        }
        else if (answer.startingQuestion === 'View Roles') {
            viewRoles()
        }
        else if (answer.startingQuestion === 'View Employees') {
            viewEmployees()
        }
        else if (answer.startingQuestion === 'Add Department') {
            addDepartment()
        }
        else if (answer.startingQuestion === 'Add Role') {
            addRole()
        }
        else if (answer.startingQuestion === 'Add Employee') {
            addEmployee()
        }
        else if (answer.startingQuestion === 'Update Employees Role') {
            update()
        } else {
            connection.end()
        }

    })
}

function viewAll() {

};

function viewDepartments() {
    connection.query('SELECT * FROM department;', (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion()
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            // get departments name
            type: 'input',
            name: 'departmentName',
            message: 'Enter Department Name'
        },
    ]).then(answer => {
        // connection query to insert into the department table
        connection.query('INSERT INTO department SET ?', (err,res) => {
            if (err) throw err;
            console.table(res);
            title: res.title;
            salary: res.salary;
            department_id: res.department_id;
        })
        connection.query('INSERT INTO department SET ?', (err,res) => {
            if (err) throw err;
            console.table(res);
            department_name: res.department_name;
            startingQuestion();
        });
    });
}


function addEmployee() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'first_name',
        message: "What is the first name?"
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name?'
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'What is their role? Salesperson, Front End Dev, Test Engineer',
        choices: [1,2,3]
    },
    {
        type:'input',
        name:'manager_id',
        message: 'Who is their manager? R. Sanchez, R. Fiennes, L. Oswald',
        choices: [1,2,3]
    }

]).then(answer => {
    connection.query('INSERT INTO employee SET ?', 
    (err, res) => {
        if (err) throw err;
        console.table(res);
        first_name: res.first_name;
        last_name: res.last_name;
        role_id: res.role_id;
        manager_id: res.manager_id;
    })
})}

function viewRoles() {
    connection.query('SELECT * FROM role_id;', (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion()
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee;', (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion()
    })
}

function addRole() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'Role Name: '
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Role Salary: '
    },
    {
        type: 'input',
        name:'department_id',
        message: ' Role ID: '
    },
]).then(answer => {
    connection.query('INSERT INTO roles SET;', 'SELECT * FROM roles', 
    (err, res) => {
        if (err) throw err;
        answer.role.title
        answer.role.salary,
        answer.role.department_id,
        console.table(res);
        startingQuestion()
    })
})}

function update() {
    connection.query('SELECT * FROM employees ;', (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion()
    })
}