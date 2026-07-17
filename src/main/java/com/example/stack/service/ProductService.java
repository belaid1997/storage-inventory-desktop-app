package com.example.stack.service;

import com.example.stack.model.Product;
import com.example.stack.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        // Business Rule: Check if SKU already exists before saving
        productRepository.findBySku(product.getSku()).ifPresent(p -> {
            throw new IllegalArgumentException("A product with SKU " + product.getSku() + " already exists.");
        });
        return productRepository.save(product);
    }
}