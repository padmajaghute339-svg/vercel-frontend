import React, { useEffect, useState } from 'react';
import {
  SevStrand,
  RoastedPeanut,
  CashewNut,
  DriedRedChili,
  CurryLeaf,
  CardamomPod,
  PistachioSliver,
} from '../../assets/IngredientArt';

interface FloatingIngredientsProps {
  intensity?: 'hero' | 'medium' | 'minimal';
  theme?: 'spicy' | 'sweet' | 'crunchy' | 'mix';
  interactive?: boolean;
}

export const FloatingIngredients: React.FC<FloatingIngredientsProps> = ({
  intensity = 'hero',
  theme = 'mix',
  interactive = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!interactive || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, prefersReducedMotion]);

  // Items configuration based on theme
  const getIngredientList = () => {
    if (theme === 'spicy') {
      return [
        { type: 'chili', top: '15%', left: '12%', size: 60, rot: -25, depth: 35, anim: 'animate-float-slow' },
        { type: 'peanut', top: '22%', right: '14%', size: 52, rot: 40, depth: -25, anim: 'animate-float-delayed' },
        { type: 'sev', top: '65%', left: '8%', size: 58, rot: 15, depth: 40, anim: 'animate-float-slow' },
        { type: 'chili', top: '78%', right: '18%', size: 55, rot: 55, depth: -30, anim: 'animate-float-delayed' },
        { type: 'curry', top: '42%', left: '16%', size: 48, rot: -45, depth: 20, anim: 'animate-float-slow' },
      ];
    }
    if (theme === 'sweet') {
      return [
        { type: 'pistachio', top: '18%', left: '15%', size: 48, rot: -30, depth: 25, anim: 'animate-float-slow' },
        { type: 'cardamom', top: '25%', right: '16%', size: 50, rot: 25, depth: -35, anim: 'animate-float-delayed' },
        { type: 'cashew', top: '68%', left: '12%', size: 56, rot: 45, depth: 30, anim: 'animate-float-slow' },
        { type: 'pistachio', top: '75%', right: '14%', size: 46, rot: -60, depth: -20, anim: 'animate-float-delayed' },
      ];
    }
    if (theme === 'crunchy') {
      return [
        { type: 'sev', top: '16%', left: '10%', size: 58, rot: 30, depth: 30, anim: 'animate-float-slow' },
        { type: 'peanut', top: '24%', right: '12%', size: 50, rot: -40, depth: -25, anim: 'animate-float-delayed' },
        { type: 'cashew', top: '66%', right: '15%', size: 54, rot: 20, depth: 35, anim: 'animate-float-slow' },
        { type: 'sev', top: '78%', left: '14%', size: 62, rot: -15, depth: -30, anim: 'animate-float-delayed' },
      ];
    }

    // Default 'mix' for Hero
    return [
      { type: 'peanut', top: '14%', left: '10%', size: 55, rot: -28, depth: 35, anim: 'animate-float-slow' },
      { type: 'cashew', top: '22%', right: '12%', size: 62, rot: 42, depth: -40, anim: 'animate-float-delayed' },
      { type: 'sev', top: '45%', left: '6%', size: 65, rot: 18, depth: 45, anim: 'animate-float-slow' },
      { type: 'chili', top: '72%', left: '14%', size: 60, rot: -35, depth: -25, anim: 'animate-float-delayed' },
      { type: 'curry', top: '35%', right: '8%', size: 52, rot: -50, depth: 30, anim: 'animate-float-slow' },
      { type: 'peanut', top: '68%', right: '16%', size: 50, rot: 60, depth: -35, anim: 'animate-float-delayed' },
      { type: 'sev', top: '82%', right: '24%', size: 58, rot: -20, depth: 25, anim: 'animate-float-slow' },
      { type: 'pistachio', top: '12%', right: '28%', size: 44, rot: 15, depth: -20, anim: 'animate-float-delayed' },
    ];
  };

  const ingredients = getIngredientList().slice(0, intensity === 'hero' ? 8 : intensity === 'medium' ? 5 : 3);

  const renderComponent = (type: string, size: number, rot: number) => {
    switch (type) {
      case 'peanut': return <RoastedPeanut size={size} rotation={rot} />;
      case 'cashew': return <CashewNut size={size} rotation={rot} />;
      case 'sev': return <SevStrand size={size} rotation={rot} />;
      case 'chili': return <DriedRedChili size={size} rotation={rot} />;
      case 'curry': return <CurryLeaf size={size} rotation={rot} />;
      case 'cardamom': return <CardamomPod size={size} rotation={rot} />;
      case 'pistachio': return <PistachioSliver size={size} rotation={rot} />;
      default: return <SevStrand size={size} rotation={rot} />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {ingredients.map((item, index) => {
        // Calculate parallax offset based on depth and mouse position
        const offsetX = prefersReducedMotion ? 0 : mousePos.x * item.depth * 0.7;
        const offsetY = prefersReducedMotion ? 0 : mousePos.y * item.depth * 0.7;

        return (
          <div
            key={index}
            className={`absolute transition-transform duration-300 ease-out ${
              prefersReducedMotion ? '' : item.anim
            }`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
            }}
          >
            {renderComponent(item.type, item.size, item.rot)}
          </div>
        );
      })}
    </div>
  );
};
