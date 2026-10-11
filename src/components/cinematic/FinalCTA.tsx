import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas3DProduct } from './Canvas3DProduct';
import { FloatingIngredients } from './FloatingIngredients';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onExploreProducts: () => void;
  onShopBestsellers: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onExploreProducts,
  onShopBestsellers,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      tl.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' }
      );

      tl.fromTo(
        productRef.current,
        { scale: 0.8, y: 60, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' },
        0.2
      );

      tl.fromTo(
        actionsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] w-full flex flex-col justify-between items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#6A0404] via-[#7B0707] to-[#4A0000] text-white overflow-hidden select-none"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-haldiram-gold/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Ingredients in deep crimson space */}
      <FloatingIngredients intensity="medium" theme="spicy" interactive={true} />

      {/* Top Badge */}
      <div className="z-10 text-center">
        <span className="inline-flex items-center space-x-2 text-xs font-black tracking-[0.25em] text-haldiram-gold uppercase bg-black/40 px-4 py-1.5 rounded-full border border-haldiram-gold/30">
          <Sparkles size={12} />
          <span>The Sovereign Royal Feast</span>
        </span>
      </div>

      {/* Center Stage: Giant Headline + Hero Pouch */}
      <div className="relative z-20 w-full max-w-6xl flex flex-col items-center justify-center my-6">
        <div className="text-center w-full">
          <h2
            ref={headlineRef}
            className="font-display text-hero-giant font-black tracking-tightest uppercase text-white leading-[0.88] select-none"
          >
            LET'S <br />
            <span className="text-haldiram-gold">GET</span> <br />
            CRUNCHING.
          </h2>
        </div>

        <div
          ref={productRef}
          className="relative z-30 my-[-2vw] cursor-pointer"
          onClick={onExploreProducts}
        >
          <Canvas3DProduct
            imageKey="aloo-bhujia"
            size="hero"
            badgeText="FEAST PACK READY"
          />
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div
        ref={actionsRef}
        className="z-20 w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
      >
        <button
          onClick={() => {
            playClickSound();
            onShopBestsellers();
          }}
          className="w-full sm:w-auto px-10 py-5 rounded-full bg-haldiram-gold text-haldiram-brown text-xs font-black uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group"
        >
          <ShoppingBag size={15} />
          <span>Shop Bestsellers</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            onExploreProducts();
          }}
          className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-haldiram-brown transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group"
        >
          <span>Explore All Products</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
