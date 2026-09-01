import React, { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import { Camera, Upload, Plus, CheckCircle2, Store } from 'lucide-react';

export default function CatalogingUploadPage() {
  const [formData, setFormData] = useState({
    merchantName: 'Silk Land Textiles',
    productTitle: '',
    category: 'Fashion',
    price: '',
    originalPrice: '',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&h=300',
    description: ''
  });

  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      setFormData({ ...formData, productTitle: '', price: '', originalPrice: '', description: '' });
    }, 3000);
  };

  return (
    <SuperAdminLayout title="E-SHOP Cataloging & Photo Studio" subtitle="Upload product shoot images and publish listings for managed merchants">
      <div className="space-y-6 max-w-3xl">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">E-SHOP Staff Listing Upload Form</h2>
            <p className="text-xs text-slate-500 font-medium">Publishing product listings on behalf of managed sellers</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-100 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" /> Studio Active
          </span>
        </div>

        {publishedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Product published successfully to E-SHOP Marketplace for {formData.merchantName}!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          
          {/* Target Merchant */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Managed Merchant Store
            </label>
            <select
              value={formData.merchantName}
              onChange={(e) => setFormData({ ...formData, merchantName: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="Silk Land Textiles">Silk Land Textiles (Apparel & Sarees)</option>
              <option value="Heritage Spices & Crafts">Heritage Spices & Crafts (Organic Foods)</option>
              <option value="Elite Digital Mall">Elite Digital Mall (Electronics)</option>
            </select>
          </div>

          {/* Product Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Product Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kanchipuram Pure Silk Saree (Red & Gold)"
              value={formData.productTitle}
              onChange={(e) => setFormData({ ...formData, productTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Marketplace Price (₹)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 12999"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="Fashion">Fashion & Apparel</option>
                <option value="Electronics">Electronics & Appliances</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
              </select>
            </div>
          </div>

          {/* Photo Shoot Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              E-SHOP HD Photo Shoot Image URL
            </label>
            <input
              type="text"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Professional Description & Features
            </label>
            <textarea
              rows={3}
              placeholder="Write high-converting product description & fabric details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-600 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Publish Product on Marketplace for {formData.merchantName}
          </button>
        </form>

      </div>
    </SuperAdminLayout>
  );
}
