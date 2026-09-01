import { useState } from 'react';
import ServiceAdminLayout from '../layout/ServiceAdminLayout';
import {
  Store,
  Settings,
  Save,
  Check,
  Pencil,
  X,
  Camera,
  Landmark,
  Bell,
  ShieldCheck,
  Wrench
} from 'lucide-react';

export default function ServiceSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editingTab, setEditingTab] = useState(null);
  const [savedTab, setSavedTab] = useState(null);

  // ---- Provider profile ----
  const [profile, setProfile] = useState({
    name: 'Thrissur AC & Electrical Care',
    category: 'Appliance Repair',
    tagline: 'Home AC & electrical care services at your doorstep',
    email: 'care@thrissuracservice.in',
    phone: '+91 98470 12345',
    address: 'Swaraj Round, Thrissur, Kerala 680001',
    radius: 15,
    experience: 6,
    license: 'KS-ELC-0421'
  });
  const [logoPreview, setLogoPreview] = useState('https://ui-avatars.com/api/?name=AC+Electrical&background=1a73e8&color=fff&size=128');
  const [coverPreview, setCoverPreview] = useState('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&h=300');

  // ---- General / receiving & notifications ----
  const [payment, setPayment] = useState({
    upiId: 'acservicekerala@hdfc',
    accountHolder: 'Thrissur AC & Electrical Care',
    bankName: 'HDFC Bank, Swaraj Round Branch',
    ifsc: 'HDFC0001234'
  });
  const [prefs, setPrefs] = useState({
    accepting: true,
    newBookingAlert: true,
    dailyReminder: true,
    weeklySummary: true
  });

  const setSaved = (tab) => {
    setSavedTab(tab);
    setTimeout(() => setSavedTab(null), 2500);
  };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setLogoPreview(URL.createObjectURL(file));
  };

  const handleCover = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setCoverPreview(URL.createObjectURL(file));
  };

  const TABS = [
    { key: 'profile', label: 'Provider Profile', icon: Store },
    { key: 'general', label: 'General Settings', icon: Settings }
  ];

  const inputCls = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default";
  const labelCls = "block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1";

  return (
    <ServiceAdminLayout title="Provider Settings" subtitle="Configure your business profile, receiving details and preferences">
      <div className="space-y-5">

        {/* Tabs */}
        <div className="bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-sm inline-flex flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === t.key
                  ? 'bg-primary text-white shadow-sm shadow-primary/20'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ============ PROVIDER PROFILE ============ */}
        {activeTab === 'profile' && (
          <div className="space-y-5">

            {/* Cover + profile header */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="relative h-32 sm:h-40">
                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                {editingTab === 'profile' && (
                  <label className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 hover:bg-white text-slate-700 rounded-lg text-[10px] font-bold shadow cursor-pointer transition-colors">
                    <Camera className="w-3 h-3" />
                    Change Cover
                    <input type="file" accept="image/*" className="hidden" onChange={handleCover} />
                  </label>
                )}
              </div>

              <div className="px-5 pb-5 -mt-10 relative">
                <div className="flex items-end gap-3">
                  <div className="relative w-20 h-20 shrink-0">
                    <img src={logoPreview} alt="Store" className="w-20 h-20 rounded-xl object-cover border-4 border-white bg-white shadow" />
                    {editingTab === 'profile' && (
                      <label className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary hover:bg-blue-700 text-white flex items-center justify-center shadow cursor-pointer transition-colors">
                        <Camera className="w-3 h-3" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-base font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] truncate">{profile.name}</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/90 text-white">
                        <ShieldCheck className="w-2.5 h-2.5" /> Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-white/85 font-medium mt-0.5 truncate">{profile.tagline}</p>
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/90 text-blue-700">
                      <Wrench className="w-2.5 h-2.5" /> {profile.category} · {profile.radius} km
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business details */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-slate-900">Business Details</h3>
                </div>
                <EditToggle
                  editing={editingTab === 'profile'}
                  onEdit={() => setEditingTab('profile')}
                  onCancel={() => setEditingTab(null)}
                  editLabel="Profile"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Business Name</label>
                  <input disabled={editingTab !== 'profile'} className={inputCls} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Primary Service Category</label>
                  <select disabled={editingTab !== 'profile'} className={`${inputCls} cursor-pointer`} value={profile.category} onChange={(e) => setProfile({ ...profile, category: e.target.value })}>
                    {['Appliance Repair', 'Plumbing & Electrical', 'Home Maintenance', 'Carpentry & Fixing', 'Painting & Decor', 'Cleaning & Pest Control'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Tagline / Short Description</label>
                  <input disabled={editingTab !== 'profile'} className={inputCls} value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Contact Email</label>
                  <input disabled={editingTab !== 'profile'} type="email" className={inputCls} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Contact Phone</label>
                  <input disabled={editingTab !== 'profile'} className={inputCls} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Service Address</label>
                  <input disabled={editingTab !== 'profile'} className={inputCls} value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Service Radius (km)</label>
                  <input disabled={editingTab !== 'profile'} type="number" min="1" className={inputCls} value={profile.radius} onChange={(e) => setProfile({ ...profile, radius: Number(e.target.value) })} />
                </div>
                <div>
                  <label className={labelCls}>Years of Experience</label>
                  <input disabled={editingTab !== 'profile'} type="number" min="1" className={inputCls} value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: Number(e.target.value) })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>License / Registration No.</label>
                  <input disabled={editingTab !== 'profile'} className={inputCls} value={profile.license} onChange={(e) => setProfile({ ...profile, license: e.target.value })} />
                </div>
              </div>

              <SaveBar
                tab="profile"
                savedTab={savedTab}
                editing={editingTab === 'profile'}
                onSave={() => {
                  setSaved('profile');
                  setEditingTab(null);
                }}
              />
            </div>
          </div>
        )}

        {/* ============ GENERAL SETTINGS ============ */}
        {activeTab === 'general' && (
          <div className="space-y-5 max-w-3xl">

            {/* Receiving payments */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Receiving Payments</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Where customers send payment directly for each visit</p>
                  </div>
                </div>
                <EditToggle
                  editing={editingTab === 'general'}
                  onEdit={() => setEditingTab('general')}
                  onCancel={() => setEditingTab(null)}
                  editLabel="General"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>UPI ID</label>
                  <input disabled={editingTab !== 'general'} className={inputCls} value={payment.upiId} onChange={(e) => setPayment({ ...payment, upiId: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Account Holder Name</label>
                  <input disabled={editingTab !== 'general'} className={inputCls} value={payment.accountHolder} onChange={(e) => setPayment({ ...payment, accountHolder: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Bank &amp; Branch</label>
                  <input disabled={editingTab !== 'general'} className={inputCls} value={payment.bankName} onChange={(e) => setPayment({ ...payment, bankName: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>IFSC Code</label>
                  <input disabled={editingTab !== 'general'} className={inputCls} value={payment.ifsc} onChange={(e) => setPayment({ ...payment, ifsc: e.target.value })} />
                </div>
              </div>

              <SaveBar
                tab="general"
                savedTab={savedTab}
                editing={editingTab === 'general'}
                onSave={() => {
                  setSaved('general');
                  setEditingTab(null);
                }}
              />
            </div>

            {/* Availability & notifications */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-900">Availability &amp; Notifications</h3>
              </div>

              {[
                { key: 'accepting', label: 'Accepting new bookings', desc: 'Customers can book your services right now' },
                { key: 'newBookingAlert', label: 'New booking alerts', desc: 'Get notified instantly when a customer books a visit' },
                { key: 'dailyReminder', label: 'Daily visit reminders', desc: "Morning reminder of today's scheduled visits" },
                { key: 'weeklySummary', label: 'Weekly earnings summary', desc: 'Email a summary of earnings and completed visits each week' }
              ].map((opt) => (
                <div key={opt.key} className="flex items-center justify-between rounded-lg hover:bg-slate-50 pl-2 pr-1 py-1.5 transition-colors">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{opt.label}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{opt.desc}</p>
                  </div>
                  <Toggle value={prefs[opt.key]} disabled={editingTab !== 'general'} onChange={(v) => setPrefs({ ...prefs, [opt.key]: v })} />
                </div>
              ))}

              <div className="pt-2 mt-1 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium">
                  {editingTab === 'general' ? 'Changes are applied when you save above.' : 'Click Edit General to modify these settings.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ServiceAdminLayout>
  );
}

function EditToggle({ editing, onEdit, onCancel, editLabel = 'Edit' }) {
  if (editing) {
    return (
      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-[11px] transition-all inline-flex items-center gap-1 cursor-pointer"
      >
        <X className="w-3 h-3" />
        Cancel
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onEdit}
      className="px-3 py-1.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] shadow-sm shadow-primary/20 transition-all inline-flex items-center gap-1 cursor-pointer"
    >
      <Pencil className="w-3 h-3" />
      Edit {editLabel}
    </button>
  );
}

function SaveBar({ tab, savedTab, onSave, editing }) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
      {editing ? (
        <button
          type="button"
          onClick={onSave}
          className="px-5 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm shadow-primary/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          Save Changes
        </button>
      ) : (
        <span className="text-[10px] text-slate-400 font-medium">Click Edit to modify these details</span>
      )}
      {savedTab === tab && (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
          <Check className="w-3 h-3" /> Saved successfully
        </span>
      )}
    </div>
  );
}

function Toggle({ value, onChange, disabled = false }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      disabled={disabled}
      className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${value ? 'bg-primary' : 'bg-slate-300'}`}
      aria-pressed={value}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
  );
}