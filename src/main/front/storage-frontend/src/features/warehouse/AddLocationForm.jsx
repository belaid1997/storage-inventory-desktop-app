import React, { useState } from 'react';
import { useStorageStore } from '../../store/useStorageStore.js';
import { MapPinPlus } from 'lucide-react';

export default function AddLocationForm({ onSuccess }) {
  const { warehouses, addStorageLocation } = useStorageStore();
  const [warehouseId, setWarehouseId] = useState('');
  const [code, setCode] = useState('');
  const [aisle, setAisle] = useState('');
  const [shelf, setShelf] = useState('');
  const [bin, setBin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const targetWarehouseId = warehouseId || warehouses[0]?.id;
    if (!targetWarehouseId) {
      setError("Please select or create a warehouse first.");
      return;
    }

    try {
      await addStorageLocation(targetWarehouseId, { code, aisle, shelf, bin });
      setCode('');
      setAisle('');
      setShelf('');
      setBin('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MapPinPlus size={20} color="#10b981" /> Add Storage Location
      </h3>

      {error && <div style={{ color: 'red', fontSize: '0.85rem' }}>⚠️ {error}</div>}

      <div className="form-group">
        <label>Select Warehouse</label>
        <select value={warehouseId} onChange={e => setWarehouseId(e.target.value)}>
          {warehouses.map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Location Code (Unique)</label>
        <input type="text" placeholder="e.g. WH1-A1-S2" value={code} onChange={e => setCode(e.target.value)} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
        <div className="form-group">
          <label>Aisle</label>
          <input type="text" placeholder="A1" value={aisle} onChange={e => setAisle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Shelf</label>
          <input type="text" placeholder="S2" value={shelf} onChange={e => setShelf(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Bin</label>
          <input type="text" placeholder="B3" value={bin} onChange={e => setBin(e.target.value)} required />
        </div>
      </div>

      <button type="submit" className="btn" style={{ backgroundColor: '#10b981' }}>Add Location</button>
    </form>
  );
}