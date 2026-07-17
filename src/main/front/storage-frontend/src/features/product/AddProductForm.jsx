import React, { useState } from 'react';
import { useStorageStore } from '../../store/useStorageStore.js';
import { PackagePlus } from 'lucide-react';

export default function AddProductForm({ onSuccess }) {
  const addProduct = useStorageStore((state) => state.addProduct);
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await addProduct({ 
        sku, 
        name, 
        description, 
        price: parseFloat(price) 
      });
      // Reset form
      setSku('');
      setName('');
      setDescription('');
      setPrice('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PackagePlus size={20} color="#2563eb" /> Add Catalog Product
      </h3>
      
      {error && <div style={{ color: 'red', fontSize: '0.85rem' }}>⚠️ {error}</div>}

      <div className="form-group">
        <label>SKU Code (Unique)</label>
        <input type="text" placeholder="e.g. LAP-HP-01" value={sku} onChange={e => setSku(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Product Name</label>
        <input type="text" placeholder="e.g. HP Laptop" value={name} onChange={e => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Price ($)</label>
        <input type="number" step="0.01" min="0" placeholder="999.99" value={price} onChange={e => setPrice(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input type="text" placeholder="Brief details..." value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <button type="submit" className="btn">Add Product</button>
    </form>
  );
}