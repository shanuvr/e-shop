import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import { addStoreRequest, STORE_CATEGORIES } from '../lib/independentStoreRequests';
import {
  ChevronRight,
  Store,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
  CalendarClock,
  LifeBuoy,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const initialState = {
  ownerName: '',
  email: '',
  phone: '',
  storeName: '',
  category: '',
  maxProducts: '',
  storeUrl: '',
  address: '',
  city: '',
  pincode: '',
  about: ''
};

const floatInputClass =
  'peer w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15';

const floatLabelClass =
  'pointer-events-none absolute left-3.5 -top-2.5 z-10 bg-white px-1.5 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:left-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:left-3.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-primary peer-autofill:-top-2.5 peer-autofill:left-3.5 peer-autofill:text-[11px] peer-autofill:font-bold';

const reqStar = <span className="text-rose-400"> *</span>;

function FloatingInput({ id, label, required, type = 'text', value, onChange, ...rest }) {
  return (
    <div className="relative pt-1">
      <input
        id={id}
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={onChange}
        className={floatInputClass}
        {...rest}
      />
      <label htmlFor={id} className={floatLabelClass}>
        {label}
        {required && reqStar}
      </label>
    </div>
  );
}

function FloatingSelect({ id, label, required, value, onChange, options }) {
  return (
    <div className="relative pt-1">
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-3.5 py-3 pr-10 text-sm font-medium text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
      >
        <option value="" disabled>Select a category</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3.5 -top-2.5 z-10 bg-white px-1.5 text-[11px] font-bold text-slate-500"
      >
        {label}
        {required && reqStar}
      </label>
      <ChevronRight className="pointer-events-none absolute right-3.5 top-[23px] h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />
    </div>
  );
}

function FloatingTextArea({ id, label, rows = 3, value, onChange, maxLength }) {
  return (
    <div className="relative pt-1">
      <textarea
        id={id}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3.5 -top-2.5 z-10 bg-white px-1.5 text-[11px] font-bold text-slate-500"
      >
        {label}
      </label>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4.5 w-4.5 text-primary" />
      </div>
      <div>
        <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function IndependentStoreApply() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(null);

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = addStoreRequest({
      ownerName: form.ownerName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      storeName: form.storeName.trim(),
      category: form.category,
      maxProducts: Number(form.maxProducts) || 0,
      storeUrl: form.storeUrl.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      pincode: form.pincode.trim(),
      about: form.about.trim()
    });
    setSubmitted(request);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 antialiased">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-1.5 text-[13px] text-slate-500">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <Link to="/seller" className="transition-colors hover:text-primary">Become a Seller</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="font-medium text-slate-900">Independent Store Application</span>
          </div>

          {submitted ? (
            <SubmissionSuccess request={submitted} />
          ) : (
            <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    Independent store application
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Tell us about your business and we'll set up your own storefront on E-SHOP.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 1. Store details */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <SectionHeader
                      icon={Store}
                      title="Store details"
                      subtitle="Choose what your store will sell"
                    />

                    <div className="space-y-4">
                      <FloatingInput
                        id="storeName"
                        label="Store name"
                        required
                        maxLength={40}
                        value={form.storeName}
                        onChange={setField('storeName')}
                      />

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FloatingSelect
                          id="category"
                          label="Primary category"
                          required
                          value={form.category}
                          onChange={setField('category')}
                          options={STORE_CATEGORIES}
                        />
                        <div>
                          <FloatingInput
                            id="maxProducts"
                            label="Expected products"
                            required
                            type="number"
                            min="1"
                            max="5000"
                            inputMode="numeric"
                            value={form.maxProducts}
                            onChange={setField('maxProducts')}
                          />
                          <p className="mt-1 pl-1 text-[11px] font-medium text-slate-400">
                            Approximate number of listings at launch
                          </p>
                        </div>
                      </div>

                      <div>
                        <FloatingInput
                          id="storeUrl"
                          label="Preferred domain (optional)"
                          maxLength={40}
                          value={form.storeUrl}
                          onChange={setField('storeUrl')}
                        />
                        <p className="mt-1 pl-1 text-[11px] font-medium text-slate-400">
                          e.g. yourstore.com
                        </p>
                      </div>

                      <FloatingTextArea
                        id="about"
                        label="About your store (optional)"
                        maxLength={500}
                        value={form.about}
                        onChange={setField('about')}
                      />
                    </div>
                  </section>

                  {/* 2. Business address */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <SectionHeader
                      icon={MapPin}
                      title="Business address"
                      subtitle="Where is the store based?"
                    />

                    <div className="space-y-4">
                      <FloatingInput
                        id="address"
                        label="Street address"
                        required
                        maxLength={80}
                        value={form.address}
                        onChange={setField('address')}
                      />

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FloatingInput
                          id="city"
                          label="City"
                          required
                          value={form.city}
                          onChange={setField('city')}
                        />
                        <FloatingInput
                          id="pincode"
                          label="Pincode"
                          required
                          inputMode="numeric"
                          minLength={6}
                          maxLength={6}
                          pattern="[0-9]{6}"
                          value={form.pincode}
                          onChange={setField('pincode')}
                        />
                      </div>
                    </div>
                  </section>

                  {/* 3. Contact person */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <SectionHeader
                      icon={User}
                      title="Contact person"
                      subtitle="Who should we reach out to for approvals?"
                    />

                    <div className="space-y-4">
                      <FloatingInput
                        id="ownerName"
                        label="Full name"
                        required
                        value={form.ownerName}
                        onChange={setField('ownerName')}
                      />

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FloatingInput
                          id="phone"
                          label="Phone"
                          required
                          type="tel"
                          inputMode="tel"
                          pattern="[+0-9 ]{10,15}"
                          value={form.phone}
                          onChange={setField('phone')}
                        />
                        <FloatingInput
                          id="email"
                          label="Business email"
                          required
                          type="email"
                          value={form.email}
                          onChange={setField('email')}
                        />
                      </div>
                    </div>
                  </section>

                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-white shadow-sm shadow-primary/20 transition-colors hover:bg-blue-700"
                  >
                    Submit application
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Sidebar */}
              <aside className="mt-8 space-y-5 lg:sticky lg:top-24 lg:mt-0">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CalendarClock className="h-4 w-4 text-primary" />
                    What happens next
                  </h3>
                  <ol className="space-y-4">
                    {[
                      { step: '01', title: 'Application submitted', desc: 'Your details are sent to our operations team.' },
                      { step: '02', title: 'Review & verification', desc: 'We verify your business and category.' },
                      { step: '03', title: 'Onboarding call', desc: 'Our team contacts you to plan your store setup.' },
                      { step: '04', title: 'Store goes live', desc: 'Your independent storefront launches on E-SHOP.' }
                    ].map((s) => (
                      <li key={s.step} className="flex gap-3">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-primary">
                          {s.step}
                        </span>
                        <div>
                          <p className="text-[13px] font-semibold text-slate-900">{s.title}</p>
                          <p className="text-xs text-slate-500">{s.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Typical review time: 1–2 business days
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <LifeBuoy className="h-4 w-4 text-primary" />
                    Need help?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Questions about the program? Our seller onboarding team is happy to help.
                  </p>
                  <div className="mt-3 space-y-1.5 text-xs font-semibold text-slate-700">
                    <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" /> +91 (800) 123-4567</p>
                    <p className="flex items-center gap-2 truncate"><Mail className="h-3.5 w-3.5 text-slate-400" /> sellers@eshop-marketplace.com</p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

function SubmissionSuccess({ request }) {
  return (
    <div className="mx-auto max-w-xl py-10 sm:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>

        <span className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
          <Store className="h-3.5 w-3.5 text-primary" />
          {request.id}
        </span>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Application submitted!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
          Thank you, {request.ownerName}. Your independent store application is now{' '}
          <span className="font-semibold text-slate-700">waiting for review and approval</span>.
          A member of our team will contact you soon at{' '}
          <span className="font-semibold text-slate-700">{request.email}</span>.
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-xl border border-slate-100 bg-slate-50 p-4 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
            <span className="font-semibold text-slate-500">Status</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Pending review
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="font-semibold text-slate-500">Submitted</span>
            <span className="font-semibold text-slate-700">
              {new Date(request.submittedAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Link
            to="/marketplace"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Browse Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        For urgent queries, email{' '}
        <span className="font-semibold text-slate-500">sellers@eshop-marketplace.com</span>
      </p>
    </div>
  );
}