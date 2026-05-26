import { initialProducts } from '../data/products';

export const money = n => new Intl.NumberFormat('mn-MN').format(Number(n || 0)) + '₮';

const read = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
};
const write = (key, value) => {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
};

export const defaultUsers = [
  { id: 'u-admin', name: 'Admin', email: 'admin@mk.mn', phone: '99112233', password: 'admin123', role: 'admin' },
  { id: 'u-user', name: 'Customer', email: 'user@mk.mn', phone: '88001122', password: 'user123', role: 'user' }
];

export const getProducts = () => read('mk_products', initialProducts);
export const saveProducts = products => write('mk_products', products);
export const getCart = () => read('mk_cart', []);
export const saveCart = cart => write('mk_cart', cart);
export const getOrders = () => read('mk_orders', []);
export const saveOrders = orders => write('mk_orders', orders);
export const getUsers = () => read('mk_users', defaultUsers);
export const saveUsers = users => write('mk_users', users);
export const getCurrentUser = () => read('mk_current_user', null);
export const saveCurrentUser = user => write('mk_current_user', user);
export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('mk_current_user');
  window.dispatchEvent(new Event('auth:update'));
};
export const login = (email, password) => {
  const found = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!found) return null;
  const safeUser = { id: found.id, name: found.name, email: found.email, phone: found.phone, role: found.role };
  saveCurrentUser(safeUser);
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('auth:update'));
  return safeUser;
};
export const register = data => {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) throw new Error('Email already registered');
  const nextUser = { id: 'u' + Date.now(), role: 'user', ...data };
  saveUsers([...users, nextUser]);
  const safeUser = { id: nextUser.id, name: nextUser.name, email: nextUser.email, phone: nextUser.phone, role: nextUser.role };
  saveCurrentUser(safeUser);
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('auth:update'));
  return safeUser;
};
export const addToCart = product => {
  const cart = getCart(); const found = cart.find(i => i.id === product.id);
  const next = found ? cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...cart, { ...product, qty: 1 }];
  saveCart(next); window.dispatchEvent(new Event('cart:update'));
};
