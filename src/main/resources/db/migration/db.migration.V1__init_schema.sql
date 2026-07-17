-- src/main/resources/db/migration/V1__init_schema.sql

CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);