import React from 'react';
import { Mail, Phone, MapPin, Globe, Share2, Sparkles, Send } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

interface FooterProps {
  onNavigate: (page: string) => void;
  onFilterCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterCategory }) => {
  return (
    <footer className="w-full bg-[#1A0C08] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-haldiram-gold/20 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="font-display text-3xl font-black tracking-tight text-white hover:text-haldiram-gold transition-colors">
                CRUNCHYCRAFT
              </span>
              <div className="flex items-center space-x-1.5 -mt-1">
                <span className="h-[1px] w-4 bg-haldiram-gold" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-haldiram-gold">
                  ROYAL EXPERIENCES
                </span>
                <span className="h-[1px] w-4 bg-haldiram-gold" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              An immersive cinematic tribute to royal Indian snack architecture, hand-ground desert moth dal, and generational mithai craftsmanship.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-white/70">
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 hover:bg-haldiram-gold hover:text-haldiram-brown flex items-center justify-center transition-colors" title="Global Network">
                <Globe size={16} />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 hover:bg-haldiram-gold hover:text-haldiram-brown flex items-center justify-center transition-colors" title="Social Community">
                <Share2 size={16} />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 hover:bg-haldiram-gold hover:text-haldiram-brown flex items-center justify-center transition-colors" title="Direct Dispatch">
                <Send size={16} />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 hover:bg-haldiram-gold hover:text-haldiram-brown flex items-center justify-center transition-colors" title="Craft Heritage">
                <Sparkles size={16} />
              </a>
            </div>
          </div>

          {/* Column: Royal Specialties */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-haldiram-gold mb-4">
              Royal Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={() => {
                    playClickSound();
                    onFilterCategory('namkeen');
                  }}
                  className="hover:text-haldiram-gold transition-colors"
                >
                  Bikaneri Namkeen
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playClickSound();
                    onFilterCategory('sweets');
                  }}
                  className="hover:text-haldiram-gold transition-colors"
                >
                  Traditional Sweets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playClickSound();
                    onFilterCategory('gift-boxes');
                  }}
                  className="hover:text-haldiram-gold transition-colors"
                >
                  Festive Gift Boxes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playClickSound();
                    onFilterCategory('chips-savories');
                  }}
                  className="hover:text-haldiram-gold transition-colors"
                >
                  Savory Crackers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playClickSound();
                    onNavigate('shop');
                  }}
                  className="hover:text-haldiram-gold transition-colors"
                >
                  All Specialties
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Customer Concierge */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-haldiram-gold mb-4">
              Concierge Care
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-haldiram-gold transition-colors">
                  Track Your Dispatch
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profile')} className="hover:text-haldiram-gold transition-colors">
                  Royal Patron Account
                </button>
              </li>
              <li>
                <span className="text-white/40 cursor-default">Express Delivery Guide</span>
              </li>
              <li>
                <span className="text-white/40 cursor-default">Bulk Wedding Catering</span>
              </li>
              <li>
                <span className="text-white/40 cursor-default">Quality &amp; Lab Reports</span>
              </li>
            </ul>
          </div>

          {/* Column: Contact & Bikaner Office */}
          <div className="space-y-3 text-xs text-white/70">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-haldiram-gold mb-4">
              Heritage Hub
            </h4>
            <div className="flex items-start space-x-2">
              <MapPin size={15} className="text-haldiram-gold flex-shrink-0 mt-0.5" />
              <span>Bhujia Bazar, Old City, Bikaner, Rajasthan 334001, India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={14} className="text-haldiram-gold flex-shrink-0" />
              <span>+91 (0151) 220-CRAFT</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-haldiram-gold flex-shrink-0" />
              <span>experience@crunchycraft.concept</span>
            </div>
          </div>

        </div>

        {/* Animated Brand Wordmark Banner */}
        <div className="py-12 border-b border-white/10 text-center overflow-hidden">
          <div className="font-display text-[10vw] font-black uppercase tracking-tighter text-white/5 hover:text-white/10 transition-colors duration-700 whitespace-nowrap select-none">
            CRUNCHYCRAFT • SINCE 1937
          </div>
        </div>

        {/* Legal Disclaimers & Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <div className="flex items-center space-x-1">
            <span>© 2026 CrunchyCraft. Inspired by authentic Indian culinary heritage.</span>
          </div>

          <div className="bg-black/40 px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-amber-300/80 text-center">
            CrunchyCraft Artisanal Food Experience — Celebrating authentic Indian snack architecture.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-haldiram-gold transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-haldiram-gold transition-colors">Terms of Experience</a>
            <a href="#security" className="hover:text-haldiram-gold transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
