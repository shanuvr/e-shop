import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GitCompare,
  ArrowRight,
  Trash2,
  Check,
  X,
  Sparkles,
  Tag,
  Truck,
  Eye,
  Scale
} from 'lucide-react';
import UserLayout from '../layout/UserLayout';
import ProductCard from '../components/ProductCard';
import { useCompare, clearCompare, MAX_COMPARE, showCompareToast } from '../lib/compare';

const fmt = (value) => {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'number' && !isNaN(Number(value))) {
    return `₹${value.toLocaleString('en-IN')}`;
  }
  return String(value);
};

function Value({ display }) {
  if (display === undefined || display === null) {
    return <span className="inline-block text-slate-300">—</span>;
  }
  if (Array.isArray(display)) {
    return (
      <ul className="space-y-1">
        {display.map((li, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-500 mt-[7px] shrink-0" />
            <span className="text-[12.5px] leading-snug text-slate-700">{li}</span>
          </li>
        ))}
      </ul>
    );
  }
  const str = String(display);
  if (str === 'Yes') {
    return (
      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-[12.5px]">
        <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center">
          <Check className="w-2 h-2" />
        </span>
        Yes
      </span>
    );
  }
  if (str === 'No') {
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-400 font-medium text-[12.5px]">
        <span className="w-3.5 h-3.5 rounded-full bg-slate-200/70 flex items-center justify-center">
          <X className="w-2 h-2" />
        </span>
        No
      </span>
    );
  }
  return <span className="text-[12.5px] text-slate-700 leading-snug">{str}</span>;
}

const GROUP_ICONS = {
  Overview: Eye,
  Pricing: Tag,
  Highlights: Sparkles,
  'Shipping & Warranty': Truck
};

export default function Compare() {
  const navigate = useNavigate();
  const items = useCompare();
  const [hideSimilarities, setHideSimilarities] = useState(false);

  const rows = useMemo(() => {
    const build = (label, valueFor) => {
      const values = items.map((p) => {
        const raw = valueFor(p);
        const display = Array.isArray(raw) ? raw.map((r) => fmt(r) || r).filter(Boolean) : fmt(raw);
        return { raw, display };
      });
      const normalized = values.map((v) =>
        typeof v.display === 'string'
          ? v.display
          : Array.isArray(v.display)
            ? v.display.join(' | ')
            : String(JSON.stringify(v.raw ?? ''))
      );
      return { label, values, differs: new Set(normalized).size > 1 };
    };

    return [
      {
        group: 'Overview',
        rows: [
          build('Category', (p) => p.category),
          build('Condition', (p) => p.condition),
          build('Availability', (p) => p.location),
          build('Assured', (p) => (p.isAssured ? 'Yes' : 'No')),
          build('Sold by', (p) => p.shopId)
        ]
      },
      {
        group: 'Pricing',
        rows: [
          build('Price', (p) => p.price),
          build('Original Price', (p) => p.originalPrice),
          build('Discount', (p) => (p.discount ? `${p.discount}% OFF` : null)),
          build('Bank Offer', (p) => p.bankOffer)
        ]
      },
      {
        group: 'Highlights',
        rows: [
          build('Key Features', (p) =>
            p.highlights && p.highlights.length
              ? p.highlights
              : p.description
                ? p.description.split(/[,;.]/)[0]
                : ['—']
          )
        ]
      },
      {
        group: 'Shipping & Warranty',
        rows: [build('Shipping', (p) => p.shipping), build('Warranty', (p) => p.warranty)]
      }
    ];
  }, [items]);

  const visibleGroups = hideSimilarities
    ? rows
        .map((grp) => ({ ...grp, rows: grp.rows.filter((r) => r.differs) }))
        .filter((grp) => grp.rows.length > 0)
    : rows;

  const differsCount = useMemo(
    () => rows.reduce((acc, grp) => acc + grp.rows.filter((r) => r.differs).length, 0),
    [rows]
  );

  const allHidden =
    hideSimilarities &&
    !rows.some((grp) => grp.rows.some((r) => r.differs));

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-5">
          <Link to="/" className="hover:text-[#1a73e8] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-[#1a73e8] transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-slate-600 font-semibold">Compare</span>
        </nav>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm py-16 px-6 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 text-[#1a73e8] flex items-center justify-center">
              <Scale className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black text-slate-900 mb-1.5">Nothing to compare yet</h1>
            <p className="text-sm text-slate-500 font-medium mb-6 max-w-sm mx-auto leading-relaxed">
              Select up to {MAX_COMPARE} products from the marketplace using the "Compare" button on any product card.
            </p>
            <button
              type="button"
              onClick={() => navigate('/marketplace')}
              className="inline-flex items-center gap-2 bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer active:scale-95"
            >
              Browse Marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-blue-600 text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1">
                  <GitCompare className="w-3.5 h-3.5" />
                  Compare Products
                </div>
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {items.length} of {MAX_COMPARE} selected
                  {differsCount > 0 && !hideSimilarities && (
                    <span className="text-slate-400 font-semibold text-sm ml-2">
                      · {differsCount} attribute{differsCount > 1 ? 's' : ''} differ
                    </span>
                  )}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHideSimilarities((v) => !v)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                    hideSimilarities
                      ? 'bg-[#1a73e8] border-[#1a73e8] text-white shadow-md shadow-blue-600/25'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-[#1a73e8]'
                  }`}
                >
                  {hideSimilarities ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                  {hideSimilarities ? 'Showing Differences' : 'Hide Similarities'}
                </button>
                <button
                  type="button"
                  onClick={() => { clearCompare(); showCompareToast('Comparison cleared'); }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                  aria-label="Clear comparison"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline sm:inline">Clear</span>
                </button>
              </div>
            </div>

            {/* Product summaries */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {items.map((p) => (
                <ProductCard key={p.id} item={p} />
              ))}
            </div>

            {/* Comparison table */}
            {allHidden ? (
              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-blue-50/60 py-8 px-6 text-center">
                <Check className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">Everything shown is identical</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Turn off "Hide Similarities" to see the full comparison.
                </p>
              </div>
            ) : (
              <section className="mt-5 rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
                {visibleGroups.map((grp, gi) => {
                  const GroupIcon = GROUP_ICONS[grp.group] || Scale;
                  const grpDiffers = grp.rows.filter((r) => r.differs).length;
                  return (
                    <div key={grp.group} className={gi > 0 ? 'border-t border-slate-200' : ''}>
                      {/* Group bar */}
                      <div className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-slate-50/80 border-b border-slate-200/70">
                        <GroupIcon className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                          {grp.group}
                        </span>
                        {grpDiffers > 0 && (
                          <span className="ml-auto text-[10px] font-bold text-amber-600">
                            {grpDiffers} difference{grpDiffers > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      {/* Rows */}
                      {grp.rows.map((row, ri) => {
                        const last = ri === grp.rows.length - 1;
                        return (
                          <div
                            key={row.label}
                            className={`grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-[150px_1fr_1fr] px-4 sm:px-5 py-2.5 ${
                              last ? '' : 'border-b border-slate-50'
                            } ${row.differs ? 'bg-amber-50/60' : ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                          >
                            <div className="col-span-2 md:col-span-1 flex items-center gap-1.5 min-w-0">
                              {row.differs && (
                                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Products differ on this attribute" />
                              )}
                              <span className="text-[11px] font-semibold text-slate-500 truncate">{row.label}</span>
                            </div>
                            {row.values.map((v, vi) => (
                              <div key={vi} className={vi === 1 && !row.differs ? 'md:border-l md:border-slate-100 md:pl-4' : ''}>
                                <Value display={v.display} />
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </section>
            )}

            {differsCount > 0 && !hideSimilarities && (
              <p className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                Amber rows show attributes where the two products differ.
              </p>
            )}

            <p className="mt-4 text-[11px] text-slate-400 font-medium">
              Tap the "Comparing" button on a card to remove it, or use "Clear" above. Data is demo content.
            </p>
          </>
        )}
      </div>
    </UserLayout>
  );
}