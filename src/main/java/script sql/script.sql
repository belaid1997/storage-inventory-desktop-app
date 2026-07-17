-- 1. Create a new local user with a secure password
CREATE USER 'stock_user'@'localhost' IDENTIFIED BY 'MySecurePassword2026!';

-- 2. Grant all privileges ONLY on your storage database to this new user
GRANT ALL PRIVILEGES ON storage_gestion.* TO 'stock_user'@'localhost';

-- 3. Apply the changes immediately
FLUSH PRIVILEGES;


-- 1. Create the database
CREATE DATABASE IF NOT EXISTS storage_gestion;
USE storage_gestion;

-- 2. Create the Warehouses (Zones) table
CREATE TABLE IF NOT EXISTS warehouses (
                                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                          name VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'Main Warehouse', 'Cold Room'
    address VARCHAR(255),
    description VARCHAR(255)
    );

-- 3. Create the Specific Storage Locations table (Aisles, Shelves, Bins)
CREATE TABLE IF NOT EXISTS storage_locations (
                                                 id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                                 warehouse_id BIGINT NOT NULL,
                                                 code VARCHAR(50) NOT NULL UNIQUE, -- Unique location code (e.g., 'W1-A3-S2' for Warehouse 1, Aisle 3, Shelf 2)
    aisle VARCHAR(50),
    shelf VARCHAR(50),
    bin VARCHAR(50),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE
    );

-- 4. Create the Products table
CREATE TABLE IF NOT EXISTS products (
                                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                        sku VARCHAR(50) NOT NULL UNIQUE, -- Stock Keeping Unit code
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- 5. Create the Inventory Storage table (Links products to physical storage locations)
CREATE TABLE IF NOT EXISTS inventory_storage (
                                                 id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                                 product_id BIGINT NOT NULL,
                                                 location_id BIGINT NOT NULL,
                                                 quantity INT NOT NULL DEFAULT 0,
                                                 last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                 UNIQUE KEY unique_product_location (product_id, location_id), -- A product can only have one entry per specific location
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES storage_locations(id) ON DELETE CASCADE
    );
