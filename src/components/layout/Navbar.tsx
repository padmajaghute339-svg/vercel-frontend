import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, Shield, Volume2, VolumeX } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { playClickSound, setSoundEnabled, getSoundEnabled } from '../../lib/soundEffects';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onNavigate, currentPage }) => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { user, isAdmin, toggleAdminMode } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(getSoundEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) playClickSound();
  };

  const handleNavClick = (page: string) => {
    playClickSound();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-haldiram-cream/90 backdrop-blur-md shadow-sm border-b border-haldiram-brown/10 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs uppercase tracking-mega font-bold transition-colors ${
                currentPage === 'home'
                  ? 'text-haldiram-red'
                  : 'text-haldiram-brown/80 hover:text-haldiram-red'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-xs uppercase tracking-mega font-bold text-haldiram-brown/80 hover:text-haldiram-red transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick('snacks')}
              className="text-xs uppercase tracking-mega font-bold text-haldiram-brown/80 hover:text-haldiram-red transition-colors"
            >
              Snacks
            </button>
            <button
              onClick={() => handleNavClick('sweets')}
              className="text-xs uppercase tracking-mega font-bold text-haldiram-brown/80 hover:text-haldiram-red transition-colors"
            >
              Sweets
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-xs uppercase tracking-mega font-bold transition-colors ${
                currentPage === 'shop'
                  ? 'text-haldiram-red'
                  : 'text-haldiram-brown/80 hover:text-haldiram-red'
              }`}
            >
              All Products
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-haldiram-brown hover:text-haldiram-red transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-haldiram-red hover:scale-105 transition-transform duration-300">
              CRUNCHYCRAFT
            </span>
            <div className="flex items-center space-x-1.5 -mt-1">
              <span className="h-[1px] w-3 bg-haldiram-gold" />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-haldiram-saffron">
                ROYAL EXPERIENCES
              </span>
              <span className="h-[1px] w-3 bg-haldiram-gold" />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Audio Crunch Sound Toggle */}
            <button
              onClick={toggleSound}
              className="hidden sm:flex items-center justify-center p-2 rounded-full text-haldiram-brown/70 hover:text-haldiram-red hover:bg-haldiram-brown/5 transition-all"
              title={soundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} className="text-haldiram-brown/40" />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => {
                playClickSound();
                onOpenSearch();
              }}
              className="p-2 rounded-full text-haldiram-brown/80 hover:text-haldiram-red hover:bg-haldiram-brown/5 transition-colors"
              aria-label="Search snacks and sweets"
            >
              <Search size={20} />
            </button>

            {/* Profile / Account */}
            <button
              onClick={() => handleNavClick('profile')}
              className={`p-2 rounded-full transition-colors relative ${
                currentPage === 'profile'
                  ? 'text-haldiram-red bg-haldiram-red/10'
                  : 'text-haldiram-brown/80 hover:text-haldiram-red hover:bg-haldiram-brown/5'
              }`}
              aria-label="User Account"
            >
              <User size={20} />
              {user && (
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </button>

            {/* Admin Switcher Pill */}
            <button
              onClick={toggleAdminMode}
              className={`hidden lg:flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                isAdmin
                  ? 'bg-haldiram-red text-white border-haldiram-red shadow-sm'
                  : 'bg-transparent text-haldiram-brown/60 border-haldiram-brown/20 hover:border-haldiram-red hover:text-haldiram-red'
              }`}
              title="Toggle Admin Mode for Dashboard review"
            >
              <Shield size={12} />
              <span>{isAdmin ? 'ADMIN' : 'PATRON'}</span>
            </button>

            {/* Admin Dashboard Navigation if admin */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`text-[11px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full transition-all ${
                  currentPage === 'admin'
                    ? 'bg-haldiram-brown text-white'
                    : 'bg-haldiram-gold/20 text-haldiram-brown hover:bg-haldiram-gold/40'
                }`}
              >
                Dashboard
              </button>
            )}

            {/* Shopping Bag Button with Live Badge */}
            <button
              onClick={() => {
                playClickSound();
                setIsCartOpen(true);
              }}
              className="relative p-2.5 rounded-full bg-haldiram-red text-white hover:bg-haldiram-red-dark shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={18} />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-haldiram-gold text-haldiram-brown text-[11px] font-black shadow-sm animate-pulse-subtle">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-haldiram-cream/98 backdrop-blur-xl border-b border-haldiram-brown/10 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left text-base uppercase font-bold tracking-wider text-haldiram-brown hover:text-haldiram-red py-2 border-b border-haldiram-brown/5"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left text-base uppercase font-bold tracking-wider text-haldiram-brown hover:text-haldiram-red py-2 border-b border-haldiram-brown/5"
            >
              All Products &amp; Shop
            </button>
            <button
              onClick={() => handleNavClick('snacks')}
              className="text-left text-base uppercase font-bold tracking-wider text-haldiram-brown hover:text-haldiram-red py-2 border-b border-haldiram-brown/5"
            >
              Royal Snacks &amp; Namkeen
            </button>
            <button
              onClick={() => handleNavClick('sweets')}
              className="text-left text-base uppercase font-bold tracking-wider text-haldiram-brown hover:text-haldiram-red py-2 border-b border-haldiram-brown/5"
            >
              Artisanal Sweets
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left text-base uppercase font-bold tracking-wider text-haldiram-brown hover:text-haldiram-red py-2 border-b border-haldiram-brown/5"
            >
              Brand Heritage &amp; Story
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className="text-left text-base uppercase font-bold tracking-wider text-haldiram-brown hover:text-haldiram-red py-2 border-b border-haldiram-brown/5"
            >
              Track Orders
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className="text-left text-base uppercase font-bold tracking-wider text-haldiram-brown hover:text-haldiram-red py-2 border-b border-haldiram-brown/5"
            >
              My Account
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left text-base uppercase font-bold tracking-wider text-haldiram-red py-2 border-b border-haldiram-brown/5"
              >
                Admin Dashboard
              </button>
            )}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-haldiram-brown/60">
                CRUNCH AUDIO EFFECTS
              </span>
              <button
                onClick={toggleSound}
                className="text-xs font-bold text-haldiram-red uppercase px-3 py-1 bg-haldiram-red/10 rounded-full"
              >
                {soundOn ? 'Enabled' : 'Muted'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
