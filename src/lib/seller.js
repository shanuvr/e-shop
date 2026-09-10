import { useEffect, useState } from 'react';

const STORAGE_KEY = 'eshop_registered_sellers';
const CHANGE_EVENT = 'eshop-sellers-changed';

export function getRegisteredSellers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    }
  } catch {
    /* no registered sellers */
  }
  return [];
}

export function registerSeller(seller) {
  const list = getRegisteredSellers();
  const entry = {
    ...seller,
    id: `reg-${Date.now()}`,
    registeredAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...list]));
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return entry;
}

export function removeSeller(id) {
  const list = getRegisteredSellers().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useRegisteredSellers() {
  const [sellers, setSellers] = useState(() => getRegisteredSellers());

  useEffect(() => {
    const sync = () => setSellers(getRegisteredSellers());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return sellers;
}