CREATE DATABASE IF NOT EXISTS node_challenge_db;

USE node_challenge_db;

CREATE TABLE IF NOT EXISTS people (
    id int not null auto_increment,
    name varchar(255),
    primary key (id)
)