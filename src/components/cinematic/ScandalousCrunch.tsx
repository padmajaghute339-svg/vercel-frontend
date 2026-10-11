import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingIngredients } from './FloatingIngredients';
import { Canvas3DProduct } from './Canvas3DProduct';
import { Sparkles, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

gsap.registerPlugin(ScrollTrigger);

interface ScandalousCrunchProps {
  onExploreProduct: () => void;
}

export const ScandalousCrunch: React.FC<ScandalousCrunchProps> = ({ onExploreProduct }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
        },
      });

      // Words move at opposing subtle rates to create dimensional tension
      tl.fromTo(
        text1Ref.current,
        { y: 60, opacity: 0.3, letterSpacing: '-0.02em' },
        { y: -40, opacity: 1, letterSpacing: '-0.06em', ease: 'none' },
        0
      );

      tl.fromTo(
        text2Ref.current,
        { y: 80, opacity: 0.3 },
        { y: -60, opacity: 1, ease: 'none' },
        0.1
      );

      // Product grows from smaller scale to heroic scale
      tl.fromTo(
        productRef.current,
        { scale: 0.78, y: 100, rotate: -6 },
        { scale: 1.08, y: -20, rotate: 3, ease: 'power2.out' },
        0
      );

      // Description card fade and slide
      tl.fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power1.out' },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] w-full flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF5EA] overflow-hidden select-none border-t border-haldiram-brown/5"
    >
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[650px] bg-haldiram-gold/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-haldiram-saffron/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Savory Ingredients (Sev, Peanuts, Cashews) */}
      <FloatingIngredients intensity="hero" theme="crunchy" interactive={true} />

      {/* Section Subheading */}
      <div className="z-10 mb-6 text-center">
        <span className="inline-flex items-center space-x-2 text-xs font-black tracking-[0.28em] text-haldiram-red uppercase bg-haldiram-red/10 px-4 py-1.5 rounded-full border border-haldiram-red/20">
          <Sparkles size={12} />
          <span>Acoustic Food Architecture</span>
        </span>
      </div>

      {/* Massive Layered Headline with Intersecting Hero Product */}
      <div className="relative w-full max-w-7xl flex flex-col items-center justify-center">
        
        {/* WORD 1: SCANDALOUSLY (Behind Product) */}
        <div className="w-full text-center z-10">
          <h2
            ref={text1Ref}
            className="text-editorial-giant font-black tracking-tightest text-haldiram-brown uppercase leading-[0.88] select-none"
          >
            SCANDALOUSLY
          </h2>
        </div>

        {/* CENTER PRODUCT INTERSECTION */}
        <div
          ref={productRef}
          className="relative z-20 my-[-4vw] cursor-pointer"
          onClick={() => {
            playClickSound();
            onExploreProduct();
          }}
        >
          <Canvas3DProduct
            imageKey="bikaneri-bhujia"
            size="hero"
            badgeText="DECIBEL LEVEL: 99 dB"
          />
        </div>

        {/* WORD 2: CRUNCHY (In front / Overlapping base) */}
        <div className="w-full text-center z-30">
          <h2
            ref={text2Ref}
            className="text-editorial-giant font-black tracking-tightest text-haldiram-red uppercase leading-[0.88] select-none drop-shadow-sm"
          >
            CRUNCHY
          </h2>
        </div>

      </div>

      {/* Editorial Descriptive Callout */}
      <div
        ref={descRef}
        className="z-30 mt-12 max-w-xl text-center px-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-haldiram-brown/10 shadow-lg"
      >
        <p className="text-base sm:text-lg font-medium text-haldiram-brown leading-relaxed">
          Extruded from drought-resistant Rajasthani moth dal and fried at exact thermodynamic temperatures to produce micro-fracturing textures that crackle across the entire room.
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4">
          <button
            onClick={() => {
              playClickSound();
              onExploreProduct();
            }}
            className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-haldiram-red hover:text-haldiram-brown transition-colors group"
          >
            <span>Inspect The Anatomy of Crunch</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
