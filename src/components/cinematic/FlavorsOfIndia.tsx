import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas3DProduct } from './Canvas3DProduct';
import {
  DriedRedChili,
  RoastedPeanut,
  CardamomPod,
  PistachioSliver,
  SevStrand,
  CashewNut,
} from '../../assets/IngredientArt';
import { Flame, Heart, Zap, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

gsap.registerPlugin(ScrollTrigger);

interface FlavorsOfIndiaProps {
  onSelectFlavor: (flavor: 'spicy' | 'sweet' | 'crunchy') => void;
}

export const FlavorsOfIndia: React.FC<FlavorsOfIndiaProps> = ({ onSelectFlavor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spicyRef = useRef<HTMLDivElement>(null);
  const sweetRef = useRef<HTMLDivElement>(null);
  const crunchyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Art-directed entrance for Spicy Section
      const spicyTitle = spicyRef.current?.querySelector('.flavor-title');
      if (spicyTitle) {
        gsap.fromTo(
          spicyTitle,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: spicyRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Sweet Section: gentler float in
      const sweetTitle = sweetRef.current?.querySelector('.flavor-title');
      if (sweetTitle) {
        gsap.fromTo(
          sweetTitle,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: sweetRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Crunchy Section: snappy staggered bounce
      const crunchyTitle = crunchyRef.current?.querySelector('.flavor-title');
      if (crunchyTitle) {
        gsap.fromTo(
          crunchyTitle,
          { x: -70, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: crunchyRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden select-none">
      
      {/* ========================================================
          FLAVOR 1: SPICY (Deep Red, Chili, Peanuts, Pungency)
          ======================================================== */}
      <section
        ref={spicyRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#580000] via-[#750202] to-[#600101] text-white overflow-hidden"
      >
        {/* Floating Spices */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[8%] animate-float-slow">
            <DriedRedChili size={65} rotation={-25} />
          </div>
          <div className="absolute bottom-[20%] right-[10%] animate-float-delayed">
            <DriedRedChili size={60} rotation={40} />
          </div>
          <div className="absolute top-[30%] right-[12%] animate-float-slow">
            <RoastedPeanut size={52} rotation={55} />
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Giant Background Watermark Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
          <span className="font-display text-[22vw] font-black uppercase tracking-tightest leading-none">
            FIERY
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-black uppercase tracking-widest mb-4">
              <Flame size={14} className="text-red-400" />
              <span>FLAVOR REALM 01 • SPICE MATRIX</span>
            </div>

            <h2 className="flavor-title font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.92] text-white mb-4">
              TEEKHA &amp; <br />
              <span className="text-haldiram-gold">FIERY PEAK</span>
            </h2>

            <p className="text-sm sm:text-base text-red-100/90 font-medium leading-relaxed max-w-md mb-6">
              A crescendo of whole Tellicherry black peppercorns, dried Kashmiri red chilies, and sharp Hing. It ignites the tongue with warmth without overwhelming the deep nutty moth dal.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-8">
              <div className="bg-black/40 px-3.5 py-2 rounded-xl border border-red-500/30">
                <span className="block text-[10px] uppercase font-bold text-red-300">Spice Heat Index</span>
                <span className="text-sm font-black text-haldiram-gold">4.5 / 5.0 ★★★★☆</span>
              </div>
              <div className="bg-black/40 px-3.5 py-2 rounded-xl border border-red-500/30">
                <span className="block text-[10px] uppercase font-bold text-red-300">Signature Ingredient</span>
                <span className="text-sm font-black text-white">Bikaneri Moth Dal</span>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onSelectFlavor('spicy');
              }}
              className="px-8 py-4 rounded-full bg-haldiram-gold text-haldiram-brown text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center space-x-2 mx-auto md:mx-0 group"
            >
              <span>Shop Spicy Delicacies</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Product 3D */}
          <div className="flex-1 flex justify-center">
            <Canvas3DProduct
              imageKey="bikaneri-bhujia"
              size="lg"
              badgeText="AUTHENTIC GI TAG"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          FLAVOR 2: SWEET (Warm Saffron, Cream, Mithai, Cardamom)
          ======================================================== */}
      <section
        ref={sweetRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#2E523A] via-[#1E3A28] to-[#12261A] text-white overflow-hidden border-t border-emerald-900/30"
      >
        {/* Floating Sweet Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[18%] left-[10%] animate-float-slow">
            <CardamomPod size={55} rotation={20} />
          </div>
          <div className="absolute bottom-[22%] right-[12%] animate-float-delayed">
            <PistachioSliver size={50} rotation={-45} />
          </div>
          <div className="absolute top-[28%] right-[15%] animate-float-slow">
            <CashewNut size={58} rotation={35} />
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Giant Typography Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
          <span className="font-display text-[22vw] font-black uppercase tracking-tightest leading-none text-emerald-200">
            MEETHA
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          {/* Right Text (Reversed layout for dynamic visual rhythm) */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-widest mb-4">
              <Heart size={14} className="text-emerald-400" />
              <span>FLAVOR REALM 02 • ROYAL MITHAI</span>
            </div>

            <h2 className="flavor-title font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.92] text-white mb-4">
              ROYAL <br />
              <span className="text-haldiram-gold">SHAHI SWEETS</span>
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-md mb-6">
              Slow-cooked in copper cauldrons with pure A2 Desi Cow Ghee and grade W180 Goan cashews. Garnished with certified Chandi Vark silver foil that dissolves instantaneously.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-8">
              <div className="bg-black/40 px-3.5 py-2 rounded-xl border border-emerald-500/30">
                <span className="block text-[10px] uppercase font-bold text-emerald-300">Texture Quality</span>
                <span className="text-sm font-black text-haldiram-gold">Melt-in-Mouth Silky</span>
              </div>
              <div className="bg-black/40 px-3.5 py-2 rounded-xl border border-emerald-500/30">
                <span className="block text-[10px] uppercase font-bold text-emerald-300">Crafting Time</span>
                <span className="text-sm font-black text-white">4 Hours Slow Cooking</span>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onSelectFlavor('sweet');
              }}
              className="px-8 py-4 rounded-full bg-haldiram-gold text-haldiram-brown text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center space-x-2 mx-auto md:mx-0 group"
            >
              <span>Shop Royal Mithai</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Left Product 3D */}
          <div className="flex-1 flex justify-center">
            <Canvas3DProduct
              imageKey="kaju-katli"
              size="lg"
              badgeText="100% PURE CASHEWS"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          FLAVOR 3: CRUNCHY (Mustard Gold, Lentils, Sev, Resonance)
          ======================================================== */}
      <section
        ref={crunchyRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#B86B00] via-[#945500] to-[#784400] text-white overflow-hidden border-t border-amber-800/30"
      >
        {/* Floating Crispy Sev & Moong Dal */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[16%] left-[10%] animate-float-slow">
            <SevStrand size={65} rotation={-15} />
          </div>
          <div className="absolute bottom-[20%] right-[10%] animate-float-delayed">
            <SevStrand size={60} rotation={30} />
          </div>
          <div className="absolute top-[28%] right-[12%] animate-float-slow">
            <RoastedPeanut size={52} rotation={45} />
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-yellow-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Giant Watermark Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
          <span className="font-display text-[22vw] font-black uppercase tracking-tightest leading-none text-yellow-100">
            CRUNCH
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest mb-4">
              <Zap size={14} className="text-yellow-400" />
              <span>FLAVOR REALM 03 • GOLDEN SNAP</span>
            </div>

            <h2 className="flavor-title font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.92] text-white mb-4">
              GOLDEN <br />
              <span className="text-white">LENTIL SNAP</span>
            </h2>

            <p className="text-sm sm:text-base text-amber-100/90 font-medium leading-relaxed max-w-md mb-6">
              Sun-soaked yellow mung beans flash-fried in clear vegetable oil with pink rock salt. An airy, non-stop snack that crackles cleanly without heavy oiliness.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-8">
              <div className="bg-black/40 px-3.5 py-2 rounded-xl border border-amber-400/30">
                <span className="block text-[10px] uppercase font-bold text-amber-300">Crunch Index</span>
                <span className="text-sm font-black text-haldiram-gold">96% Decibel Snap</span>
              </div>
              <div className="bg-black/40 px-3.5 py-2 rounded-xl border border-amber-400/30">
                <span className="block text-[10px] uppercase font-bold text-amber-300">Protein Content</span>
                <span className="text-sm font-black text-white">19g Plant Protein</span>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onSelectFlavor('crunchy');
              }}
              className="px-8 py-4 rounded-full bg-white text-haldiram-brown text-xs font-black uppercase tracking-widest hover:bg-haldiram-gold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center space-x-2 mx-auto md:mx-0 group"
            >
              <span>Shop Crunchy Snacks</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Product 3D */}
          <div className="flex-1 flex justify-center">
            <Canvas3DProduct
              imageKey="moong-dal"
              size="lg"
              badgeText="AIRY & CRISP"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
