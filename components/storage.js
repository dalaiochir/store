import { initialProducts } from '../data/products';
export const money = n => new Intl.NumberFormat('mn-MN').format(Number(n || 0)) + '₮';
const read = (key, fallback) => { if (typeof window === 'undefined') return fallback; try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
const write = (key, value) => { if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value)); };
export const getProducts = () => read('mk_products', initialProducts);
export const saveProducts = products => write('mk_products', products);
export const getCart = () => read('mk_cart', []);
export const saveCart = cart => write('mk_cart', cart);
export const getOrders = () => read('mk_orders', []);
export const saveOrders = orders => write('mk_orders', orders);
export const addToCart = product => {
  const cart = getCart(); const found = cart.find(i => i.id === product.id);
  const next = found ? cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...cart, { ...product, qty: 1 }];
  saveCart(next); window.dispatchEvent(new Event('cart:update'));
};
