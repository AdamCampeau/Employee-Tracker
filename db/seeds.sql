INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Tech');
INSERT INTO department (name) VALUES ('QA');

INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Front End Dev', 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Test Eng', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Rick', 'Sanchez', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ralph', 'Fiennes', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Lee','Oswald', 3, 1);