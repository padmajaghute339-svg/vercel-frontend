import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, HeartHandshake, History, Flame, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

gsap.registerPlugin(ScrollTrigger);

interface BrandStoryProps {
  onExploreCollection: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onExploreCollection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax card floating speeds on scroll
      gsap.to(card1Ref.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(card2Ref.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(card3Ref.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F7EFE2] to-[#FFFDF7] select-none overflow-hidden"
    >
      {/* Ambient Radial Highlights */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-haldiram-gold/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-haldiram-saffron/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Giant Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-black tracking-[0.25em] text-haldiram-red uppercase bg-haldiram-red/10 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={12} />
            <span>The 1937 Bikaner Tradition</span>
          </div>

          <h2 className="font-display text-hero-giant font-black tracking-tightest uppercase text-haldiram-brown leading-[0.88]">
            MADE FOR <br />
            <span className="text-haldiram-red">SHARING</span>
          </h2>

          <p className="mt-6 text-base sm:text-xl font-medium text-haldiram-brown/80 max-w-2xl mx-auto leading-relaxed">
            From a humble stone storefront inside the ramparts of Bikaner to millions of celebratory dining tables across the globe.
          </p>
        </div>

        {/* Layered Editorial Cards Grid with Subtle Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Card 1: 1937 Roots */}
          <div
            ref={card1Ref}
            className="bg-white p-8 rounded-3xl border border-haldiram-brown/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-haldiram-red/10 flex items-center justify-center text-haldiram-red mb-6">
                <History size={24} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-haldiram-gold">
                Chapter 01
              </span>
              <h3 className="font-display text-2xl font-black text-haldiram-brown uppercase mt-1 mb-3">
                The Bikaner Stone Chakki
              </h3>
              <p className="text-sm text-haldiram-brown/70 leading-relaxed font-medium">
                Legendary snacks began with an unbroken promise: grind only native desert moth dal on slow-turning natural granite stones to keep natural aromatics cold and intact.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-haldiram-brown/10 flex items-center justify-between text-xs font-bold text-haldiram-brown/60">
              <span>Bikaner, Rajasthan</span>
              <span>EST. 1937</span>
            </div>
          </div>

          {/* Card 2: Handcrafted Alchemy */}
          <div
            ref={card2Ref}
            className="bg-haldiram-brown text-white p-8 rounded-3xl border border-haldiram-gold/30 shadow-2xl flex flex-col justify-between md:-translate-y-6"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-haldiram-gold/20 flex items-center justify-center text-haldiram-gold mb-6">
                <Flame size={24} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-haldiram-saffron">
                Chapter 02
              </span>
              <h3 className="font-display text-2xl font-black text-white uppercase mt-1 mb-3">
                Thermodynamic Crisping
              </h3>
              <p className="text-sm text-haldiram-cream/80 leading-relaxed font-medium">
                Our master halwais test hot oil with acoustic precision. A true Haldiram bhujia strand takes exactly three seconds to blossom into millions of airy crunch chambers.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/50">
              <span>Copper Kadhais</span>
              <span>100% PURE GHEE &amp; OIL</span>
            </div>
          </div>

          {/* Card 3: Royal Hospitality */}
          <div
            ref={card3Ref}
            className="bg-white p-8 rounded-3xl border border-haldiram-brown/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-haldiram-red/10 flex items-center justify-center text-haldiram-red mb-6">
                <HeartHandshake size={24} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-haldiram-gold">
                Chapter 03
              </span>
              <h3 className="font-display text-2xl font-black text-haldiram-brown uppercase mt-1 mb-3">
                Atithi Devo Bhava
              </h3>
              <p className="text-sm text-haldiram-brown/70 leading-relaxed font-medium">
                In India, no guest leaves without a brass tray of spicy namkeen and glistening silver-foil kaju katli. It is the language of warmth, celebration, and familial connection.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-haldiram-brown/10 flex items-center justify-between text-xs font-bold text-haldiram-brown/60">
              <span>Generations of Trust</span>
              <span>100+ COUNTRIES</span>
            </div>
          </div>

        </div>

        {/* Section Action Button */}
        <div className="text-center">
          <button
            onClick={() => {
              playClickSound();
              onExploreCollection();
            }}
            className="px-8 py-4 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-widest hover:bg-haldiram-red-dark transition-all shadow-xl hover:scale-105 active:scale-95 inline-flex items-center space-x-2 group"
          >
            <span>Explore The Heritage Catalog</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
