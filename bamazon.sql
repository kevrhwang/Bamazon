DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(128) NOT NULL,
  department_name VARCHAR(128) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT(4) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("coffee mug", "housewares", 5, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("toaster", "housewares", 25, 98);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("microwave", "housewares", 99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Nintendo Switch", "gaming", 299.95, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("PS4", "gaming", 300, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("XBOX", "gaming", 300, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Nikon Camera", "photography", 950, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("MacBook", "computing", 1400, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Nike shoes", "clothing", 94.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("iPhone charger", "computing", 29.99, 1000);