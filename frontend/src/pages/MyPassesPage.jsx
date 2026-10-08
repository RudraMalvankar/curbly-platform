import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, MapPin, Navigation, CheckCircle, Clock, 
  QrCode, Shield, Phone, ArrowRight, ExternalLink 
} from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';

export default function MyPassesPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const location = useLocation();

  const fetchBookings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/bookings/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 75px)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>
              DRIVER DASHBOARD
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>
              Digital Parking Passes
            </h1>
            <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
              Active and confirmed parking passes. Present the verification code upon arrival.
            </p>
          </div>

          <Link to="/explore" style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '0.65rem 1.25rem',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '0.88rem'
          }}>
            Book Another Slot
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading your parking passes...</div>
        ) : bookings.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
          }}>
            <Car size={48} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>No parking passes found</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '0.35rem', marginBottom: '1.5rem' }}>
              You don't have any reserved parking slots yet. Search verified spots on the map.
            </p>
            <Link to="/explore" style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '0.75rem 1.75rem',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.92rem'
            }}>
              Explore Available Spots
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {bookings.map(b => (
              <div key={b.id} style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)',
                display: 'grid',
                gridTemplateColumns: '1fr 220px'
              }}>
                {/* Left Ticket Content */}
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      border: '1px solid #a7f3d0',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '800'
                    }}>
                      ● ACTIVE PASS
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Booking ID: <strong>#CRB-{b.id}</strong>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
                    {b.space_title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    <MapPin size={16} color="#2563eb" /> {b.space_address}, {b.city}
                  </p>

                  {/* Pass Metadata Grid */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #e2e8f0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Vehicle Plate</span>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{b.vehicle_number}</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Reserved Hours</span>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{b.hours} Hours</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Host Contact</span>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{b.owner_name}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${b.latitude},${b.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}>
                      <Navigation size={16} /> Open Navigation
                    </a>

                    <div style={{ fontSize: '0.82rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CheckCircle size={15} /> Paid ₹{parseFloat(b.total_amount).toFixed(2)} via Razorpay
                    </div>
                  </div>
                </div>

                {/* Right Stub: Verification & Check-in Badge */}
                <div style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderLeft: '2px dashed #334155'
                }}>
                  {/* Simulated QR Code Visual Box */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    padding: '0.6rem',
                    borderRadius: '12px',
                    marginBottom: '0.75rem'
                  }}>
                    <QrCode size={80} color="#0f172a" />
                  </div>

                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CHECK-IN PASSCODE</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: '850', color: '#10b981', letterSpacing: '2px', marginTop: '0.2rem' }}>
                    CRB-{b.id}99
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.4rem' }}>
                    Show to host at entrance
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
