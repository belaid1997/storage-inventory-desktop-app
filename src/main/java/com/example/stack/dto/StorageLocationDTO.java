package com.example.stack.dto;

public record StorageLocationDTO(
        Long id,
        String code,
        String aisle,
        String shelf,
        String bin,
        Long warehouseId
) {}