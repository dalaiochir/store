'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart } from './storage';
export default function Header(){
 const [count,setCount]=useState(0); const update=()=>setCount(getCart().reduce((s,i)=>s+i.qty,0));
 useEffect(()=>{update(); window.addEventListener('cart:update',update); window.addEventListener('storage',update); return()=>{window.removeEventListener('cart:update',update); window.removeEventListener('storage',update)}},[]);
 return <header className="header"><Link className="logo" href="/">MK<span>Commerce</span></Link><nav><Link href="/products">Products</Link><Link href="/admin">Admin</Link></nav><form className="headerSearch" action="/products"><input name="q" placeholder="Search products" aria-label="Search products" /></form><Link className="cartLink" href="/cart" aria-label="Cart">Cart <b>{count}</b></Link></header>
}
