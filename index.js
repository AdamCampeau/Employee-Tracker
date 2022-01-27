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
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employees Role', 'Done']
        }
    ]).then(answer => {
        if (answer.startingQuestion === 'View Departments') {
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
        else if (answer.startingQuestion === 'Update Employee') {
            update()
        } else {
            connection.end()
        }

    })
}

// VIEW DEPARTMENTS

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        //viewDepartments();
        startingQuestion()
    })
}

// ADD DEPARTMENTS

function addDepartment() {
    inquirer.prompt([
        {
            // add department name
            type: 'input',
            name: 'department',
            message: 'Enter Department Name'
        },
        {
            // add department salary
            type: 'input',
            name: 'salary',
            message: 'Enter Department Salary'
        },
    ]).then(answer => {
        // connection query to insert into the department table
        connection.query('INSERT INTO department SET ?', (err,res) => {
            if (err) throw err;
            console.table(res);
            //title: answer.title;
            //salary: answer.salary;
            //department_id: answer.department_id;
        })
        startingQuestion();
    });
}

// ADD EMPLOYEE

function addEmployee() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'first_name',
        message: "What is their first name?"
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is their last name?'
    },
    {
        type: 'input',
        name: 'role',
        message: 'What is their role? Salesperson, Front End Dev, Test Engineer',
        choices: [1,2,3]
    },
    {
        type:'input',
        name:'manager_id',
        message: 'Who is their manager? R. Sanchez, R. Fiennes, L. Oswald',
        choices: [1,2,3]
    }

]).then(answers => {
    const params = [answers.first_name,answers.last_name,answers.role, answers.manager_id]
    connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',params,(err, res) => {
        if (err) throw err;
        console.table(res);
    })
    startingQuestion();
})}

// VIEW ROLES

function viewRoles() {
    connection.query('SELECT * FROM role; ', (err, res) => {
        if (err) throw err;
        console.table(res);
        // viewRoles();
        startingQuestion()
    })
}

// VIEW EMPLOYEES

function viewEmployees() {
    connection.query('SELECT * FROM employee;', (err, res) => {
        if (err) throw err;
        console.table(res);
        //viewEmployees();
        startingQuestion()
    })
}

// ADD ROLE
// SALARY MUST USE INTEGER WITH NO SPECIAL CHARACTERS OR SPACES 

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
        message: 'Salary: '
    },
    {
        type: 'input',
        name:'department_id',
        message: 'Select Department: Sales, Technology, QA ',
        choices:[1,2,3]
    },
]).then(answer => {
    const params = [answer.title, answer.salary, answer.department_id]
    connection.query('INSERT INTO role (title,salary,department_id) VALUES (?, ?, ?)',params,(err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion()
    })
})}


// UPDATE EMPLOYEE FIELD PROMPT

function update() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'update',
            message: 'What would you like to do?',
            choices: ['Update Department', 'Update Salary', 'Back']
        }
    ]).then(answer => {
        if (answer.update === 'Update Department') {
            updateDepartment()
        }
        else if (answer.update === 'Update Salary') {
            updateSalary()
        } else {
            startingQuestion()
        }
    })
}     
   
// UPDATE EMPLOYEE DEPARTMENT

function updateDepartment() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'last_name',
        message: 'Select employee by last name: R.Sanchez, R.Fiennes, L.Oswald',
        choices:[1,2,3]
    },
    {
        // add department name
        type: 'input',
        name: 'department',
        message: 'Update Department Name'
    },

]).then(answers => {
    const updateParams = [answers.role_id]
    connection.query('UPDATE role_id SET = ? WHERE last_name = ?'),updateParams,(err, res) => {
        if (err) throw err;
        console.table(res);
    };
})}


// UPDATE EMPLOYEE SALARY

function updateSalary() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'last_name',
        message: 'Select employee by last name: R.Sanchez, R.Fiennes, L.Oswald',
        choices:[1,2,3]
    },
    {
        // add department name
        type: 'input',
        name: 'dsalary',
        message: 'Update salary'
    },

]).then(answers => {
    const updateParams = [answers.role_id]
    connection.query('UPDATE salary SET = ? WHERE last_name = ?'),updateParams,(err, res) => {
        if (err) throw err;
        console.table(res);
    };
})}
