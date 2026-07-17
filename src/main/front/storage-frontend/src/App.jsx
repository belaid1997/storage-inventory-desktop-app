import React, { useEffect, useState } from 'react';
import { useStorageStore } from './store/useStorageStore';
import LoginForm from './features/auth/LoginForm';
import AddProductForm from './features/product/AddProductForm';
import AddLocationForm from './features/warehouse/AddLocationForm';
import { Warehouse, Package, Move, Trash2, Plus, X, LogOut, User } from 'lucide-react';

function App() {
  const {
    inventory,
    warehouses,
    products,
    loading,
    error,
    token,
    user,
    fetchDashboardData,
    removeStock,
    assignStock,
    logout
  } = useStorageStore();

  // Component local states
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch data immediately if we have a token
  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, fetchDashboardData]);

  // Handle dropdown selections once data is populated
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0].id);
    }
  }, [products]);

  const allLocations = warehouses.flatMap(wh =>
      (wh.locations || []).map(loc => ({
        id: loc.id,
        label: `${wh.name} ➡️ ${loc.code} (Aisle ${loc.aisle}, Shelf ${loc.shelf})`
      }))
  );

  useEffect(() => {
    if (allLocations.length > 0 && !selectedLocation) {
      setSelectedLocation(allLocations[0].id);
    }
  }, [warehouses]);

  const handleAssignStock = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !selectedLocation) return;
    try {
      await assignStock(selectedProduct, selectedLocation, quantity);
      setQuantity(1);
    } catch (err) {
      // Handled by store global errors
    }
  };

  // 🛡️ SECURITY GUARD: If there is no valid token, render the login page!
  if (!token) {
    return <LoginForm />;
  }

  return (
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Warehouse size={40} color="#2563eb" />
            <div>
              <h1 style={{ margin: 0 }}>Warehouse Storage System</h1>
              <p style={{ margin: 0, color: '#64748b' }}>Track physical catalog placements</p>
            </div>
          </div>

          {/* User Info & Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '20px' }}>
              <User size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user}</span>
            </div>

            <button
                onClick={() => setShowAddPanel(!showAddPanel)}
                className="btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: showAddPanel ? '#64748b' : '#2563eb'
                }}
            >
              {showAddPanel ? <X size={18} /> : <Plus size={18} />}
              {showAddPanel ? "Close Form Panel" : "Add New Item / Location"}
            </button>

            <button
                onClick={logout}
                className="btn btn-danger"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {error && (
            <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', color: '#991b1b' }}>
              <strong>System Message:</strong> {error}
            </div>
        )}

        {showAddPanel && (
            <div className="card" style={{ border: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <AddProductForm onSuccess={() => alert("Product added successfully!")} />
                <AddLocationForm onSuccess={() => alert("Location added successfully!")} />
              </div>
            </div>
        )}

        {loading && inventory.length === 0 ? (
            <p>Updating warehouse state...</p>
        ) : (
            <div className="dashboard">
              <section className="card">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
                  <Package size={24} /> Storage Grid
                </h2>
                <div className="table-container">
                  <table>
                    <thead>
                    <tr>
                      <th>Warehouse</th>
                      <th>Location Code</th>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Qty Stored</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventory.map((item) => (
                        <tr key={item.id}>
                          <td><strong>{item.warehouseName}</strong></td>
                          <td><code>{item.locationCode}</code></td>
                          <td>{item.productName}</td>
                          <td><small>{item.sku}</small></td>
                          <td><strong>{item.quantity} units</strong></td>
                          <td>
                            <button
                                onClick={() => removeStock(item.id)}
                                className="btn btn-danger"
                                style={{ padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </td>
                        </tr>
                    ))}
                    {inventory.length === 0 && (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', color: '#64748b' }}>
                            No physical stock registered. Assign a product to a physical shelf below!
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </section>

              <aside>
                <div className="card">
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
                    <Move size={24} /> Store Inventory
                  </h2>
                  <form onSubmit={handleAssignStock}>
                    <div className="form-group">
                      <label>Select Catalog Item</label>
                      <select
                          value={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                      >
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                        ))}
                        {products.length === 0 && <option>No products in database</option>}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Select Physical Shelf Location</label>
                      <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                      >
                        {allLocations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.label}</option>
                        ))}
                        {allLocations.length === 0 && <option>No storage spots configured</option>}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Quantity to Store</label>
                      <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        disabled={products.length === 0 || allLocations.length === 0}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
                    >
                      <Plus size={18} /> Update Storage Level
                    </button>
                  </form>
                </div>
              </aside>
            </div>
        )}
      </div>
  );
}

export default App;