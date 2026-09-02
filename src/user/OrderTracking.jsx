import { useState } from 'react';
import {
  InfoLayout,
  InfoSection
} from '../components/InfoLayout';
import {
  CheckCircle2,
  Clock,
  Package,
  Search,
  ShoppingBag,
  Truck
} from 'lucide-react';

const STEPS = [
  { label: 'Order Placed', icon: CheckCircle2 },
  { label: 'Confirmed', icon: CheckCircle2 },
  { label: 'Packed & Shipped', icon: Package },
  { label: 'Out for Delivery', icon: Truck },
  { label: 'Delivered', icon: CheckCircle2 }
];

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [tracked, setTracked] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setCurrentStep(Math.min(2 + (orderId.length % 4), 4));
      setTracked(true);
    }
  };

  return (
    <InfoLayout
      active="tracking"
      title="Order Tracking"
      description="Enter your order ID to see live status updates from confirmation to doorstep."
    >
      <InfoSection title="Track your order">
        <form onSubmit={handleTrack} className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <ShoppingBag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID (e.g. ESH-20260901)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            <Search className="h-4 w-4" />
            Track Order
          </button>
        </form>
      </InfoSection>

      {tracked && (
        <InfoSection title={`Status for ${orderId}`}>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
            {currentStep >= 4 ? 'Order delivered · Thank you for shopping!' : 'Your order is on its way'}
          </div>

          <div className="mt-4 space-y-0">
            {STEPS.map((step, idx) => {
              const done = idx <= currentStep;
              const active = idx === currentStep && currentStep < 4;
              return (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                        done ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-300'
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                    </span>
                    {idx < STEPS.length - 1 && (
                      <span className={`w-0.5 flex-1 ${done ? 'bg-primary' : 'bg-slate-200'}`} />
                    )}
                  </div>
                  <div className={`pb-6 ${idx === STEPS.length - 1 ? '' : ''}`}>
                    <p className={`text-sm font-bold ${done ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                    {active && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        Expected within 1-2 business days
                      </p>
                    )}
                    {done && (
                      <p className="mt-0.5 text-xs text-slate-400">
                        {idx === 0 && 'Order received successfully'}
                        {idx === 1 && 'Payment verified · seller notified'}
                        {idx === 2 && 'Packed and handed to our delivery partner'}
                        {idx === 3 && 'Courier is on the way to your address'}
                        {idx === 4 && 'Handed over · enjoy your purchase'}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </InfoSection>
      )}

      <InfoSection title="Where to find your order ID">
        <p>
          Your order ID is shared in the confirmation email and SMS sent right after checkout. It
          also appears in the <strong className="font-bold text-slate-700">My Account / Orders</strong>{' '}
          section alongside items you can review or return.
        </p>
      </InfoSection>
    </InfoLayout>
  );
}