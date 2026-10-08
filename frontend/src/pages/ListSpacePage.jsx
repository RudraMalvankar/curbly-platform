import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Plus, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';

export default function ListSpacePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: 'Bengaluru',
    latitude: 12.9352,
    longitude: 77.6245,
    price_per_hour: 60,
    vehicle_type: 'Four Wheeler',
    amenities: 'CCTV Monitored, Covered Parking, 24/7 Security'
  });
  const [loading, setLoading] = useState(false);

  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const amenitiesArr = formData.amenities.split(',').map(s => s.trim());
      const res = await fetch(`${API_BASE}/parking/spaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          amenities: amenitiesArr,
          price_per_hour: parseFloat(formData.price_per_hour)
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to list space');
        setLoading(false);
        return;
      }

      navigate('/host/dashboard');
    } catch (err) {
      console.error(err);
      alert('Network error connecting to backend service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 75px)', padding: '3rem 1.5rem' }}>
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.03)'
      }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
            BECOME A SPACE HOST
          </span>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0f172a', marginTop: '0.2rem' }}>
            List Your Empty Parking Space
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
            Publish your private driveway or society slot to the live Neon PostgreSQL database and start earning.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
              Listing Title *
            </label>
            <input 
              type="text"
              required
              placeholder="e.g. Spacious Covered Villa Bay near Sony Signal"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
              Short Description & Highlights
            </label>
            <input 
              type="text"
              placeholder="e.g. 24/7 security guard, wide ramp, peaceful residential lane"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
              Full Physical Street Address *
            </label>
            <textarea 
              required
              rows={2}
              placeholder="Plot number, cross road, apartment society name..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                City
              </label>
              <input 
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Hourly Price (INR ₹) *
              </label>
              <input 
                type="number"
                min={10}
                required
                value={formData.price_per_hour}
                onChange={(e) => setFormData({ ...formData, price_per_hour: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Vehicle Compatibility
              </label>
              <select
                value={formData.vehicle_type}
                onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 0.5rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}>
                <option value="Four Wheeler">Four Wheeler (Sedan / SUV)</option>
                <option value="Two Wheeler">Two Wheeler (Bike / Scooter)</option>
                <option value="EV Vehicle Only">EV Vehicle Only</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Host Payout Rate
              </label>
              <div style={{
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '0.7rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                color: '#065f46',
                fontWeight: '700'
              }}>
                80% (₹{(formData.price_per_hour * 0.8).toFixed(1)}/hr credited)
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
              Amenities (Comma-separated)
            </label>
            <input 
              type="text"
              placeholder="CCTV Monitored, Covered Parking, Wide Gate"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#059669',
              color: '#ffffff',
              padding: '0.95rem',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem',
              marginTop: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)'
            }}>
            {loading ? 'Publishing Spot...' : 'Publish Parking Spot to Neon Cloud'}
          </button>
        </form>

      </div>
    </div>
  );
}
