import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import {
  Trash2,
  Heart,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  RotateCcw,
  Truck,
  Headphones,
  Lock,
  CreditCard,
  MapPin,
  BadgePercent,
  PackageCheck,
  Minus,
  Plus
} from 'lucide-react';

const initialItems = [
  {
    id: 'e1',
    title: 'Acoustic Pro Wireless ANC Headphones',
    variant: 'Midnight Matte Black',
    price: 24999,
    originalPrice: 39999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
    seller: 'Elite Digital Mall',
    assured: true,
    inStock: true
  },
  {
    id: 'e2',
    title: 'Elite Smartwatch Series',
    variant: 'Graphite / 44mm',
    price: 36999,
    originalPrice: 52999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
    seller: 'Elite Digital Mall',
    assured: true,
    inStock: true
  },
  {
    id: 'e3',
    title: 'Vintage Perfume Oud & Rose',
    variant: '100ml Eau de Parfum',
    price: 1250,
    originalPrice: 1999,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&h=300',
    seller: 'Swaraj Heritage Silks',
    assured: false,
    inStock: true
  },
  {
    id: 'e4',
    title: 'Sonic Fabric Speaker',
    variant: 'Charcoal / 20W',
    price: 15999,
    originalPrice: 29999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&h=300',
    seller: 'Elite Digital Mall',
    assured: true,
    inStock: false
  }
];

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const moveToWishlist = (id) => {
    removeItem(id);
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ESHOP10') {
      setAppliedCoupon({ code: 'ESHOP10', discount: 10 });
    } else {
      setAppliedCoupon({ code: 'INVALID' });
    }
  };

  const validItems = items.filter(item => item.inStock);
  const subtotal = validItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = validItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscount = totalMRP - subtotal;
  const couponDiscount = appliedCoupon && appliedCoupon.code === 'ESHOP10'
    ? Math.round(subtotal * 0.10)
    : 0;
  const delivery = subtotal - couponDiscount >= 499 ? 0 : 79;
  const grandTotal = subtotal - couponDiscount + delivery;

  if (items.length === 0) {
    return (
      <UserLayout>
        <EmptyCart />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="w-full bg-[#f8fafc] min-h-screen font-sans text-slate-900 antialiased pb-16">
        {/* Header */}
        <div className="bg-white border-b border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-900 font-medium">Shopping Cart</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/25">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
                  Your Cart
                </h1>
                <p className="text-[13px] text-slate-500 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Items List */}
          <div className="lg:col-span-2 space-y-5">
            {/* Coupon Banner */}
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Get extra 10% off</p>
                  <p className="text-xs text-blue-100">Use code <span className="font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">ESHOP10</span> at checkout</p>
                </div>
              </div>
            </div>

            {/* Item Cards */}
            {items.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                    item.inStock ? 'border-slate-200/80' : 'border-rose-200/70'
                  }`}
                >
                  <div className="p-4 flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{item.seller}</span>
                            {item.assured && (
                              <span className="flex items-center gap-1 text-[9px] font-semibold text-slate-700 px-1.5 py-0.5 bg-blue-50 rounded">
                                <ShieldCheck className="w-3 h-3 text-blue-700" />
                                Assured
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug line-clamp-2">
                            <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">{item.title}</Link>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{item.variant}</p>
                        </div>
                        <button
                          onClick={() => moveToWishlist(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1 flex-shrink-0"
                          aria-label="Move to wishlist"
                          title="Move to wishlist"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>

                      {!item.inStock && (
                        <p className="text-xs font-semibold text-rose-500 mt-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Out of stock
                        </p>
                      )}

                      {/* Pricing / Qty */}
                      <div className="mt-auto pt-3 flex flex-wrap items-end justify-between gap-3">
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base sm:text-lg font-bold text-slate-900">{formatINR(itemTotal)}</span>
                            <span className="text-xs text-slate-400 line-through">{formatINR(item.originalPrice * item.quantity)}</span>
                            <span className="text-xs font-bold text-primary">{Math.round((1 - item.price / item.originalPrice) * 100)}% off</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">Free shipping on this item</span>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center border border-slate-200 rounded-lg h-9">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={!item.inStock}
                              className="w-9 h-full flex items-center justify-center text-slate-600 hover:text-primary disabled:opacity-40 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={!item.inStock}
                              className="w-9 h-full flex items-center justify-center text-slate-600 hover:text-primary disabled:opacity-40 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue shopping */}
            <div className="flex items-center justify-between text-sm py-2">
              <Link to="/marketplace" className="text-primary font-semibold hover:underline flex items-center gap-1.5">
                <ChevronRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Trust bar */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹499' },
                { icon: RotateCcw, title: 'Easy Returns', desc: 'Hassle-free 7 days' },
                { icon: ShieldCheck, title: 'Secure Payments', desc: '100% encrypted' },
                { icon: Headphones, title: '24/7 Support', desc: 'We are here to help' }
              ].map((f, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <f.icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate">{f.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium truncate">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5 lg:sticky lg:top-[76px] space-y-5">
              {/* Delivery Address */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-slate-900">Deliver to</span>
                </div>
                <p className="text-[13px] text-slate-600 leading-snug">
                  <span className="font-semibold text-slate-800">Arjun Mehta, +91 98765 43210</span><br />
                  House 42, Civil Lines Road,<br />
                  Thrissur, Kerala 680001
                </p>
                <button className="text-xs font-bold text-primary hover:underline mt-1.5">Change</button>
              </div>

              {/* Coupon */}
              <form onSubmit={applyCoupon} className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-2.5">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-slate-900">Apply Coupon</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:border-primary placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-primary hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && appliedCoupon.code === 'ESHOP10' && (
                  <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5" /> Coupon ESHOP10 applied
                  </p>
                )}
                {appliedCoupon && appliedCoupon.code === 'INVALID' && (
                  <p className="text-xs font-semibold text-rose-500 mt-2">Invalid coupon code. Try ESHOP10</p>
                )}
              </form>

              {/* Price Details */}
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 mb-3">Price Details</h3>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Price ({validItems.length} {validItems.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold text-slate-900">{formatINR(totalMRP)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Product Discount</span>
                    <span className="font-semibold">− {formatINR(totalDiscount)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Coupon Discount (ESHOP10)</span>
                      <span className="font-semibold">− {formatINR(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Delivery Charges</span>
                    {delivery === 0 ? (
                      <span className="font-semibold text-emerald-600">FREE</span>
                    ) : (
                      <span className="font-semibold text-slate-900">{formatINR(delivery)}</span>
                    )}
                  </div>
                  {delivery === 0 && couponDiscount === 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Delivery Discount</span>
                      <span className="font-semibold">− {formatINR(79)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100">
                  <span className="text-sm font-black text-slate-900">Total Amount</span>
                  <span className="text-lg font-black text-slate-900">{formatINR(grandTotal)}</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 mt-1.5">
                  You will save {formatINR(totalDiscount + couponDiscount + (delivery === 0 ? 79 : 0))} on this order
                </p>
              </div>

              {/* Proceed to Checkout */}
              <button className="w-full bg-primary hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-primary/25">
                <Lock className="w-4 h-4" />
                Proceed to Checkout
              </button>

              {/* Secure payment note */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                <CreditCard className="w-3.5 h-3.5" />
                Secure payment · UPI, Cards, Net Banking & Wallets
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

function EmptyCart() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans text-slate-900 antialiased">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 mb-6">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-sm text-slate-500 mb-8">
          Looks like you haven't added anything to your cart yet. Explore the marketplace and discover great deals.
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-colors shadow-md shadow-primary/25"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Link>
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { icon: ShieldCheck, label: 'Secure Payments' },
            { icon: RotateCcw, label: 'Easy Returns' },
            { icon: Truck, label: 'Fast Delivery' }
          ].map((f, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 text-slate-400">
              <f.icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
