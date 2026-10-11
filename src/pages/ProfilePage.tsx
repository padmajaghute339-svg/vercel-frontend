import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Order } from '../types';
import {
  User,
  Shield,
  MapPin,
  Package,
  LogOut,
  Mail,
  Phone,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { playClickSound } from '../lib/soundEffects';

interface ProfilePageProps {
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  onNavigateAdmin: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  orders,
  onTrackOrder,
  onNavigateAdmin,
}) => {
  const { user, isAdmin, toggleAdminMode, logout, login } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleQuickLogin = (email: string, role: 'customer' | 'admin') => {
    playClickSound();
    login(email, 'test1234', role);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] pt-32 pb-24 px-4 flex flex-col items-center justify-center select-none">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-haldiram-brown/10 shadow-xl space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-haldiram-red/10 text-haldiram-red flex items-center justify-center mx-auto mb-3">
              <User size={28} />
            </div>
            <h2 className="font-display text-2xl font-black text-haldiram-brown uppercase">
              Royal Patron Sign-In
            </h2>
            <p className="text-xs text-haldiram-brown/60 mt-1">
              Sign in to manage delivery addresses and view real-time dispatch tracking.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (loginEmail) login(loginEmail);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-haldiram-brown mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="patron@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-wider hover:bg-haldiram-red-dark transition-colors shadow-md"
            >
              Sign In to Account
            </button>
          </form>

          {/* One-click demo accounts */}
          <div className="pt-4 border-t border-haldiram-brown/10 space-y-2">
            <span className="block text-[11px] font-bold text-haldiram-brown/60 uppercase text-center">
              One-Click Demo Profiles:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('arjun.sharma@example.com', 'customer')}
                className="px-3 py-2 rounded-xl bg-haldiram-cream border border-haldiram-brown/10 text-xs font-bold text-haldiram-brown hover:border-haldiram-red"
              >
                Customer Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@haldiramcraft.com', 'admin')}
                className="px-3 py-2 rounded-xl bg-haldiram-cream border border-haldiram-brown/10 text-xs font-bold text-haldiram-red hover:border-haldiram-red"
              >
                Admin Confectioner
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-28 pb-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-full bg-haldiram-red text-white flex items-center justify-center font-display font-black text-2xl shadow-md">
              {user.name[0]}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-display text-2xl font-black text-haldiram-brown uppercase">
                  {user.name}
                </h1>
                {isAdmin && (
                  <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-haldiram-red text-white">
                    CHIEF ADMIN
                  </span>
                )}
              </div>
              <p className="text-xs text-haldiram-brown/60 font-medium flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                {user.phone && <span className="flex items-center gap-1"><Phone size={12} /> {user.phone}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={toggleAdminMode}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${
                isAdmin
                  ? 'bg-haldiram-red text-white border-haldiram-red shadow-sm'
                  : 'bg-haldiram-cream text-haldiram-brown border-haldiram-brown/20 hover:border-haldiram-red'
              }`}
            >
              <Shield size={13} className="inline mr-1" />
              {isAdmin ? 'Admin Mode (Active)' : 'Switch to Admin'}
            </button>

            {isAdmin && (
              <button
                onClick={onNavigateAdmin}
                className="px-4 py-2.5 rounded-full bg-haldiram-brown text-white text-xs font-black uppercase tracking-wider hover:bg-black transition-colors"
              >
                Admin Radar
              </button>
            )}

            <button
              onClick={() => {
                playClickSound();
                logout();
              }}
              className="p-2.5 rounded-full text-haldiram-brown/50 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Saved Addresses & Recent Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Saved Addresses */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-haldiram-brown/10">
              <div className="flex items-center space-x-2">
                <MapPin className="text-haldiram-red" size={18} />
                <h3 className="font-display text-base font-black text-haldiram-brown uppercase">
                  Saved Delivery Addresses
                </h3>
              </div>
            </div>

            {user.savedAddresses && user.savedAddresses.length > 0 ? (
              <div className="space-y-3">
                {user.savedAddresses.map((addr, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-haldiram-cream border border-haldiram-brown/10 text-xs space-y-1">
                    <span className="font-bold text-haldiram-brown block">{addr.fullName}</span>
                    <p className="text-haldiram-brown/80">{addr.street}</p>
                    <p className="text-haldiram-brown/80">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-haldiram-brown/60 pt-1">Contact: {addr.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-haldiram-brown/50">No saved addresses yet.</p>
            )}
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-haldiram-brown/10">
              <div className="flex items-center space-x-2">
                <Package className="text-haldiram-red" size={18} />
                <h3 className="font-display text-base font-black text-haldiram-brown uppercase">
                  Your Past Parcels ({orders.length})
                </h3>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-haldiram-brown/60">No recent orders in this session.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => onTrackOrder(ord)}
                    className="p-4 rounded-2xl bg-haldiram-cream hover:bg-haldiram-gold/10 border border-haldiram-brown/10 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-haldiram-brown text-xs font-mono">{ord.orderNumber}</span>
                        <span className="text-[10px] uppercase font-bold text-haldiram-red bg-haldiram-red/10 px-2 py-0.5 rounded-full">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-haldiram-brown/60 mt-1 line-clamp-1">
                        {ord.items.map((i) => i.productName).join(', ')}
                      </p>
                      <span className="text-xs font-black text-haldiram-brown block mt-1">₹{ord.total}</span>
                    </div>

                    <ExternalLink size={15} className="text-haldiram-brown/30 group-hover:text-haldiram-red transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
