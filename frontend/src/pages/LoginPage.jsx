import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('driver@curbly.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate(data.user.role === 'owner' ? '/host/dashboard' : '/explore');
    } catch (err) {
      setError('Unable to reach server. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Car size={26} color="#10b981" />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>Sign in to Curbly</h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.35rem' }}>
            Access verified parking discovery and space bookings
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
              Email Address
            </label>
            <input 
              type="email"
              required
              placeholder="e.g. driver@curbly.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                Password
              </label>
              <span style={{ fontSize: '0.8rem', color: '#2563eb', cursor: 'pointer' }}>Forgot?</span>
            </div>
            <input 
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>

          {/* Quick Demo Credentials Pill */}
          <div style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '0.6rem 0.85rem',
            fontSize: '0.78rem',
            color: '#065f46'
          }}>
            <strong>Demo Credentials:</strong><br />
            Driver: <code>driver@curbly.com</code> | <code>password123</code><br />
            Host: <code>vikram.host@curbly.com</code> | <code>HostSecretPass123</code>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '0.85rem',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.95rem',
              marginTop: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)'
            }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: '700' }}>
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
