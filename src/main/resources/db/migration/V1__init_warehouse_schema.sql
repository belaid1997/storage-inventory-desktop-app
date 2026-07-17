

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
-- CREATE INVENTORY STORAGE TABLE (The Join Table)
CREATE TABLE inventory_storage (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   product_id BIGINT NOT NULL,
                                   location_id BIGINT NOT NULL,
                                   quantity INT NOT NULL DEFAULT 0,
                                   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                   CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                                   CONSTRAINT fk_inventory_location FOREIGN KEY (location_id) REFERENCES storage_locations(id) ON DELETE CASCADE
);