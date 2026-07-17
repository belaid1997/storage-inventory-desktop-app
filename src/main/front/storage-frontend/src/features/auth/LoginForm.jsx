import React, { useState } from 'react';
import { useStorageStore } from '../../store/useStorageStore';
import { Lock, User } from 'lucide-react';

export default function LoginForm() {
    const login = useStorageStore((state) => state.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [localLoading, setLocalLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLocalLoading(true);

        try {
            await login(username, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: '#eff6ff', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                        <Lock size={32} color="#2563eb" />
                    </div>
                    <h2 style={{ margin: 0 }}>System Sign In</h2>
                    <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>Enter your operator credentials</p>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '0.75rem', color: '#991b1b', marginBottom: '1rem', fontSize: '0.9rem', borderRadius: '4px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={16} /> Username
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. admin"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Lock size={16} /> Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }} disabled={localLoading}>
                        {localLoading ? "Verifying..." : "Access Storage Control"}
                    </button>
                </form>
            </div>
        </div>
    );
}