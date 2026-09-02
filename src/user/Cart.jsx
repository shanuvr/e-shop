import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import {
  Trash2,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Truck,
  Lock,
  MapPin,
  Tag,
  Minus,
  Plus,
  CreditCard
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

function CartItem({ item, onQuantity, onRemove }) {
  const itemTotal = item.price * item.quantity;

  return (
    <li
      className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5 ${
        item.inStock ? '' : 'opacity-60'
      }`}
    >
      {/* Image */}
      <Link
        to={`/product/${item.id}`}
        className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 sm:h-24 sm:w-24"
      >
        <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
      </Link>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/product/${item.id}`}
              className="text-[15px] leading-snug font-medium text-slate-900 line-clamp-2 transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
            <p className="text-[13px] text-slate-500 mt-0.5">
              {item.variant} · {formatINR(item.price)} each
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
            title="Remove"
            className="p-1.5 -m-1.5 flex-shrink-0 rounded-lg text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {item.inStock ? (
            <>
              {item.assured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> E-SHOP Assured
                </span>
              )}
              <span className="text-[11px] font-medium text-slate-400">Sold by {item.seller}</span>
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
              <span className="h-1 w-1 rounded-full bg-amber-500" /> Out of stock
            </span>
          )}
        </div>
      </div>

      {/* Qty + Total */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2.5 sm:pl-4">
        {item.inStock ? (
          <>
            <div className="flex h-9 items-center overflow-hidden rounded-lg border border-slate-300">
              <button
                onClick={() => onQuantity(item.id, -1)}
                aria-label="Decrease quantity"
                className="flex h-full w-9 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-medium text-slate-900">{item.quantity}</span>
              <button
                onClick={() => onQuantity(item.id, 1)}
                aria-label="Increase quantity"
                className="flex h-full w-9 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-base font-semibold text-slate-900">{formatINR(itemTotal)}</span>
                <span className="text-xs text-slate-400 line-through">
                  {formatINR(item.originalPrice * item.quantity)}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">
                {Math.round((1 - item.price / item.originalPrice) * 100)}% off
              </span>
            </div>
          </>
        ) : (
          <span className="text-xs font-medium text-slate-400">Currently unavailable</span>
        )}
      </div>
    </li>
  );
}

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, delta) => {
    setItems(items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ESHOP10') {
      setAppliedCoupon({ code: 'ESHOP10', discount: 10 });
    } else {
      setAppliedCoupon({ code: 'INVALID' });
    }
  };

  const clearCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const validItems = items.filter((item) => item.inStock);
  const subtotal = validItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = validItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscount = totalMRP - subtotal;
  const couponDiscount = appliedCoupon && appliedCoupon.code === 'ESHOP10'
    ? Math.round(subtotal * 0.10)
    : 0;
  const delivery = subtotal - couponDiscount >= 499 ? 0 : 79;
  const grandTotal = subtotal - couponDiscount + delivery;
  const totalSavings = totalDiscount + couponDiscount + (delivery === 0 ? 79 : 0);

  if (items.length === 0) {
    return (
      <UserLayout>
        <EmptyCart />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-1.5 text-[13px] text-slate-500">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="font-medium text-slate-900">Shopping Cart</span>
          </div>

          {/* Title */}
          <div className="mb-6 flex items-end justify-between gap-4 lg:mb-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Shopping Cart
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {items.length} {items.length === 1 ? 'item' : 'items'}
                {validItems.length > 0 && <> · {formatINR(grandTotal)}</>}
              </p>
            </div>
            <Link
              to="/marketplace"
              className="hidden shrink-0 text-sm font-medium text-primary transition-colors hover:underline sm:inline-flex"
            >
              Continue shopping
            </Link>
          </div>

          <div className="lg:flex lg:items-start lg:gap-8">
            {/* Items */}
            <div className="min-w-0 flex-1">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-baseline justify-between border-b border-slate-100 px-5 pb-4 pt-5 sm:px-6">
                  <h2 className="text-[15px] font-semibold text-slate-900 sm:text-base">
                    Items <span className="font-normal text-slate-400">({items.length})</span>
                  </h2>
                  <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
                    Free delivery on orders over ₹499
                  </p>
                </div>
                <ul className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </ul>
              </div>

              {/* Trust strip */}
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 px-1">
                {[
                  { icon: Truck, label: 'Free delivery over ₹499' },
                  { icon: RotateCcw, label: '7-day easy returns' },
                  { icon: ShieldCheck, label: 'Secure payments' }
                ].map((f, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
                    <f.icon className="h-4 w-4 text-slate-400" />
                    {f.label}
                  </span>
                ))}
              </div>

              <Link
                to="/marketplace"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary transition-colors hover:underline sm:hidden"
              >
                Continue shopping
              </Link>
            </div>

            {/* Summary */}
            <aside className="mt-6 lg:mt-0 lg:w-[360px] lg:flex-shrink-0">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
                <h2 className="px-5 pt-5 text-[15px] font-semibold text-slate-900 sm:text-base">
                  Order summary
                </h2>
                <div className="p-5 pt-4 space-y-5">
                  {/* Delivery address */}
                  <div className="flex gap-3">
                    <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-slate-900">Deliver to</span>
                        <button className="text-[12px] font-semibold text-primary transition-colors hover:underline">
                          Change
                        </button>
                      </div>
                      <p className="mt-0.5 text-[13px] leading-snug text-slate-500">
                        Arjun Mehta · +91 98765 43210
                        <br />
                        House 42, Civil Lines Road, Thrissur,
                        <br />
                        Kerala 680001
                      </p>
                    </div>
                  </div>

                  {/* Coupon */}
                  <form onSubmit={applyCoupon} className="space-y-2.5 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-4 w-4 text-slate-400" />
                      <span className="text-[13px] font-semibold text-slate-900">Coupon</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="h-10 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                      <button
                        type="submit"
                        disabled={!couponCode.trim()}
                        className="h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Apply
                      </button>
                    </div>

                    {appliedCoupon && appliedCoupon.code === 'ESHOP10' && (
                      <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
                        <span className="text-xs font-semibold text-emerald-700">
                          ESHOP10 applied · −{formatINR(couponDiscount)}
                        </span>
                        <button
                          type="button"
                          onClick={clearCoupon}
                          className="text-xs font-semibold text-emerald-700 underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {appliedCoupon && appliedCoupon.code === 'INVALID' && (
                      <p className="text-xs font-medium text-rose-600">
                        That code isn't valid — try ESHOP10.
                      </p>
                    )}
                    {!appliedCoupon && (
                      <p className="text-[11px] text-slate-400">Tip: use code ESHOP10 for 10% off.</p>
                    )}
                  </form>

                  {/* Price details */}
                  <div className="border-t border-slate-100 pt-4">
                    <div className="space-y-1">
                      <div className="flex justify-between py-0.5 text-[13px]">
                        <span className="text-slate-500">Item subtotal ({validItems.length} {validItems.length === 1 ? 'item' : 'items'})</span>
                        <span className="font-medium text-slate-900">{formatINR(totalMRP)}</span>
                      </div>
                      <div className="flex justify-between py-0.5 text-[13px]">
                        <span className="text-slate-500">Discount</span>
                        <span className="font-medium text-emerald-600">− {formatINR(totalDiscount)}</span>
                      </div>
                      {couponDiscount > 0 && (
                        <div className="flex justify-between py-0.5 text-[13px]">
                          <span className="text-slate-500">Coupon (ESHOP10)</span>
                          <span className="font-medium text-emerald-600">− {formatINR(couponDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-0.5 text-[13px]">
                        <span className="text-slate-500">Delivery</span>
                        {delivery === 0 ? (
                          <span className="font-medium text-emerald-600">FREE</span>
                        ) : (
                          <span className="font-medium text-slate-900">{formatINR(delivery)}</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-[15px] font-semibold text-slate-900">Total</span>
                      <span className="text-lg font-semibold text-slate-900">{formatINR(grandTotal)}</span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      You save {formatINR(totalSavings)} on this order
                    </p>
                  </div>

                  {/* CTA */}
                  <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-white shadow-sm shadow-primary/20 transition-colors hover:bg-blue-700">
                    <Lock className="h-4 w-4" />
                    Proceed to Checkout
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <CreditCard className="h-3.5 w-3.5" />
                    Secure checkout · UPI, Cards, Net Banking & Wallets
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

function EmptyCart() {
  return (
    <div className="bg-[#f8fafc]">
      <div className="mx-auto flex min-h-[62vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag className="h-7 w-7 text-slate-400" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">
          Looks like you haven't added anything yet. Explore the marketplace to find something you'll love.
        </p>
        <Link
          to="/marketplace"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-colors hover:bg-blue-700"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
        <div className="mt-10 flex items-center gap-6 text-slate-400">
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <Truck className="h-4 w-4" /> Free delivery
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <RotateCcw className="h-4 w-4" /> Easy returns
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <ShieldCheck className="h-4 w-4" /> Secure payments
          </span>
        </div>
      </div>
    </div>
  );
}