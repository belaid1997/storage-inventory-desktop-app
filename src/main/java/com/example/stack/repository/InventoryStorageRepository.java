package com.example.stack.repository;


import com.example.stack.model.InventoryStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryStorageRepository extends JpaRepository<InventoryStorage, Long> {

    // Find stock level of a specific product at a specific location
    Optional<InventoryStorage> findByProductIdAndStorageLocationId(Long productId, Long storageLocationId);

    // Find where a specific product is stored across the entire system
    List<InventoryStorage> findByProductId(Long productId);

    // Get all inventory stored in a specific location
    List<InventoryStorage> findByStorageLocationId(Long storageLocationId);
}