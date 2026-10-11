import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FloatingIngredients } from './FloatingIngredients';
import { Canvas3DProduct } from './Canvas3DProduct';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

interface AnimatedHeroProps {
  onShopClick: () => void;
  onExploreFlavors: () => void;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  onShopClick,
  onExploreFlavors,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine3Ref = useRef<HTMLHeadingElement>(null);
  const productWrapperRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Staggered clip-reveal for giant headline words
      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
        { yPercent: 120, opacity: 0, rotateZ: 3 },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.2,
          stagger: 0.16,
          ease: 'power4.out',
        },
        0.1
      );

      // Hero Product Packet enters with scale, rotation, and vertical momentum
      tl.fromTo(
        productWrapperRef.current,
        { scale: 0.72, y: 120, opacity: 0, rotate: -8 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.4,
          ease: 'back.out(1.4)',
        },
        0.3
      );

      // CTAs and Scroll indicator fade in smoothly
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.9
      );

      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.2
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF7] via-[#FAF4E6] to-[#F5ECE0] overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-haldiram-gold/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-haldiram-saffron/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Snack Ingredients Layer */}
      <FloatingIngredients intensity="hero" theme="mix" interactive={true} />

      {/* Top Heritage Tagline */}
      <div className="z-20 text-center mb-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-haldiram-gold/20 border border-haldiram-gold/40 text-haldiram-brown text-xs font-black tracking-widest uppercase shadow-sm">
          <Sparkles size={13} className="text-haldiram-saffron" />
          <span>ESTABLISHED 1937 • BIKANER CRAFT HERITAGE</span>
        </div>
      </div>

      {/* Center Cinematic Stage: Layered Oversized Typography + Hero Product */}
      <div className="relative w-full max-w-7xl flex-1 flex flex-col items-center justify-center my-2">
        
        {/* BACKGROUND TYPOGRAPHY: "INDIA'S" */}
        <div className="overflow-hidden w-full text-center leading-none">
          <h1
            ref={headlineLine1Ref}
            className="text-hero-giant font-black tracking-tighter text-haldiram-red uppercase inline-block drop-shadow-sm select-none"
          >
            INDIA'S
          </h1>
        </div>

        {/* MIDDLE ROW: "FAVORITE" with Product Sandwiching */}
        <div className="relative w-full flex items-center justify-center">
          <div className="overflow-hidden w-full text-center leading-none z-0">
            <h1
              ref={headlineLine2Ref}
              className="text-hero-giant font-black tracking-tighter text-[#D19B27]/40 uppercase inline-block select-none transition-colors duration-500"
            >
              FAVORITE
            </h1>
          </div>

          {/* Centered Large Namkeen Pouch */}
          <div
            ref={productWrapperRef}
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform pointer-events-auto"
          >
            <Canvas3DProduct
              imageKey="aloo-bhujia"
              size="hero"
              badgeText="ORIGINAL BIKANER CRUNCH"
            />
          </div>
        </div>

        {/* FOREGROUND TYPOGRAPHY: "CRUNCH." */}
        <div className="overflow-hidden w-full text-center leading-none z-30">
          <h1
            ref={headlineLine3Ref}
            className="text-hero-giant font-black tracking-tighter text-haldiram-brown uppercase inline-block drop-shadow-sm select-none"
          >
            CRUNCH.
          </h1>
        </div>

      </div>

      {/* Bottom CTA Row and Animated Scroll Indicator */}
      <div
        ref={ctaRef}
        className="z-30 w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
      >
        <button
          onClick={() => {
            playClickSound();
            onShopClick();
          }}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-widest hover:bg-haldiram-red-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group"
        >
          <span>Shop The Collection</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            playClickSound();
            onExploreFlavors();
          }}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 backdrop-blur-md border border-haldiram-brown/15 text-haldiram-brown text-xs font-black uppercase tracking-widest hover:bg-white hover:border-haldiram-red hover:text-haldiram-red transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
        >
          Explore 3 Flavor Worlds
        </button>
      </div>

      {/* Animated Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="z-20 mt-6 flex flex-col items-center space-y-1 text-haldiram-brown/60 cursor-pointer"
        onClick={() => {
          window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">
          Scroll To Crunch
        </span>
        <ChevronDown size={18} className="animate-bounce text-haldiram-red" />
      </div>
    </section>
  );
};
