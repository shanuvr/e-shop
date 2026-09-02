import { useEffect, useState } from 'react';

const STORAGE_KEY = 'eshop_independent_store_requests';
const CHANGE_EVENT = 'eshop-store-requests-changed';

export const STORE_CATEGORIES = [
  'Electronics & Gadgets',
  'Fashion & Apparel',
  'Home & Living',
  'Beauty & Personal Care',
  'Handicrafts & Decor',
  'Food & Grocery',
  'Sports & Fitness',
  'Books & Stationery',
  'Other'
];

const daysAgo = (d) => new Date(Date.now() - d * 86400000).toISOString();

const seedData = [
  {
    id: 'REQ-1003',
    storeName: 'Coconut Grove Organics',
    ownerName: 'Kiran Panicker',
    email: 'kiran@coconutgrove.in',
    phone: '+91 98470 31245',
    category: 'Food & Grocery',
    maxProducts: 40,
    storeUrl: 'coconutgrove.eshop.in',
    address: 'Plot 7B, West Fort Road, Ayyanthole',
    city: 'Thrissur',
    pincode: '680004',
    about:
      'Family-run organic produce business sourcing directly from local farmers. Looking to open a small online storefront for weekly deliveries.',
    submittedAt: daysAgo(3),
    reviewNote: '',
    status: 'Pending'
  },
  {
    id: 'REQ-1002',
    storeName: 'Nila Handloom Studio',
    ownerName: 'Bindu Krishnan',
    email: 'bindu@nilastudio.in',
    phone: '+91 98958 77821',
    category: 'Fashion & Apparel',
    maxProducts: 25,
    storeUrl: 'nilastudio.eshop.in',
    address: 'Door 3/118, Naalukettu Road, Swaraj Round',
    city: 'Thrissur',
    pincode: '680001',
    about:
      'Handloom sarees and designer kurtis stitched in-house. Want an independent store to reach customers outside the marketplace.',
    submittedAt: daysAgo(6),
    reviewNote: '',
    status: 'Pending'
  },
  {
    id: 'REQ-1001',
    storeName: 'TechDom Gadget Hub',
    ownerName: 'Jose Mathew',
    email: 'jose@techdomhub.in',
    phone: '+91 96454 89033',
    category: 'Electronics & Gadgets',
    maxProducts: 60,
    storeUrl: 'techdom.eshop.in',
    address: 'Ground Floor, Mathrubhumi Lane, M.G. Road',
    city: 'Thrissur',
    pincode: '680001',
    about: 'Authorized reseller for mobile accessories and small appliances with warehouse stock.',
    submittedAt: daysAgo(12),
    reviewNote: 'Documentation verified. Store approved for onboarding call.',
    status: 'Approved'
  },
  {
    id: 'REQ-1000',
    storeName: 'QuickFix Mobile Care',
    ownerName: 'Aneesh Raj',
    email: 'aneesh.quickfix@gmail.com',
    phone: '+91 90723 44412',
    category: 'Other',
    maxProducts: 0,
    storeUrl: '',
    address: 'Shop 21, Kokkalai Service Road',
    city: 'Thrissur',
    pincode: '680021',
    about: 'Mobile repair workshop. Category does not match an independent store product line.',
    submittedAt: daysAgo(20),
    reviewNote: 'Service-based business does not fit the independent retail store program.',
    status: 'Rejected'
  }
];

export function getStoreRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* fall through to seed */
  }
  const seed = seedData.map((item) => ({ ...item }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function addStoreRequest(data) {
  const list = getStoreRequests();
  const request = {
    id: `REQ-${Date.now().toString().slice(-6)}`,
    ...data,
    submittedAt: new Date().toISOString(),
    reviewNote: '',
    status: 'Pending'
  };
  persist([request, ...list]);
  return request;
}

export function updateStoreRequest(id, patch) {
  persist(
    getStoreRequests().map((req) =>
      req.id === id
        ? {
            ...req,
            ...patch,
            reviewedAt:
              patch.status && patch.status !== 'Pending'
                ? new Date().toISOString()
                : req.reviewedAt
          }
        : req
    )
  );
}

export function useStoreRequests() {
  const [requests, setRequests] = useState(() => getStoreRequests());

  useEffect(() => {
    const sync = () => setRequests(getStoreRequests());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return requests;
}

export function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}