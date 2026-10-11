import React from 'react';

export interface IngredientProps {
  className?: string;
  size?: number;
  rotation?: number;
  style?: React.CSSProperties;
}

export const SevStrand: React.FC<IngredientProps> = ({ className = '', size = 50, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
  >
    <path
      d="M15 80 C 25 50, 45 65, 55 35 C 65 15, 80 30, 88 15"
      stroke="#FFB703"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <path
      d="M15 80 C 25 50, 45 65, 55 35 C 65 15, 80 30, 88 15"
      stroke="#FFD166"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M17 78 C 26 52, 44 64, 54 36 C 64 18, 78 30, 86 17"
      stroke="#E59500"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 6"
    />
  </svg>
);

export const RoastedPeanut: React.FC<IngredientProps> = ({ className = '', size = 48, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-lg select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
  >
    <defs>
      <linearGradient id="peanutGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F4A261" />
        <stop offset="40%" stopColor="#E76F51" />
        <stop offset="100%" stopColor="#A8422B" />
      </linearGradient>
      <radialGradient id="roastedHighlight" cx="40%" cy="35%" r="40%">
        <stop offset="0%" stopColor="#FFE0B2" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#E76F51" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Peanut body */}
    <path
      d="M30 25 C15 35, 18 60, 32 75 C45 88, 68 85, 78 72 C90 58, 85 35, 70 24 C58 15, 42 15, 30 25 Z"
      fill="url(#peanutGrad)"
      stroke="#8B2500"
      strokeWidth="2"
    />
    {/* Roasted skin split */}
    <path
      d="M32 75 C 45 65, 52 40, 70 24"
      stroke="#5A1504"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeDasharray="1 3"
    />
    {/* Highlight shine */}
    <ellipse cx="45" cy="40" rx="18" ry="12" fill="url(#roastedHighlight)" />
  </svg>
);

export const CashewNut: React.FC<IngredientProps> = ({ className = '', size = 52, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-lg select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
  >
    <defs>
      <linearGradient id="cashewGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="50%" stopColor="#F5E0B3" />
        <stop offset="100%" stopColor="#D9A84E" />
      </linearGradient>
    </defs>
    <path
      d="M30 18 C 58 12, 85 28, 85 58 C 85 82, 62 88, 48 82 C 34 76, 32 60, 42 50 C 52 40, 56 32, 45 28 C 38 25, 32 24, 30 18 Z"
      fill="url(#cashewGrad)"
      stroke="#C49335"
      strokeWidth="2.5"
    />
    <path
      d="M45 28 C 50 35, 50 45, 42 50"
      stroke="#B37D22"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <ellipse cx="60" cy="45" rx="12" ry="20" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 60 45)" />
  </svg>
);

export const DriedRedChili: React.FC<IngredientProps> = ({ className = '', size = 56, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-xl select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
  >
    <defs>
      <linearGradient id="chiliGrad" x1="20" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E60000" />
        <stop offset="60%" stopColor="#B30000" />
        <stop offset="100%" stopColor="#660000" />
      </linearGradient>
    </defs>
    {/* Stem */}
    <path
      d="M82 18 C 86 14, 88 10, 92 8"
      stroke="#4E8752"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="82" cy="18" r="4.5" fill="#2E5A27" />
    {/* Curved Chili Pod */}
    <path
      d="M82 18 C 72 26, 68 45, 52 65 C 38 82, 22 92, 10 94 C 18 85, 24 72, 36 55 C 48 38, 62 25, 82 18 Z"
      fill="url(#chiliGrad)"
      stroke="#500000"
      strokeWidth="1.5"
    />
    {/* Glossy highlight */}
    <path
      d="M75 24 C 62 33, 50 50, 38 68"
      stroke="#FF8A8A"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
);

export const CurryLeaf: React.FC<IngredientProps> = ({ className = '', size = 46, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
  >
    <defs>
      <linearGradient id="leafGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4E8752" />
        <stop offset="70%" stopColor="#2E5A27" />
        <stop offset="100%" stopColor="#1E3D19" />
      </linearGradient>
    </defs>
    {/* Leaf blade */}
    <path
      d="M15 85 C 18 55, 40 30, 85 15 C 70 45, 55 75, 15 85 Z"
      fill="url(#leafGrad)"
    />
    {/* Central vein */}
    <path
      d="M15 85 C 35 62, 58 40, 85 15"
      stroke="#7ABA7E"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Subtle gloss */}
    <path
      d="M28 70 C 42 52, 60 35, 78 22"
      stroke="#A3E0A7"
      strokeWidth="1.2"
      opacity="0.5"
    />
  </svg>
);

export const CardamomPod: React.FC<IngredientProps> = ({ className = '', size = 44, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
  >
    <defs>
      <linearGradient id="cardamomGrad" x1="25" y1="20" x2="75" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7EAA55" />
        <stop offset="100%" stopColor="#436B28" />
      </linearGradient>
    </defs>
    {/* Oval pod */}
    <path
      d="M50 15 C 30 35, 30 65, 50 85 C 70 65, 70 35, 50 15 Z"
      fill="url(#cardamomGrad)"
      stroke="#2F4D1B"
      strokeWidth="2"
    />
    {/* Ridges */}
    <path d="M50 15 L 50 85" stroke="#9FD475" strokeWidth="2.5" opacity="0.8" />
    <path d="M42 22 C 38 40, 38 60, 42 78" stroke="#375721" strokeWidth="1.8" />
    <path d="M58 22 C 62 40, 62 60, 58 78" stroke="#375721" strokeWidth="1.8" />
    {/* Little top crown */}
    <path d="M47 15 L 50 10 L 53 15" stroke="#2F4D1B" strokeWidth="2" fill="none" />
  </svg>
);

export const PistachioSliver: React.FC<IngredientProps> = ({ className = '', size = 40, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-sm select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
  >
    {/* Purple-brown edge */}
    <path
      d="M25 20 C 15 45, 20 75, 45 85 C 65 75, 80 50, 75 25 C 60 15, 35 15, 25 20 Z"
      fill="#7B3F4B"
    />
    {/* Bright green kernel */}
    <path
      d="M32 26 C 24 45, 28 68, 46 76 C 62 68, 72 48, 68 28 C 55 22, 38 22, 32 26 Z"
      fill="#6BAA38"
    />
    <ellipse cx="48" cy="46" rx="10" ry="16" fill="#88D148" opacity="0.6" />
  </svg>
);
