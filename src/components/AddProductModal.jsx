import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Check, 
  ShoppingBag, 
  Wrench, 
  Tag, 
  DollarSign, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onAddListing }) {
  const [listingType, setListingType] = useState('product'); // 'product' | 'service'
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    price: '',
    originalPrice: '',
    discount: '',
    stock: 10,
    location: 'Swaraj Round, Thrissur',
    description: '',
    tag: 'NEW RELEASE',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300'
  });

  const categories = listingType === 'product'
    ? ['Electronics', 'Home & Kitchen', 'Fashion', 'Beauty & Health', 'Sports', 'Books & Stationery', 'Automotive']
    : ['Home Cleaning', 'Appliance Repair', 'Plumbing & Electrical', 'Tutoring & Classes', 'Beauty & Wellness', 'Event Services'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      id: Date.now(),
      title: formData.title || (listingType === 'product' ? 'New Premium Product' : 'New Local Service'),
      price: formData.price ? `₹${Number(formData.price).toLocaleString()}` : '₹499',
      location: formData.location,
      description: formData.description || 'Quality listing created from Seller Dashboard.',
      image: formData.imageUrl,
      tag: formData.tag,
      type: listingType
    };
    onAddListing(newListing);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Create New Listing</h2>
            <p className="text-xs text-slate-500 font-medium">Add a physical product or bookable local service</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Listing Type Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Listing Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setListingType('product'); setFormData({ ...formData, category: 'Electronics' }); }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                  listingType === 'product'
                    ? 'border-primary bg-blue-50/70 text-primary shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Physical Product
              </button>
              <button
                type="button"
                onClick={() => { setListingType('service'); setFormData({ ...formData, category: 'Home Cleaning' }); }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                  listingType === 'service'
                    ? 'border-primary bg-blue-50/70 text-primary shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <Wrench className="w-4 h-4" />
                Bookable Local Service
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {listingType === 'product' ? 'Product Title' : 'Service Title'}
            </label>
            <input
              type="text"
              required
              placeholder={listingType === 'product' ? 'e.g. Wireless ANC Headphones' : 'e.g. AC Deep Cleaning & Maintenance'}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          {/* Category & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Badge / Tag
              </label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary cursor-pointer"
              >
                <option value="NEW RELEASE">New Release</option>
                <option value="TOP RATED">Top Rated</option>
                <option value="BESTSELLER">Bestseller</option>
                <option value="HOT DEAL">Hot Deal</option>
                <option value="EXPRESS SERVICE">Express Service</option>
              </select>
            </div>
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {listingType === 'product' ? 'Price (₹)' : 'Service Rate (₹/hr or visit)'}
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 1499"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location / Service Area
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Image URL
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide key details, specifications, or service inclusions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Publish Listing
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
