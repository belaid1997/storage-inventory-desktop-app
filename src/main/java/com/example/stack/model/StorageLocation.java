package com.example.stack.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "storage_locations")
public class StorageLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code; // e.g., "N-A1-S1"

    private String aisle;
    private String shelf;
    private String bin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    @JsonBackReference // Prevents infinite recursion by ignoring the parent reference during serialization
    private Warehouse warehouse;

    public StorageLocation() {}

    public StorageLocation(String code, String aisle, String shelf, String bin, Warehouse warehouse) {
        this.code = code;
        this.aisle = aisle;
        this.shelf = shelf;
        this.bin = bin;
        this.warehouse = warehouse;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getAisle() { return aisle; }
    public void setAisle(String aisle) { this.aisle = aisle; }

    public String getShelf() { return shelf; }
    public void setShelf(String shelf) { this.shelf = shelf; }

    public String getBin() { return bin; }
    public void setBin(String bin) { this.bin = bin; }

    public Warehouse getWarehouse() { return warehouse; }
    public void setWarehouse(Warehouse warehouse) { this.warehouse = warehouse; }
}