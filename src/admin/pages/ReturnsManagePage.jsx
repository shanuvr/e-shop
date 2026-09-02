import React, { useState } from 'react';
import SellerAdminLayout from '../layout/SellerAdminLayout';
import {
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Eye,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

const DEFAULT_RETURNS = [
  {
    id: 'RET-801',
    orderId: 'ORD-9841',
    requestDate: '02 Sep 2026',
    customerName: 'Anand Kumar',
    email: 'anand.k@gmail.com',
    phone: '+91 98471 22334',
    productName: 'Acoustic Pro Headphones',
    productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&h=300',
    category: 'Electronics',
    price: 2499,
    refundAmount: 2499,
    reason: 'Defective / Sound Balance Issue',
    customerNote: 'Left ear cup has static sound and intermittent Bluetooth disconnects. Included box and original cable.',
    status: 'Pending',
    address: 'Flat 4B, Sky Towers, Swaraj Round North, Thrissur, Kerala 680001'
  },
  {
    id: 'RET-802',
    orderId: 'ORD-9780',
    requestDate: '30 Aug 2026',
    customerName: 'Priya Nambiar',
    email: 'priya.n@gmail.com',
    phone: '+91 97455 88990',
    productName: 'Kerala Kasavu Handloom Saree',
    productImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&h=300',
    category: 'Fashion',
    price: 1850,
    refundAmount: 1850,
    reason: 'Color Mismatch / Wrong Item Received',
    customerNote: 'Ordered silver zari weave border but received golden zari instead. Item unused with original tag.',
    status: 'Approved & Refunded',
    address: 'Door 12/450, M.G. Road Junction, Thrissur, Kerala 680004'
  },
  {
    id: 'RET-803',
    orderId: 'ORD-9655',
    requestDate: '28 Aug 2026',
    customerName: 'Suresh Menon',
    email: 'suresh.menon@yahoo.com',
    phone: '+91 94473 11223',
    productName: 'Teak Wood Dining Chair Set',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&h=300',
    category: 'Home & Kitchen',
    price: 4999,
    refundAmount: 4999,
    reason: 'Size / Dimension Unsuitable',
    customerNote: 'Chairs are too tall for my current dining table setup. Want to return for full refund.',
    status: 'Pending',
    address: 'Menon Villa, Kokkalai Road, Thrissur, Kerala 680021'
  },
  {
    id: 'RET-804',
    orderId: 'ORD-9512',
    requestDate: '25 Aug 2026',
    customerName: 'Fathima Beevi',
    email: 'fathima.b@gmail.com',
    phone: '+91 98950 44556',
    productName: 'Organic Aloe Vera Skincare Kit',
    productImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&h=300',
    category: 'Beauty & Health',
    price: 649,
    refundAmount: 649,
    reason: 'Damaged Packaging on Arrival',
    customerNote: 'Outer seal was broken during courier transit. Content spilled slightly inside box.',
    status: 'Rejected',
    rejectionNote: 'Return request submitted after 14-day policy window.',
    address: 'House No. 8, High Road, East Fort, Thrissur, Kerala 680005'
  }
];

export default function ReturnsManagePage() {
  const [returnsList, setReturnsList] = useState(DEFAULT_RETURNS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [modalAction, setModalAction] = useState(null); // { kind: 'refund' | 'reject', item }
  const [rejectReason, setRejectReason] = useState('');

  const pendingCount = returnsList.filter(r => r.status === 'Pending').length;
  const approvedCount = returnsList.filter(r => r.status === 'Approved & Refunded').length;
  const rejectedCount = returnsList.filter(r => r.status === 'Rejected').length;
  const totalRefunded = returnsList
    .filter(r => r.status === 'Approved & Refunded')
    .reduce((sum, r) => sum + r.refundAmount, 0);

  const openRefundConfirm = (item, e) => {
    if (e) e.stopPropagation();
    setRejectReason('');
    setModalAction({ kind: 'refund', item });
  };

  const openRejectPrompt = (item, e) => {
    if (e) e.stopPropagation();
    setRejectReason('');
    setModalAction({ kind: 'reject', item });
  };

  const confirmAction = () => {
    if (!modalAction) return;
    const { kind, item } = modalAction;

    if (kind === 'refund') {
      setReturnsList(returnsList.map(r =>
        r.id === item.id ? { ...r, status: 'Approved & Refunded' } : r
      ));
      if (selectedReturn && selectedReturn.id === item.id) {
        setSelectedReturn(prev => prev ? { ...prev, status: 'Approved & Refunded' } : null);
      }
    } else {
      const reason = rejectReason.trim() || 'Rejected by merchant.';
      setReturnsList(returnsList.map(r =>
        r.id === item.id ? { ...r, status: 'Rejected', rejectionNote: reason } : r
      ));
      if (selectedReturn && selectedReturn.id === item.id) {
        setSelectedReturn(prev => prev ? { ...prev, status: 'Rejected', rejectionNote: reason } : null);
      }
    }
    setModalAction(null);
  };

  const filteredReturns = returnsList.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.id.toLowerCase().includes(q) ||
      r.orderId.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.productName.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Returns', value: returnsList.length, icon: RotateCcw, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Approved & Refunded', value: approvedCount, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Total Refunded', value: `₹${totalRefunded.toLocaleString()}`, icon: ShieldCheck, color: 'text-violet-600 bg-violet-50' }
  ];

  return (
    <SellerAdminLayout title="Returns & Refunds" subtitle="Manage buyer return requests, inspect item details, and issue refunds">
      <div className="space-y-6 font-sans">

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-primary" />
              Customer Return Requests
            </h2>
            <p className="text-xs text-slate-500 font-medium">Review customer reasons, verify items, and issue instant refunds</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search return ID, order or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

            {/* Status Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-primary"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending Review</option>
              <option value="Approved & Refunded">Approved &amp; Refunded</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} shrink-0`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 leading-none">{s.value}</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Returns Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Request &amp; Date</th>
                  <th className="py-3.5 px-5">Product Details</th>
                  <th className="py-3.5 px-5">Customer</th>
                  <th className="py-3.5 px-5">Reason for Return</th>
                  <th className="py-3.5 px-5">Refund Amount</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredReturns.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-400 font-semibold">
                      No return requests match your current filters.
                    </td>
                  </tr>
                ) : (
                  filteredReturns.map((r) => {
                    const isPending = r.status === 'Pending';
                    const isApproved = r.status === 'Approved & Refunded';

                    return (
                      <tr
                        key={r.id}
                        onClick={() => setSelectedReturn(r)}
                        className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                      >
                        {/* Request ID & Date */}
                        <td className="py-3.5 px-5 align-top">
                          <span className="inline-flex items-center whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wide text-slate-500">
                            {r.id}
                          </span>
                          <p className="mt-1.5 flex items-center gap-1 whitespace-nowrap text-[11px] font-medium text-slate-500">
                            <Calendar className="w-3 h-3 flex-shrink-0 text-slate-400" />
                            {r.requestDate}
                          </p>
                        </td>

                        {/* Product Details */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={r.productImage}
                              alt={r.productName}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate max-w-[180px]">
                                {r.productName}
                              </h3>
                              <p className="text-[10px] text-slate-400 font-medium">Order: <span className="font-mono font-bold text-slate-600">{r.orderId}</span></p>
                            </div>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-5">
                          <p className="font-bold text-slate-900">{r.customerName}</p>
                          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">{r.email}</p>
                        </td>

                        {/* Reason */}
                        <td className="py-3.5 px-5">
                          <p className="font-bold text-slate-800 line-clamp-1 max-w-[200px]">{r.reason}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 max-w-[200px]">{r.customerNote}</p>
                        </td>

                        {/* Refund Amount */}
                        <td className="py-3.5 px-5 font-black text-slate-900 text-sm">
                          ₹{r.refundAmount.toLocaleString()}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${
                            isApproved
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : r.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isApproved ? 'bg-emerald-500' : r.status === 'Rejected' ? 'bg-rose-500' : 'bg-amber-500'
                            }`} />
                            {r.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedReturn(r)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-primary" />
                              View
                            </button>

                            {isPending && (
                              <>
                                <button
                                  onClick={(e) => openRefundConfirm(r, e)}
                                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Refund
                                </button>
                                <button
                                  onClick={(e) => openRejectPrompt(r, e)}
                                  className="px-2.5 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Return Popup Modal */}
        {selectedReturn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 transform transition-all animate-[fadeIn_0.2s_ease-out]">
              
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center border border-blue-100">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-base">Return #{selectedReturn.id}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedReturn.status === 'Approved & Refunded'
                          ? 'bg-emerald-500 text-white'
                          : selectedReturn.status === 'Rejected'
                          ? 'bg-rose-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}>
                        {selectedReturn.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Submitted on {selectedReturn.requestDate} · Order #{selectedReturn.orderId}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedReturn(null)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 text-xs">

                {/* Product Card */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 flex items-center gap-3.5">
                  <img
                    src={selectedReturn.productImage}
                    alt={selectedReturn.productName}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{selectedReturn.category}</span>
                    <h4 className="font-bold text-slate-900 text-sm truncate">{selectedReturn.productName}</h4>
                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500 font-medium">Original Price: ₹{selectedReturn.price.toLocaleString()}</span>
                      <span className="font-black text-slate-900 text-sm">Refund: ₹{selectedReturn.refundAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Return Reason Box */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    Reason: {selectedReturn.reason}
                  </div>
                  <p className="text-slate-700 text-xs font-medium leading-relaxed pl-5">
                    "{selectedReturn.customerNote}"
                  </p>
                  {selectedReturn.rejectionNote && (
                    <div className="mt-2 pt-2 border-t border-amber-200 text-rose-700 font-bold">
                      Rejection Reason: {selectedReturn.rejectionNote}
                    </div>
                  )}
                </div>

                {/* Customer Contact & Delivery Info */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Details &amp; Return Address</span>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block font-semibold">Customer Name</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{selectedReturn.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block font-semibold">Phone Contact</span>
                      <span className="font-semibold text-slate-800 block mt-0.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-primary shrink-0" />
                        {selectedReturn.phone}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold mb-0.5">Return Pick-up Address</span>
                    <p className="text-slate-700 font-medium leading-relaxed flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {selectedReturn.address}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedReturn(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-white transition-colors cursor-pointer"
                >
                  Close
                </button>

                {selectedReturn.status === 'Pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => openRejectPrompt(selectedReturn, e)}
                      className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Reject Return
                    </button>
                    <button
                      type="button"
                      onClick={(e) => openRefundConfirm(selectedReturn, e)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve &amp; Refund ₹{selectedReturn.refundAmount.toLocaleString()}
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-500">
                    Decision logged: {selectedReturn.status}
                  </span>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Confirm Action Modal */}
        {modalAction && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
            <div className="my-8 w-full max-w-md rounded-2xl border border-slate-100 bg-white shadow-2xl animate-[fadeIn_0.2s_ease-out]">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  {modalAction.kind === 'refund' ? 'Confirm Refund' : 'Reject Return'}
                </h4>
                <button
                  type="button"
                  onClick={() => setModalAction(null)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                {modalAction.kind === 'refund' ? (
                  <div className="text-center">
                    <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h5 className="mt-4 text-base font-bold text-slate-900">
                      Approve refund of ₹{modalAction.item.refundAmount.toLocaleString()}?
                    </h5>
                    <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                      Return <span className="font-mono font-bold text-slate-700">{modalAction.item.id}</span>{' '}
                      for <span className="font-bold text-slate-700">{modalAction.item.productName}</span> will
                      be marked as approved and the amount credited back to the customer's original
                      payment method. This cannot be undone.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-center">
                      <div className="mx-auto w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
                        <XCircle className="w-7 h-7 text-rose-600" />
                      </div>
                      <h5 className="mt-4 text-base font-bold text-slate-900">
                        Reject return {modalAction.item.id}?
                      </h5>
                      <p className="mt-1.5 text-xs text-slate-500 font-medium">
                        Please provide a reason so the customer understands why the request was declined.
                      </p>
                    </div>
                    <textarea
                      rows="3"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Reason for rejection (e.g. submitted after return window)"
                      className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 resize-none"
                    />
                  </div>
                )}
              </div>

              <div className="px-5 pb-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalAction(null)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmAction}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-colors cursor-pointer ${
                    modalAction.kind === 'refund'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {modalAction.kind === 'refund' ? 'Confirm Refund' : 'Confirm Reject'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SellerAdminLayout>
  );
}
