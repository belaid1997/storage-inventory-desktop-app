package com.example.stack.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record InventoryStorageDTO(
        Long id,
        Long productId,
        String productName,
        String sku,
        BigDecimal price,
        Long storageLocationId,
        String locationCode,
        String warehouseName,
        Integer quantity,
        LocalDateTime lastUpdated
) {}