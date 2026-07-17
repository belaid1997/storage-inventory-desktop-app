package com.example.stack.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String address;

    private String description;

    // One warehouse can have many specific storage locations (shelves/aisles)
    @OneToMany(mappedBy = "warehouse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<StorageLocation> locations = new ArrayList<>();

    public Warehouse() {}

    public Warehouse(String name, String address, String description) {
        this.name = name;
        this.address = address;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<StorageLocation> getLocations() { return locations; }
    public void setLocations(List<StorageLocation> locations) { this.locations = locations; }
}