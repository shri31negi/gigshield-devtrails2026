import React, { useRef, useState } from 'react';
import '../styles/animations.css';

const MagneticButton = ({ children, onClick, disabled = false, className = '' }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) * 0.2;
    const offsetY = (e.clientY - centerY) * 0.2;

    setOffset({
      x: Math.max(-8, Math.min(8, offsetX)),
      y: Math.max(-8, Math.min(8, offsetY)),
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`btn-magnetic ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
