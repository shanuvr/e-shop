import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import {
  ShieldAlert,
  Mail,
  Lock,
  ArrowRight,
  Check,
  Users,
  Zap,
  LayoutDashboard
} from 'lucide-react';

export default function SuperAdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError(true);
      return;
    }
    setError(false);
    navigate('/super-admin/dashboard');
  };

  return (
    <UserLayout>
      <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] py-8 sm:py-12 px-4 sm:px-6 flex items-center justify-center font-sans antialiased">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">

          {/* Left Decorative Banner */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-2 mb-8 select-none">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  E-SHOP HQ
                </span>
              </Link>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-400/20">
                <Zap className="w-3.5 h-3.5" />
                Super Admin Portal
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                Platform Control Center
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                Manage the entire E-SHOP platform — merchants, managed-sales requests, cataloging workflow and platform operations.
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
              {[
                'Master dashboard with platform GMV & operations',
                'Manage all registered sellers across the platform',
                'Review & approve managed-sales merchant requests'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{text}</span>
                </div>
              ))}
            </div>

            {/* Link to Seller Login */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Manage a specific store?{' '}
                <Link to="/seller-login" className="text-blue-400 font-bold hover:underline">
                  Seller &amp; Merchant Login &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">

            {/* Title */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Super Admin Login
                </h1>
                <Link to="/" className="text-xs font-bold text-primary hover:underline">
                  Back to Site
                </Link>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                Enter your HQ credentials to access the platform control center
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="admin@eshop.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500 hover:text-primary cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Please enter your admin email and password to continue.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer active:scale-95"
              >
                <span>Secure Login to HQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Demo credentials strip */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1.5">
                <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                Demo credentials
              </p>
              <p className="text-[11px] text-slate-500 font-medium font-mono">
                admin@eshop.com · admin-access
              </p>
            </div>

            {/* Footer note */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Restricted to authorised E-SHOP staff only
              </p>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}