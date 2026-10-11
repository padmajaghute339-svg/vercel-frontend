import React, { useRef, useState, useEffect } from 'react';
import { ProductArtwork } from '../../assets/ProductArtwork';

interface Canvas3DProductProps {
  imageKey?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  interactive?: boolean;
  tiltIntensity?: number;
  badgeText?: string;
}

export const Canvas3DProduct: React.FC<Canvas3DProductProps> = ({
  imageKey = 'aloo-bhujia',
  size = 'hero',
  className = '',
  interactive = true,
  tiltIntensity = 18,
  badgeText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width - 0.5) * 2;
    const normalizedY = (y / rect.height - 0.5) * 2;

    const rotX = -normalizedY * tiltIntensity;
    const rotY = normalizedX * tiltIntensity;

    setTilt({
      rotateX: rotX,
      rotateY: rotY,
      shineX: (x / rect.width) * 100,
      shineY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block perspective-1200 cursor-pointer ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 3D Wrapped Layer */}
      <div
        className="transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.04 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Real Product Artwork */}
        <ProductArtwork imageKey={imageKey} size={size} />

        {/* Dynamic Specular Sheen (simulates metallic foil reflection) */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.45 : 0,
              background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 65%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* Optional Floating Floating Feature Badge */}
        {badgeText && (
          <div
            className="absolute -top-3 -right-3 z-20 px-3.5 py-1.5 rounded-full bg-haldiram-gold text-haldiram-brown text-[11px] font-black uppercase tracking-wider shadow-lg transform"
            style={{
              transform: 'translateZ(40px)',
            }}
          >
            {badgeText}
          </div>
        )}
      </div>

      {/* Atmospheric Floor Shadow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-haldiram-brown/40 blur-xl rounded-full pointer-events-none transition-all duration-300"
        style={{
          transform: `scale(${isHovered ? 1.15 : 1})`,
          opacity: isHovered ? 0.6 : 0.35,
        }}
      />
    </div>
  );
};
