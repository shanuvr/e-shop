import React, { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import { Plus, Grid, Trash2 } from 'lucide-react';

export default function CategoriesPage() {
  const [categoriesList, setCategoriesList] = useState([
    { id: 1, name: 'Electronics & Gadgets', count: 18, status: 'Active' },
    { id: 2, name: 'Audio & Acoustics', count: 12, status: 'Active' },
    { id: 3, name: 'Wearable Tech', count: 9, status: 'Active' },
    { id: 4, name: 'Home Services', count: 5, status: 'Active' }
  ]);

  const handleAddCategory = () => {
    const name = prompt('Enter new category name:');
    if (name) {
      setCategoriesList([...categoriesList, { id: Date.now(), name, count: 0, status: 'Active' }]);
    }
  };

  const handleDeleteCategory = (id) => {
    setCategoriesList(categoriesList.filter(c => c.id !== id));
  };

  return (
    <SellerAdminLayout title="Categories Master" subtitle="Manage store product categories">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Categories Master List</h2>
            <p className="text-xs text-slate-500 font-medium">Create and organize product categories</p>
          </div>
          <button
            onClick={handleAddCategory}
            className="px-4 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {categoriesList.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary font-bold flex items-center justify-center text-xs">
                    <Grid className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                    <span className="text-xs text-slate-400 font-medium">{cat.count} items assigned</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold">
                    {cat.status}
                  </span>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SellerAdminLayout>
  );
}
