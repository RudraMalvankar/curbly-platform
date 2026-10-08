import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      padding: '3.5rem 1.5rem 2rem',
      borderTop: '1px solid #1e293b'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#10b981', padding: '0.4rem', borderRadius: '8px' }}>
                <Car size={20} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>CURBLY</span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1.25rem' }}>
              Smart Urban Parking & Space Sharing Platform. Solving parking congestion by connecting drivers with verified underutilized private parking spaces.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              University ENTP / Software Capstone Project • Academic Year 2025–2026
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>Drivers</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><Link to="/explore" style={{ color: '#94a3b8' }}>Search Nearby Spots</Link></li>
              <li><Link to="/how-it-works" style={{ color: '#94a3b8' }}>How Reservation Works</Link></li>
              <li><Link to="/my-passes" style={{ color: '#94a3b8' }}>Digital Parking Tickets</Link></li>
              <li><a href="#rates" style={{ color: '#94a3b8' }}>Transparent Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>Property Hosts</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><Link to="/host/list-space" style={{ color: '#94a3b8' }}>List Empty Driveway</Link></li>
              <li><Link to="/host/dashboard" style={{ color: '#94a3b8' }}>Host Revenue Hub</Link></li>
              <li><a href="#commission" style={{ color: '#94a3b8' }}>80% Payout Structure</a></li>
              <li><a href="#protection" style={{ color: '#94a3b8' }}>Host Verification & Safety</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>Technology Stack</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li>• Frontend: React.js SPA (Vite)</li>
              <li>• Backend: Node.js & Express.js REST</li>
              <li>• Database: Neon Serverless PostgreSQL</li>
              <li>• Payments: Razorpay Gateway</li>
              <li>• Security: JWT & Bcrypt Hashing</li>
            </ul>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            © 2026 CURBLY Platform. Department of Computer Engineering.
          </div>
          <div>
            Built with React.js, Node.js, and Neon Serverless PostgreSQL.
          </div>
        </div>
      </div>
    </footer>
  );
}
