import { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
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
  CheckCircle
} from 'lucide-react';

const AVATAR_STYLES = [
  { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500' },
  { bg: 'bg-violet-50', text: 'text-violet-600', bar: 'bg-violet-500' },
  { bg: 'bg-amber-50', text: 'text-amber-600', bar: 'bg-amber-500' },
  { bg: 'bg-rose-50', text: 'text-rose-600', bar: 'bg-rose-500' },
  { bg: 'bg-cyan-50', text: 'text-cyan-600', bar: 'bg-cyan-500' }
];

export default function CategoriesPage() {
  const [categoriesList, setCategoriesList] = useState([
    { id: 1, name: 'Electronics & Gadgets', count: 18, status: 'Active' },
    { id: 2, name: 'Audio & Acoustics', count: 12, status: 'Active' },
    { id: 3, name: 'Wearable Tech', count: 9, status: 'Active' },
    { id: 4, name: 'Home Services', count: 5, status: 'Inactive' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'Active' });

  const maxCount = Math.max(1, ...categoriesList.map(c => c.count));
  const activeCount = categoriesList.filter(c => c.status === 'Active').length;
  const totalItems = categoriesList.reduce((sum, c) => sum + c.count, 0);

  const filteredCategories = categoriesList.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setFormData({ name: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setFormData({ name: cat.name, status: cat.status });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    if (editing) {
      setCategoriesList(categoriesList.map(c =>
        c.id === editing.id ? { ...c, name: formData.name.trim(), status: formData.status } : c
      ));
    } else {
      setCategoriesList([
        ...categoriesList,
        { id: Date.now(), name: formData.name.trim(), count: 0, status: formData.status }
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
    { label: 'Total Products', value: totalItems, icon: Package, color: 'text-violet-600 bg-violet-50' },
    { label: 'Avg / Category', value: categoriesList.length ? Math.round(totalItems / categoriesList.length) : 0, icon: TrendingUp, color: 'text-amber-600 bg-amber-50' }
  ];

  return (
    <SellerAdminLayout title="Categories" subtitle="Organize and manage your store categories">
      <div className="space-y-6">

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-5 h-5 text-primary" />
              Category Management
            </h2>
            <p className="text-xs text-slate-500 font-medium">{categoriesList.length} categories in your catalog</p>
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

        {/* Category Cards Grid */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm py-16 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Layers className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-700">No categories found</p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {searchQuery ? 'Try a different search term.' : 'Add your first category to get started.'}
            </p>
            {!searchQuery && (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((cat, idx) => {
              const style = AVATAR_STYLES[idx % AVATAR_STYLES.length];
              const percent = Math.round((cat.count / maxCount) * 100);
              const isActive = cat.status === 'Active';
              return (
                <div key={cat.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md hover:border-blue-200/70 transition-all group">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center`}>
                      <Grid className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {cat.status}
                    </span>
                  </div>

                  <h4 className="mt-3 text-sm font-bold text-slate-900 truncate">{cat.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{cat.count} products</p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Category utilization</span>
                      <span className="text-[10px] font-bold text-slate-700">{percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${style.bar}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(cat)}
                      className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-primary hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center transition-colors cursor-pointer"
                      title="Edit category"
                    >
                      <Edit3 className="w-4 h-4" />
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
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div>
                <h2 className="text-base font-black text-slate-900 tracking-tight">
                  {editing ? 'Edit Category' : 'Add New Category'}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {editing ? 'Update category details' : 'Create a new category for your catalog'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Home & Kitchen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1.5 rounded-xl">
                  {['Active', 'Inactive'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: st })}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        formData.status === st
                          ? st === 'Active'
                            ? 'bg-white text-emerald-600 shadow-sm'
                            : 'bg-white text-slate-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  {editing ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SellerAdminLayout>
  );
}
