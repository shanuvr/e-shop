import {
  InfoLayout,
  InfoSection
} from '../components/InfoLayout';
import {
  Truck,
  Zap,
  RotateCcw,
  PackageCheck,
  MapPin
} from 'lucide-react';

const RATES = [
  { range: 'Orders above ₹499', cost: 'Free delivery' },
  { range: 'Orders below ₹499', cost: '₹49 flat fee' },
  { range: 'Priority / express (where available)', cost: '₹99' }
];

const TIMEFRAMES = [
  { icon: Zap, area: 'Within Thrissur town', time: 'Same-day (order before 5 PM) or next day' },
  { icon: Truck, area: 'Within Kerala', time: '2-3 business days' },
  { icon: RotateCcw, area: 'Rest of India', time: '3-5 business days' }
];

export default function Shipping() {
  return (
    <InfoLayout
      active="shipping"
      title="Shipping Guidelines"
      description="How quickly we deliver, what it costs, and where we ship across India."
    >
      <InfoSection title="Delivery timeframes">
        <div className="grid gap-3 sm:grid-cols-3">
          {TIMEFRAMES.map((item) => (
            <div key={item.area} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <item.icon className="h-5 w-5 text-primary" />
              <p className="mt-2.5 text-sm font-bold text-slate-900">{item.area}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.time}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Timeframes are an estimate from the moment the seller ships your order and exclude
          processing time (usually 24 hours).
        </p>
      </InfoSection>

      <InfoSection title="Shipping charges">
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
          {RATES.map((rate) => (
            <div key={rate.range} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-sm font-semibold text-slate-700">{rate.range}</span>
              <span className="text-sm font-bold text-slate-900">{rate.cost}</span>
            </div>
          ))}
        </div>
        <p>
          Shipping charges are always calculated and shown clearly at checkout before you confirm —
          there are no hidden fees at any point.
        </p>
      </InfoSection>

      <InfoSection title="Delivery coverage">
        <div className="flex items-start gap-2.5 text-sm text-slate-600">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
          <span>
            We currently deliver across all 14 districts of Kerala with priority coverage in
            Thrissur town. Nationwide delivery is available for most products sold through the
            E-SHOP marketplace.
          </span>
        </div>
      </InfoSection>

      <InfoSection title="Packaging & protection">
        <ul className="space-y-2">
          {[
            'Every order is packed in tamper-evident, protective packaging suited to the product.',
            'Fragile and high-value items are double-boxed with cushioning material.',
            'Delayed or lost shipments are fully tracked, and refunds are processed immediately if delivery is not possible.'
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2.5 text-sm text-slate-600">
              <PackageCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
              {tip}
            </li>
          ))}
        </ul>
      </InfoSection>
    </InfoLayout>
  );
}