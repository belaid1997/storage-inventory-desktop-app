package com.example.stack.service;


import com.example.stack.model.Warehouse;
import com.example.stack.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Optional<Warehouse> getWarehouseById(Long id) {
        return warehouseRepository.findById(id);
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }
}