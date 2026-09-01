import { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import { 
  Sliders, 
  ShieldCheck, 
  CreditCard, 
  BellRing, 
  Palette, 
  Check, 
  Save, 
  RefreshCw, 
  Globe, 
  Lock, 
  Mail, 
  Phone, 
  AlertTriangle, 
  DollarSign, 
  Building2, 
  Sparkles,
  Smartphone,
  Eye,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function SuperAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings State
  const [general, setGeneral] = useState({
    platformName: 'E-SHOP HQ E-Commerce Platform',
    supportEmail: 'hq-support@eshop.com',
    contactPhone: '+91 1800 425 0099',
    currency: 'INR (₹)',
    timezone: 'Asia/Kolkata (GMT+5:30)',
    maintenanceMode: false,
    autoApproveIndividualSellers: false
  });

  const [commission, setCommission] = useState({
    baseCommissionRate: '8',
    managedSalesRate: '12',
    minPayoutThreshold: '1000',
    payoutCycle: 'Weekly on Mondays',
    gstin: '32AAAAA0000A1Z5',
    panNumber: 'ABCDE1234F'
  });

  const [security, setSecurity] = useState({
    enforce2FA: true,
    sessionTimeoutMinutes: '30',
    ipWhitelisting: false,
    whitelistedIPs: '103.22.45.12, 49.207.50.9',
    auditLogRetentionDays: '180'
  });

  const [notifications, setNotifications] = useState({
    notifyNewMerchantRequests: true,
    notifyDailyRevenueDigest: true,
    notifyMerchantPayoutConfirmation: true,
    smsAlertHighValueOrders: true,
    emailServerHost: 'smtp.sendgrid.net'
  });

  const [branding, setBranding] = useState({
    primaryColor: '#2563eb',
    themeMode: 'Modern Dark Sidebar',
    platformTagline: 'Empowering Local Merchants & Shoppers Everywhere'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const tabs = [
    { id: 'general', label: 'General & Operations', icon: Sliders },
    { id: 'commission', label: 'Commission & Payments', icon: CreditCard },
    { id: 'security', label: 'Security & Access Control', icon: ShieldCheck },
    { id: 'notifications', label: 'Notifications & Alerts', icon: BellRing }
  ];

  return (
    <SuperAdminLayout 
      title="Platform Settings" 
      subtitle="Super Admin System Preferences & Platform Configurations"
    >
      <div className="space-y-6">

        {/* Save Toast Alert Banner */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-between animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black">Settings Saved Successfully</h4>
                <p className="text-xs text-emerald-100 font-medium">All platform configurations have been updated across E-SHOP HQ.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-lg">SYSTEM OK</span>
          </div>
        )}

        {/* Main Settings Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Navigation Tabs */}
          <div className="lg:col-span-3 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs space-y-1 sticky top-24">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Settings Categories</div>
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Tab Content Panel */}
          <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            
            <form onSubmit={handleSave}>
              
              {/* TAB 1: GENERAL & OPERATIONS */}
              {activeTab === 'general' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900">General Platform Information</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Primary system details and global operational toggles</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Platform System Name
                      </label>
                      <input
                        type="text"
                        value={general.platformName}
                        onChange={(e) => setGeneral({ ...general, platformName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        HQ Support Email
                      </label>
                      <input
                        type="email"
                        value={general.supportEmail}
                        onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Helpline Phone Number
                      </label>
                      <input
                        type="text"
                        value={general.contactPhone}
                        onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Base Operating Currency
                      </label>
                      <select
                        value={general.currency}
                        onChange={(e) => setGeneral({ ...general, currency: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                      >
                        <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                        <option value="USD ($)">USD ($) - US Dollar</option>
                        <option value="EUR (€)">EUR (€) - Euro</option>
                        <option value="AED (د.إ)">AED (د.إ) - UAE Dirham</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">System Operational Flags</h4>
                    
                    {/* Maintenance Mode */}
                    <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">Platform Maintenance Mode</h5>
                          <p className="text-[11px] text-slate-500 font-medium">When enabled, store fronts show a maintenance page to buyers while admins remain active.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGeneral({ ...general, maintenanceMode: !general.maintenanceMode })}
                        className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                          general.maintenanceMode ? 'bg-amber-500' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          general.maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {/* Auto Approve Individual Sellers */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">Auto-Approve Individual Sellers</h5>
                          <p className="text-[11px] text-slate-500 font-medium">Automatically enable newly registered individual sellers without manual HQ audit.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGeneral({ ...general, autoApproveIndividualSellers: !general.autoApproveIndividualSellers })}
                        className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                          general.autoApproveIndividualSellers ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          general.autoApproveIndividualSellers ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COMMISSION & PAYMENTS */}
              {activeTab === 'commission' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Commission Rates & Merchant Payouts</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Configure platform service fee percentages and settlement schedules</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Standard Individual Merchant Fee (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={commission.baseCommissionRate}
                          onChange={(e) => setCommission({ ...commission, baseCommissionRate: e.target.value })}
                          className="w-full pr-8 pl-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-blue-700 outline-none focus:border-blue-600"
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Applied automatically to non-managed individual seller transactions.</p>
                    </div>

                    <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Managed Sales Service Fee (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={commission.managedSalesRate}
                          onChange={(e) => setCommission({ ...commission, managedSalesRate: e.target.value })}
                          className="w-full pr-8 pl-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-purple-700 outline-none focus:border-purple-600"
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Service fee charged for E-SHOP HQ full cataloging & dispatch management.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Minimum Payout Threshold (₹)
                      </label>
                      <input
                        type="text"
                        value={commission.minPayoutThreshold}
                        onChange={(e) => setCommission({ ...commission, minPayoutThreshold: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Automated Settlement Cycle
                      </label>
                      <select
                        value={commission.payoutCycle}
                        onChange={(e) => setCommission({ ...commission, payoutCycle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                      >
                        <option value="Weekly on Mondays">Weekly on Mondays</option>
                        <option value="Bi-Weekly (1st & 15th)">Bi-Weekly (1st & 15th)</option>
                        <option value="Monthly End">Monthly End</option>
                        <option value="Manual Payout Only">Manual Payout Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        E-SHOP Tax GSTIN
                      </label>
                      <input
                        type="text"
                        value={commission.gstin}
                        onChange={(e) => setCommission({ ...commission, gstin: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Company PAN Registration
                      </label>
                      <input
                        type="text"
                        value={commission.panNumber}
                        onChange={(e) => setCommission({ ...commission, panNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SECURITY & ACCESS CONTROL */}
              {activeTab === 'security' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Security & Administrative Access</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Enforce authentication standards and session timeout limits</p>
                  </div>

                  <div className="space-y-4">
                    {/* Mandatory 2FA */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">Mandatory 2FA for Super Admin Login</h5>
                          <p className="text-[11px] text-slate-500 font-medium">Require an OTP authenticator app verification code on every HQ admin login.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSecurity({ ...security, enforce2FA: !security.enforce2FA })}
                        className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                          security.enforce2FA ? 'bg-emerald-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          security.enforce2FA ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Inactive Session Timeout (Minutes)
                        </label>
                        <select
                          value={security.sessionTimeoutMinutes}
                          onChange={(e) => setSecurity({ ...security, sessionTimeoutMinutes: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                        >
                          <option value="15">15 Minutes</option>
                          <option value="30">30 Minutes (Recommended)</option>
                          <option value="60">60 Minutes</option>
                          <option value="120">120 Minutes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Audit Log Retention Period
                        </label>
                        <select
                          value={security.auditLogRetentionDays}
                          onChange={(e) => setSecurity({ ...security, auditLogRetentionDays: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none cursor-pointer"
                        >
                          <option value="90">90 Days</option>
                          <option value="180">180 Days (Standard)</option>
                          <option value="365">365 Days (1 Year)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: NOTIFICATIONS & ALERTS */}
              {activeTab === 'notifications' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Notifications & Alert Triggers</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Control email digests, SMS alerts, and system event broadcasts</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">Instant Email on New Merchant Applications</h5>
                        <p className="text-[11px] text-slate-500 font-medium">Send an email alert to super admin whenever a merchant applies for Managed Sales.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotifications({ ...notifications, notifyNewMerchantRequests: !notifications.notifyNewMerchantRequests })}
                        className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                          notifications.notifyNewMerchantRequests ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          notifications.notifyNewMerchantRequests ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">Daily Revenue & Sales Digest Email</h5>
                        <p className="text-[11px] text-slate-500 font-medium">Receive a consolidated daily PDF summary of orders, gross GMV, and commission earned.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotifications({ ...notifications, notifyDailyRevenueDigest: !notifications.notifyDailyRevenueDigest })}
                        className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                          notifications.notifyDailyRevenueDigest ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          notifications.notifyDailyRevenueDigest ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">SMS Alert to Merchants on Payout Confirmation</h5>
                        <p className="text-[11px] text-slate-500 font-medium">Automatically dispatch an SMS to store owners when weekly payouts are transferred.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotifications({ ...notifications, notifyMerchantPayoutConfirmation: !notifications.notifyMerchantPayoutConfirmation })}
                        className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                          notifications.notifyMerchantPayoutConfirmation ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          notifications.notifyMerchantPayoutConfirmation ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Footer Actions */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">
                  Last updated: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSaveSuccess(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save System Settings
                  </button>
                </div>
              </div>

            </form>

          </div>

        </div>

      </div>
    </SuperAdminLayout>
  );
}
