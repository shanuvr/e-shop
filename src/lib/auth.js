import { useEffect, useState } from 'react';

const STORAGE_KEY = 'eshop_customer_auth';
const CHANGE_EVENT = 'eshop-auth-changed';

export function getAuthUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* not logged in */
  }
  return null;
}

export function isAuthenticated() {
  return !!getAuthUser();
}

export function loginUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return user;
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useAuth() {
  const [user, setUser] = useState(() => getAuthUser());

  useEffect(() => {
    const sync = () => setUser(getAuthUser());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return user;
}