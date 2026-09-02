import { useState } from 'react';
import SuperAdminLayout from '../layout/SuperAdminLayout';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Package,
  Store,
  Calendar,
  User,
  FolderOpen,
  Globe,
  CheckCheck,
  MessageSquareText
} from 'lucide-react';
import {
  useStoreRequests,
  updateStoreRequest,
  formatDate
} from '../../lib/independentStoreRequests';

const STATUS_CONFIG = {
  Pending: {
    label: 'Pending',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500'
  },
  Approved: {
    label: 'Approved',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500'
  },
  Rejected: {
    label: 'Rejected',
    chip: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500'
  }
};

const statusPill = (status) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${STATUS_CONFIG[status].chip}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_CONFIG[status].dot}`} />
    {STATUS_CONFIG[status].label}
  </span>
);

export default function IndependentStoreRequestsPage() {
  const requests = useStoreRequests();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [reviewNote, setReviewNote] = useState('');

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const approvedCount = requests.filter((r) => r.status === 'Approved').length;
  const rejectedCount = requests.filter((r) => r.status === 'Rejected').length;

  const filtered = requests.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.storeName.toLowerCase().includes(q) ||
      r.ownerName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.address.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Requests', value: requests.length, icon: ClipboardList, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Approved', value: approvedCount, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Rejected', value: rejectedCount, icon: XCircle, color: 'text-rose-600 bg-rose-50' }
  ];

  const openRequest = (req) => {
    setSelected(req);
    setReviewNote(req.reviewNote || '');
  };

  const field = (label, value, Icon, accent) => (
    <div>
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {Icon && <Icon className={`h-3 w-3 ${accent || ''}`} />}
        {label}
      </span>
      <span className="mt-0.5 block text-[13px] font-semibold text-slate-800">{value}</span>
    </div>
  );

  return (
    <SuperAdminLayout
      title="Independent Seller Requests"
      subtitle="Review and approve independent store applications"
    >
      <div className="space-y-6 font-sans">
        {/* Header & search */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <Store className="h-5 w-5 text-primary" />
              Independent Store Queue
            </h2>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Applications submitted by sellers who want their own storefront
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search store, person or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-semibold text-slate-800 outline-none transition-colors focus:border-primary focus:bg-white"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-primary"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black leading-none text-slate-900">{s.value}</p>
                <p className="mt-1 text-[11px] font-semibold text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table (desktop) + Cards (mobile) */}
        {filtered.length > 0 ? (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3.5">Request</th>
                      <th className="px-4 py-3.5">Store</th>
                      <th className="px-4 py-3.5">Contact Person</th>
                      <th className="px-4 py-3.5">Category</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {filtered.map((r) => (
                      <tr
                        key={r.id}
                        onClick={() => openRequest(r)}
                        className="cursor-pointer transition-colors hover:bg-slate-50/70"
                      >
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wide text-slate-500">
                            {r.id}
                          </span>
                          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400">
                            <Calendar className="h-3 w-3 text-slate-300" />
                            {formatDate(r.submittedAt)}
                          </p>
                        </td>
                        <td className="px-4 py-3.5">
                          <h3 className="font-bold text-slate-900">{r.storeName}</h3>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-slate-800">{r.ownerName}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="max-w-[170px] truncate">{r.email}</span>
                          </p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">
                            {r.category}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">{statusPill(r.status)}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => openRequest(r)}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                            >
                              <Eye className="h-3.5 w-3.5 text-primary" />
                              View
                            </button>
                            {r.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => {
                                    updateStoreRequest(r.id, { status: 'Approved', reviewNote: 'Store approved by super admin.' });
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-emerald-700"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    updateStoreRequest(r.id, { status: 'Rejected', reviewNote: 'Request rejected by super admin.' });
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-[11px] font-bold text-rose-600 transition-colors hover:bg-rose-50"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filtered.map((r) => (
                <div key={r.id} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-slate-900">{r.storeName}</h3>
                      <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wide text-slate-400">
                        <ClipboardList className="h-3 w-3 text-slate-300" />
                        {r.id}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                        <Calendar className="h-3 w-3 text-slate-300" />
                        {formatDate(r.submittedAt)}
                      </p>
                    </div>
                    {statusPill(r.status)}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">{r.ownerName}</span>
                    <span className="inline-flex whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {r.category}
                    </span>
                    <span className="flex min-w-0 items-center gap-1">
                      <Mail className="h-3 w-3 flex-shrink-0 text-slate-400" />
                      <span className="truncate">{r.email}</span>
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openRequest(r)}
                      className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <Eye className="h-3.5 w-3.5 text-primary" />
                      View
                    </button>
                    {r.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => {
                            updateStoreRequest(r.id, { status: 'Approved', reviewNote: 'Store approved by super admin.' });
                          }}
                          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            updateStoreRequest(r.id, { status: 'Rejected', reviewNote: 'Request rejected by super admin.' });
                          }}
                          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-200 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
            <ClipboardList className="mx-auto h-10 w-10 text-slate-200" />
            <p className="mt-3 text-sm font-semibold text-slate-600">No requests found</p>
            <p className="text-xs text-slate-400">Try changing your search or filter.</p>
          </div>
        )}

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="my-8 w-full max-w-2xl transform overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <ClipboardList className="h-3.5 w-3.5" />
                      {selected.id} · Submitted {formatDate(selected.submittedAt)}
                    </p>
                    <h2 className="mt-0.5 text-xl font-bold text-slate-900">{selected.storeName}</h2>
                    <div className="mt-1">{statusPill(selected.status)}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Key info grid */}
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 sm:grid-cols-3">
                  {field('Store Owner', selected.ownerName, User, 'text-primary')}
                  {field('Phone', selected.phone, Phone)}
                  {field('Email', selected.email, Mail)}
                  {field('Category', selected.category, FolderOpen)}
                  {field('Expected Products', `${selected.maxProducts} items`, Package)}
                  {field('Store Link', selected.storeUrl || 'Not specified', Globe)}
                </div>

                {/* Address */}
                <div>
                  <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <MapPin className="h-3 w-3" />
                    Business Address
                  </span>
                  <p className="text-[13px] font-semibold leading-relaxed text-slate-800">
                    {selected.address}, {selected.city} — {selected.pincode}
                  </p>
                </div>

                {/* About */}
                {selected.about && (
                  <div>
                    <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <MessageSquareText className="h-3 w-3" />
                      About the store
                    </span>
                    <p className="text-[13px] leading-relaxed text-slate-600">{selected.about}</p>
                  </div>
                )}

                {/* Review note */}
                <div className="rounded-2xl border border-slate-200 p-4">
                  <span className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <CheckCheck className="h-3 w-3" />
                    {selected.reviewNote ? 'Review note' : selected.status === 'Pending' ? 'Decision note' : 'Review note'}
                  </span>
                  <input
                    type="text"
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    placeholder={selected.status === 'Pending' ? 'Add a note for the seller (optional)…' : 'Note recorded with the decision'}
                    disabled={selected.status !== 'Pending'}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Close
                  </button>

                  {selected.status === 'Pending' ? (
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => {
                          updateStoreRequest(selected.id, { status: 'Rejected', reviewNote: reviewNote.trim() || 'Request rejected by super admin.' });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 px-4 py-2.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject Request
                      </button>
                      <button
                        onClick={() => {
                          updateStoreRequest(selected.id, { status: 'Approved', reviewNote: reviewNote.trim() || 'Store approved by super admin.' });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve Store
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-slate-400">
                      {selected.status === 'Approved'
                        ? 'Store was approved · onboarding next'
                        : 'Request closed · not onboarded'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}