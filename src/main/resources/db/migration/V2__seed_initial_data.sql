-- Seed Initial Warehouses
INSERT INTO warehouses (name, address) VALUES
                                           ('North Logistics Hub', '100 Industrial Parkway, Section A'),
                                           ('East Coast Distribution', '450 Maritime Blvd, Dock 4');

-- Seed Initial Products Catalog
INSERT INTO products (sku, name, description, price) VALUES
                                                         ('LAP-HP-PRO', 'HP EliteBook Laptop', 'Core i7, 16GB RAM, 512GB SSD', 1199.99),
                                                         ('MON-DEL-27', 'Dell 27" 4K Monitor', 'UltraSharp USB-C IPS Display', 449.50),
                                                         ('KEY-LOG-MX', 'Logitech MX Keys', 'Wireless Illuminated Keyboard', 99.99);

-- Seed Initial Storage Locations for Warehouse 1
INSERT INTO storage_locations (warehouse_id, code, aisle, shelf, bin) VALUES
                                                                          (1, 'WH1-A1-S1', 'A1', 'S1', 'B1'),
                                                                          (1, 'WH1-A1-S2', 'A1', 'S2', 'B1'),
                                                                          (1, 'WH1-B3-S4', 'B3', 'S4', 'B1');