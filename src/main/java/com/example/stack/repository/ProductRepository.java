package com.example.stack.repository;


import com.example.stack.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find a product by its unique SKU code
    Optional<Product> findBySku(String sku);
}