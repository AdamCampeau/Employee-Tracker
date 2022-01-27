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
        else if (answer.startingQuestion === 'Update Employees Role') {
            update()
        } else {
            connection.end()
        }

    })
}

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        //viewDepartments();
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
        // addDepartment();
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
    const params = [answers.first_name, answers.last_name, answer.role, answer.manager_id]
    connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',params,(err, res) => {
        if (err) throw err;
        console.table(res);
        
        //first_name: answer.first_name;
        //last_name: answer.last_name;
        //role_id: answer.role_id;
        //manager_id: answer.manager_id;
    })
})}

function viewRoles() {
    connection.query('SELECT * FROM role; ', (err, res) => {
        if (err) throw err;
        console.table(res);
        // viewRoles();
        startingQuestion()
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee;', (err, res) => {
        if (err) throw err;
        console.table(res);
        //viewEmployees();
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
    connection.query('INSERT INTO role SET;', 
    (err, res) => {
        if (err) throw err;
        title: answer.role_id.title;
        salary: answer.role_id.salary;
        department_id: answer.role_id.department_id;
        console.table(res);
        addRole();
        startingQuestion()
    })
})}


// similiar to startingQuestions, updates tables

function update() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'update',
            message: 'What would you like to do?',
            choices: ['Update All', 'Update Department', 'Update Role', 'Update Employee','Update Salary', 'Done']
        }
    ]).then(answer => {
        if (answer.update === 'Update All') {
            updateAll()
        } else if (answer.update === 'Update Department') {
            updateDepartment()
        }
        else if (answer.update === 'Update Role') {
            updateRole()
        }
        else if (answer.update === 'Update Employee') {
            updateEmployee()
        } else {
            connection.end()
        }

    })
}

function updateAll() {
    updateEmployee();
    updateRole();
    updateDepartment();
    update()
}

function updateDepartment() {
    inquirer.prompt([
        {
            // select department name
            type: 'input',
            name: 'department',
            message: 'Select Department: Salesperson, Front End Dev, Test Engineer',
            choices:[1,2,3]
        },
        {
            // update department name
            type: 'input',
            name: 'department',
            message: 'Update Department Name'
        },
        {
            // update department salary
            type: 'input',
            name: 'salary',
            message: 'Update Department Salary'
        },
        {
            // update department_id
            type: 'input',
            name: 'department_id',
            message: 'Update Department Name'
        },
    ]).then(answer => {
        // connection query to insert into the department table
        connection.query('UPDATE department, SET department ?', (err,res) => {
            if (err) throw err;
            console.table(res);
            title: answer.title;
            salary: answer.salary;
            department_id: answer.department_id; 
            updateDepartment();
            update();
        });
    })}

function updateEmployee() {
        inquirer.prompt([
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name? Fiennes, Oswald, Sanchez',
            choices: [2,1,3]
            
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
        connection.query('UPDATE employee, SET employee ?', 
        (err, res) => {
            if (err) throw err;
            console.table(res);
            first_name: answer.first_name;
            last_name: answer.last_name;
            role_id: answer.role_id;
            manager_id: answer.manager_id;
            updateEmployee();
            update();
        })
    })}

function updateRole() {
        inquirer.prompt([
        {
            type: 'input',
            name: 'role_id',
            message: 'Select Role to Update: Salesperson, Front End Dev, Test Eng',
            choices: [1,2,3]
                
        },
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
        connection.query('SELECT role, UPDATE role ', 
        (err, res) => {
            if (err) throw err;
            title: answer.role_id.title;
            salary: answer.role_id.salary;
            department_id: answer.role_id.department_id;
            console.table(res);
            updateRole();
            update()
        })
    })}
    
