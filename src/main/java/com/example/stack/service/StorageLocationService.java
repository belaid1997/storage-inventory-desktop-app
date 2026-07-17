
package com.example.stack.service;

import com.example.stack.model.StorageLocation;
import com.example.stack.repository.StorageLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StorageLocationService {

    @Autowired
    private StorageLocationRepository storageLocationRepository;

    public List<StorageLocation> getLocationsByWarehouse(Long warehouseId) {
        return storageLocationRepository.findByWarehouseId(warehouseId);
    }

    public StorageLocation saveLocation(StorageLocation location) {
        return storageLocationRepository.save(location);
    }
}
