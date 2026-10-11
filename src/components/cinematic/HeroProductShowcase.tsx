import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas3DProduct } from './Canvas3DProduct';
import { DriedRedChili, SevStrand, RoastedPeanut } from '../../assets/IngredientArt';
import { ShieldCheck, Flame, Award, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

gsap.registerPlugin(ScrollTrigger);

interface HeroProductShowcaseProps {
  onQuickView: () => void;
}

export const HeroProductShowcase: React.FC<HeroProductShowcaseProps> = ({ onQuickView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const headlineTrackRef = useRef<HTMLDivElement>(null);
  const productBoxRef = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll of headline + product scale & rotation + callouts reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1500',
          pin: pinTargetRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Horizontal headline movement across screen
      tl.to(
        headlineTrackRef.current,
        {
          xPercent: -45,
          ease: 'none',
        },
        0
      );

      // Product grows and rotates subtly like a cinematic 3D hero reveal
      tl.to(
        productBoxRef.current,
        {
          scale: 1.15,
          rotate: 6,
          y: -15,
          ease: 'power1.inOut',
        },
        0
      );

      // Callout 1 appears early
      tl.fromTo(
        callout1Ref.current,
        { opacity: 0, x: -60, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, ease: 'power2.out' },
        0.15
      );

      // Callout 2 appears mid-way
      tl.fromTo(
        callout2Ref.current,
        { opacity: 0, x: 60, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, ease: 'power2.out' },
        0.4
      );

      // Callout 3 appears toward the end
      tl.fromTo(
        callout3Ref.current,
        { opacity: 0, y: 50, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out' },
        0.65
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#6A0404] text-white">
      {/* Pinned Showcase Container */}
      <div
        ref={pinTargetRef}
        className="relative h-screen w-full flex flex-col justify-between items-center py-12 px-4 sm:px-8 overflow-hidden select-none bg-gradient-to-b from-[#7A0606] via-[#630000] to-[#500000]"
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-haldiram-gold/15 rounded-full blur-[160px] pointer-events-none" />

        {/* Decorative Floating Spices in Dark Red Space */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="absolute top-[18%] left-[10%] animate-float-slow opacity-85">
            <DriedRedChili size={65} rotation={-35} />
          </div>
          <div className="absolute bottom-[20%] right-[12%] animate-float-delayed opacity-85">
            <DriedRedChili size={55} rotation={45} />
          </div>
          <div className="absolute top-[28%] right-[15%] animate-float-slow opacity-80">
            <SevStrand size={60} rotation={25} />
          </div>
          <div className="absolute bottom-[25%] left-[14%] animate-float-delayed opacity-80">
            <RoastedPeanut size={50} rotation={-50} />
          </div>
        </div>

        {/* Top Section Badge */}
        <div className="z-20 text-center pt-8">
          <span className="text-[11px] font-black tracking-[0.3em] uppercase text-haldiram-gold px-4 py-1.5 rounded-full border border-haldiram-gold/30 bg-black/20">
            Signature Craftsmanship
          </span>
        </div>

        {/* HORIZONTAL SWEEPING HEADLINE TRACK */}
        <div className="absolute top-1/2 -translate-y-1/2 w-[220vw] left-0 pointer-events-none z-10 opacity-30 select-none">
          <div
            ref={headlineTrackRef}
            className="whitespace-nowrap font-display text-[15vw] font-black tracking-tightest uppercase text-white leading-none will-change-transform"
          >
            THE CRUNCH THAT CONNECTS • BIKANER HERITAGE • SINCE 1937 •
          </div>
        </div>

        {/* CENTER HERO PRODUCT STAGE */}
        <div className="relative z-20 flex items-center justify-center my-auto">
          <div ref={productBoxRef} className="cursor-pointer" onClick={onQuickView}>
            <Canvas3DProduct
              imageKey="aloo-bhujia"
              size="hero"
              badgeText="FLAGSHIP BHUJIA"
            />
          </div>

          {/* CALLOUT BADGE 1: Left */}
          <div
            ref={callout1Ref}
            className="absolute -left-4 sm:-left-36 md:-left-56 top-10 sm:top-16 max-w-[210px] sm:max-w-xs bg-black/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-haldiram-gold/40 shadow-2xl"
          >
            <div className="flex items-center space-x-2 text-haldiram-gold text-xs font-black uppercase tracking-wider mb-1">
              <Award size={15} />
              <span>GI-Tagged Moth Dal</span>
            </div>
            <p className="text-xs sm:text-sm text-haldiram-cream/90 font-medium">
              Harvested in arid Bikaner sands for extreme brittle micro-porosity and unmatched crunch acoustics.
            </p>
          </div>

          {/* CALLOUT BADGE 2: Right */}
          <div
            ref={callout2Ref}
            className="absolute -right-4 sm:-right-36 md:-right-56 top-32 sm:top-36 max-w-[210px] sm:max-w-xs bg-black/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-haldiram-gold/40 shadow-2xl"
          >
            <div className="flex items-center space-x-2 text-haldiram-saffron text-xs font-black uppercase tracking-wider mb-1">
              <Flame size={15} />
              <span>Secret 18-Spice Dust</span>
            </div>
            <p className="text-xs sm:text-sm text-haldiram-cream/90 font-medium">
              Pungent black pepper, sun-dried mint leaves, and hand-crushed whole cloves powdered at sub-zero temperatures.
            </p>
          </div>

          {/* CALLOUT BADGE 3: Bottom Center */}
          <div
            ref={callout3Ref}
            className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 max-w-sm w-full bg-black/80 backdrop-blur-md px-6 py-3.5 rounded-full border border-haldiram-gold/50 shadow-2xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="text-emerald-400" size={18} />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                100% Cold-Pressed Pure Veg
              </span>
            </div>
            <button
              onClick={() => {
                playClickSound();
                onQuickView();
              }}
              className="inline-flex items-center space-x-1.5 text-xs font-black uppercase text-haldiram-gold hover:text-white transition-colors"
            >
              <span>Quick Inspect</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Bottom Scroll Note */}
        <div className="z-20 pb-4 text-center">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
            Scroll down to enter the 3 Flavor Worlds
          </p>
        </div>
      </div>
    </div>
  );
};
