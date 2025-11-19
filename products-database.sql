CREATE DATABASE Chachastore;
GO

use Chachastore;
GO
-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS products;
CREATE TABLE products (
productId int(10) unsigned DEFAULT NULL,
productCategory varchar(20) DEFAULT NULL,
productSubCategory varchar(20) DEFAULT NULL,
productName varchar(20) DEFAULT NULL,
unitPrice float(8,2) DEFAULT NULL,
unitQuantity varchar(15) DEFAULT NULL,
inStock int(10) unsigned DEFAULT NULL
);
GO
-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO products VALUES (10011, 'Raw Meat', 'Seafood', 'Fish Fingers', 2.55, '500 gram', 1500);
INSERT INTO products VALUES (10012, 'Raw Meat', 'Seafood', 'Fish Fingers', 5.00, '1000 gram', 750);
INSERT INTO products VALUES (10013, 'Raw Meat', 'Seafood', 'Shelled Prawns', 6.90, '250 gram', 300);
INSERT INTO products VALUES (10021, 'Raw Meat', 'Deli', 'Hamburger Patties', 2.35, 'Pack 10', 1200);
INSERT INTO products VALUES (10022, 'Raw Meat', 'Deli', 'T Bone Steak', 7.00, '1000 gram', 200);
INSERT INTO products VALUES (20011, 'Dairy', 'Frozen', 'Tub Ice Cream', 1.80, 'I Litre', 800);
INSERT INTO products VALUES (20012, 'Dairy', 'Frozen', 'Tub Ice Cream', 3.40, '2 Litre', 1200);
INSERT INTO products VALUES (20021, 'Dairy', 'Cheese', 'Cheddar Cheese', 8.00, '500 gram', 1000);
INSERT INTO products VALUES (20022, 'Dairy', 'Cheese', 'Cheddar Cheese', 15.00, '1000 gram', 1000);
INSERT INTO products VALUES (30011, 'Drinks', 'Alcohol', 'Ginger Beers', 6.60, 'Pack 6', 500);
INSERT INTO products VALUES (30012, 'Drinks', 'Alcohol', 'Wine', 16.60, 'Bottle', 500);
INSERT INTO products VALUES (30021, 'Drinks', 'Smoothie', 'Smooth fruit', 6.60, 'Bottle', 500);
INSERT INTO products VALUES (30031, 'Drinks', 'Soft Drinks', 'Coke', 3.60, 'Can', 500);
INSERT INTO products VALUES (30041, 'Drinks', 'Coffee', 'Instant Coffee', 2.89, '200 gram', 500);
INSERT INTO products VALUES (30042, 'Drinks', 'Coffee', 'Instant Coffee', 5.10, '500 gram', 500);
INSERT INTO products VALUES (40011, 'Breads & Sweets', 'Breads', 'White Breads', 8.00, '500 gram', 1000);
INSERT INTO products VALUES (40012, 'Breads & Sweets', 'Breads', 'Multigrains Breads', 8.00, '500 gram', 1000);
INSERT INTO products VALUES (40021, 'Breads & Sweets', 'Sweets', 'Chocolate Bar', 2.50, '500 gram', 300)
INSERT INTO products VALUES (40022, 'Breads & Sweets', 'Sweets', 'Oranges Candy', 3.99, 'Bag 20', 200);
INSERT INTO products VALUES (50011, 'Fruits & Veges', 'Fruits', 'Bananas', 1.49, 'Kilo', 400);
INSERT INTO products VALUES (50012, 'Fruits & Veges', 'Fruits', 'Peaches', 2.99, 'Kilo', 500);
INSERT INTO products VALUES (50013, 'Fruits & Veges', 'Fruits', 'Grapes', 3.50, 'Kilo', 200);
INSERT INTO products VALUES (50014, 'Fruits & Veges', 'Fruits', 'Apples', 1.99, 'Kilo', 500);
INSERT INTO products VALUES (50021, 'Fruits & Veges', 'Veges', 'Spinach', 1.99, 'Kilo', 500);
INSERT INTO products VALUES (50022, 'Fruits & Veges', 'Veges', 'Carrots', 1.99, 'Kilo', 500);
GO