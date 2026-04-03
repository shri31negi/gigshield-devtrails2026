import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import '../styles/animations.css';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate explosion particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: 50 + Math.cos((i / 40) * Math.PI * 2) * 10,
      top: 50 + Math.sin((i / 40) * Math.PI * 2) * 10,
      delay: i * 20,
      duration: 800,
      angle: (i / 40) * Math.PI * 2,
      distance: 100 + Math.random() * 100,
    }));
    setParticles(newParticles);

    // Fade out and complete after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #020818 0%, #0A1628 50%, #0F1F3D 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {/* Morphing blobs background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            filter: 'blur(80px)',
            opacity: 0.15,
            top: '-100px',
            left: '-100px',
            animation: 'morph 12s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            filter: 'blur(80px)',
            opacity: 0.1,
            bottom: '-150px',
            right: '-100px',
            animation: 'morph 12s ease-in-out infinite',
            animationDelay: '2s',
          }}
        ></div>
      </div>

      {/* Explosion particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: ['#FF6B35', '#00D4FF', '#7B61FF'][Math.floor(Math.random() * 3)],
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            animation: `particle-burst 0.8s ease-out forwards`,
            animationDelay: `${particle.delay}ms`,
            '--tx': `${Math.cos(particle.angle) * particle.distance}px`,
            '--ty': `${Math.sin(particle.angle) * particle.distance}px`,
          }}
        ></div>
      ))}

      {/* Logo and text */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {/* Icon explosion */}
        <div
          style={{
            marginBottom: '30px',
            animation: 'pulse-scale 1.2s ease-out forwards',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)',
            }}
          >
            <Shield size={48} color="white" />
          </div>
        </div>

        {/* Logo text */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            animation: 'fadeIn 0.8s ease-out',
          }}
        >
          GigShield
        </h1>

        {/* Typewriter tagline */}
        <p
          style={{
            fontSize: '18px',
            color: '#8899BB',
            fontStyle: 'italic',
            animation: `fadeIn 0.8s ease-out 0.4s both`,
            letterSpacing: '0.5px',
          }}
        >
          Your Income. Protected. Every Week.
        </p>

        {/* Progress bar */}
        <div
          style={{
            marginTop: '40px',
            width: '200px',
            height: '2px',
            background: 'rgba(0, 212, 255, 0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #FF6B35 0%, #00D4FF 50%, #7B61FF 100%)',
              animation: 'progress-bar 1.5s ease-in-out forwards',
            }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes particle-burst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
