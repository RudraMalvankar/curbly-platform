import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Search, Shield, CreditCard, Building, User, LogOut, ArrowRight, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)'
          }}>
            <Car size={22} color="#10b981" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px', color: '#0f172a' }}>CURBLY</span>
              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#059669',
                border: '1px solid #a7f3d0',
                fontSize: '0.68rem',
                fontWeight: '700',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px'
              }}>SMART MOBILITY</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0, fontWeight: '500' }}>Find parking before you arrive</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/explore" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.92rem',
            fontWeight: '600',
            color: '#334155',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }}>
            <Search size={16} color="#2563eb" /> Explore Parking
          </Link>

          <Link to="/how-it-works" style={{
            fontSize: '0.92rem',
            fontWeight: '600',
            color: '#475569'
          }}>
            How It Works
          </Link>

          {user && (
            <Link to="/my-passes" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.92rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              <CreditCard size={16} color="#059669" /> My Passes
            </Link>
          )}

          {user && (
            <Link to="/host/dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.92rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              <Building size={16} color="#d97706" /> Host Portal
            </Link>
          )}

          <Link to="/host/list-space" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#059669',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            padding: '0.5rem 1rem',
            borderRadius: '8px'
          }}>
            Monetize Space
          </Link>
        </nav>

        {/* Auth / Account Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>{user.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {user.role === 'owner' ? 'Space Host' : 'Driver Account'}
                </div>
              </div>
              <button
                onClick={() => { logout(); navigate('/'); }}
                title="Sign out"
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#64748b',
                  padding: '0.5rem 0.6rem',
                  borderRadius: '8px'
                }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Link to="/login" style={{
                color: '#334155',
                fontSize: '0.92rem',
                fontWeight: '600',
                padding: '0.5rem 0.9rem'
              }}>
                Sign In
              </Link>
              <Link to="/register" style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                padding: '0.55rem 1.15rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(15, 23, 42, 0.15)'
              }}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
