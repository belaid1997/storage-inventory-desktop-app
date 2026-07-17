package com.example.stack.controller;

import com.example.stack.model.Warehouse;
import com.example.stack.model.StorageLocation;
import com.example.stack.service.WarehouseService;
import com.example.stack.service.StorageLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
@CrossOrigin(origins = "http://localhost:5173")
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private StorageLocationService storageLocationService;

    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.saveWarehouse(warehouse);
    }

    @GetMapping("/{id}/locations")
    public List<StorageLocation> getLocationsByWarehouse(@PathVariable Long id) {
        return storageLocationService.getLocationsByWarehouse(id);
    }

    @PostMapping("/{id}/locations")
    public ResponseEntity<StorageLocation> addLocationToWarehouse(@PathVariable Long id, @RequestBody StorageLocation location) {
        return warehouseService.getWarehouseById(id).map(warehouse -> {
            location.setWarehouse(warehouse);
            StorageLocation savedLocation = storageLocationService.saveLocation(location);
            return ResponseEntity.ok(savedLocation);
        }).orElse(ResponseEntity.notFound().build());
    }
}