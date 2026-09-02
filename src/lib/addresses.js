import { useEffect, useState } from 'react';

const STORAGE_KEY = 'eshop_customer_addresses';
const CHANGE_EVENT = 'eshop-addresses-changed';

export function getAddresses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* empty */
  }
  return [];
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function addAddress(address) {
  const list = getAddresses();
  const item = { id: `addr-${Date.now()}`, isDefault: list.length === 0, ...address };
  persist([...list, item]);
  return item;
}

export function updateAddress(id, patch) {
  persist(
    getAddresses().map((a) =>
      a.id === id ? { ...a, ...patch, isDefault: a.isDefault } : a
    )
  );
}

export function removeAddress(id) {
  let list = getAddresses();
  const removed = list.find((a) => a.id === id);
  list = list.filter((a) => a.id !== id);
  if (removed && removed.isDefault && list.length) {
    list[0].isDefault = true;
  }
  persist(list);
}

export function setDefaultAddress(id) {
  persist(getAddresses().map((a) => ({ ...a, isDefault: a.id === id })));
}

export function useAddresses() {
  const [addresses, setAddresses] = useState(() => getAddresses());

  useEffect(() => {
    const sync = () => setAddresses(getAddresses());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return addresses;
}