import { useEffect, useState } from 'react';

const STORAGE_KEY = 'eshop_compare_tray';
const CHANGE_EVENT = 'eshop-compare-changed';
const TOAST_EVENT = 'eshop-compare-toast';
const MAX_COMPARE = 2;

export { MAX_COMPARE, TOAST_EVENT };

function sanitizeCompareItem(item) {
  return {
    id: item.id,
    title: item.title || item.name,
    price: item.price,
    originalPrice: item.originalPrice,
    discount: item.discount,
    rating: item.rating,
    reviews: item.reviews,
    isAssured: item.isAssured,
    category: item.category,
    location: item.location,
    tag: item.tag || item.badge,
    shipping: item.shipping,
    condition: item.condition,
    warranty: item.warranty,
    bankOffer: item.bankOffer,
    source: item.source,
    description: item.description || item.desc,
    highlights: Array.isArray(item.highlights) ? item.highlights : null,
    image:
      item.image || item.img ||
      (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null) ||
      null,
    shopId: item.shopId || (item.store && item.store.id)
  };
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function persist(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable */
  }
  notify();
}

export function getCompareItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isInCompare(id) {
  return getCompareItems().some((i) => String(i.id) === String(id));
}

export function addToCompare(item) {
  const items = getCompareItems();
  if (items.some((i) => String(i.id) === String(item.id))) {
    return { items, added: false, limit: false, alreadyAdded: true };
  }
  if (items.length >= MAX_COMPARE) {
    return { items, added: false, limit: true, alreadyAdded: false };
  }
  const next = [...items, sanitizeCompareItem(item)];
  persist(next);
  return { items: next, added: true, limit: false, alreadyAdded: false };
}

export function removeFromCompare(id) {
  const next = getCompareItems().filter((i) => String(i.id) !== String(id));
  persist(next);
  return next;
}

export function toggleCompare(item) {
  if (isInCompare(item.id)) {
    removeFromCompare(item.id);
    return { inCompare: false, added: false, limit: false };
  }
  return addToCompare(item);
}

export function clearCompare() {
  localStorage.removeItem(STORAGE_KEY);
  notify();
}

export function showCompareToast(message) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}

export function useCompare() {
  const [items, setItems] = useState(() => getCompareItems());

  useEffect(() => {
    const sync = () => setItems(getCompareItems());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return items;
}