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

export default function AddProductModal({ isOpen, onClose, onAddListing, initialData = null }) {
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

  const [variations, setVariations] = useState([
    { name: 'Color', options: 'Black, Silver, Blue' }
  ]);

  React.useEffect(() => {
    if (initialData) {
      setListingType(initialData.type || 'product');
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'Electronics',
        price: initialData.price ? String(initialData.price).replace(/[^0-9]/g, '') : '',
        originalPrice: initialData.originalPrice || '',
        discount: initialData.discount || '',
        stock: initialData.stock || 10,
        location: initialData.location || 'Swaraj Round, Thrissur',
        description: initialData.description || '',
        tag: initialData.tag || 'NEW RELEASE',
        imageUrl: initialData.image || initialData.imageUrl || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300'
      });
      setVariations(initialData.variations && initialData.variations.length > 0 ? initialData.variations : []);
    } else {
      // Reset form when opening for new item
      setListingType('product');
      setFormData({
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
      setVariations([{ name: 'Color', options: 'Black, Silver, Blue' }]);
    }
  }, [initialData, isOpen]);

  const addVariation = () => {
    setVariations([...variations, { name: '', options: '' }]);
  };

  const removeVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleVariationChange = (index, field, value) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  const categories = listingType === 'product'
    ? ['Electronics', 'Home & Kitchen', 'Fashion', 'Beauty & Health', 'Sports', 'Books & Stationery', 'Automotive']
    : ['Home Cleaning', 'Appliance Repair', 'Plumbing & Electrical', 'Tutoring & Classes', 'Beauty & Wellness', 'Event Services'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      id: initialData ? initialData.id : Date.now(),
      title: formData.title || (listingType === 'product' ? 'New Premium Product' : 'New Local Service'),
      category: formData.category,
      price: formData.price ? `₹${Number(formData.price).toLocaleString()}` : '₹499',
      location: formData.location,
      description: formData.description || 'Quality listing created from Seller Dashboard.',
      image: formData.imageUrl,
      tag: formData.tag,
      stock: formData.stock || 15,
      type: listingType,
      variations: listingType === 'product' ? variations.filter(v => v.name.trim() !== '') : []
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
            <h2 className="text-lg font-bold text-slate-900">
              {initialData ? 'Edit Catalog Listing' : 'Create New Listing'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {initialData ? 'Update pricing, inventory stock, and product variations' : 'Add a physical product or bookable local service'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Product Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wireless ANC Headphones"
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
                Price (₹)
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
                Location / Store Address
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

          {/* Product Variations */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Product Variations
                  </label>
                  <p className="text-[11px] text-slate-500 font-medium">Add options like Color, Size, Storage, or Material</p>
                </div>
                <button
                  type="button"
                  onClick={addVariation}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-primary text-primary font-bold text-[11px] rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Variation
                </button>
              </div>

              {variations.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No variations added. (Standard single-option product)</p>
              ) : (
                <div className="space-y-2 pt-1">
                  {variations.map((v, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-4">
                        <input
                          type="text"
                          placeholder="e.g. Color"
                          value={v.name}
                          onChange={(e) => handleVariationChange(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary"
                        />
                      </div>
                      <div className="col-span-7">
                        <input
                          type="text"
                          placeholder="Options (comma separated, e.g. Black, Silver, Blue)"
                          value={v.options}
                          onChange={(e) => handleVariationChange(idx, 'options', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => removeVariation(idx)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {initialData ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Publish Listing
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
