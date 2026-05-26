'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart, getCurrentUser, logout } from './storage';

export default function Header(){
 const [count,setCount]=useState(0);
 const [user,setUser]=useState(null);
 const updateCart=()=>setCount(getCart().reduce((s,i)=>s+i.qty,0));
 const updateAuth=()=>setUser(getCurrentUser());
 useEffect(()=>{
  updateCart(); updateAuth();
  window.addEventListener('cart:update',updateCart); window.addEventListener('storage',updateCart);
  window.addEventListener('auth:update',updateAuth);
  return()=>{window.removeEventListener('cart:update',updateCart); window.removeEventListener('storage',updateCart); window.removeEventListener('auth:update',updateAuth)}
 },[]);
 const handleLogout=()=>{ logout(); setUser(null); };
 return <header className="header">
  <Link className="logo" href="/">MK<span>Commerce</span></Link>
  <nav><Link href="/products">Products</Link>{user?.role==='admin'&&<Link href="/admin">Admin</Link>}</nav>
  <form className="headerSearch" action="/products"><input name="q" placeholder="Search products" aria-label="Search products" /></form>
  <div className="headerActions">
   <Link className="cartLink" href="/cart" aria-label="Cart">Cart <b>{count}</b></Link>
   {user ? <div className="userMenu"><span>{user.name} <em>{user.role}</em></span><button type="button" className="ghost smallBtn" onClick={handleLogout}>Logout</button></div> : <Link className="loginLink" href="/login">Login</Link>}
  </div>
 </header>
}
