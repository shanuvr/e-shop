import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { loginUser } from '../lib/auth';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Smartphone,
  User,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    rememberMe: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      setResetSent(true);
      return;
    }
    loginUser({
      name: formData.name || 'E-Shop Customer',
      email: formData.email || '',
      phone: formData.phone || '',
      joinedAt: new Date().toISOString()
    });
    navigate('/');
  };

  const handleSocialLogin = () => {
    loginUser({
      name: 'Google Customer',
      email: '',
      phone: '',
      joinedAt: new Date().toISOString()
    });
    navigate('/');
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    if (pass.length < 6) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (pass.length < 10) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(formData.password);

  const resetToLogin = () => {
    setIsForgotPassword(false);
    setResetSent(false);
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15';

  const labelClass =
    'mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500';

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] font-sans">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="w-full max-w-[400px]">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            {isForgotPassword ? (
              <div>
                {!resetSent && (
                  <button
                    type="button"
                    onClick={resetToLogin}
                    className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Sign In
                  </button>
                )}

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-primary">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Reset your password
                </h1>
                <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
                  Enter the email address linked to your account and we{"'"}ll send you a link to reset your password.
                </p>

                {resetSent ? (
                  <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-emerald-900">Reset link sent</h3>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-emerald-700">
                      We emailed a password reset link to{' '}
                      <span className="font-bold">{formData.email}</span>
                    </p>
                    <button
                      type="button"
                      onClick={resetToLogin}
                      className="mt-4 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                    >
                      Back to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                    >
                      Send Reset Link
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className={`rounded-lg py-2 text-sm font-bold transition-colors ${
                      !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className={`rounded-lg py-2 text-sm font-bold transition-colors ${
                      isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {isSignUp && (
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {isSignUp || loginMethod === 'email' ? (
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className={labelClass}>Mobile Number</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={inputClass + ' pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {isSignUp && formData.password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all ${strength.color}`}
                            style={{ width: `${(strength.score / 3) * 100}%` }}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-bold ${
                            strength.score === 1
                              ? 'text-rose-600'
                              : strength.score === 2
                                ? 'text-amber-600'
                                : strength.score === 3
                                  ? 'text-emerald-600'
                                  : 'text-slate-400'
                          }`}
                        >
                          {strength.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {!isSignUp && (
                    <div className="flex items-center justify-between">
                      <label className="flex cursor-pointer items-center gap-2 select-none">
                        <input
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                          className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-xs font-semibold text-slate-600">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-xs font-bold text-primary transition-colors hover:text-blue-700"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setLoginMethod(loginMethod === 'email' ? 'phone' : 'email')}
                      className="text-xs font-bold text-primary transition-colors hover:text-blue-700"
                    >
                      {loginMethod === 'email'
                        ? 'Use mobile number instead'
                        : 'Use email address instead'}
                    </button>
                  )}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <div className="my-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    or continue with
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  onClick={handleSocialLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
            )}
          </div>

          <p className="mt-5 text-center text-xs font-medium text-slate-500">
            Are you a merchant?{' '}
            <Link to="/seller-login" className="font-bold text-primary hover:underline">
              Sign in to the Seller Portal
            </Link>
          </p>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
            By continuing, you agree to E-SHOP{"'"}s{' '}
            <Link to="/" className="font-semibold text-slate-500 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/" className="font-semibold text-slate-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}