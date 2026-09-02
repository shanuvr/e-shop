import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Store, ChevronDown, LogOut, Settings, UserCircle, Package, MapPin } from 'lucide-react';
import { useAuth, logoutUser } from '../lib/auth';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/categories', label: 'Categories' }
  ];

  const accountLinks = [
    { label: 'My Profile', to: '/account', icon: UserCircle },
    { label: 'My Orders', to: '/account?tab=orders', icon: Package },
    { label: 'Addresses', to: '/account?tab=addresses', icon: MapPin },
    { label: 'Settings', to: '/account?tab=settings', icon: Settings }
  ];

  const linkClass = ({ isActive }) =>
    `text-[15px] font-medium tracking-tight transition-colors ${
      isActive ? 'text-primary font-semibold' : 'text-on-surface hover:text-primary'
    }`;

  const mobileLinkClass = 'text-on-surface font-medium text-[15px] hover:text-primary transition-colors tracking-tight py-2';

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'E';

  const handleLogout = () => {
    logoutUser();
    setProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const closeAll = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

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
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Icon */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-slate-50 transition-colors hidden sm:flex"
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

          {/* Auth: Avatar dropdown (logged in) OR Login button */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-white p-1 pl-1 sm:pl-1.5 pr-1.5 sm:pr-2 hover:border-slate-300 transition-colors"
                aria-label="Account menu"
              >
                <span className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center select-none">
                  {initials}
                </span>
                <span className="hidden sm:block max-w-[110px] truncate text-sm font-semibold text-on-surface">
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 p-1.5 z-50">
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    {user.email && (
                      <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{user.email}</p>
                    )}
                  </div>
                  {accountLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={closeAll}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-slate-400" />
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-primary/20"
            >
              <UserCircle className="w-4 h-4" />
              Log in
            </Link>
          )}

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

          {user ? (
            <>
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={closeAll}
                  className={`${mobileLinkClass} border-b border-slate-50`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-rose-200 text-rose-600 font-semibold text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow-sm shadow-primary/20"
            >
              <UserCircle className="w-4 h-4" />
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}