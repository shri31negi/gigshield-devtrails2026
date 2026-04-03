import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Clock, MapPin, Activity, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MorphingBlobs from '../components/MorphingBlobs';
import ParticleCanvas from '../components/ParticleCanvas';
import MagneticButton from '../components/MagneticButton';
import '../styles/animations.css';

const earningsData = [
  { day: 'Mon', earnings: 580 },
  { day: 'Tue', earnings: 650 },
  { day: 'Wed', earnings: 720 },
  { day: 'Thu', earnings: 590 },
  { day: 'Fri', earnings: 680 },
  { day: 'Sat', earnings: 850 },
  { day: 'Sun', earnings: 750 }
];

export default function WorkerDashboard({ worker }) {
  const [alertActive, setAlertActive] = useState(true);
  const [displayedEarnings, setDisplayedEarnings] = useState(0);

  // Counter animation for earnings
  useEffect(() => {
    let current = 0;
    const target = worker.earningsProtected;
    const interval = setInterval(() => {
      current += Math.ceil(target / 50);
      if (current >= target) {
        setDisplayedEarnings(target);
        clearInterval(interval);
      } else {
        setDisplayedEarnings(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [worker.earningsProtected]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-deep)',
        position: 'relative',
        overflow: 'auto',
        padding: '16px',
      }}
    >
      {/* Morphing Blobs Background */}
      <MorphingBlobs />

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Live Disruption Alert Banner */}
        {alertActive && (
          <div
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF3D00 100%)',
              color: 'white',
              borderRadius: '16px',
              padding: '24px',
              position: 'relative',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)',
              animation: 'pulse-soft 2s ease-in-out infinite',
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <AlertCircle
                size={28}
                style={{ flexShrink: 0, marginTop: '4px' }}
              />
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}
                >
                  ⚠️ Heavy Rain Alert in {worker.zone}
                </h3>
                <p style={{ fontSize: '14px', marginBottom: '12px' }}>
                  Rain intensity: 55mm/hr • Auto claim triggered in{' '}
                  {Math.floor(Math.random() * 20) + 10}s
                </p>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    height: '4px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      height: '100%',
                      borderRadius: '9999px',
                      width: '45%',
                      animation: 'pulse 1s infinite',
                    }}
                  ></div>
                </div>
                <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
                  Estimated coverage: ₹450
                </p>
              </div>
              <button
                onClick={() => setAlertActive(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  opacity: 0.7,
                  fontSize: '28px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  padding: '0 8px',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Top Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '24px',
          }}
        >
          {/* Policy Status Card */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                >
                  CURRENT POLICY STATUS
                </p>
                <h2
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--accent-green)',
                  }}
                >
                  ✓ Covered This Week
                </h2>
              </div>
              <CheckCircle2 size={32} color="var(--accent-green)" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(0, 212, 255, 0.1)',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Policy Tier</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {worker.policies.tier}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Premium</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  ₹{worker.policies.premium}/week
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Valid Until</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {worker.policies.renewalDate}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(0, 212, 255, 0.1)',
                  marginTop: '8px',
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Weekly Coverage
                </span>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ₹{worker.policies.coverage.toLocaleString()}
                </span>
              </div>
            </div>
            <MagneticButton
              style={{
                width: '100%',
                marginTop: '20px',
                padding: '12px 32px',
                fontSize: '14px',
              }}
            >
              Renew Policy
            </MagneticButton>
          </div>

          {/* Earnings Protected & Quick Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Protected Earnings */}
            <div
              className="glass-card"
              style={{
                padding: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    PROTECTED THIS MONTH
                  </p>
                  <h3
                    className="count-up"
                    style={{
                      fontSize: '32px',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #FF6B35, #FF8C42)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ₹{displayedEarnings.toLocaleString()}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    So far this month
                  </p>
                </div>
                <TrendingUp size={32} color="var(--accent-primary)" />
              </div>
            </div>

            {/* Quick Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <div
                className="glass-card"
                style={{
                  padding: '16px',
                }}
              >
                <Clock size={20} color="var(--accent-primary)" style={{ marginBottom: '8px' }} />
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  Active Hours
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: '4px',
                  }}
                >
                  {worker.workingHours}
                </p>
              </div>
              <div
                className="glass-card"
                style={{
                  padding: '16px',
                }}
              >
                <MapPin size={20} color="var(--accent-purple)" style={{ marginBottom: '8px' }} />
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  Zone
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: '4px',
                  }}
                >
                  {worker.zone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}
          >
            Your Weekly Earnings
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0, 212, 255, 0.1)"
              />
              <XAxis dataKey="day" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                }}
                formatter={(value) => `₹${value}`}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="var(--accent-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--accent-primary)', r: 5 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Claim Status */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {[
            {
              title: 'Pending Claims',
              count: '1',
              color: 'var(--accent-primary)',
            },
            {
              title: 'Completed',
              count: '2',
              color: 'var(--accent-green)',
            },
            {
              title: 'Total Payouts',
              count: '₹1,150',
              color: 'var(--accent-blue)',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '12px',
                }}
              >
                THIS MONTH
              </p>
              <p
                className="count-up"
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}40`,
                }}
              >
                {stat.count}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  marginTop: '8px',
                  color: 'var(--text-secondary)',
                }}
              >
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px',
            paddingBottom: '32px',
          }}
        >
          <button
            style={{
              background: 'transparent',
              border: '2px solid rgba(0, 212, 255, 0.3)',
              color: 'var(--text-primary)',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '16px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Activity size={20} />
            View Active Policies
          </button>
          <MagneticButton
            style={{
              padding: '16px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={20} />
            Report Disruption
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
