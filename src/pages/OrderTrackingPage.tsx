import React, { useState } from 'react';
import { Order } from '../types';
import { ProductArtwork } from '../assets/ProductArtwork';
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  Home,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { playClickSound } from '../lib/soundEffects';

interface OrderTrackingPageProps {
  orders: Order[];
  activeOrder?: Order | null;
  onContinueShopping: () => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  orders,
  activeOrder,
  onContinueShopping,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    activeOrder?.id || (orders.length > 0 ? orders[0].id : '')
  );
  const [copied, setCopied] = useState(false);

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || activeOrder || orders[0];

  const handleCopy = (text: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stages = [
    { key: 'confirmed', label: 'Order Confirmed', desc: 'Recipe queued for roasting', icon: CheckCircle },
    { key: 'roasted_packed', label: 'Roasted & Sealed', desc: 'Nitrogen-flushed Bikaner kitchen', icon: Package },
    { key: 'dispatched', label: 'In Express Transit', desc: 'Dispatched via Air Express', icon: Truck },
    { key: 'out_for_delivery', label: 'Out For Delivery', desc: 'Courier on final mile route', icon: Clock },
    { key: 'delivered', label: 'Safely Delivered', desc: 'Handed over to patron', icon: Home },
  ];

  const getStageIndex = (status: Order['status']) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'roasted_packed': return 1;
      case 'dispatched': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center">
        <Package size={48} className="text-haldiram-brown/30 mb-4" />
        <h2 className="font-display text-2xl font-bold text-haldiram-brown mb-2">
          No Orders Placed Yet
        </h2>
        <p className="text-sm text-haldiram-brown/60 mb-6">
          Your active dispatches and crunch history will appear here once you place an order.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3.5 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-wider"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const currentIndex = getStageIndex(currentOrder.status);

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-28 pb-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full mb-2 border border-emerald-200">
              <CheckCircle size={13} />
              <span>LIVE DISPATCH RADAR</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-haldiram-brown uppercase tracking-tight">
              ORDER {currentOrder.orderNumber}
            </h1>
            <p className="text-xs text-haldiram-brown/60 font-semibold mt-1">
              Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {currentOrder.paymentMethod}
            </p>
          </div>

          {/* Tracking Number badge with copy */}
          <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-2xl border border-haldiram-brown/15 shadow-sm">
            <span className="text-xs font-bold text-haldiram-brown/60">Airway Bill:</span>
            <span className="text-xs font-black text-haldiram-brown font-mono">{currentOrder.trackingNumber}</span>
            <button
              onClick={() => handleCopy(currentOrder.trackingNumber)}
              className="p-1 text-haldiram-brown/60 hover:text-haldiram-red rounded"
              title="Copy Airway Bill"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Timeline Progress Stepper */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-haldiram-brown/10 shadow-sm mb-10">
          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-haldiram-brown/10 -translate-y-1/2 z-0" />
            <div
              className="hidden md:block absolute top-1/2 left-0 h-1 bg-haldiram-red -translate-y-1/2 z-0 transition-all duration-700"
              style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
            />

            {/* Stepper items */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {stages.map((stage, idx) => {
                const isCompleted = idx <= currentIndex;
                const isCurrent = idx === currentIndex;
                const Icon = stage.icon;

                return (
                  <div key={stage.key} className="flex md:flex-col items-center md:text-center space-x-4 md:space-x-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-haldiram-red text-white ring-4 ring-haldiram-red/20 shadow-md'
                          : 'bg-haldiram-cream text-haldiram-brown/40 border border-haldiram-brown/15'
                      } ${isCurrent ? 'scale-110' : ''}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="md:mt-3">
                      <span className={`block text-xs font-black uppercase tracking-wider ${isCompleted ? 'text-haldiram-brown' : 'text-haldiram-brown/40'}`}>
                        {stage.label}
                      </span>
                      <span className="block text-[11px] text-haldiram-brown/60 font-medium">
                        {stage.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-haldiram-brown/10 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-haldiram-brown/80 gap-2">
            <span>Estimated Delivery Window: {currentOrder.estimatedDelivery}</span>
            <span className="text-emerald-700 font-extrabold flex items-center gap-1">
              ✓ Temperature Controlled Logistics
            </span>
          </div>
        </div>

        {/* Order Details & Summary Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Delivered Items */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-4">
            <h3 className="font-display text-base font-black text-haldiram-brown uppercase pb-2 border-b border-haldiram-brown/10">
              Items in this Parcel ({currentOrder.items.length})
            </h3>
            <div className="space-y-3">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-haldiram-brown/5 last:border-none">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-14 bg-haldiram-cream rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                      <ProductArtwork imageKey={item.imageKey} size="sm" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-haldiram-brown block">
                        {item.productName}
                      </span>
                      <span className="text-[10px] text-haldiram-brown/60">
                        {item.variantWeight} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-haldiram-brown">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-haldiram-brown/10 flex justify-between text-sm font-black text-haldiram-brown">
              <span>Total Paid</span>
              <span className="text-haldiram-red">₹{currentOrder.total}</span>
            </div>
          </div>

          {/* Delivery Address & Contact */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-4">
            <h3 className="font-display text-base font-black text-haldiram-brown uppercase pb-2 border-b border-haldiram-brown/10">
              Shipping Destination
            </h3>
            <div className="text-xs space-y-1.5 text-haldiram-brown/80 font-medium">
              <p className="font-black text-haldiram-brown text-sm">{currentOrder.shippingAddress.fullName}</p>
              <p>{currentOrder.shippingAddress.street}</p>
              <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}</p>
              <p className="text-haldiram-brown/60 pt-2">Phone: {currentOrder.shippingAddress.phone}</p>
              <p className="text-haldiram-brown/60">Email: {currentOrder.shippingAddress.email}</p>
            </div>

            <div className="pt-4 border-t border-haldiram-brown/10">
              <button
                onClick={onContinueShopping}
                className="w-full py-3.5 rounded-full bg-haldiram-brown text-white text-xs font-black uppercase tracking-wider hover:bg-black transition-colors"
              >
                Order More Specialties
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
