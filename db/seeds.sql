INSERT INTO departments (dep_name)
VALUES ('Math'),
       ('Science'),
        ('English'),
        ('History'),
        ('Art'),
        ('Music'),
        ('Physical Education'),
        ('Computer Science'),
        ('Foreign Language');


INSERT INTO roles (title, salary, departments)
VALUES ('Math Teacher', 75000, 1),
       ('Science Teacher', 70000, 2),
       ('English Teacher', 50000, 3),
       ('History Teacher', 50000, 4),
       ('Art Teacher', 25000, 5),
       ('Music Teacher', 25000, 6),
       ('Physical Education Teacher', 50000, 7),
       ('Computer Science Teacher', 100000, 8),
       ('Foreign Language Teacher', 50000, 9);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Stevens', 1, NULL),
       ('Jane', 'Fram', 2, 1),
       ('Jim', 'Dole', 3, 1),
       ('Jill', 'Dool', 4, 1),
       ('Jack', 'Douge', 5, 1),
       ('Jenny', 'Mcbridge', 6, 1),
       ('Jared', 'Macbeth', 7, 1),
       ('Jasmine', 'Fraj', 8, 1),
       ('Jared', 'Doe', 9, 1);