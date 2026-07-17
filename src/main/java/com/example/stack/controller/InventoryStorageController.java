package com.example.stack.controller;

import com.example.stack.dto.InventoryStorageDTO;
import com.example.stack.service.InventoryStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryStorageController {

    @Autowired
    private InventoryStorageService inventoryStorageService;

    @GetMapping
    public List<InventoryStorageDTO> getAllStoredInventory() {
        return inventoryStorageService.getAllInventory();
    }

    // Explicitly pass single parameters or a flat DTO to keep payload decoupled
    @PostMapping
    public ResponseEntity<InventoryStorageDTO> assignToLocation(
            @RequestParam Long productId,
            @RequestParam Long locationId,
            @RequestParam Integer quantity) {

        InventoryStorageDTO updatedStock = inventoryStorageService.assignOrUpdateStock(productId, locationId, quantity);
        return ResponseEntity.ok(updatedStock);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventoryRecord(@PathVariable Long id) {
        inventoryStorageService.removeStockRecord(id);
        return ResponseEntity.noContent().build(); // 204 No Content is standard for successful deletes
    }
}