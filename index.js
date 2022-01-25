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
    connection.query('SELECT * FROM department FULL OUTER JOIN roles ON department ?', (err,res) => {
    if (err) throw err;
        console.table(res);
        viewAll();
        startingQuestion()
    })
}

function viewDepartments() {
    connection.query('SELECT * FROM department ?', (err, res) => {
        if (err) throw err;
        console.table(res);
        viewDepartments();
        startingQuestion()
    })
}

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
        {
            // get department_id
            type: 'input',
            name: 'department_id',
            message: 'Enter Department Name'
        },
    ]).then(answer => {
        // connection query to insert into the department table
        connection.query('INSERT INTO department SET ?', (err,res) => {
            if (err) throw err;
            console.table(res);
            title: answer.title;
            salary: answer.salary;
            department_id: answer.department_id;
        })
        //connection.query('INSERT INTO department SET ?', (err,res) => {
        //    if (err) throw err;
        //    console.table(res);
        //   answer.department_name  === department_name   
        //});
        addDepartment();
        startingQuestion();
    });
}


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
        first_name: answer.first_name;
        last_name: answer.last_name;
        role_id: answer.role_id;
        manager_id: answer.manager_id;
    })
})}

function viewRoles() {
    connection.query('SELECT * FROM role_id ?', (err, res) => {
        if (err) throw err;
        console.table(res);
        viewRoles();
        startingQuestion()
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee ?', (err, res) => {
        if (err) throw err;
        console.table(res);
        viewEmployees();
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
        message: 'Salary: '
    },
    {
        type: 'input',
        name:'department_id',
        message: 'Department: '
    },
]).then(answer => {
    connection.query('INSERT INTO roles SET', 'SELECT * FROM roles', 
    (err, res) => {
        if (err) throw err;
        title: answer.role.title;
        salary: answer.role.salary;
        department_id: answer.role.department_id;
        console.table(res);
        addRole();
        startingQuestion()
    })
})}

function update() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'update',
            message: 'What would you like to do?',
            choices: ['Update All', 'Update Departments', 'Update Roles', 'Update Employees', 'Update Department', 'Update Role', 'Update Employee', 'Update Employees Role', 'Done']
        }
    ]).then(answer => {
        if (answer.startingQuestion === 'Update All') {
            updateAll()
        } else if (answer.startingQuestion === 'Update Departments') {
            updateDepartments()
        }
        else if (answer.startingQuestion === 'Update Roles') {
            updateRoles()
        }
        else if (answer.startingQuestion === 'View Employees') {
            viewEmployees()
        }
        else if (answer.startingQuestion === 'Update Department') {
            addDepartment()
        }
        else if (answer.startingQuestion === 'Update Role') {
            addRole()
        }
        else if (answer.startingQuestion === 'Update Employee') {
            addEmployee()
        }
        else if (answer.startingQuestion === 'Update Employees Role') {
            update()
        } else {
            connection.end()
        }

    })
}
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
    })

    inquirer.prompt([{
        type: 'input',
        name: 'employee',
        message: 'Please enter the LAST NAME of the EMPLOYEE',
    },
    {
        type: "input",
        name: "role_id",
        message: "What is their current role? Sales Person, Front End Dev, Test Eng, Create New ",
        choices: [1,2,3,addRole],
    },
        if (err) throw err;
    })})
