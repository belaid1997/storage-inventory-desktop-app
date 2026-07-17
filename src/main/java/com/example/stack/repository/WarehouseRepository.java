package com.example.stack.repository;

import com.example.stack.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    // Standard CRUD operations for Warehouse
}