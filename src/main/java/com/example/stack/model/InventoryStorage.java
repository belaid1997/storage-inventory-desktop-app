package com.example.stack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "inventory_storage",
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "location_id"})
)
public class InventoryStorage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id", nullable = false)
    private StorageLocation storageLocation;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.lastUpdated = LocalDateTime.now();
    }

    public InventoryStorage() {}

    public InventoryStorage(Product product, StorageLocation storageLocation, Integer quantity) {
        this.product = product;
        this.storageLocation = storageLocation;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public StorageLocation getStorageLocation() { return storageLocation; }
    public void setStorageLocation(StorageLocation storageLocation) { this.storageLocation = storageLocation; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
}
