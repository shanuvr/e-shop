import { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import {
  Store,
  Settings,
  Truck,
  MapPin,
  Save,
  Plus,
  X,
  Camera,
  Pencil,
  Globe,
  Bell,
  Wallet,
  Check,
  FileText
} from 'lucide-react';

const fmtMoney = (n) => `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [savedTab, setSavedTab] = useState(null);

  // ---- Store profile ----
  const [store, setStore] = useState({
    name: 'Elite Digital Stores',
    tagline: 'Premium electronics & home essentials',
    category: 'Electronics & Gadgets',
    email: 'store@elitedigital.in',
    phone: '+91 98470 12345',
    address: 'Swaraj Round, Thrissur, Kerala 680001',
    gstin: '32ABCDE1234F1Z5',
    website: 'www.elitedigital.in'
  });
  const [profilePreview, setProfilePreview] = useState('https://ui-avatars.com/api/?name=Elite+Digital&background=1a73e8&color=fff&size=128');
  const [coverPreview, setCoverPreview] = useState('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&h=300');
  const [editingTab, setEditingTab] = useState(null);

  // ---- Delivery settings ----
  const [delivery, setDelivery] = useState({
    fee: 49,
    freeAbove: 999,
    minDays: 2,
    maxDays: 5,
    locations: [
      { id: 1, city: 'Thrissur', pincode: '680001' },
      { id: 2, city: 'Kochi', pincode: '682001' },
      { id: 3, city: 'Palakkad', pincode: '678001' }
    ]
  });
  const [newLocation, setNewLocation] = useState({ city: '', pincode: '' });

  // ---- General settings ----
  const [general, setGeneral] = useState({
    currency: 'INR',
    autoDispatch: true,
    lowStockAlert: true,
    orderNotification: true,
    payoutSummary: true,
    storeActive: true,
    timezone: 'Asia/Kolkata (IST)'
  });

  const setSaved = (tab) => {
    setSavedTab(tab);
    setTimeout(() => setSavedTab(null), 2500);
  };

  const handleProfileImage = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setProfilePreview(URL.createObjectURL(file));
  };

  const handleCoverImage = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setCoverPreview(URL.createObjectURL(file));
  };

  const addLocation = () => {
    if (!newLocation.city.trim() || !newLocation.pincode.trim()) return;
    setDelivery({
      ...delivery,
      locations: [...delivery.locations, { id: Date.now(), city: newLocation.city.trim(), pincode: newLocation.pincode.trim() }]
    });
    setNewLocation({ city: '', pincode: '' });
  };

  const removeLocation = (id) => {
    setDelivery({ ...delivery, locations: delivery.locations.filter(l => l.id !== id) });
  };

  const TABS = [
    { key: 'profile', label: 'Store Profile', icon: Store },
    { key: 'delivery', label: 'Delivery Settings', icon: Truck },
    { key: 'general', label: 'General Settings', icon: Settings }
  ];

  const inputCls = "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors";
  const labelCls = "block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5";

  return (
    <SellerAdminLayout title="Store Settings" subtitle="Configure your store profile, delivery, and preferences">
      <div className="space-y-6">

        {/* Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm inline-flex flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === t.key
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ============ STORE PROFILE ============ */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Cover + profile header */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="relative h-40 sm:h-52">
                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

                {/* Change cover */}
                {editingTab === 'profile' && (
                  <label className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-lg text-[11px] font-bold shadow cursor-pointer transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    Change Cover
                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverImage} />
                  </label>
                )}
              </div>

              <div className="px-6 pb-6 -mt-12 relative">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                  <div className="relative w-24 h-24 shrink-0">
                    <img src={profilePreview} alt="Store" className="w-24 h-24 rounded-2xl object-cover border-4 border-white bg-white shadow-lg" />
                    {editingTab === 'profile' && (
                      <label className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary hover:bg-blue-700 text-white flex items-center justify-center shadow cursor-pointer transition-colors">
                        <Camera className="w-4 h-4" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleProfileImage} />
                      </label>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{store.name}</h3>
                    <p className="text-xs text-white/85 font-medium">{store.tagline}</p>
                    <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-blue-700 border border-white/50 backdrop-blur">
                      <Store className="w-3 h-3" /> {store.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Store details form */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-slate-900">Store Details</h3>
                </div>
                <EditToggle
                  editing={editingTab === 'profile'}
                  onEdit={() => setEditingTab('profile')}
                  onCancel={() => setEditingTab(null)}
                  editLabel="Store Details"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Store Name</label>
                  <input disabled={editingTab !== 'profile'} className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Store Category</label>
                  <select disabled={editingTab !== 'profile'} className={`${inputCls} cursor-pointer disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.category} onChange={(e) => setStore({ ...store, category: e.target.value })}>
                    {['Electronics & Gadgets', 'Fashion & Lifestyle', 'Home & Kitchen', 'Beauty & Health', 'Sports & Fitness', 'Books & Stationery'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Tagline / Short Description</label>
                  <input disabled={editingTab !== 'profile'} className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.tagline} onChange={(e) => setStore({ ...store, tagline: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Contact Email</label>
                  <input disabled={editingTab !== 'profile'} type="email" className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Contact Phone</label>
                  <input disabled={editingTab !== 'profile'} className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Store Address</label>
                  <input disabled={editingTab !== 'profile'} className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.address} onChange={(e) => setStore({ ...store, address: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>GSTIN</label>
                  <input disabled={editingTab !== 'profile'} className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.gstin} onChange={(e) => setStore({ ...store, gstin: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Website</label>
                  <input disabled={editingTab !== 'profile'} className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={store.website} onChange={(e) => setStore({ ...store, website: e.target.value })} />
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

        {/* ============ DELIVERY SETTINGS ============ */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-slate-900">Delivery Fee &amp; Time</h3>
                </div>
                <EditToggle
                  editing={editingTab === 'delivery'}
                  onEdit={() => setEditingTab('delivery')}
                  onCancel={() => setEditingTab(null)}
                  editLabel="Delivery Settings"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Standard Delivery Fee (₹)</label>
                  <div className="relative">
                    <input disabled={editingTab !== 'delivery'} type="number" min="0" className={`${inputCls} pr-9 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={delivery.fee} onChange={(e) => setDelivery({ ...delivery, fee: Number(e.target.value) })} />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Free Delivery Above (₹)</label>
                  <div className="relative">
                    <input disabled={editingTab !== 'delivery'} type="number" min="0" className={`${inputCls} pr-9 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={delivery.freeAbove} onChange={(e) => setDelivery({ ...delivery, freeAbove: Number(e.target.value) })} />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">Orders above this value get free delivery</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelCls}>Min Days</label>
                    <input disabled={editingTab !== 'delivery'} type="number" min="1" className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={delivery.minDays} onChange={(e) => setDelivery({ ...delivery, minDays: Number(e.target.value) })} />
                  </div>
                  <div>
                    <label className={labelCls}>Max Days</label>
                    <input disabled={editingTab !== 'delivery'} type="number" min="1" className={`${inputCls} disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={delivery.maxDays} onChange={(e) => setDelivery({ ...delivery, maxDays: Number(e.target.value) })} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Wallet className="w-4 h-4 text-primary" />
                  Estimated: {fmtMoney(delivery.fee)} flat delivery · free over {fmtMoney(delivery.freeAbove)} · {delivery.minDays}-{delivery.maxDays} days
                </div>
              </div>

              <SaveBar
                tab="delivery"
                savedTab={savedTab}
                editing={editingTab === 'delivery'}
                onSave={() => {
                  setSaved('delivery');
                  setEditingTab(null);
                }}
              />
            </div>

            {/* Serviceable locations */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Serviceable Delivery Locations</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Areas where your store currently delivers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {delivery.locations.map((loc) => (
                  <div key={loc.id} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-xs">
                        {loc.city.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{loc.city}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{loc.pincode}</p>
                      </div>
                    </div>
                    {editingTab === 'delivery' && (
                      <button
                        onClick={() => removeLocation(loc.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label={`Remove ${loc.city}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add location */}
              {editingTab === 'delivery' && (
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <input
                    className={inputCls}
                    placeholder="City / Area name"
                    value={newLocation.city}
                    onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                  />
                  <input
                    className={`${inputCls} sm:w-44`}
                    placeholder="Pincode"
                    value={newLocation.pincode}
                    onChange={(e) => setNewLocation({ ...newLocation, pincode: e.target.value })}
                  />
                  <button
                    onClick={addLocation}
                    className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add Location
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ GENERAL SETTINGS ============ */}
        {activeTab === 'general' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-slate-900">Store Preferences</h3>
                </div>
                <EditToggle
                  editing={editingTab === 'general'}
                  onEdit={() => setEditingTab('general')}
                  onCancel={() => setEditingTab(null)}
                  editLabel="Preferences"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Currency</label>
                  <select disabled={editingTab !== 'general'} className={`${inputCls} cursor-pointer disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={general.currency} onChange={(e) => setGeneral({ ...general, currency: e.target.value })}>
                    <option value="INR">INR — Indian Rupee (₹)</option>
                    <option value="USD">USD — US Dollar ($)</option>
                    <option value="EUR">EUR — Euro (€)</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Timezone</label>
                  <select disabled={editingTab !== 'general'} className={`${inputCls} cursor-pointer disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-default`} value={general.timezone} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}>
                    <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                    <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3.5">
                <div>
                  <p className="text-sm font-bold text-slate-800">Store Visibility</p>
                  <p className="text-[11px] text-slate-500 font-medium">Hide your store from customers when disabled</p>
                </div>
                <Toggle value={general.storeActive} disabled={editingTab !== 'general'} onChange={(v) => setGeneral({ ...general, storeActive: v })} />
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

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-slate-900">Notifications</h3>
              </div>
              {[
                { key: 'orderNotification', label: 'New order alerts', desc: 'Get notified instantly when a new order is placed' },
                { key: 'autoDispatch', label: 'Auto-dispatch ready orders', desc: 'Automatically mark paid orders as ready to dispatch' },
                { key: 'lowStockAlert', label: 'Low stock alerts', desc: 'Notify when a product runs below the minimum threshold' },
                { key: 'payoutSummary', label: 'Monthly payout summary', desc: 'Email a payout summary at the end of each month' }
              ].map((opt) => (
                <div key={opt.key} className="flex items-center justify-between rounded-xl hover:bg-slate-50 px-2 py-2.5 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{opt.label}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{opt.desc}</p>
                  </div>
                  <Toggle value={general[opt.key]} disabled={editingTab !== 'general'} onChange={(v) => setGeneral({ ...general, [opt.key]: v })} />
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 font-medium">
                  {editingTab === 'general' ? 'Changes are applied when you save from Store Preferences above.' : 'Click Edit Preferences to modify notification settings.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </SellerAdminLayout>
  );
}

function EditToggle({ editing, onEdit, onCancel, editLabel = 'Edit' }) {
  if (editing) {
    return (
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
        Cancel
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onEdit}
      className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
    >
      <Pencil className="w-3.5 h-3.5" />
      Edit {editLabel}
    </button>
  );
}

function SaveBar({ tab, savedTab, onSave, editing }) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
      {editing ? (
        <button
          type="button"
          onClick={onSave}
          className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-primary/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      ) : (
        <span className="text-[11px] text-slate-400 font-medium">Click Edit to modify these settings</span>
      )}
      {savedTab === tab && (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
          <Check className="w-3.5 h-3.5" /> Saved successfully
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
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${value ? 'bg-primary' : 'bg-slate-300'}`}
      aria-pressed={value}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${value ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}
