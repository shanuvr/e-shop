import React, { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import AddProductModal from '../../components/AddProductModal';
import { Plus, Search, Filter, Trash2, Edit3, Tag, Layers, Package, Layers3, CheckCircle2 } from 'lucide-react';

export default function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [productsList, setProductsList] = useState([
    {
      id: 'e1',
      title: 'Acoustic Pro Headphones',
      category: 'Audio & Acoustics',
      price: '₹24,999',
      stock: 45,
      location: 'Swaraj Round, Thrissur',
      description: 'Immersive sound experience with active noise cancellation.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
      tag: 'BESTSELLER',
      type: 'product',
      variations: [
        { name: 'Color', options: 'Matte Black, Silver, Midnight Blue' },
        { name: 'Edition', options: 'Standard, Wireless Pro' }
      ]
    },
    {
      id: 'e2',
      title: 'Elite Smartwatch Series',
      category: 'Wearable Tech',
      price: '₹36,999',
      stock: 18,
      location: 'Swaraj Round, Thrissur',
      description: 'Next-gen health monitoring and workout tracking.',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
      tag: 'NEW RELEASE',
      type: 'product',
      variations: [
        { name: 'Strap Color', options: 'Graphite, Ocean Blue, Rose Gold' },
        { name: 'Case Size', options: '40mm, 44mm' }
      ]
    },
    {
      id: 'e3',
      title: 'Ultra Slim 4K Smart OLED TV',
      category: 'Electronics',
      price: '₹54,990',
      stock: 12,
      location: 'Swaraj Round, Thrissur',
      description: 'Stunning 4K display with Dolby Vision and HDR10+ support.',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&h=300',
      tag: 'HOT DEAL',
      type: 'product',
      variations: [
        { name: 'Screen Size', options: '55 inch, 65 inch' }
      ]
    }
  ]);

  const handleSaveProduct = (productData) => {
    const exists = productsList.some(p => p.id === productData.id);
    if (exists) {
      setProductsList(productsList.map(p => p.id === productData.id ? productData : p));
    } else {
      setProductsList([productData, ...productsList]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProductsList(productsList.filter(p => p.id !== id));
  };

  const filteredProducts = productsList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <SellerAdminLayout title="Products Catalog" subtitle="Manage physical product inventory, pricing, and variations">
      <div className="space-y-6 font-sans">
        
        {/* Header & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Products & Inventory Master
            </h2>
            <p className="text-xs text-slate-500 font-medium">Add, edit, manage stock, and configure product variants</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-primary"
            >
              <option value="all">All Categories</option>
              <option value="Audio & Acoustics">Audio & Acoustics</option>
              <option value="Wearable Tech">Wearable Tech</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
            </select>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsAddModalOpen(true);
              }}
              className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Professional E-Commerce Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Product Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Variations</th>
                  <th className="py-3.5 px-4">Tag</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                      No listings match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                      
                      {/* Item Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-xs group-hover:text-primary transition-colors">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                              {item.location || 'Thrissur Store'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60 text-xs">
                          {item.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <span className="font-black text-slate-900 text-sm">
                          {item.price}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-4">
                        <span className={`font-semibold ${
                          typeof item.stock === 'number' && item.stock < 10 
                            ? 'text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200' 
                            : 'text-slate-700'
                        }`}>
                          {item.stock} {typeof item.stock === 'number' ? 'units' : ''}
                        </span>
                      </td>

                      {/* Variations */}
                      <td className="py-3.5 px-4 max-w-[240px]">
                        {item.variations && item.variations.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {item.variations.map((v, i) => (
                              <span key={i} className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200/90 text-slate-800 text-[10px] px-2 py-0.5 rounded-md font-medium">
                                <span className="font-bold text-slate-900">{v.name}:</span>
                                <span className="text-slate-600 truncate max-w-[120px]">{v.options}</span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] italic">No variations</span>
                        )}
                      </td>

                      {/* Tag */}
                      <td className="py-3.5 px-4">
                        {item.tag && (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[10px] font-bold">
                            <Tag className="w-2.5 h-2.5" />
                            {item.tag}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(item);
                              setIsAddModalOpen(true);
                            }}
                            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-primary hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center transition-colors cursor-pointer"
                            title="Edit Item"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item.id)}
                            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Modal */}
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
          onAddListing={handleSaveProduct}
          initialData={editingProduct}
        />

      </div>
    </SellerAdminLayout>
  );
}
