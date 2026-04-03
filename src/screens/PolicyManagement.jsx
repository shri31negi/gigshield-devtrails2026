import React, { useState } from 'react';
import { Check, Calendar, Shield, Zap, ChevronRight } from 'lucide-react';
import { policyTiers, triggerDefinitions } from '../mockData';
import MorphingBlobs from '../components/MorphingBlobs';
import ParticleCanvas from '../components/ParticleCanvas';
import MagneticButton from '../components/MagneticButton';
import '../styles/animations.css';

export default function PolicyManagement({ worker }) {
  const [selectedTier, setSelectedTier] = useState(worker.policies.tier);
  const [autoRenew, setAutoRenew] = useState(true);
  const [expandedTrigger, setExpandedTrigger] = useState(null);

  const currentTier = policyTiers.find(t => t.name === selectedTier);

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
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Header */}
        <div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            Policy Management
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your coverage and upgrade options
          </p>
        </div>

        {/* Current Week Details */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(123, 97, 255, 0.1) 100%)',
            backgroundBlendMode: 'screen',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}
          >
            Current Week at a Glance
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                Active Policy
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                {worker.policies.tier}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                Premium coverage active
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                Weekly Premium
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #FF6B35, #FF8C42)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ₹{worker.policies.premium}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                Renews {worker.policies.renewalDate}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                Coverage Amount
              </p>
              <p
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
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                For this week
              </p>
            </div>
          </div>
        </div>

        {/* Coverage Tier Selector */}
        <div>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            Choose Your Coverage Tier
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            {policyTiers.map((tier) => (
              <button
                key={tier.name}
                onClick={() => setSelectedTier(tier.name)}
                className={selectedTier === tier.name ? 'glass-card' : ''}
                style={{
                  padding: '24px',
                  textAlign: 'left',
                  border:
                    selectedTier === tier.name
                      ? '1px solid rgba(0, 212, 255, 0.3)'
                      : '2px solid rgba(0, 212, 255, 0.1)',
                  borderRadius: '16px',
                  background:
                    selectedTier === tier.name
                      ? 'rgba(15, 32, 64, 0.8)'
                      : 'rgba(15, 32, 64, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  boxShadow:
                    selectedTier === tier.name
                      ? '0 0 30px rgba(255, 107, 53, 0.3)'
                      : 'none',
                  transform: selectedTier === tier.name ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (selectedTier !== tier.name) {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                    e.currentTarget.style.background = 'rgba(15, 32, 64, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTier !== tier.name) {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(15, 32, 64, 0.4)';
                  }
                }}
              >
                {selectedTier === tier.name && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '-12px',
                      background: 'var(--accent-green)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    <Check size={18} />
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '4px',
                    }}
                  >
                    {tier.description}
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #FF6B35, #FF8C42)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ₹{tier.premium}
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      /week
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginTop: '8px',
                    }}
                  >
                    ₹{tier.coverage.toLocaleString()} coverage
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                    }}
                  >
                    <Zap size={16} color="var(--accent-primary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Auto-triggered claims
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                    }}
                  >
                    <Zap size={16} color="var(--accent-primary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Zero manual filing
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                    }}
                  >
                    <Zap size={16} color="var(--accent-primary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>
                      AI fraud protection
                    </span>
                  </div>
                </div>

                {selectedTier !== tier.name && (
                  <button
                    style={{
                      width: '100%',
                      marginTop: '24px',
                      padding: '8px',
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      color: 'var(--accent-blue)',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                    }}
                  >
                    Upgrade to {tier.name}
                  </button>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Parametric Trigger Definitions */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}
          >
            What We Cover
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Auto-triggered payouts when these conditions are detected in your working
            zone:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {triggerDefinitions.map((def, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setExpandedTrigger(expandedTrigger === idx ? null : idx)
                }
                style={{
                  textAlign: 'left',
                  padding: '16px',
                  background: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {def.condition}
                    </h3>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginTop: '4px',
                      }}
                    >
                      Threshold: {def.threshold}
                    </p>
                  </div>
                  <ChevronRight
                    size={20}
                    color="var(--text-muted)"
                    style={{
                      transition: 'transform 0.3s ease',
                      transform:
                        expandedTrigger === idx ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  />
                </div>

                {expandedTrigger === idx && (
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(0, 212, 255, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                        }}
                      >
                        How it works
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          marginTop: '8px',
                        }}
                      >
                        When {def.condition.toLowerCase()} is detected in your zone
                        by our weather API, we automatically verify your location and
                        initiate a claim within seconds.
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                        }}
                      >
                        Payout
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--accent-primary)',
                          marginTop: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {def.payout} — Based on hours lost
                      </p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Coverage Calendar */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}
          >
            Coverage Calendar
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  padding: '8px',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const isActive = day !== 5;
              const hadDisruption = day === 3;

              return (
                <div
                  key={day}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    background:
                      isActive && hadDisruption
                        ? 'rgba(255, 107, 53, 0.15)'
                        : isActive
                          ? 'rgba(0, 245, 160, 0.15)'
                          : 'rgba(68, 85, 119, 0.1)',
                    border:
                      isActive && hadDisruption
                        ? '2px solid var(--accent-primary)'
                        : isActive
                          ? '2px solid var(--accent-green)'
                          : '2px solid var(--text-muted)',
                    color:
                      isActive && hadDisruption
                        ? 'var(--accent-primary)'
                        : isActive
                          ? 'var(--accent-green)'
                          : 'var(--text-muted)',
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{`Apr ${day}`}</span>
                  {hadDisruption && (
                    <span style={{ fontSize: '10px', marginTop: '2px' }}>
                      ⚠️
                    </span>
                  )}
                  {isActive && !hadDisruption && (
                    <span style={{ fontSize: '10px', marginTop: '2px' }}>✓</span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  background: 'rgba(0, 245, 160, 0.15)',
                  border: '2px solid var(--accent-green)',
                }}
              ></div>
              <span style={{ color: 'var(--text-secondary)' }}>
                Covered (No disruption)
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  background: 'rgba(255, 107, 53, 0.15)',
                  border: '2px solid var(--accent-primary)',
                }}
              ></div>
              <span style={{ color: 'var(--text-secondary)' }}>
                Covered (Disruption detected)
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  background: 'rgba(68, 85, 119, 0.1)',
                  border: '2px solid var(--text-muted)',
                }}
              ></div>
              <span style={{ color: 'var(--text-secondary)' }}>
                Not covered
              </span>
            </div>
          </div>
        </div>

        {/* Auto-Renewal Preference */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
            background:
              'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(123, 97, 255, 0.1) 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Auto-Renewal
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Your policy will automatically renew every Monday at midnight
              </p>
            </div>
            <button
              onClick={() => setAutoRenew(!autoRenew)}
              style={{
                position: 'relative',
                width: '64px',
                height: '40px',
                borderRadius: '20px',
                border: 'none',
                background: autoRenew ? 'var(--accent-green)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  width: '32px',
                  height: '32px',
                  background: 'white',
                  borderRadius: '50%',
                  boxShadow:
                    '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease',
                  transform: autoRenew ? 'translateX(32px)' : 'translateX(4px)',
                }}
              ></div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
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
            Download Policy Certificate
          </button>
          <MagneticButton
            style={{
              padding: '16px',
              fontSize: '16px',
            }}
          >
            {selectedTier !== worker.policies.tier ? 'Upgrade Policy' : 'Renew Now'}
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
