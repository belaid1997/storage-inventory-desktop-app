package com.example.stack.service;

import com.example.stack.dto.InventoryStorageDTO;
import com.example.stack.model.InventoryStorage;
import com.example.stack.model.Product;
import com.example.stack.model.StorageLocation;
import com.example.stack.repository.InventoryStorageRepository;
import com.example.stack.repository.ProductRepository;
import com.example.stack.repository.StorageLocationRepository;
import com.example.stack.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class InventoryStorageService {

    @Autowired
    private InventoryStorageRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StorageLocationRepository locationRepository;

    // Read Operations return DTOs
    public List<InventoryStorageDTO> getAllInventory() {
        return inventoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Write Operations handle mapping and entity validation
    public InventoryStorageDTO assignOrUpdateStock(Long productId, Long locationId, Integer quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative.");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));

        StorageLocation location = locationRepository.findById(locationId)
                .orElseThrow(() -> new ResourceNotFoundException("Storage Location not found with id " + locationId));

        InventoryStorage inventory = inventoryRepository.findByProductIdAndStorageLocationId(productId, locationId)
                .map(existingStock -> {
                    existingStock.setQuantity(quantity);
                    return inventoryRepository.save(existingStock);
                }).orElseGet(() -> {
                    InventoryStorage newStock = new InventoryStorage(product, location, quantity);
                    return inventoryRepository.save(newStock);
                });

        return convertToDTO(inventory);
    }

    public void removeStockRecord(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Inventory record not found with id " + id);
        }
        inventoryRepository.deleteById(id);
    }

    // Helper method to convert Entity to DTO
    private InventoryStorageDTO convertToDTO(InventoryStorage entity) {
        return new InventoryStorageDTO(
                entity.getId(),
                entity.getProduct().getId(),
                entity.getProduct().getName(),
                entity.getProduct().getSku(),
                entity.getProduct().getPrice(),
                entity.getStorageLocation().getId(),
                entity.getStorageLocation().getCode(),
                entity.getStorageLocation().getWarehouse().getName(),
                entity.getQuantity(),
                entity.getLastUpdated()
        );
    }
}