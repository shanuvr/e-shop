import { useState, useCallback, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  Layers,
  Palette,
  ImagePlus,
  Check
} from 'lucide-react';

const PRODUCT_CATEGORIES = [
  'Electronics', 'Home & Kitchen', 'Fashion', 'Beauty & Health',
  'Sports', 'Books & Stationery', 'Automotive', 'Tools & DIY'
];

const PRESET_COLORS = [
  '#1a73e8', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#64748b', '#111827',
  '#f8fafc', '#facc15'
];

const TAG_OPTIONS = ['NEW RELEASE', 'TOP RATED', 'BESTSELLER', 'HOT DEAL'];

let variationIdCounter = 0;
const nextVariationId = () => `opt-${Date.now()}-${variationIdCounter++}`;

const normalizeOptions = (options) => {
  const raw = Array.isArray(options) ? options : (options || '').split(',').map(s => s.trim()).filter(Boolean);
  return raw.map((o, idx) =>
    typeof o === 'string'
      ? { id: `legacy-${idx}-${o}`, value: o, image: null }
      : { id: o.id || `opt-${idx}`, value: o.value || '', image: o.image || null }
  );
};

export default function AddProductModal({ isOpen, onClose, onAddListing, initialData = null }) {
  const isEditing = Boolean(initialData);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || PRODUCT_CATEGORIES[0],
    price: initialData?.price ? String(initialData.price).replace(/[^0-9]/g, '') : '',
    stock: initialData?.stock ?? 10,
    description: initialData?.description || '',
    tag: initialData?.tag || 'NEW RELEASE'
  });
  const [images, setImages] = useState(() => {
    const existing = initialData?.image || initialData?.imageUrl || initialData?.images;
    const urls = Array.isArray(existing)
      ? existing
      : existing
        ? [existing]
        : [];
    return urls.map((url, i) => ({ id: `main-${Date.now()}-${i}`, url }));
  });
  const [colors, setColors] = useState(() => {
    const colorVar = initialData?.variations?.find(v => String(v.name).toLowerCase() === 'color');
    return colorVar && Array.isArray(colorVar.options)
      ? colorVar.options
          .map(o => {
            if (typeof o === 'string') return { value: o, images: [] };
            const images = Array.isArray(o.images)
              ? o.images
              : o.image
                ? [o.image]
                : [];
            return { value: o.value || '', images };
          })
          .filter(c => c.value)
      : [];
  });
  const [variations, setVariations] = useState(() => {
    const others = (initialData?.variations || []).filter(v => String(v.name).toLowerCase() !== 'color');
    const normalized = others.map(v => ({
      name: v.name || '',
      options: normalizeOptions(v.options)
    }));
    return normalized.length > 0 ? normalized : [{ name: '', options: [{ id: nextVariationId(), value: '', image: null }] }];
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    if (!files || files.length === 0) return;
    const added = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(f => ({ id: nextVariationId() + '-img', url: URL.createObjectURL(f) }));
    if (added.length > 0) setImages(prev => [...prev, ...added]);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const setCoverImage = (id) => {
    setImages(prev => {
      const idx = prev.findIndex(img => img.id === id);
      if (idx <= 0) return prev;
      const reordered = [...prev];
      const [img] = reordered.splice(idx, 1);
      reordered.unshift(img);
      return reordered;
    });
  };

  const addVariation = () => {
    setVariations([...variations, { name: '', options: [{ id: nextVariationId(), value: '', image: null }] }]);
  };

  const removeVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const updateVariationName = (index, value) => {
    const updated = [...variations];
    updated[index].name = value;
    setVariations(updated);
  };

  const addOption = (variationIndex) => {
    const updated = [...variations];
    updated[variationIndex].options.push({ id: nextVariationId(), value: '', image: null });
    setVariations(updated);
  };

  const removeOption = (variationIndex, optionIndex) => {
    const updated = [...variations];
    updated[variationIndex].options.splice(optionIndex, 1);
    setVariations(updated);
  };

  const updateOptionValue = (variationIndex, optionIndex, value) => {
    const updated = [...variations];
    updated[variationIndex].options[optionIndex].value = value;
    setVariations(updated);
  };

  const handleOptionImage = (variationIndex, optionIndex, file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const updated = [...variations];
    updated[variationIndex].options[optionIndex].image = url;
    setVariations(updated);
  };

  const toggleColor = (color) => {
    setColors(prev =>
      prev.some(c => c.value === color)
        ? prev.filter(c => c.value !== color)
        : [...prev, { value: color, images: [] }]
    );
  };

  const handleCustomColor = (value) => {
    if (value && !colors.some(c => c.value === value)) {
      setColors(prev => [...prev, { value, images: [] }]);
    }
  };

  const handleColorImages = (colorValue, files) => {
    if (!files || files.length === 0) return;
    const urls = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(f => URL.createObjectURL(f));
    if (urls.length === 0) return;
    setColors(prev => prev.map(c =>
      c.value === colorValue ? { ...c, images: [...c.images, ...urls] } : c
    ));
  };

  const removeColorImage = (colorValue, imageUrl) => {
    setColors(prev => prev.map(c =>
      c.value === colorValue
        ? { ...c, images: c.images.filter(img => img !== imageUrl) }
        : c
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validVariations = variations
      .filter(v => v.name.trim() !== '' && v.options.length > 0)
      .map(v => ({
        name: v.name.trim(),
        options: v.options
          .filter(o => o.value.trim() !== '')
          .map(o => ({ value: o.value.trim(), image: o.image || null }))
      }))
      .filter(v => v.options.length > 0);
    const colorVariation = colors.length > 0
      ? [{ name: 'Color', options: colors.map(c => ({ value: c.value, images: c.images })) }]
      : [];
    const newListing = {
      id: initialData ? initialData.id : Date.now(),
      title: formData.title || 'New Premium Product',
      category: formData.category,
      price: formData.price ? `₹${Number(formData.price).toLocaleString('en-IN')}` : '₹499',
      description: formData.description || 'Quality listing created from Seller Dashboard.',
      image: images[0]?.url || null,
      images: images.map(img => img.url),
      tag: formData.tag,
      stock: formData.stock || 10,
      variations: [
        ...colorVariation,
        ...validVariations
      ]
    };
    onAddListing(newListing);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-[slideInRight_0.3s_ease-out]">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {isEditing ? 'Update the details of this listing' : 'Fill in the details below to publish'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Image upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Product Images <span className="text-slate-400 font-medium normal-case">({images.length})</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`grid grid-cols-3 gap-2 rounded-2xl transition-all ${
                  isDragging ? 'ring-2 ring-primary bg-blue-50' : ''
                }`}
              >
                {images.map((img, i) => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-square">
                    <img src={img.url} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                    {i === 0 ? (
                      <span className="absolute top-1 left-1 text-[8px] font-black bg-primary text-white px-1.5 py-0.5 rounded">COVER</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCoverImage(img.id)}
                        className="absolute bottom-1 left-1 text-[8px] font-bold bg-white/90 text-slate-700 px-1.5 py-0.5 rounded hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        title="Make cover"
                      >
                        Set cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Add-more tile */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:border-primary hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary cursor-pointer"
                  aria-label="Add more images"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-[9px] font-bold uppercase tracking-wide">Add photo</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 mt-1.5">Click the tile or drag & drop to add multiple images · first image is the cover.</p>
            </div>

            {/* Right: Basic info */}
            <div className="space-y-4">
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary cursor-pointer"
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Price (₹)
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="e.g. 1499"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Badge / Tag
              </label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary cursor-pointer"
              >
                {TAG_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Color Variation */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-bold text-slate-800">Color Variation</p>
                <p className="text-[11px] text-slate-500 font-medium">Select available colors for this product</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {PRESET_COLORS.map((color) => {
                const selected = colors.some(c => c.value === color);
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    title={color}
                    className={`w-8 h-8 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                      selected ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'ring-1 ring-slate-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  >
                    {selected && (
                      <Check className={`w-4 h-4 ${color === '#f8fafc' || color === '#facc15' ? 'text-slate-800' : 'text-white'}`} strokeWidth={3} />
                    )}
                  </button>
                );
              })}

              <label
                className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary cursor-pointer transition-all"
                title="Add custom color"
              >
                <Plus className="w-4 h-4" />
                <input
                  type="color"
                  className="w-0 h-0 opacity-0"
                  onChange={(e) => handleCustomColor(e.target.value)}
                />
              </label>
            </div>

            {colors.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {colors.map((c) => (
                  <div key={c.value} className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-4 h-4 rounded-full ring-1 ring-slate-200 flex-shrink-0" style={{ backgroundColor: c.value }} />
                        <span className="text-[11px] font-bold text-slate-700 uppercase truncate">{c.value}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleColor(c.value)}
                        className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer p-0.5 flex-shrink-0"
                        aria-label={`Remove ${c.value}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {c.images.map((img, ii) => (
                        <span key={img} className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 group">
                          <img src={img} alt={`${c.value} ${ii + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeColorImage(c.value, img)}
                            className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
                            aria-label={`Remove photo ${ii + 1}`}
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      ))}

                      <label
                        className="w-10 h-10 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors cursor-pointer"
                        title={`Add photos for ${c.value}`}
                      >
                        <Plus className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handleColorImages(c.value, e.target.files)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Variations */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-bold text-slate-800">Other Variations</p>
                  <p className="text-[11px] text-slate-500 font-medium">e.g. Size, Storage</p>
                </div>
              </div>
              <button
                type="button"
                onClick={addVariation}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-primary text-primary font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Variation
              </button>
            </div>

            {variations.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No other variations — this product has a single size.</p>
            ) : (
              <div className="space-y-2.5">
                {variations.map((v, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 p-3 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        placeholder="Variation type (e.g. Size)"
                        value={v.name}
                        onChange={(e) => updateVariationName(idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-primary"
                      />
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => addOption(idx)}
                          className="px-2.5 py-1.5 text-primary border border-blue-200 bg-blue-50 hover:bg-blue-100 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          Add option
                        </button>
                        <button
                          type="button"
                          onClick={() => removeVariation(idx)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1.5 cursor-pointer"
                          aria-label="Remove variation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {v.options.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic">No options yet — add one to get started.</p>
                    ) : (
                      <div className="space-y-2">
                        {v.options.map((opt, optIdx) => (
                          <div key={opt.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder={`Option ${optIdx + 1} value (e.g. S)`}
                              value={opt.value}
                              onChange={(e) => updateOptionValue(idx, optIdx, e.target.value)}
                              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-primary"
                            />

                            <label className="relative shrink-0 cursor-pointer group" title="Upload option image">
                              {opt.image ? (
                                <span className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 block">
                                  <img src={opt.image} alt={opt.value || 'option'} className="w-full h-full object-cover" />
                                </span>
                              ) : (
                                <span className="w-9 h-9 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary transition-colors">
                                  <ImagePlus className="w-4 h-4" />
                                </span>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleOptionImage(idx, optIdx, e.target.files?.[0])}
                              />
                            </label>

                            <button
                              type="button"
                              onClick={() => removeOption(idx, optIdx)}
                              className="text-slate-300 hover:text-red-600 transition-colors p-1.5 cursor-pointer shrink-0"
                              aria-label="Remove option"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
              placeholder="Provide key details, specifications, or what's included..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {isEditing ? 'Save Changes' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
