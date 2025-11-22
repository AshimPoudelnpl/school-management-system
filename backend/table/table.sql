use school_management_system;

create table users(
id int auto_increment primary key,
name varchar(100) not null,
email varchar(150) NOT null unique,
password varchar(255) not null
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
phone varchar(20) not null
);