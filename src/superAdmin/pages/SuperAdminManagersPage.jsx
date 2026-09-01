import { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import { 
  UserCheck, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  Store, 
  X,
  Plus,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2,
  Eye,
  Calendar
} from 'lucide-react';

const INITIAL_MANAGERS = [
  {
    id: 'MGR-101',
    fullName: 'Kavya Nair',
    email: 'kavya.nair@eshop.com',
    phone: '+91 98472 33445',
    joinedDate: '12 Jan 2025',
    storesList: [
      { id: 'STR-101', name: 'Silk Land Textiles', owner: 'Suresh Kumar', phone: '+91 98470 11223', location: 'Round West, Thrissur', category: 'Apparel & Fashion', assignedDate: '04 Sept 2026' },
      { id: 'STR-102', name: 'Heritage Spices & Crafts', owner: 'Lakshmi Menon', phone: '+91 98471 99881', location: 'East Fort, Thrissur', category: 'Organic Spices', assignedDate: '01 Sept 2026' },
      { id: 'STR-103', name: 'Malabar Wood Crafts', owner: 'Vipin Das', phone: '+91 98473 44556', location: 'M.G. Road, Thrissur', category: 'Handicrafts', assignedDate: '28 Aug 2026' },
      { id: 'STR-104', name: 'Thrissur Gold Works', owner: 'Rajesh V', phone: '+91 98475 77889', location: 'High Road, Thrissur', category: 'Jewelry & Accessories', assignedDate: '15 Aug 2026' }
    ]
  },
  {
    id: 'MGR-102',
    fullName: 'Rahul Varma',
    email: 'rahul.varma@eshop.com',
    phone: '+91 98471 88776',
    joinedDate: '18 Mar 2025',
    storesList: [
      { id: 'STR-105', name: 'Cochin Spice Hub', owner: 'Anil Kumar', phone: '+91 98476 11224', location: 'Marine Drive, Kochi', category: 'Spices', assignedDate: '20 Aug 2026' },
      { id: 'STR-106', name: 'Fort Kochi Art Gallery', owner: 'Sarah Joseph', phone: '+91 98477 33445', location: 'Fort Kochi', category: 'Art & Collectibles', assignedDate: '18 Aug 2026' },
      { id: 'STR-107', name: 'Kerala Handlooms', owner: 'Mohanan K', phone: '+91 98478 55667', location: 'Edappally, Kochi', category: 'Textiles', assignedDate: '10 Aug 2026' }
    ]
  },
  {
    id: 'MGR-103',
    fullName: 'Ananya Das',
    email: 'ananya.das@eshop.com',
    phone: '+91 98470 55667',
    joinedDate: '05 May 2025',
    storesList: [
      { id: 'STR-108', name: 'Kozhikode Halwa House', owner: 'Basheer Ahmed', phone: '+91 98479 77889', location: 'SM Street, Kozhikode', category: 'Sweets & Snacks', assignedDate: '02 Sept 2026' },
      { id: 'STR-109', name: 'Malabar Leather Store', owner: 'Usman Ali', phone: '+91 98480 11223', location: 'Mavoor Road, Kozhikode', category: 'Footwear & Bags', assignedDate: '22 Aug 2026' }
    ]
  },
  {
    id: 'MGR-104',
    fullName: 'Arjun Menon',
    email: 'arjun.menon@eshop.com',
    phone: '+91 98473 11224',
    joinedDate: '10 Aug 2025',
    storesList: [
      { id: 'STR-110', name: 'Trivandrum Clay Works', owner: 'Gopakumar P', phone: '+91 98481 33445', location: 'Statue, Trivandrum', category: 'Pottery', assignedDate: '25 Aug 2026' }
    ]
  },
  {
    id: 'MGR-105',
    fullName: 'Priya Rajan',
    email: 'priya.rajan@eshop.com',
    phone: '+91 98474 99001',
    joinedDate: '01 Nov 2025',
    storesList: []
  }
];

export default function SuperAdminManagersPage() {
  const [managers, setManagers] = useState(INITIAL_MANAGERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [viewStoresModalMgr, setViewStoresModalMgr] = useState(null);

  // Form State: Full Name, Email, Phone
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // Current editing manager object (to show assigned stores in form)
  const currentEditingMgr = managers.find(m => m.id === editingId);

  // Handle Edit Click
  const handleEdit = (mgr) => {
    setEditingId(mgr.id);
    setFormData({
      fullName: mgr.fullName,
      email: mgr.email,
      phone: mgr.phone
    });
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      email: '',
      phone: ''
    });
  };

  // Submit Add / Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return;

    if (editingId) {
      // Update Manager
      setManagers(managers.map(m => {
        if (m.id === editingId) {
          return {
            ...m,
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim()
          };
        }
        return m;
      }));
    } else {
      // Create Manager
      const newMgr = {
        id: `MGR-${100 + managers.length + 1}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || '+91 98000 00000',
        joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        storesList: []
      };
      setManagers([newMgr, ...managers]);
    }

    resetForm();
  };

  // Delete Manager
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this manager?')) {
      setManagers(managers.filter(m => m.id !== id));
      if (editingId === id) resetForm();
    }
  };

  // Remove / Unassign Store from Manager
  const handleRemoveStoreFromManager = (managerId, storeId) => {
    if (window.confirm('Are you sure you want to unassign this store from this manager?')) {
      setManagers(managers.map(m => {
        if (m.id === managerId) {
          return {
            ...m,
            storesList: (m.storesList || []).filter(s => s.id !== storeId)
          };
        }
        return m;
      }));

      // Sync modal if open
      if (viewStoresModalMgr && viewStoresModalMgr.id === managerId) {
        setViewStoresModalMgr(prev => ({
          ...prev,
          storesList: (prev.storesList || []).filter(s => s.id !== storeId)
        }));
      }
    }
  };

  // Filtered Managers
  const filteredManagers = managers.filter(m => {
    return (
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalAssignedStoresCount = managers.reduce((sum, m) => sum + (m.storesList?.length || 0), 0);

  return (
    <SuperAdminLayout 
      title="Account Managers Master" 
      subtitle="Manage E-SHOP Account Managers & Assigned Merchant Stores"
    >
      <div className="space-y-6">

        {/* Top Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">Total Managers</p>
              <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">{managers.length}</h3>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
              <Store className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">Managed Stores</p>
              <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                {totalAssignedStoresCount} Stores
              </h3>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5 sm:gap-3.5 col-span-2 lg:col-span-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">Active Staff</p>
              <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">{managers.length} Active</h3>
            </div>
          </div>
        </div>

        {/* Split Layout: Left Form + Right Data Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: ADD / EDIT MANAGER FORM */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden sticky top-24">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  {editingId ? <Edit3 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight">
                    {editingId ? `Edit Manager: ${currentEditingMgr?.fullName}` : 'Add New Manager'}
                  </h2>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {editingId ? `ID: ${editingId} • ${currentEditingMgr?.storesList?.length || 0} Stores Assigned` : 'Register manager for sales assignment'}
                  </p>
                </div>
              </div>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  title="Cancel Edit"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavya Nair"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kavya@eshop.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98470 11223"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* ASSIGNED STORES LIST SECTION IN FORM (WHEN EDITING) */}
              {editingId && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Assigned Stores ({currentEditingMgr?.storesList?.length || 0})
                    </label>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      Managed Portfolio
                    </span>
                  </div>

                  {(!currentEditingMgr?.storesList || currentEditingMgr.storesList.length === 0) ? (
                    <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                      <p className="text-[11px] font-medium text-slate-500">No stores assigned to this manager yet.</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Assign stores from Managed Sales Requests.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {currentEditingMgr.storesList.map((store) => (
                        <div key={store.id} className="p-2.5 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200/80 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                {store.name}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                {store.location} • Owner: {store.owner}
                              </p>
                            </div>
                             <div className="flex items-center gap-1.5 shrink-0">
                                <span className="px-2 py-0.5 rounded-md bg-white text-slate-700 text-[9px] font-bold border border-slate-200">
                                  {store.category}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveStoreFromManager(editingId, store.id)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                                  title="Unassign / Remove store from manager"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Submit & Cancel Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3.5 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {editingId ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  {editingId ? 'Save Changes' : 'Add Manager'}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: MANAGERS DATA TABLE */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            
            {/* Table Search */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search manager by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <span className="text-xs font-bold text-slate-500">
                {filteredManagers.length} {filteredManagers.length === 1 ? 'Manager' : 'Managers'} Listed
              </span>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-3 px-4">Manager Name & Contact</th>
                    <th className="py-3 px-4">Assigned Stores</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filteredManagers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-12 text-center">
                        <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-700">No Account Managers found</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Try searching with a different keyword</p>
                      </td>
                    </tr>
                  ) : (
                    filteredManagers.map((mgr) => {
                      const isSelectedEdit = editingId === mgr.id;
                      const storeCount = mgr.storesList?.length || 0;

                      return (
                        <tr 
                          key={mgr.id} 
                          className={`hover:bg-blue-50/40 transition-colors ${isSelectedEdit ? 'bg-blue-50/70 font-semibold' : ''}`}
                        >
                          {/* Manager Info */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                                {mgr.fullName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-900 text-sm">{mgr.fullName}</span>
                                  <span className="font-mono text-[10px] text-slate-400 font-normal">({mgr.id})</span>
                                </div>
                                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  {mgr.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Assigned Stores */}
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => setViewStoresModalMgr(mgr)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200/80 transition-colors cursor-pointer group"
                              title="Click to view assigned stores list"
                            >
                              <Store className="w-3.5 h-3.5 text-blue-600" />
                              {storeCount} {storeCount === 1 ? 'Store' : 'Stores'}
                              <Eye className="w-3 h-3 text-blue-500 group-hover:scale-110 transition-transform ml-0.5" />
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(mgr)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                                  isSelectedEdit 
                                    ? 'bg-primary text-white' 
                                    : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-primary'
                                }`}
                                title="Edit Manager"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(mgr.id)}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                                title="Delete Manager"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

      {/* POPUP MODAL: ASSIGNED STORES DIRECTORY */}
      {viewStoresModalMgr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  {viewStoresModalMgr.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Stores Managed by {viewStoresModalMgr.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {viewStoresModalMgr.email} • {viewStoresModalMgr.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewStoresModalMgr(null)}
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {(!viewStoresModalMgr.storesList || viewStoresModalMgr.storesList.length === 0) ? (
                <div className="py-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Store className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">No Stores Assigned Yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">This manager has not been assigned to any Managed Sales stores yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <span>Assigned Merchant Stores ({viewStoresModalMgr.storesList.length})</span>
                  </div>

                  {viewStoresModalMgr.storesList.map((store) => (
                    <div key={store.id} className="p-4 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200/80 transition-colors flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary shrink-0" />
                          <h4 className="text-sm font-bold text-slate-900">{store.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
                            {store.category}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium pt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {store.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                            Owner: {store.owner} ({store.phone})
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {store.assignedDate && (
                          <div className="text-right text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200/60">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {store.assignedDate}
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveStoreFromManager(viewStoresModalMgr.id, store.id)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                          title="Unassign store from this manager"
                        >
                          <Trash2 className="w-3 h-3 text-rose-500" />
                          Unassign
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end">
              <button
                onClick={() => setViewStoresModalMgr(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </SuperAdminLayout>
  );
}
