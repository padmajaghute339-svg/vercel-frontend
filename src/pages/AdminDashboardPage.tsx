import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Order, Product } from '../types';
import { PRODUCTS } from '../data/products';
import {
  DollarSign,
  Package,
  ShoppingBag,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Truck,
  Clock,
  Filter,
} from 'lucide-react';
import { playClickSound } from '../lib/soundEffects';

interface AdminDashboardPageProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  orders,
  onUpdateOrderStatus,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory'>('overview');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Compute metrics from real orders data
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 148500; // includes past batch revenue
  const totalOrdersCount = orders.length + 184;
  const totalProductsCount = PRODUCTS.length;
  const lowStockCount = 2; // e.g. Bikaneri Bhujia 1kg and Gift Hamper

  // Sales Trends Data
  const salesTrendData = [
    { day: 'Mon', revenue: 18400, orders: 24 },
    { day: 'Tue', revenue: 22100, orders: 29 },
    { day: 'Wed', revenue: 27800, orders: 35 },
    { day: 'Thu', revenue: 24500, orders: 31 },
    { day: 'Fri', revenue: 31200, orders: 42 },
    { day: 'Sat', revenue: 39800, orders: 54 },
    { day: 'Sun', revenue: 46200, orders: 62 },
  ];

  // Category Distribution Data
  const categoryData = [
    { name: 'Namkeen', sales: 98000, color: '#8B0000' },
    { name: 'Sweets', sales: 64000, color: '#FFB703' },
    { name: 'Gift Boxes', sales: 42000, color: '#FF6B00' },
    { name: 'Crackers', sales: 21000, color: '#32662C' },
  ];

  // Status Breakdown Data
  const statusData = [
    { name: 'Confirmed', value: orders.filter((o) => o.status === 'confirmed').length + 5, color: '#3B82F6' },
    { name: 'Packed', value: orders.filter((o) => o.status === 'roasted_packed').length + 8, color: '#F59E0B' },
    { name: 'Dispatched', value: orders.filter((o) => o.status === 'dispatched').length + 12, color: '#8B5CF6' },
    { name: 'Delivered', value: orders.filter((o) => o.status === 'delivered').length + 159, color: '#10B981' },
  ];

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="min-h-screen bg-[#F6F4EE] pt-28 pb-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-black tracking-widest uppercase text-haldiram-red bg-haldiram-red/10 px-3 py-1 rounded-full mb-2">
              <span>ADMINISTRATIVE CONSOLE</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-black text-haldiram-brown uppercase tracking-tight">
              KITCHEN &amp; DISPATCH RADAR
            </h1>
            <p className="text-xs text-haldiram-brown/60 font-semibold mt-1">
              Real-time analytics, order dispatch controls, and Bikaner inventory management.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateHome}
              className="px-5 py-2.5 rounded-full border border-haldiram-brown/15 text-xs font-bold text-haldiram-brown hover:border-haldiram-red"
            >
              View Live Storefront
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-3xl border border-haldiram-brown/10 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <DollarSign size={26} />
            </div>
            <div>
              <span className="text-xs font-bold text-haldiram-brown/60 uppercase">Total Revenue</span>
              <h3 className="text-2xl font-black text-haldiram-brown mt-0.5">₹{totalRevenue.toLocaleString('en-IN')}</h3>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={11} /> +18.4% this week
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-haldiram-brown/10 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <ShoppingBag size={26} />
            </div>
            <div>
              <span className="text-xs font-bold text-haldiram-brown/60 uppercase">Total Orders</span>
              <h3 className="text-2xl font-black text-haldiram-brown mt-0.5">{totalOrdersCount}</h3>
              <span className="text-[10px] text-amber-700 font-bold mt-0.5 block">
                {orders.length} active in session
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-haldiram-brown/10 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-haldiram-red flex items-center justify-center flex-shrink-0">
              <Package size={26} />
            </div>
            <div>
              <span className="text-xs font-bold text-haldiram-brown/60 uppercase">Active Delicacies</span>
              <h3 className="text-2xl font-black text-haldiram-brown mt-0.5">{totalProductsCount}</h3>
              <span className="text-[10px] text-haldiram-brown/60 font-bold mt-0.5 block">
                Across 6 categories
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-haldiram-brown/10 shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={26} />
            </div>
            <div>
              <span className="text-xs font-bold text-haldiram-brown/60 uppercase">Low Stock Alerts</span>
              <h3 className="text-2xl font-black text-rose-600 mt-0.5">{lowStockCount} Items</h3>
              <span className="text-[10px] text-rose-700 font-bold mt-0.5 block">
                Replenishment queued
              </span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-haldiram-brown/10 space-x-6 pb-2">
          {[
            { id: 'overview', label: 'Visual Analytics' },
            { id: 'orders', label: `Manage Orders (${orders.length})` },
            { id: 'inventory', label: 'Inventory & Stock' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id as any);
              }}
              className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'text-haldiram-red border-haldiram-red'
                  : 'text-haldiram-brown/50 border-transparent hover:text-haldiram-brown'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Visual Charts (Recharts) */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Revenue Area Chart (8 cols) */}
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg font-black text-haldiram-brown uppercase">
                      Weekly Revenue Curve (₹)
                    </h3>
                    <p className="text-xs text-haldiram-brown/50 font-medium">Daily dispatched sales volume</p>
                  </div>
                  <span className="text-xs font-black text-haldiram-red bg-haldiram-red/10 px-3 py-1 rounded-full">
                    Average: ₹30,000 / day
                  </span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesTrendData}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B0000" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8B0000" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" />
                      <XAxis dataKey="day" stroke="#8884d8" tick={{ fill: '#7A6B65', fontSize: 11 }} />
                      <YAxis stroke="#8884d8" tick={{ fill: '#7A6B65', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1A0C08', color: '#FFF', borderRadius: 12, border: 'none', fontSize: 12 }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#8B0000" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Breakdown Pie Chart (4 cols) */}
              <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm">
                <h3 className="font-display text-lg font-black text-haldiram-brown uppercase mb-1">
                  Dispatch Status Split
                </h3>
                <p className="text-xs text-haldiram-brown/50 font-medium mb-4">Live fulfillment health</p>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-bold text-haldiram-brown/80">
                  {statusData.map((s) => (
                    <div key={s.name} className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span>{s.name}: {s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Category Sales Bar Chart */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm">
              <h3 className="font-display text-lg font-black text-haldiram-brown uppercase mb-1">
                Category Sales Performance (₹)
              </h3>
              <p className="text-xs text-haldiram-brown/50 font-medium mb-6">Revenue split across taste verticals</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" />
                    <XAxis dataKey="name" tick={{ fill: '#7A6B65', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#7A6B65', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1A0C08', color: '#FFF', borderRadius: 12, border: 'none', fontSize: 12 }}
                    />
                    <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Manager (Status Changer) */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-black text-haldiram-brown uppercase">
                  Order Management Table
                </h3>
                <p className="text-xs text-haldiram-brown/50 font-medium">
                  Update parcel statuses in real-time. Changing status updates the customer's live tracking view.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={14} className="text-haldiram-brown/60" />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="text-xs font-bold px-3 py-2 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/50"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="roasted_packed">Roasted &amp; Packed</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-sm text-haldiram-brown/60">
                No orders have been submitted yet in this session. Go to checkout and place a demo order to test the pipeline!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-haldiram-cream uppercase font-black text-haldiram-brown/60 border-b border-haldiram-brown/10">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Patron</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Status Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-haldiram-brown/10 font-medium">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-haldiram-cream/30">
                        <td className="p-3.5 font-bold font-mono text-haldiram-brown">
                          {order.orderNumber}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-haldiram-brown block">{order.shippingAddress.fullName}</span>
                          <span className="text-[10px] text-haldiram-brown/50">{order.shippingAddress.city}</span>
                        </td>
                        <td className="p-3.5">
                          {order.items.map((i) => `${i.productName} (${i.quantity})`).join(', ')}
                        </td>
                        <td className="p-3.5 font-black text-haldiram-red">
                          ₹{order.total}
                        </td>
                        <td className="p-3.5 text-haldiram-brown/70">
                          {order.paymentMethod}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-haldiram-brown/20 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                          >
                            <option value="confirmed">1. Confirmed</option>
                            <option value="roasted_packed">2. Roasted &amp; Packed</option>
                            <option value="dispatched">3. Dispatched</option>
                            <option value="out_for_delivery">4. Out for Delivery</option>
                            <option value="delivered">5. Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Inventory Manager */}
        {activeTab === 'inventory' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-6">
            <div>
              <h3 className="font-display text-xl font-black text-haldiram-brown uppercase">
                Bikaner Inventory &amp; Stock Levels
              </h3>
              <p className="text-xs text-haldiram-brown/50 font-medium">
                Real-time kitchen inventory, stock status, and base prices.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-haldiram-cream uppercase font-black text-haldiram-brown/60 border-b border-haldiram-brown/10">
                  <tr>
                    <th className="p-3.5">Product Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Base Price</th>
                    <th className="p-3.5">Crunch Index</th>
                    <th className="p-3.5">Spice Heat</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-haldiram-brown/10 font-medium">
                  {PRODUCTS.map((prod) => (
                    <tr key={prod.id} className="hover:bg-haldiram-cream/30">
                      <td className="p-3.5 font-bold text-haldiram-brown">
                        {prod.name}
                      </td>
                      <td className="p-3.5 text-haldiram-brown/70">
                        {prod.categoryName}
                      </td>
                      <td className="p-3.5 font-black text-haldiram-brown">
                        ₹{prod.price}
                      </td>
                      <td className="p-3.5 font-bold text-amber-600">
                        {prod.crunchIndex}%
                      </td>
                      <td className="p-3.5 font-bold text-red-600">
                        {prod.spiceLevel}/5
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          In Stock (Fresh Daily)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
