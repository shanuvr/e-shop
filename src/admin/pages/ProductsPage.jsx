import React, { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import ProductCard from '../../components/ProductCard';
import AddProductModal from '../../components/AddProductModal';
import { Plus, Filter, Trash2 } from 'lucide-react';

export default function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productsList, setProductsList] = useState([
    {
      id: 'e1',
      title: 'Acoustic Pro Headphones',
      category: 'Audio & Acoustics',
      price: '₹24,999',
      location: 'Swaraj Round, Thrissur',
      description: 'Immersive sound experience with active noise cancellation.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
      tag: 'BESTSELLER',
      type: 'product'
    },
    {
      id: 'e2',
      title: 'Elite Smartwatch Series',
      category: 'Wearable Tech',
      price: '₹36,999',
      location: 'Swaraj Round, Thrissur',
      description: 'Next-gen health monitoring and workout tracking.',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&h=300',
      tag: 'NEW RELEASE',
      type: 'product'
    },
    {
      id: 's1',
      title: 'Deep Home Cleaning Service',
      category: 'Home Services',
      price: '₹499/hr',
      location: 'Thrissur & Nearby',
      description: 'Top-to-bottom sanitization for apartments and houses.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&h=300',
      tag: 'TOP RATED',
      type: 'service'
    }
  ]);

  const handleAddProduct = (newProduct) => {
    setProductsList([newProduct, ...productsList]);
  };

  const handleDeleteProduct = (id) => {
    setProductsList(productsList.filter(p => p.id !== id));
  };

  return (
    <SellerAdminLayout title="Products & Services" subtitle="Manage your catalog listings">
      <div className="space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-slate-900">Products Master Catalog</h2>
            <p className="text-xs text-slate-500 font-medium">Add, edit, or remove products and local services</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsList.map((item) => (
            <div key={item.id} className="relative group">
              <ProductCard item={item} linkPrefix="/product" />
              <button
                onClick={() => handleDeleteProduct(item.id)}
                className="absolute top-2 right-2 z-20 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 cursor-pointer"
                title="Delete Product"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddListing={handleAddProduct}
        />

      </div>
    </SellerAdminLayout>
  );
}
