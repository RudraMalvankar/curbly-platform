import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, IndianRupee, Car, CheckCircle, 
  Plus, Eye, Power, ArrowRight, TrendingUp 
} from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';

export default function HostDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchHostData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/owner/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostData();
  }, [token]);

  const handleToggleStatus = async (spaceId) => {
    try {
      const res = await fetch(`${API_BASE}/parking/spaces/${spaceId}/toggle`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchHostData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 75px)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
              HOST PORTAL & SETTLEMENTS
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>
              Host Space Management Hub
            </h1>
            <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
              Monitor incoming bookings, track your 80% revenue share, and toggle bay availability.
            </p>
          </div>

          <Link to="/host/list-space" style={{
            backgroundColor: '#059669',
            color: '#ffffff',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Plus size={18} /> Add Parking Space
          </Link>
        </div>

        {/* Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
          
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Host Net Earnings (80%)</span>
            <div style={{ fontSize: '1.85rem', fontWeight: '850', color: '#059669', marginTop: '0.35rem' }}>
              ₹{dashboardData?.summary?.totalEarnings || '0.00'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Direct Bank Transfers</div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Total Bookings</span>
            <div style={{ fontSize: '1.85rem', fontWeight: '850', color: '#2563eb', marginTop: '0.35rem' }}>
              {dashboardData?.summary?.totalBookings || '0'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Verified Driver Sessions</div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Active Live Spaces</span>
            <div style={{ fontSize: '1.85rem', fontWeight: '850', color: '#0f172a', marginTop: '0.35rem' }}>
              {dashboardData?.summary?.activeSpaces || '0'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Visible on Public Map</div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Platform Split</span>
            <div style={{ fontSize: '1.85rem', fontWeight: '850', color: '#d97706', marginTop: '0.35rem' }}>
              80 / 20
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Host 80% / Curbly 20%</div>
          </div>

        </div>

        {/* Listed Spaces Management */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>
            My Listed Parking Spaces ({dashboardData?.spaces?.length || 0})
          </h2>

          {dashboardData?.spaces?.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0', color: '#64748b' }}>
              You haven't listed any parking spaces yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dashboardData?.spaces?.map(space => (
                <div key={space.id} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{
                        backgroundColor: space.is_active ? '#ecfdf5' : '#fef2f2',
                        color: space.is_active ? '#059669' : '#b91c1c',
                        border: `1px solid ${space.is_active ? '#a7f3d0' : '#fecaca'}`,
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {space.is_active ? '● LIVE ON MAP' : '○ PAUSED'}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>₹{space.price_per_hour}/hr</span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>{space.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{space.address}, {space.city}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleToggleStatus(space.id)}
                      style={{
                        backgroundColor: space.is_active ? '#f1f5f9' : '#ecfdf5',
                        color: space.is_active ? '#475569' : '#059669',
                        border: `1px solid ${space.is_active ? '#cbd5e1' : '#a7f3d0'}`,
                        padding: '0.55rem 1.15rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '700'
                      }}>
                      {space.is_active ? 'Pause Listing' : 'Make Live'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inbound Booking Ledger */}
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>
            Inbound Driver Booking Ledger
          </h2>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Pass ID</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Parking Space</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Driver Name</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Duration</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Host Earning (80%)</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.recentBookings?.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                      No bookings recorded yet.
                    </td>
                  </tr>
                ) : (
                  dashboardData?.recentBookings?.map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.9rem 1.25rem', fontWeight: '700', color: '#0f172a' }}>#CRB-{b.id}</td>
                      <td style={{ padding: '0.9rem 1.25rem', color: '#0f172a', fontWeight: '600' }}>{b.space_title}</td>
                      <td style={{ padding: '0.9rem 1.25rem', color: '#475569' }}>{b.driver_name}</td>
                      <td style={{ padding: '0.9rem 1.25rem' }}>{b.hours} hrs</td>
                      <td style={{ padding: '0.9rem 1.25rem', color: '#059669', fontWeight: '800' }}>₹{b.host_earning}</td>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: '700' }}>
                          CONFIRMED
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
