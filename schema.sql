DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NULL,
department_name VARCHAR(50) NULL,  
price DECIMAL (5,3),
stock_quantity INTEGER (10),
PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headphones", "electronics", 50, 20), ("speaker", "electronics", 100, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress", "clothing", 20, 100), ("shoe", "clothing", 30, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lipstick", "beauty", 19, 60), ("eyeshadow", "beauty", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sofa", "home", 150, 20), ("dresser", "home", 250, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("building blocks", "toys", 10, 100), ("stuffed animals", "toys", 15, 150);

SELECT * FROM products;