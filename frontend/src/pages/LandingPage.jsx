import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, Shield, Clock, IndianRupee, ArrowRight, 
  CheckCircle, Car, Compass, Calendar, Building, Sparkles 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      
      {/* ---------------- HERO SECTION ---------------- */}
      <section style={{
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '5rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '0.4rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#059669',
              marginBottom: '1.5rem'
            }}>
              <Car size={16} /> <span>URBAN MOBILITY & SPACE SHARING</span>
            </div>

            <h1 style={{
              fontSize: '3.6rem',
              fontWeight: '800',
              lineHeight: 1.15,
              color: '#0f172a',
              letterSpacing: '-1.5px',
              marginBottom: '1.25rem'
            }}>
              Find parking <br />
              <span style={{ color: '#2563eb' }}>before you arrive.</span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: '#475569',
              marginBottom: '2.5rem',
              maxWidth: '560px'
            }}>
              Say goodbye to cruising for 20 minutes. Curbly connects city commuters with vacant residential driveways, society slots, and commercial bays for guaranteed parking.
            </p>

            {/* Quick Location Search Bar in Hero */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '0.6rem 0.6rem 0.6rem 1.25rem',
              borderRadius: '16px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '560px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
                <MapPin size={22} color="#2563eb" />
                <input 
                  type="text"
                  placeholder="Where are you heading? (e.g. Koramangala, Indiranagar)"
                  style={{
                    border: 'none',
                    fontSize: '1rem',
                    width: '100%',
                    color: '#0f172a',
                    backgroundColor: 'transparent'
                  }}
                  defaultValue="Koramangala, Bengaluru"
                />
              </div>
              <Link to="/explore" style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}>
                <Search size={18} /> Search Spots
              </Link>
            </div>

            {/* Verified Trust Badges */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', fontSize: '0.85rem', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={16} color="#10b981" /> 100% Guaranteed Reserved Spot
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={16} color="#10b981" /> Razorpay Cashless Checkout
              </div>
            </div>
          </div>

          {/* Hero Visual Card / App Mockup Preview */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '1.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
              position: 'relative',
              zIndex: 2
            }}>
              {/* Mockup Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    REAL-TIME AVAILABILITY
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginTop: '0.4rem' }}>
                    Koramangala 4th Block
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Independent Villa Gated Bay • 350m away</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#2563eb' }}>₹60</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>per hour</div>
                </div>
              </div>

              {/* Map Preview Graphic */}
              <div style={{
                height: '180px',
                borderRadius: '12px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', width: '90%', height: '3px', backgroundColor: '#cbd5e1' }} />
                <div style={{ position: 'absolute', width: '3px', height: '90%', backgroundColor: '#cbd5e1' }} />
                <div style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '0.6rem 1rem',
                  borderRadius: '10px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  zIndex: 2
                }}>
                  <div style={{ backgroundColor: '#10b981', width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Slot Locked: KA-01-EA-2026</span>
                </div>
              </div>

              {/* Booking Details Preview */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid #e2e8f0',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#64748b' }}>Host:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>Rajesh Kumar (Verified Host)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#64748b' }}>Amenities:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>CCTV • Covered • 24/7 Gate</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
                  <span style={{ color: '#64748b' }}>Total for 2 Hours:</span>
                  <span style={{ fontWeight: '800', color: '#2563eb' }}>₹120.00 (All taxes incl.)</span>
                </div>
              </div>

              <Link to="/explore" style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '0.85rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.95rem'
              }}>
                Book This Space Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- HOW CURBLY WORKS ---------------- */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              SIMPLE WORKFLOW
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', marginTop: '0.5rem' }}>
              How Curbly Works
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.75rem' }}>
              A frictionless 3-step experience designed to replace parking anxiety with guaranteed spot certainty.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              position: 'relative'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginBottom: '1.5rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
                Discover Nearby Slots
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Enter your destination. View live map pins showing verified private driveways, rates per hour, and walking distances.
              </p>
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              position: 'relative'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginBottom: '1.5rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
                Reserve & Cashless Checkout
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Pick your parking window. Lock your slot immediately and complete secure digital payment via Razorpay.
              </p>
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              position: 'relative'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginBottom: '1.5rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
                Navigate & Check-In
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Follow turn-by-turn directions right to the gate. Present your digital QR pass to the host and park without hassle.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- VALUE PROPOSITION GRID ---------------- */}
      <section style={{ backgroundColor: '#f8fafc', padding: '6rem 1.5rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            
            {/* For Drivers */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '3rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-block', marginBottom: '1rem' }}>
                FOR DRIVERS & COMMUTERS
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>
                Eliminate Parking Friction
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>Save 20+ Minutes Every Trip:</strong>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>Navigate directly to a confirmed parking bay rather than circling crowded blocks.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>Transparent Upfront Pricing:</strong>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>Know exact hourly rates prior to departure. No informal parking meter gouging.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>Safe, Monitored Spaces:</strong>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>Filter for CCTV surveillance, covered carports, and gated residential compounds.</p>
                  </div>
                </li>
              </ul>

              <Link to="/explore" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '2rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.92rem'
              }}>
                Search Nearby Slots <ArrowRight size={16} />
              </Link>
            </div>

            {/* For Space Owners */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '3rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-block', marginBottom: '1rem' }}>
                FOR PROPERTY OWNERS & HOSTS
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>
                Monetize Idle Driveways
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>Earn ₹4,000 – ₹12,000 / Month:</strong>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>Turn vacant bays into recurring passive income while you are away at work.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>80% Host Revenue Share:</strong>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>Industry-leading 80/20 split with direct bank settlements and zero listing fees.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>Full Calendar & Schedule Control:</strong>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>Toggle listings on/off with one click. Only host when it is convenient for you.</p>
                  </div>
                </li>
              </ul>

              <Link to="/host/list-space" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '2rem',
                backgroundColor: '#059669',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.92rem'
              }}>
                List Your Space Today <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- CTA BANNER ---------------- */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.6rem', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
            Ready for a smarter parking experience?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Join hundreds of urban drivers and property owners making city commuting easier, faster, and more sustainable.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/explore" style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem'
            }}>
              Find Parking Now
            </Link>
            <Link to="/host/list-space" style={{
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: '1px solid #334155',
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem'
            }}>
              Become a Space Host
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
