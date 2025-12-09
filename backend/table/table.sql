use school_management_system;

create table users(
id int auto_increment primary key,
name varchar(100) not null,
email varchar(150) NOT null unique,
password varchar(255) not null,
role ENUM('admin','teacher','student')  not Null default 'student'
);

insert into users(name,email,password) values
("ram","ram@gmail.com","123234"),
("shirish","shirish@gmail.com","1655234"),
("nabin ","nabin@gmail.com","12565234");


create table teacher(
id int auto_increment primary key,
name varchar(100) not null,
email varchar(150) NOT null unique,
position varchar(255) not null,
img varchar(255) not null,
phone varchar(20) not null
);

CREATE TABLE vacancy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    deadline VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
