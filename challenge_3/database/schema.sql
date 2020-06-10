CREATE DATABASE checkout;

USE checkout;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  shipAddress1 VARCHAR(255),
  shipAddress2 VARCHAR(255),
  shipCity VARCHAR(255),
  shipState VARCHAR(255),
  shipZip INT,
  creditNum INT,
  creditExp DATE,
  CVV INT,
  billZip INT
);