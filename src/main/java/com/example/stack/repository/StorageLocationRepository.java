package com.example.stack.repository;


import com.example.stack.model.StorageLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorageLocationRepository extends JpaRepository<StorageLocation, Long> {
    // Custom query to find all locations belonging to a specific warehouse
    List<StorageLocation> findByWarehouseId(Long warehouseId);
}