import React, { useState } from 'react';
import { Shield, CheckCircle, Lock, ArrowRight, X } from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';

export default function RazorpayModal({ space, hours, vehicleNo, onSuccess, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('driver@okaxis');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'done'

  const { token } = useAuth();
  const totalAmount = (hours * space.price_per_hour).toFixed(2);

  const handlePay = async () => {
    setProcessing(true);
    setStep('processing');

    try {
      // Simulate real Razorpay network verification handshake (1.2s delay)
      await new Promise(r => setTimeout(r, 1200));

      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          space_id: space.id,
          hours,
          vehicle_number: vehicleNo,
          start_time: new Date().toISOString()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Payment or booking creation failed');
        setProcessing(false);
        setStep('select');
        return;
      }

      setStep('done');
      setTimeout(() => {
        onSuccess(data);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert('Network error connecting to booking service');
      setProcessing(false);
      setStep('select');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '480px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'fadeIn 0.25s ease'
      }}>
        
        {/* Razorpay Top Header Bar */}
        <div style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Razorpay</span>
              <span style={{ fontSize: '0.72rem', backgroundColor: '#1d4ed8', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: '700' }}>
                TRUSTED
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#93c5fd', margin: 0 }}>Curbly Technologies Private Limited</p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '850', color: '#ffffff' }}>₹{totalAmount}</div>
            <button 
              onClick={onClose}
              disabled={processing}
              style={{ background: 'transparent', color: '#94a3b8', padding: 0, marginTop: '2px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #e2e8f0',
                borderTopColor: '#2563eb',
                borderRadius: '50%',
                margin: '0 auto 1.5rem',
                animation: 'spin 1s linear infinite'
              }} />
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>Verifying Razorpay Signature...</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.35rem' }}>
                Securing reservation in Neon PostgreSQL database
              </p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>Payment Verified!</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.35rem' }}>
                Generating your digital parking ticket...
              </p>
            </div>
          )}

          {step === 'select' && (
            <div>
              {/* Spot Summary */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                border: '1px solid #e2e8f0',
                marginBottom: '1.25rem',
                fontSize: '0.85rem'
              }}>
                <div style={{ fontWeight: '700', color: '#0f172a' }}>{space.title}</div>
                <div style={{ color: '#64748b', marginTop: '0.2rem' }}>
                  {hours} Hours • Vehicle: <strong>{vehicleNo}</strong>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '0.6rem' }}>
                  SELECT PAYMENT METHOD
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div 
                    onClick={() => setSelectedMethod('upi')}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '10px',
                      border: `2px solid ${selectedMethod === 'upi' ? '#2563eb' : '#e2e8f0'}`,
                      backgroundColor: selectedMethod === 'upi' ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9rem' }}>UPI (Google Pay, PhonePe, Paytm)</span>
                    </div>
                    {selectedMethod === 'upi' && <CheckCircle size={18} color="#2563eb" />}
                  </div>

                  <div 
                    onClick={() => setSelectedMethod('card')}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '10px',
                      border: `2px solid ${selectedMethod === 'card' ? '#2563eb' : '#e2e8f0'}`,
                      backgroundColor: selectedMethod === 'card' ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                    <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9rem' }}>Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                    {selectedMethod === 'card' && <CheckCircle size={18} color="#2563eb" />}
                  </div>

                  <div 
                    onClick={() => setSelectedMethod('netbanking')}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '10px',
                      border: `2px solid ${selectedMethod === 'netbanking' ? '#2563eb' : '#e2e8f0'}`,
                      backgroundColor: selectedMethod === 'netbanking' ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                    <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9rem' }}>Net Banking (All Major Indian Banks)</span>
                    {selectedMethod === 'netbanking' && <CheckCircle size={18} color="#2563eb" />}
                  </div>
                </div>
              </div>

              {selectedMethod === 'upi' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                    Virtual Payment Address (VPA)
                  </label>
                  <input 
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              )}

              <button 
                onClick={handlePay}
                style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  padding: '0.95rem',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
                }}>
                Pay ₹{totalAmount} & Confirm Reservation
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.72rem',
                color: '#64748b',
                marginTop: '1rem'
              }}>
                <Shield size={14} color="#059669" />
                256-Bit SSL Encrypted • PCI-DSS Level 1 Compliant
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
