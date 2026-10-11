import React from 'react';

export interface ProductArtworkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  style?: React.CSSProperties;
}

export const AlooBhujiaArtwork: React.FC<ProductArtworkProps> = ({ className = '', size = 'lg', style }) => {
  const getDims = () => {
    switch (size) {
      case 'sm': return { width: 140, height: 180 };
      case 'md': return { width: 220, height: 280 };
      case 'lg': return { width: 320, height: 410 };
      case 'xl': return { width: 420, height: 540 };
      case 'hero': return { width: 480, height: 615 };
      default: return { width: 320, height: 410 };
    }
  };

  const { width, height } = getDims();

  return (
    <div 
      className={`relative inline-block transition-transform duration-500 select-none ${className}`}
      style={{ width, height, ...style }}
    >
      <svg
        viewBox="0 0 380 490"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="pouchBg" x1="20" y1="20" x2="360" y2="470" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#800000" />
            <stop offset="35%" stopColor="#A00E0E" />
            <stop offset="70%" stopColor="#8A0707" />
            <stop offset="100%" stopColor="#580000" />
          </linearGradient>
          <linearGradient id="goldFoil" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B37D22" />
            <stop offset="25%" stopColor="#FFD166" />
            <stop offset="50%" stopColor="#FFF4D0" />
            <stop offset="75%" stopColor="#FFB703" />
            <stop offset="100%" stopColor="#B37D22" />
          </linearGradient>
          <linearGradient id="sevTexture" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="50%" stopColor="#F8E71C" />
            <stop offset="100%" stopColor="#D08010" />
          </linearGradient>
          <radialGradient id="highlightGlow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <filter id="pouchShadow" x="-10%" y="-5%" width="120%" height="115%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#1a0404" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Pouch Silhouette */}
        <g filter="url(#pouchShadow)">
          {/* Main Pouch Body */}
          <path
            d="M 45 42 Q 190 28 335 42 L 348 450 Q 190 468 32 450 Z"
            fill="url(#pouchBg)"
          />

          {/* Top Heat-Seal Crimp */}
          <path
            d="M 45 42 Q 190 28 335 42 L 338 60 Q 190 48 42 60 Z"
            fill="url(#goldFoil)"
          />
          {/* Crimp vertical ridges */}
          {[60, 90, 120, 150, 180, 210, 240, 270, 300, 320].map((x) => (
            <line key={x} x1={x} y1="40" x2={x} y2="58" stroke="#7A4E08" strokeWidth="2" opacity="0.6" />
          ))}

          {/* Bottom Heat-Seal Crimp */}
          <path
            d="M 32 435 Q 190 452 348 435 L 350 455 Q 190 472 30 455 Z"
            fill="url(#goldFoil)"
          />
          {[50, 80, 110, 140, 170, 200, 230, 260, 290, 320].map((x) => (
            <line key={x} x1={x} y1="438" x2={x} y2="455" stroke="#7A4E08" strokeWidth="2" opacity="0.6" />
          ))}

          {/* Subtle Foil Sheen Curvature Highlights */}
          <path
            d="M 65 65 Q 190 52 315 65 L 305 435 Q 190 445 75 435 Z"
            fill="url(#highlightGlow)"
            opacity="0.85"
          />

          {/* Top Brand Banner Badge */}
          <g transform="translate(190, 100)">
            <ellipse cx="0" cy="0" rx="100" ry="28" fill="#FFFDF7" stroke="url(#goldFoil)" strokeWidth="4" />
            <text x="0" y="-3" textAnchor="middle" fill="#8B0000" fontSize="11" fontWeight="900" letterSpacing="2">
              CRUNCHYCRAFT
            </text>
            <text x="0" y="14" textAnchor="middle" fill="#FF6B00" fontSize="9" fontWeight="800" letterSpacing="3">
              ROYAL HERITAGE
            </text>
          </g>

          {/* Hindi Title Calligraphy */}
          <text x="190" y="160" textAnchor="middle" fill="#FFFDF7" fontSize="22" fontWeight="700" fontFamily="sans-serif">
            शाही आलू भुजिया
          </text>

          {/* English Product Name */}
          <text x="190" y="192" textAnchor="middle" fill="#FFD166" fontSize="25" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
            ALOO BHUJIA
          </text>
          <text x="190" y="210" textAnchor="middle" fill="#FFFDF7" fontSize="11" fontWeight="600" letterSpacing="3">
            ROYAL POTATO &amp; MINT CRUNCH
          </text>

          {/* Transparent Window Revealing Golden Sev */}
          <g transform="translate(190, 285)">
            <ellipse cx="0" cy="0" rx="95" ry="65" fill="#200B05" stroke="url(#goldFoil)" strokeWidth="4" />
            <ellipse cx="0" cy="0" rx="90" ry="60" fill="url(#sevTexture)" opacity="0.9" />
            
            {/* Fine crunchy strands inside window */}
            <path d="M -60 -20 Q -20 -40 20 -20 Q 60 0 70 30" stroke="#FFEAA7" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M -70 10 Q -30 35 10 15 Q 50 -10 60 -35" stroke="#FDCB6E" strokeWidth="4" strokeLinecap="round" />
            <path d="M -40 -35 Q 0 -15 30 -30 Q 70 -15 40 40" stroke="#FFEAA7" strokeWidth="3" strokeLinecap="round" />
            <path d="M -80 -5 Q -40 10 -10 -20 Q 20 -5 50 25" stroke="#E17055" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M -50 30 Q -10 10 30 35 Q 60 10 70 -5" stroke="#F9CA24" strokeWidth="4" strokeLinecap="round" />
            
            {/* Roasted peanuts in window */}
            <circle cx="-35" cy="-8" r="8" fill="#D35400" />
            <circle cx="28" cy="18" r="7" fill="#E67E22" />
            <circle cx="45" cy="-15" r="6" fill="#D35400" />

            {/* Gloss reflection across window */}
            <path d="M -75 -25 Q 0 -55 75 -25" stroke="#FFFFFF" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
          </g>

          {/* Badges on Pouch */}
          {/* Veg Logo */}
          <g transform="translate(68, 140)">
            <rect x="0" y="0" width="22" height="22" fill="#FFFDF7" stroke="#32662C" strokeWidth="2" rx="3" />
            <circle cx="11" cy="11" r="6" fill="#32662C" />
          </g>

          {/* Crunch Level Badge */}
          <g transform="translate(305, 140)">
            <rect x="-24" y="0" width="48" height="22" fill="#FFB703" rx="11" />
            <text x="0" y="15" textAnchor="middle" fill="#23140F" fontSize="10" fontWeight="900">
              98% CRUNCH
            </text>
          </g>

          {/* Spices callout banner */}
          <g transform="translate(190, 385)">
            <rect x="-120" y="0" width="240" height="26" fill="#2A0505" rx="6" stroke="#B37D22" strokeWidth="1.5" />
            <text x="0" y="17" textAnchor="middle" fill="#FFFDF7" fontSize="10" fontWeight="700" letterSpacing="1.5">
              FRESH MINT • KASHMIRI CHILI • ROCK SALT
            </text>
          </g>

          {/* Net weight & authentic stamp */}
          <text x="75" y="425" fill="#FFD166" fontSize="12" fontWeight="800">
            NET WT. 200g
          </text>
          <text x="305" y="425" textAnchor="end" fill="#FFFDF7" fontSize="11" fontWeight="700">
            ESTD. 1937
          </text>
        </g>
      </svg>
    </div>
  );
};

export const BikaneriBhujiaArtwork: React.FC<ProductArtworkProps> = ({ className = '', size = 'lg', style }) => {
  const getDims = () => {
    switch (size) {
      case 'sm': return { width: 140, height: 180 };
      case 'md': return { width: 220, height: 280 };
      case 'lg': return { width: 320, height: 410 };
      case 'xl': return { width: 420, height: 540 };
      case 'hero': return { width: 480, height: 615 };
      default: return { width: 320, height: 410 };
    }
  };
  const { width, height } = getDims();

  return (
    <div className={`relative inline-block transition-transform duration-500 select-none ${className}`} style={{ width, height, ...style }}>
      <svg viewBox="0 0 380 490" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="bikanerBg" x1="20" y1="20" x2="360" y2="470" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#690303" />
            <stop offset="50%" stopColor="#8C1111" />
            <stop offset="100%" stopColor="#4A0202" />
          </linearGradient>
          <linearGradient id="goldAccent" x1="0" y1="0" x2="380" y2="0">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF2B2" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <filter id="pouchShadow2">
            <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#230303" floodOpacity="0.6" />
          </filter>
        </defs>
        <g filter="url(#pouchShadow2)">
          <path d="M 45 42 Q 190 28 335 42 L 348 450 Q 190 468 32 450 Z" fill="url(#bikanerBg)" />
          <path d="M 45 42 Q 190 28 335 42 L 338 60 Q 190 48 42 60 Z" fill="url(#goldAccent)" />
          <path d="M 32 435 Q 190 452 348 435 L 350 455 Q 190 472 30 455 Z" fill="url(#goldAccent)" />
          
          <g transform="translate(190, 100)">
            <ellipse cx="0" cy="0" rx="90" ry="26" fill="#FFFDF7" stroke="url(#goldAccent)" strokeWidth="3" />
            <text x="0" y="3" textAnchor="middle" fill="#690303" fontSize="11" fontWeight="900" letterSpacing="2">
              CRUNCHYCRAFT
            </text>
          </g>

          <text x="190" y="155" textAnchor="middle" fill="#FFFDF7" fontSize="22" fontWeight="700">
            बीकानेरी भुजिया
          </text>
          <text x="190" y="190" textAnchor="middle" fill="#FFB703" fontSize="24" fontWeight="900" letterSpacing="2">
            BIKANERI BHUJIA
          </text>
          <text x="190" y="212" textAnchor="middle" fill="#FFFDF7" fontSize="11" fontWeight="600" letterSpacing="2">
            ORIGINAL MOTH DAL &amp; BLACK PEPPER
          </text>

          <g transform="translate(190, 285)">
            <ellipse cx="0" cy="0" rx="95" ry="60" fill="#2B1006" stroke="url(#goldAccent)" strokeWidth="3" />
            <ellipse cx="0" cy="0" rx="90" ry="55" fill="#E69500" opacity="0.9" />
            <path d="M -60 -20 Q 0 -40 60 -10" stroke="#FFF0A0" strokeWidth="3" />
            <path d="M -50 20 Q 0 40 50 10" stroke="#FFF0A0" strokeWidth="3" />
            <circle cx="10" cy="-5" r="4" fill="#1A1A1A" />
            <circle cx="-25" cy="15" r="3.5" fill="#1A1A1A" />
            <circle cx="35" cy="20" r="3" fill="#1A1A1A" />
          </g>

          <text x="190" y="390" textAnchor="middle" fill="#FFFDF7" fontSize="11" fontWeight="700">
            GI TAG CERTIFIED AUTHENTIC RECIPE
          </text>
          <text x="75" y="425" fill="#FFB703" fontSize="12" fontWeight="800">
            NET WT. 200g
          </text>
        </g>
      </svg>
    </div>
  );
};

export const KajuKatliArtwork: React.FC<ProductArtworkProps> = ({ className = '', size = 'lg', style }) => {
  const getDims = () => {
    switch (size) {
      case 'sm': return { width: 150, height: 150 };
      case 'md': return { width: 230, height: 230 };
      case 'lg': return { width: 330, height: 330 };
      case 'xl': return { width: 430, height: 430 };
      case 'hero': return { width: 480, height: 480 };
      default: return { width: 330, height: 330 };
    }
  };
  const { width, height } = getDims();

  return (
    <div className={`relative inline-block transition-transform duration-500 select-none ${className}`} style={{ width, height, ...style }}>
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="emeraldBox" x1="50" y1="50" x2="350" y2="350">
            <stop offset="0%" stopColor="#1E4432" />
            <stop offset="50%" stopColor="#2A6147" />
            <stop offset="100%" stopColor="#132B20" />
          </linearGradient>
          <linearGradient id="goldBorder" x1="0" y1="0" x2="400" y2="400">
            <stop offset="0%" stopColor="#F9D423" />
            <stop offset="50%" stopColor="#FF4E50" />
            <stop offset="100%" stopColor="#F9D423" />
          </linearGradient>
          <linearGradient id="silverVark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0F4F8" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#D9E2EC" />
            <stop offset="100%" stopColor="#BCCCDC" />
          </linearGradient>
        </defs>

        {/* Regal Octagonal Mithai Box */}
        <polygon
          points="100,30 300,30 370,100 370,300 300,370 100,370 30,300 30,100"
          fill="url(#emeraldBox)"
          stroke="#D4AF37"
          strokeWidth="6"
        />

        {/* Inner Gold Foil Frame */}
        <polygon
          points="110,48 290,48 352,110 352,290 290,352 110,352 48,290 48,110"
          fill="#163527"
          stroke="#F9E076"
          strokeWidth="2"
        />

        {/* Brand Header */}
        <text x="200" y="85" textAnchor="middle" fill="#F9E076" fontSize="13" fontWeight="900" letterSpacing="3">
          CRUNCHYCRAFT ROYAL SWEETS
        </text>
        <text x="200" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="19" fontWeight="800">
          SHAHI KAJU KATLI
        </text>

        {/* Diamond Cut Kaju Katlis with Silver Vark */}
        <g transform="translate(200, 230)">
          {/* Diamond 1 */}
          <polygon points="0,-60 45,0 0,60 -45,0" fill="url(#silverVark)" stroke="#B0C4DE" strokeWidth="2" />
          {/* Diamond 2 */}
          <polygon points="-55,-20 -10,40 -55,100 -100,40" fill="url(#silverVark)" stroke="#B0C4DE" strokeWidth="2" />
          {/* Diamond 3 */}
          <polygon points="55,-20 100,40 55,100 10,40" fill="url(#silverVark)" stroke="#B0C4DE" strokeWidth="2" />
          {/* Diamond 4 Top */}
          <polygon points="-55,-80 -10,-20 -55,40 -100,-20" fill="url(#silverVark)" stroke="#B0C4DE" strokeWidth="2" />
          <polygon points="55,-80 100,-20 55,40 10,-20" fill="url(#silverVark)" stroke="#B0C4DE" strokeWidth="2" />
        </g>

        <text x="200" y="335" textAnchor="middle" fill="#F9E076" fontSize="12" fontWeight="700" letterSpacing="2">
          PURE GOAN CASHEWS • CHANDI VARK
        </text>
      </svg>
    </div>
  );
};

export const GulabJamunArtwork: React.FC<ProductArtworkProps> = ({ className = '', size = 'lg', style }) => {
  const getDims = () => {
    switch (size) {
      case 'sm': return { width: 140, height: 180 };
      case 'md': return { width: 220, height: 280 };
      case 'lg': return { width: 320, height: 380 };
      default: return { width: 320, height: 380 };
    }
  };
  const { width, height } = getDims();

  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width, height, ...style }}>
      <svg viewBox="0 0 360 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="tinGold" x1="0" y1="0" x2="360" y2="0">
            <stop offset="0%" stopColor="#C59B27" />
            <stop offset="50%" stopColor="#FFF2B2" />
            <stop offset="100%" stopColor="#B37D22" />
          </linearGradient>
          <linearGradient id="tinBody" x1="0" y1="50" x2="0" y2="380">
            <stop offset="0%" stopColor="#5E1616" />
            <stop offset="100%" stopColor="#871F1F" />
          </linearGradient>
          <radialGradient id="jamunGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="50%" stopColor="#5A2303" />
            <stop offset="100%" stopColor="#2E0E00" />
          </radialGradient>
        </defs>

        {/* Cylinder Canister */}
        <rect x="50" y="60" width="260" height="320" rx="20" fill="url(#tinBody)" stroke="url(#tinGold)" strokeWidth="4" />
        <ellipse cx="180" cy="60" rx="130" ry="30" fill="url(#tinGold)" />
        <ellipse cx="180" cy="55" rx="124" ry="26" fill="#8B0000" />

        <text x="180" y="130" textAnchor="middle" fill="#FFD166" fontSize="13" fontWeight="900" letterSpacing="3">
          CRUNCHYCRAFT DELIGHTS
        </text>
        <text x="180" y="160" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900">
          GULAB JAMUN
        </text>
        <text x="180" y="180" textAnchor="middle" fill="#FFB703" fontSize="11" fontWeight="700">
          MADE IN PURE DESI GHEE
        </text>

        {/* Jamuns Display */}
        <g transform="translate(180, 260)">
          <ellipse cx="0" cy="40" rx="100" ry="25" fill="#3D0B0B" opacity="0.6" />
          {/* Jamun 1 */}
          <circle cx="-40" cy="10" r="38" fill="url(#jamunGrad)" />
          {/* Jamun 2 */}
          <circle cx="35" cy="15" r="35" fill="url(#jamunGrad)" />
          {/* Jamun 3 Center Top */}
          <circle cx="0" cy="-20" r="42" fill="url(#jamunGrad)" />
          {/* Saffron Strands and Pistachio Flakes */}
          <line x1="-15" y1="-25" x2="-5" y2="-40" stroke="#FF5722" strokeWidth="2.5" />
          <line x1="8" y1="-30" x2="20" y2="-15" stroke="#FF5722" strokeWidth="2.5" />
          <circle cx="-5" cy="-20" r="3" fill="#4E8752" />
          <circle cx="15" cy="-25" r="2.5" fill="#4E8752" />
        </g>
        <text x="180" y="360" textAnchor="middle" fill="#FFFDF7" fontSize="12" fontWeight="600">
          MELT-IN-MOUTH KHOYA DUMPLINGS
        </text>
      </svg>
    </div>
  );
};

export const MoongDalArtwork: React.FC<ProductArtworkProps> = ({ className = '', size = 'lg', style }) => {
  const getDims = () => {
    switch (size) {
      case 'sm': return { width: 140, height: 180 };
      case 'md': return { width: 220, height: 280 };
      default: return { width: 320, height: 410 };
    }
  };
  const { width, height } = getDims();

  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width, height, ...style }}>
      <svg viewBox="0 0 380 490" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="moongBg" x1="0" y1="0" x2="380" y2="490">
            <stop offset="0%" stopColor="#D98200" />
            <stop offset="50%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#B36200" />
          </linearGradient>
        </defs>
        <path d="M 45 42 Q 190 28 335 42 L 348 450 Q 190 468 32 450 Z" fill="url(#moongBg)" />
        <text x="190" y="105" textAnchor="middle" fill="#FFFDF7" fontSize="12" fontWeight="900" letterSpacing="3">
          CRUNCHYCRAFT
        </text>
        <text x="190" y="165" textAnchor="middle" fill="#23140F" fontSize="24" fontWeight="900">
          MOONG DAL
        </text>
        <text x="190" y="190" textAnchor="middle" fill="#FFFDF7" fontSize="12" fontWeight="700">
          GOLDEN SALTED LENTIL CRUNCH
        </text>
        <g transform="translate(190, 290)">
          <ellipse cx="0" cy="0" rx="95" ry="60" fill="#FFEAA7" stroke="#FFF" strokeWidth="3" />
          {/* Lentils dots */}
          {[-50, -30, -10, 10, 30, 50].map((x) => (
            <React.Fragment key={x}>
              <circle cx={x} cy={-15} r="6" fill="#F39C12" />
              <circle cx={x - 10} cy={10} r="6" fill="#E67E22" />
              <circle cx={x + 10} cy={25} r="5" fill="#F1C40F" />
            </React.Fragment>
          ))}
        </g>
        <text x="190" y="420" textAnchor="middle" fill="#FFFDF7" fontSize="12" fontWeight="800">
          100% ROASTED PROTEIN CRUNCH
        </text>
      </svg>
    </div>
  );
};

export const ProductArtwork: React.FC<{
  imageKey: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  style?: React.CSSProperties;
}> = ({ imageKey, size = 'lg', className = '', style }) => {
  switch (imageKey) {
    case 'aloo-bhujia':
      return <AlooBhujiaArtwork size={size} className={className} style={style} />;
    case 'bikaneri-bhujia':
      return <BikaneriBhujiaArtwork size={size} className={className} style={style} />;
    case 'kaju-katli':
      return <KajuKatliArtwork size={size} className={className} style={style} />;
    case 'gulab-jamun':
      return <GulabJamunArtwork size={size} className={className} style={style} />;
    case 'moong-dal':
      return <MoongDalArtwork size={size} className={className} style={style} />;
    case 'khatta-meetha':
    case 'navratan-mixture':
    case 'soan-papdi':
    case 'gift-hamper':
    default:
      return <AlooBhujiaArtwork size={size} className={className} style={style} />;
  }
};
