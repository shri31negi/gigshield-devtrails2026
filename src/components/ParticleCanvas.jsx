import React, { useEffect, useRef, useState } from 'react';

const ParticleCanvas = ({ width, height, mouseX = null, mouseY = null }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width || window.innerWidth;
    canvas.height = height || window.innerHeight;

    const ctx = canvas.getContext('2d');
    const particleCount = 60;
    const particles = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 3 + 2,
        drift: (Math.random() - 0.5) * 2,
        life: Math.random() * 0.5 + 0.5,
        maxLife: 1,
        color: ['#FF6B35', '#00D4FF', '#7B61FF'][Math.floor(Math.random() * 3)],
        opacity: Math.random() * 0.3 + 0.15
      });
    }

    particlesRef.current = particles;

    // Mouse move listener
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.y -= particle.speed;
        particle.x += particle.drift;

        // Anti-gravity magnetic effect
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 100;

        if (distance < repelRadius) {
          const repelForce = (1 - distance / repelRadius) * 0.5;
          particle.drift -= (dx / distance) * repelForce * 0.3;
        }

        // Reset particle when it goes off screen
        if (particle.y < -50) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            size: Math.random() * 3 + 2,
            speed: Math.random() * 3 + 2,
            drift: (Math.random() - 0.5) * 2,
            life: Math.random() * 0.5 + 0.5,
            maxLife: 1,
            color: ['#FF6B35', '#00D4FF', '#7B61FF'][Math.floor(Math.random() * 3)],
            opacity: Math.random() * 0.3 + 0.15
          };
        }

        // Calculate opacity based on position (fade in at bottom, fade out at top)
        const topFade = Math.max(0, 1 - (canvas.height - particle.y) / 100);
        const bottomFade = Math.max(0, 1 - particle.y / 100);
        const calculatedOpacity = particle.opacity * (1 - topFade) * (1 - bottomFade);

        // Draw particle
        ctx.fillStyle = particle.color.replace(')', `, ${calculatedOpacity})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default ParticleCanvas;
