import { Link } from 'react-router-dom';
import {
  InfoLayout,
  InfoSection
} from '../components/InfoLayout';
import {
  CheckCircle2,
  RotateCcw,
  XCircle,
  Package,
  ClipboardCheck,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

const ELIGIBLE = [
  {
    icon: Package,
    title: 'Damaged or defective',
    desc: 'Product arrives broken, missing parts, or does not function correctly.'
  },
  {
    icon: RotateCcw,
    title: 'Wrong or different item',
    desc: 'You received a different product, variant, size or colour than ordered.'
  },
  {
    icon: ShieldCheck,
    title: 'Change of mind',
    desc: 'Unused items in original packaging can be returned within the 7-day window.'
  }
];

const NOT_ELIGIBLE = [
  'Personal care & hygiene products once opened',
  'Consumables (food items) after opening the seal',
  'Custom-made or personalised products',
  'Items marked as "Final Sale" on the product page'
];

const STEPS = [
  { icon: ClipboardCheck, title: 'Raise a request', desc: 'Go to My Account > Orders, select the item and choose Return.' },
  { icon: Package, title: 'Pickup arranged', desc: 'Our courier collects the item from your address within 48 hours.' },
  { icon: CreditCard, title: 'Inspection & refund', desc: 'After verification, refunds are issued within 3-5 business days.' }
];

export default function Returns() {
  return (
    <InfoLayout
      active="returns"
      title="Returns & Exchange"
      description="Our 7-day easy return policy applies to most products. Here is everything you need to know."
    >
      <InfoSection title="When can you return an item?">
        <div className="grid gap-3 sm:grid-cols-3">
          {ELIGIBLE.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <item.icon className="h-5 w-5 text-primary" />
              <p className="mt-2.5 text-sm font-bold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection title="Items that cannot be returned">
        <ul className="space-y-2">
          {NOT_ELIGIBLE.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-500" />
              {item}
            </li>
          ))}
        </ul>
      </InfoSection>

      <InfoSection title="How the process works">
        <div className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((step, idx) => (
            <div key={step.title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-black text-white">
                  {idx + 1}
                </span>
                <step.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2.5 text-sm font-bold text-slate-900">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection title="Good to know">
        <ul className="space-y-2">
          {[
            'Items must be unused and returned in their original packaging with tags and accessories.',
            'Free replacement is offered when the item is damaged, defective or incorrect.',
            'Refunds are credited to the original payment method; Cash-on-Delivery orders receive a bank transfer or store credit.',
            'Return pickup is free for all eligible items within the delivery area.'
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
              {tip}
            </li>
          ))}
        </ul>
        <p className="pt-2 text-sm text-slate-600">
          Need help with a return?{' '}
          <Link to="/help" className="font-bold text-primary hover:underline">
            Visit the Help Center
          </Link>{' '}
          or contact our support team.
        </p>
      </InfoSection>
    </InfoLayout>
  );
}