import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import { useAuth, loginUser, logoutUser } from '../lib/auth';
import {
  addAddress,
  removeAddress,
  setDefaultAddress,
  useAddresses
} from '../lib/addresses';
import {
  UserCircle,
  Package,
  MapPin,
  Settings,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Bell,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2,
  KeyRound,
  Pencil,
  Home,
  Building2,
  X
} from 'lucide-react';

const TABS = [
  { key: 'overview', label: 'Overview', icon: UserCircle },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'settings', label: 'Settings', icon: Settings }
];

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-sm font-semibold text-slate-800 outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15';

const labelClass =
  'mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500';

function SectionCard({ title, subtitle, children, actions }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-400 font-medium">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function OverviewTab({ user }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);

  const save = () => {
    loginUser({ ...user, name, phone });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const rows = [
    { icon: UserCircle, label: 'Full Name', value: user?.name },
    { icon: Mail, label: 'Email Address', value: user?.email },
    { icon: Phone, label: 'Mobile Number', value: user?.phone },
    {
      icon: Calendar,
      label: 'Member Since',
      value: new Date(user?.joinedAt || Date.now()).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }
  ];

  return (
    <div className="space-y-5">
      <SectionCard
        title="Profile Information"
        subtitle="Your personal details used across E-SHOP"
        actions={
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Pencil className="h-3.5 w-3.5" />
            {editing ? 'Cancel' : 'Edit'}
          </button>
        }
      >
        {editing ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Mobile Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2.5 text-[11px] font-semibold text-blue-700">
              Email address is managed from the Settings tab.
            </div>
            <button
              type="button"
              onClick={save}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Save Changes
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Profile updated
              </span>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 py-3">
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-500">
                  <row.icon className="h-4 w-4 text-slate-400" />
                  {row.label}
                </div>
                <span className="text-right text-sm font-semibold text-slate-800 break-all">
                  {row.value || '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Package, label: 'My Orders', to: 'orders', value: 'Track & manage' },
          { icon: MapPin, label: 'Addresses', to: 'addresses', value: 'Delivery locations' },
          { icon: Settings, label: 'Settings', to: 'settings', value: 'Security & prefs' }
        ].map((item) => (
          <Link
            key={item.to}
            to={`/account?tab=${item.to}`}
            className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-colors hover:border-slate-300"
          >
            <item.icon className="h-5 w-5 text-primary" />
            <p className="mt-2.5 text-sm font-bold text-slate-900 flex items-center justify-between gap-2">
              {item.label}
              <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400 font-medium">{item.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <SectionCard title="My Orders" subtitle="Your past and active orders">
      <div className="py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
          <ShoppingBag className="h-6 w-6 text-slate-300" />
        </div>
        <h4 className="mt-4 text-base font-bold text-slate-900">No orders yet</h4>
        <p className="mx-auto mt-1 max-w-xs text-xs text-slate-400 font-medium">
          When you place an order, you can track it, view invoices and manage returns right here.
        </p>
        <Link
          to="/marketplace"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    </SectionCard>
  );
}

const LABELS = {
  Home: { icon: Home, cls: 'bg-blue-50 text-blue-700 border-blue-100' },
  Work: { icon: Building2, cls: 'bg-violet-50 text-violet-700 border-violet-100' },
  Other: { icon: MapPin, cls: 'bg-slate-100 text-slate-600 border-slate-200' }
};

function AddressesTab() {
  const addresses = useAddresses();
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    label: 'Home',
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    pincode: ''
  });

  const openForm = () => {
    setForm({
      label: addresses.length ? 'Work' : 'Home',
      fullName: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      pincode: ''
    });
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();
    addAddress(form);
    setShowForm(false);
  };

  return (
    <SectionCard
      title="Delivery Addresses"
      subtitle={`${addresses.length} saved ${addresses.length === 1 ? 'address' : 'addresses'}`}
      actions={
        <button
          type="button"
          onClick={openForm}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Address
        </button>
      }
    >
      {addresses.length === 0 ? (
        <div className="py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
            <MapPin className="h-6 w-6 text-slate-300" />
          </div>
          <h4 className="mt-4 text-base font-bold text-slate-900">No saved addresses</h4>
          <p className="mt-1 text-xs text-slate-400 font-medium">Add your first delivery address to speed up checkout.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => {
            const tag = LABELS[addr.label] || LABELS.Other;
            return (
              <div
                key={addr.id}
                className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold ${tag.cls}`}
                  >
                    <tag.icon className="h-3 w-3" />
                    {addr.label}
                  </span>
                  {addr.isDefault ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" />
                      Default
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-[10px] font-bold text-primary transition-colors hover:text-blue-700"
                    >
                      Set as default
                    </button>
                  )}
                </div>

                <p className="mt-3 text-sm font-bold text-slate-900">{addr.fullName}</p>
                <p className="text-xs font-medium text-slate-500">{addr.phone}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {addr.line1}
                  {addr.line2 ? `, ${addr.line2}` : ''}
                  <br />
                  {addr.city} · {addr.pincode}
                </p>

                <button
                  type="button"
                  onClick={() => removeAddress(addr.id)}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 transition-colors hover:text-rose-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-md rounded-2xl border border-slate-100 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h4 className="text-sm font-bold text-slate-900">Add Delivery Address</h4>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4 p-5">
              <div>
                <label className={labelClass}>Address Label</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(LABELS).map((key) => {
                    const tag = LABELS[key];
                    const active = form.label === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setForm({ ...form, label: key })}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-bold transition-colors ${
                          active
                            ? 'border-primary bg-blue-50 text-primary'
                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <tag.icon className="h-3.5 w-3.5" />
                        {key}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={inputClass}
                    placeholder="Receiver name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Address Line 1</label>
                <input
                  type="text"
                  required
                  value={form.line1}
                  onChange={(e) => setForm({ ...form, line1: e.target.value })}
                  className={inputClass}
                  placeholder="House no, street, area"
                />
              </div>

              <div>
                <label className={labelClass}>Address Line 2 (optional)</label>
                <input
                  type="text"
                  value={form.line2}
                  onChange={(e) => setForm({ ...form, line2: e.target.value })}
                  className={inputClass}
                  placeholder="Landmark, building"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputClass}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className={labelClass}>Pincode</label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    title="Enter a valid 6-digit pincode"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className={inputClass}
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

function SettingsTab({ user }) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwOk, setPwOk] = useState(false);

  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    let t;
    if (emailSent) t = setTimeout(() => setEmailSent(false), 3000);
    return () => clearTimeout(t);
  }, [emailSent]);

  const submitEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    if (email === user?.email) return;
    loginUser({ ...user, email });
    setEmail('');
    setEmailSent(true);
  };

  const submitPassword = (e) => {
    e.preventDefault();
    setPwOk(false);
    if (newPw.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (newPw !== confirmPw) {
      setPwError('Passwords do not match.');
      return;
    }
    setPwError('');
    setCurPw('');
    setNewPw('');
    setConfirmPw('');
    setPwOk(true);
    setTimeout(() => setPwOk(false), 3000);
  };

  return (
    <div className="space-y-5">
      <SectionCard title="Email Address" subtitle="Used for login, order updates and account recovery">
        <form onSubmit={submitEmail} className="space-y-4">
          <div>
            <label className={labelClass}>Current Email</label>
            <input type="email" value={user?.email || ''} readOnly className={inputClass + ' cursor-not-allowed text-slate-400'} />
          </div>
          <div>
            <label className={labelClass}>New Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="new@example.com"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            <Mail className="h-4 w-4" />
            Update Email
          </button>
          {emailSent && (
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 ml-3">
              <CheckCircle2 className="h-4 w-4" />
              Email updated successfully
            </p>
          )}
        </form>
      </SectionCard>

      <SectionCard title="Password" subtitle="Keep your account secure with a strong password">
        <form onSubmit={submitPassword} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Current Password</label>
              <input type="password" required value={curPw} onChange={(e) => setCurPw(e.target.value)} className={inputClass} placeholder="••••••••" />
            </div>
            <div>
              <label className={labelClass}>New Password</label>
              <input type="password" required value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inputClass} placeholder="Minimum 6 characters" />
            </div>
            <div>
              <label className={labelClass}>Confirm Password</label>
              <input type="password" required value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className={inputClass} placeholder="Re-enter new password" />
            </div>
          </div>

          {pwError && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-600">
              {pwError}
            </p>
          )}
          {pwOk && (
            <p className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Password changed successfully
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            <KeyRound className="h-4 w-4" />
            Change Password
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Preferences" subtitle="Choose what you want to hear from us">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="flex items-center gap-2.5">
            <Bell className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm font-bold text-slate-800">Email Notifications</p>
              <p className="text-[11px] text-slate-400 font-medium">
                Order updates, offers and recommendations
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notifications}
            onClick={() => setNotifications(!notifications)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              notifications ? 'bg-primary' : 'bg-slate-200'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                notifications ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

export default function Account() {
  const user = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestedTab = searchParams.get('tab');
  const activeTab = TABS.some((t) => t.key === requestedTab) ? requestedTab : 'overview';

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
    navigate('/');
  };

  return (
    <UserLayout>
      <div className="bg-[#f8fafc] min-h-[calc(100vh-130px)] py-8 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-4">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-600">My Account</span>
          </nav>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">My Account</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Manage your profile, orders, addresses and security settings.
          </p>

          <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-black text-white select-none">
                  {initials}
                </div>
                <h2 className="mt-3 text-base font-bold text-slate-900 truncate">{user?.name || 'Customer'}</h2>
                {user?.email && (
                  <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{user.email}</p>
                )}
                <span className="inline-flex items-center gap-1 mt-3 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <ShieldCheck className="h-3 w-3" />
                  Verified Account
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm">
                {TABS.map((tab) => (
                  <Link
                    key={tab.key}
                    to={`/account?tab=${tab.key}`}
                    className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                      activeTab === tab.key
                        ? 'bg-blue-50 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${
                        activeTab === tab.key ? 'text-primary' : 'text-slate-300'
                      }`}
                    />
                  </Link>
                ))}
                <div className="mt-1 border-t border-slate-100 px-1 pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </aside>

            {/* Content */}
            <section className="min-w-0">
              {user ? (
                <>
                  {activeTab === 'overview' && <OverviewTab user={user} />}
                  {activeTab === 'orders' && <OrdersTab />}
                  {activeTab === 'addresses' && <AddressesTab />}
                  {activeTab === 'settings' && <SettingsTab user={user} />}
                </>
              ) : (
                <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                    <UserCircle className="h-7 w-7 text-slate-300" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">You are not signed in</h3>
                  <p className="mt-1 text-xs text-slate-400 font-medium">
                    Sign in to view your profile, orders, addresses and settings.
                  </p>
                  <Link
                    to="/login"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}