import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Store } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/categories', label: 'Categories' }
  ];

  const linkClass = ({ isActive }) =>
    `text-[15px] font-medium tracking-tight transition-colors ${
      isActive ? 'text-primary font-semibold' : 'text-on-surface hover:text-primary'
    }`;

  const mobileLinkClass = 'text-on-surface font-medium text-[15px] hover:text-primary transition-colors tracking-tight py-2';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo / Brand Name */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 select-none" onClick={() => setIsOpen(false)}>
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white">
            <Store className="w-5 h-5" />
          </div>
          <span className="flex items-baseline text-[20px] font-black tracking-tight">
            <span className="text-on-surface">E-</span>
            <span className="text-primary">SHOP</span>
          </span>
        </Link>

        {/* Desktop: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/seller" className={linkClass} end>
            Become a Seller
          </NavLink>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Icon */}
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-slate-50 transition-colors" 
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-slate-50 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>

          {/* Login Button */}
          <Link 
            to="/login" 
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-primary/20"
          >
            <User className="w-4 h-4" />
            Log in
          </Link>

          {/* Mobile: Hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-slate-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `${mobileLinkClass} ${isActive ? 'text-primary font-semibold' : ''} border-b border-slate-50`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link 
            to="/seller" 
            onClick={() => setIsOpen(false)}
            className={`${mobileLinkClass} border-b border-slate-50`}
          >
            Become a Seller
          </Link>
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow-sm shadow-primary/20"
          >
            <User className="w-4 h-4" />
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}
