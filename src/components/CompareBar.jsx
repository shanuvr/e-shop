import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GitCompare, X, Trash2, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useCompare, removeFromCompare, clearCompare, showCompareToast, MAX_COMPARE, TOAST_EVENT } from '../lib/compare';

export default function CompareBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCompare();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => {
    const handleToast = (e) => {
      setToastMessage(e.detail || '');
      setToastVisible(true);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastVisible(false), 2600);
    };
    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  if (items.length === 0) return null;

  const isComparePage = location.pathname.startsWith('/compare');
  const canCompare = items.length >= 2;

  return (
    <div className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-1rem)] sm:w-auto">
      {/* Toast bubble */}
      {toastVisible && (
        <div className="mb-2 flex justify-center animate-[fadeIn_0.25s_ease-out]">
          <div className="bg-slate-900/95 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-sm">
            <span className="w-4 h-4 rounded-full bg-white/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5" />
            </span>
            <span className="max-w-[260px] truncate">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Tray */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-blue-900/10 border border-slate-200/90 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1a73e8] flex items-center justify-center">
            <GitCompare className="w-4 h-4" />
          </span>
          <div className="leading-tight hidden xs:block sm:block">
            <div className="text-xs font-bold text-slate-900">Compare</div>
            <div className="text-[10px] text-slate-500 font-medium">
              {items.length}/{MAX_COMPARE}
            </div>
          </div>
        </div>

        {items.length < MAX_COMPARE && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium shrink-0">
            <span className="bg-slate-100 border border-dashed border-slate-300 rounded-lg px-2.5 py-1.5">
              + Add {MAX_COMPARE - items.length} more
            </span>
          </div>
        )}

        {/* Items */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar flex-1">
          {items.map((p) => (
            <div
              key={p.id}
              className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl pl-1.5 pr-2 py-1.5 shrink-0 min-w-[150px] sm:min-w-[180px]"
            >
              <button
                type="button"
                onClick={() => removeFromCompare(p.id)}
                className="absolute -top-1.5 -right-1.5 z-10 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 hover:scale-110 transition-all cursor-pointer"
                aria-label={`Remove ${p.title} from compare`}
              >
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
              <img
                src={p.image}
                alt={p.title}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover bg-slate-100 border border-slate-100"
              />
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate max-w-[90px] sm:max-w-[120px]">
                  {p.title}
                </p>
                <div className="text-[11px] font-black text-slate-900">
                  {typeof p.price === 'number' ? `₹${p.price.toLocaleString()}` : p.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {!isComparePage ? (
            <button
              type="button"
              onClick={() => navigate('/compare')}
              disabled={!canCompare}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                canCompare
                  ? 'bg-[#1a73e8] hover:bg-blue-700 text-white shadow-md shadow-blue-600/25'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Compare Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-[#1a73e8] hover:bg-blue-100 transition-all cursor-pointer whitespace-nowrap"
            >
              Back to Shop
            </button>
          )}
          <button
            type="button"
            onClick={() => { clearCompare(); showCompareToast('Compare tray cleared'); }}
            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            aria-label="Clear comparison tray"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {!canCompare && !isComparePage && items.length > 0 && (
        <p className="hidden sm:flex items-center gap-1 mt-1.5 justify-end text-[10px] font-semibold text-slate-400">
          <AlertCircle className="w-3 h-3" />
          Select {MAX_COMPARE} products to enable comparison
        </p>
      )}
    </div>
  );
}