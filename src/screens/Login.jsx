import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2, Check, Shield } from 'lucide-react';
import MorphingBlobs from '../components/MorphingBlobs';
import ParticleCanvas from '../components/ParticleCanvas';
import MagneticButton from '../components/MagneticButton';
import '../styles/animations.css';

export default function Login({ onLogin, currentRole, onRoleChange, onNavigate }) {
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [typeWriterComplete, setTypeWriterComplete] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypeWriterComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Random glitch effect every 4-5 seconds
  useEffect(() => {
    if (!typeWriterComplete) return;
    const interval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 200);
    }, 4000 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, [typeWriterComplete]);

  // OTP Timer Logic
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  // Handle phone input - ONLY store 10 digits in state
  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(digits);
  };

  // Handle Send OTP
  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setOtpTimer(30);
      otpRefs[0].current?.focus();
    }, 1000);
  };

  // Handle OTP input with auto-focus
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').split('');
      digits.forEach((digit, i) => {
        if (index + i < 6) newOtp[index + i] = digit;
      });
      setOtp(newOtp);
      // Focus last filled box
      const lastFilledIndex = Math.min(index + digits.length - 1, 5);
      otpRefs[lastFilledIndex]?.current?.focus();
    } else {
      newOtp[index] = value.replace(/\D/g, '');
      setOtp(newOtp);
      
      // Auto-focus next box
      if (value && index < 5) {
        otpRefs[index + 1].current?.focus();
      }
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('verified');
      setTimeout(() => {
        onLogin(phoneNumber, currentRole);
      }, 800);
    }, 1000);
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpTimer(30);
    otpRefs[0].current?.focus();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-deep)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Morphing Blobs Background */}
      <MorphingBlobs />

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Main Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '420px',
        }}
      >
        {/* Role Selector */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {['Worker', 'Admin'].map((role) => (
            <button
              key={role}
              onClick={() => onRoleChange(role.toLowerCase())}
              style={{
                padding: '8px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                border: 'none',
                cursor: 'pointer',
                background:
                  currentRole === role.toLowerCase()
                    ? 'var(--grad-orange)'
                    : 'rgba(255, 255, 255, 0.05)',
                color: currentRole === role.toLowerCase() ? 'white' : 'var(--text-secondary)',
                boxShadow:
                  currentRole === role.toLowerCase()
                    ? '0 0 30px rgba(255, 107, 53, 0.4)'
                    : 'none',
                transform: currentRole === role.toLowerCase() ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Glass Card */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
          }}
        >
          {/* Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--grad-orange)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)',
                }}
              >
                <Shield size={28} color="white" />
              </div>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                GigShield
              </h1>
            </div>

            {/* Typewriter Tagline */}
            <p
              className={showGlitch ? 'glitch' : ''}
              style={{
                fontSize: '14px',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                minHeight: '24px',
              }}
            >
              {step === 'phone' && (
                <>
                  <span className={typeWriterComplete ? 'typewriter complete' : 'typewriter'}>
                    Your Income. Protected. Every Week.
                  </span>
                </>
              )}
              {step === 'otp' && 'Verify your identity'}
              {step === 'verified' && 'Access granted!'}
            </p>
          </div>

          {/* Phone Step */}
          {step === 'phone' && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  Mobile Number
                </label>
                <div
                  className="input-glow"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    background: 'rgba(10, 22, 40, 0.5)',
                    backdropFilter: 'blur(10px)',
                    padding: '0 16px',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                      userSelect: 'none',
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="98765 43210"
                    maxLength="10"
                    style={{
                      flex: 1,
                      padding: '12px 12px',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      border: 'none',
                      outline: 'none',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    autoFocus
                  />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  ✓ We'll send you a one-time password (OTP)
                </p>
              </div>

              <MagneticButton
                onClick={handleSendOtp}
                disabled={isLoading || phoneNumber.length !== 10}
                style={{
                  width: '100%',
                  padding: '12px 32px',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isLoading ? (
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <ArrowRight size={20} />
                )}
                Send OTP
              </MagneticButton>
            </div>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  Enter OTP Sent to +91{phoneNumber}
                </label>

                {/* OTP Input Boxes */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      maxLength="1"
                      inputMode="numeric"
                      className="input-glow"
                      style={{
                        width: '44px',
                        height: '52px',
                        background: 'rgba(10, 22, 40, 0.5)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        borderRadius: '12px',
                        color: 'var(--text-primary)',
                        fontSize: '20px',
                        fontWeight: 700,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                      }}
                      placeholder="0"
                    />
                  ))}
                </div>

                {/* Timer & Resend */}
                <div style={{ textAlign: 'center', fontSize: '12px' }}>
                  {otpTimer > 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Resend OTP in{' '}
                      <span
                        style={{
                          color: 'var(--accent-primary)',
                          fontWeight: 700,
                        }}
                      >
                        {otpTimer}s
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-primary)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--accent-glow)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--accent-primary)')
                      }
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              <MagneticButton
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.join('').length !== 6}
                style={{
                  width: '100%',
                  padding: '12px 32px',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                {isLoading ? (
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <ArrowRight size={20} />
                )}
                Verify OTP
              </MagneticButton>

              {/* Back Button */}
              <button
                onClick={() => {
                  setStep('phone');
                  setOtp(['', '', '', '', '', '']);
                  setOtpTimer(0);
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--text-secondary)')
                }
              >
                ← Change Phone Number
              </button>
            </div>
          )}

          {/* Verified Step */}
          {step === 'verified' && (
            <div
              style={{
                textAlign: 'center',
                animation: 'fadeIn 0.5s ease-out',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'var(--grad-success)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(0, 245, 160, 0.4)',
                  }}
                >
                  <Check size={40} color="white" />
                </div>
              </div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Verification Successful!
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Redirecting to {currentRole} dashboard...
              </p>
            </div>
          )}

          {/* OR Divider */}
          {step !== 'verified' && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '24px 0',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                ></div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>OR</span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                ></div>
              </div>

              {/* Register Link */}
              <div style={{ textAlign: 'center', fontSize: '14px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                  New to GigShield?{' '}
                  <button
                    onClick={() => onNavigate('register')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-primary)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--accent-glow)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--accent-primary)')
                    }
                  >
                    Register here
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
