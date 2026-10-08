import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Car, Shield, Navigation, 
  CreditCard, Check, Clock, IndianRupee, Sparkles, Filter 
} from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';
import RazorpayModal from '../components/RazorpayModal';

export default function ExplorePage() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('All');
  const [selectedSpace, setSelectedSpace] = useState(null);

  // Booking details
  const [bookingHours, setBookingHours] = useState(2);
  const [vehicleNo, setVehicleNo] = useState('KA-04-ME-1199');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { user, token } = useAuth();
  const navigate = useNavigate();

  const fetchSpaces = async (search = '') => {
    try {
      setLoading(true);
      const url = search ? `${API_BASE}/parking/spaces?search=${encodeURIComponent(search)}` : `${API_BASE}/parking/spaces`;
      const res = await fetch(url);
      const data = await res.json();
      setSpaces(data.spaces || []);
      if (!selectedSpace && data.spaces?.length > 0) {
        setSelectedSpace(data.spaces[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const filteredSpaces = spaces.filter(s => {
    if (vehicleFilter === 'All') return true;
    return s.vehicle_type === vehicleFilter;
  });

  const handleInitiateBooking = () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (bookingData) => {
    setShowPaymentModal(false);
    navigate('/my-passes', { state: { newBooking: bookingData } });
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 75px)', padding: '1.5rem' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        
        {/* Top Control Filter Strip */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          {/* Search box */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} color="#64748b" style={{ position: 'absolute', left: '1rem' }} />
            <input 
              type="text"
              placeholder="Search by neighborhood, road or landmark (e.g. Koramangala, Indiranagar, MG Road)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchSpaces(searchQuery)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {['All', 'Four Wheeler', 'Two Wheeler'].map(mode => (
              <button 
                key={mode}
                onClick={() => setVehicleFilter(mode)}
                style={{
                  padding: '0.65rem 1.1rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  backgroundColor: vehicleFilter === mode ? '#0f172a' : '#f1f5f9',
                  color: vehicleFilter === mode ? '#ffffff' : '#475569',
                  border: '1px solid transparent'
                }}>
                {mode}
              </button>
            ))}
          </div>

          <button 
            onClick={() => fetchSpaces(searchQuery)}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.95rem'
            }}>
            Search Spots
          </button>
        </div>

        {/* Dual Pane: Left Spot Feed / Right Interactive Map View & Booking Card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Left Column: List of Verified Spots */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                Available Parking Spots ({filteredSpaces.length})
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '700' }}>
                ● Real-Time Neon Cloud Sync
              </span>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading verified spots...</div>
            ) : filteredSpaces.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                No spaces found. Try a different search query or clear the filter.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredSpaces.map(s => {
                  const isSelected = selectedSpace?.id === s.id;
                  return (
                    <div 
                      key={s.id}
                      onClick={() => setSelectedSpace(s)}
                      style={{
                        backgroundColor: '#ffffff',
                        border: `2px solid ${isSelected ? '#2563eb' : '#e2e8f0'}`,
                        borderRadius: '16px',
                        padding: '1.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 10px 15px -3px rgba(37, 99, 235, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <div style={{ flex: 1, paddingRight: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            backgroundColor: '#ecfdf5',
                            color: '#059669',
                            border: '1px solid #a7f3d0',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px'
                          }}>
                            VERIFIED PRIVATE BAY
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{s.vehicle_type}</span>
                        </div>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
                          {s.title}
                        </h3>

                        <p style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                          <MapPin size={14} color="#2563eb" /> {s.address}, {s.city}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {s.amenities?.map((amenity, i) => (
                            <span key={i} style={{
                              fontSize: '0.75rem',
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px'
                            }}>
                              ✓ {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                        <div>
                          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>
                            ₹{parseFloat(s.price_per_hour).toFixed(0)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>per hour</div>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSpace(s);
                          }}
                          style={{
                            backgroundColor: isSelected ? '#2563eb' : '#0f172a',
                            color: '#ffffff',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: '700'
                          }}>
                          {isSelected ? 'Selected' : 'Reserve'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Live Map Simulation & Booking Configuration Card */}
          <div style={{ position: 'sticky', top: '5.5rem' }}>
            {selectedSpace ? (
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
              }}>
                {/* Map Graphic Area */}
                <div style={{
                  height: '210px',
                  backgroundColor: '#f1f5f9',
                  borderBottom: '1px solid #e2e8f0',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
                  backgroundSize: '20px 20px'
                }}>
                  {/* Road Grid Overlay */}
                  <div style={{ position: 'absolute', width: '85%', height: '8px', backgroundColor: '#e2e8f0', transform: 'rotate(-5deg)' }} />
                  <div style={{ position: 'absolute', width: '8px', height: '80%', backgroundColor: '#e2e8f0', left: '40%' }} />

                  {/* Selected Spot Pin */}
                  <div style={{
                    zIndex: 2,
                    backgroundColor: '#ffffff',
                    border: '2px solid #2563eb',
                    borderRadius: '12px',
                    padding: '0.75rem 1.1rem',
                    boxShadow: '0 10px 15px -3px rgba(37,99,235,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}>
                    <div style={{
                      backgroundColor: '#2563eb',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Car size={18} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a' }}>{selectedSpace.title}</div>
                      <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600' }}>
                        {selectedSpace.latitude}, {selectedSpace.longitude}
                      </div>
                    </div>
                  </div>

                  <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', zIndex: 2 }}>
                    <span style={{ fontSize: '0.72rem', backgroundColor: '#ffffff', color: '#334155', padding: '0.25rem 0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '600' }}>
                      📍 Proximity: ~350m
                    </span>
                  </div>
                </div>

                {/* Reservation Details & Pricing */}
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>{selectedSpace.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>{selectedSpace.description}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#2563eb' }}>₹{selectedSpace.price_per_hour}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>per hour</div>
                    </div>
                  </div>

                  {/* Host Contact Box */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <span style={{ fontSize: '0.85rem', color: '#334155' }}>
                      Host: <strong>{selectedSpace.owner_name}</strong>
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{selectedSpace.owner_phone}</span>
                  </div>

                  {/* Duration & Vehicle Inputs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                        Parking Duration
                      </label>
                      <select 
                        value={bookingHours}
                        onChange={(e) => setBookingHours(Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '0.7rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.92rem',
                          backgroundColor: '#f8fafc'
                        }}>
                        <option value={1}>1 Hour</option>
                        <option value={2}>2 Hours</option>
                        <option value={3}>3 Hours</option>
                        <option value={4}>4 Hours</option>
                        <option value={8}>Full Day (8 Hours)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                        Vehicle License Plate
                      </label>
                      <input 
                        type="text"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                        placeholder="KA-04-ME-1199"
                        style={{
                          width: '100%',
                          padding: '0.7rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.92rem',
                          backgroundColor: '#f8fafc'
                        }}
                      />
                    </div>
                  </div>

                  {/* Unit Economics Box (As presented on Slide 13) */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    border: '1px solid #e2e8f0',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#64748b', marginBottom: '0.35rem' }}>
                      <span>Subtotal ({bookingHours} hrs @ ₹{selectedSpace.price_per_hour})</span>
                      <span>₹{(bookingHours * selectedSpace.price_per_hour).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      <span>Platform Convenience (Incl. 20%)</span>
                      <span style={{ color: '#059669', fontWeight: '600' }}>₹{((bookingHours * selectedSpace.price_per_hour) * 0.20).toFixed(2)}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                      <span>Total Payable</span>
                      <span style={{ color: '#2563eb' }}>₹{(bookingHours * selectedSpace.price_per_hour).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Reserve & Pay Button */}
                  <button 
                    onClick={handleInitiateBooking}
                    style={{
                      width: '100%',
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      padding: '0.95rem',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)'
                    }}>
                    <CreditCard size={18} /> Reserve & Checkout via Razorpay
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.75rem' }}>
                    🔒 100% Instant Slot Confirmation • Free Cancellation within 10 mins
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                Select a parking space to inspect amenities and complete reservation.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Razorpay Simulation Modal */}
      {showPaymentModal && selectedSpace && (
        <RazorpayModal 
          space={selectedSpace}
          hours={bookingHours}
          vehicleNo={vehicleNo}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

    </div>
  );
}
