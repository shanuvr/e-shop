import { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  X,
  Grid,
  Layers,
  Package,
  FolderOpen,
  TrendingUp,
  CheckCircle,
  ImageUp,
  Store,
  Clock3
} from 'lucide-react';

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Electronics', count: 3492, items: '3,492 items', status: 'Active', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, name: 'Home & Kitchen', count: 1240, items: '1,240 items', status: 'Active', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, name: 'Fashion', count: 842, items: '842 items', status: 'Active', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, name: 'Beauty & Health', count: 1760, items: '1,760 items', status: 'Active', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, name: 'Sports', count: 512, items: '512 items', status: 'Active', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, name: 'Books & Stationery', count: 320, items: '320 items', status: 'Inactive', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop' },
  { id: 7, name: 'Automotive', count: 412, items: '412 items', status: 'Active', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop' },
  { id: 8, name: 'Services', count: 2100, items: '2,100 items', status: 'Active', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop' }
];

export default function SuperAdminCategoriesPage() {
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({ name: '', status: 'Active', image: '' });
  const [imageKey, setImageKey] = useState(0);

  const maxCount = Math.max(1, ...categoriesList.map(c => c.count));
  const activeCount = categoriesList.filter(c => c.status === 'Active').length;
  const totalItems = categoriesList.reduce((sum, c) => sum + c.count, 0);

  const filteredCategories = categoriesList.filter(c =>
    (statusFilter === 'All' || c.status === statusFilter) &&
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setFormData({ name: '', status: 'Active', image: '' });
    setPreviewUrl('');
    setImageKey(k => k + 1);
    setIsModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setFormData({ name: cat.name, status: cat.status, image: cat.image });
    setPreviewUrl(cat.image);
    setImageKey(k => k + 1);
    setIsModalOpen(true);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, image: URL.createObjectURL(file) });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    if (editing) {
      setCategoriesList(categoriesList.map(c =>
        c.id === editing.id
          ? { ...c, name: formData.name.trim(), status: formData.status, image: previewUrl || c.image }
          : c
      ));
    } else {
      setCategoriesList([
        ...categoriesList,
        { id: Date.now(), name: formData.name.trim(), count: 0, items: '0 items', status: formData.status, image: previewUrl || '' }
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    setCategoriesList(categoriesList.filter(c => c.id !== id));
  };

  const stats = [
    { label: 'Total Categories', value: categoriesList.length, icon: FolderOpen, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Categories', value: activeCount, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Live Items', value: totalItems.toLocaleString(), icon: Package, color: 'text-violet-600 bg-violet-50' },
    { label: 'Avg / Category', value: categoriesList.length ? Math.round(totalItems / categoriesList.length).toLocaleString() : 0, icon: TrendingUp, color: 'text-amber-600 bg-amber-50' }
  ];

  return (
    <SuperAdminLayout title="Categories" subtitle="Manage the browsing categories that power the marketplace">
      <div className="space-y-6">

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-5 h-5 text-primary" />
              Category Management
            </h2>
            <p className="text-xs text-slate-500 font-medium">{categoriesList.length} categories shown across the site</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
            <button
              onClick={openAdd}
              className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">{s.value}</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['All', 'Active', 'Inactive'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                statusFilter === f ? 'bg-blue-50 text-primary border border-blue-200' : 'bg-white text-slate-500 border border-slate-200 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Category Cards Grid */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm py-16 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Layers className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-700">No categories found</p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {searchQuery || statusFilter !== 'All' ? 'Try clearing your filters.' : 'Add your first category to get started.'}
            </p>
            {!searchQuery && statusFilter === 'All' && (
              <button
                onClick={openAdd}
                className="mt-4 px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCategories.map((cat) => {
              const percent = Math.round((cat.count / maxCount) * 100);
              const isActive = cat.status === 'Active';
              return (
                <div key={cat.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200/70 transition-all group">
                  {/* Photo */}
                  <div className="relative h-32 w-full">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                        <ImageUp className="w-7 h-7 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                    <button
                      onClick={() => openEdit(cat)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 shadow-sm border border-white text-slate-600 hover:text-primary hover:bg-blue-50 flex items-center justify-center transition-colors cursor-pointer"
                      title="Edit category"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <span className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200/80' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {cat.status}
                    </span>
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{cat.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{cat.items}</p>



                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openEdit(cat)}
                        className="flex-1 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Change photo or edit"
                      >
                        <ImageUp className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">Photo</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-slate-100 overflow-hidden my-8 animate-[fadeIn_0.2s_ease-out]">
            
            {/* Modal Header */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight">
                  {editing ? 'Edit Category' : 'Add New Category'}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {editing ? 'Update category photo, name & status' : 'Create a new catalog category'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              
              {/* Category Banner Photo Upload */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category Photo
                </label>

                <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50/80 group h-32 shadow-xs flex items-center justify-center">
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Category Banner Preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          key={imageKey}
                          onChange={handleImageSelect}
                          className="hidden"
                          id="category-photo-input"
                        />
                        <label
                          htmlFor="category-photo-input"
                          className="px-3 py-1.5 bg-white text-slate-900 font-bold rounded-lg text-[11px] shadow-lg hover:bg-blue-50 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <ImageUp className="w-3.5 h-3.5 text-primary" />
                          Change
                        </label>
                        <button
                          type="button"
                          onClick={() => setPreviewUrl('')}
                          className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg text-[11px] shadow-lg hover:bg-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary mx-auto flex items-center justify-center mb-1.5 border border-blue-100 shadow-xs">
                        <ImageUp className="w-5 h-5" />
                      </div>
                      <p className="text-[11px] font-bold text-slate-800">Upload Photo</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5 mb-2">PNG, JPG or WebP</p>
                      <input
                        type="file"
                        accept="image/*"
                        key={imageKey}
                        onChange={handleImageSelect}
                        className="hidden"
                        id="category-photo-input"
                      />
                      <label
                        htmlFor="category-photo-input"
                        className="px-3 py-1.5 bg-primary text-white font-bold rounded-lg text-[11px] shadow-md shadow-primary/20 hover:bg-blue-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ImageUp className="w-3.5 h-3.5" />
                        Browse File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Category Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Electronics & Gadgets"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>



              {/* Category Status */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                  {['Active', 'Inactive'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: st })}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        formData.status === st
                          ? st === 'Active'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-700 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  {editing ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </SuperAdminLayout>
  );
}