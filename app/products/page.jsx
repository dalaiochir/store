'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '../../components/ProductGrid';
import { getProducts } from '../../components/storage';

export default function ProductsPage(){
 const params=useSearchParams(); const [products,setProducts]=useState([]); const [q,setQ]=useState(params.get('q')||''); const [category,setCategory]=useState(params.get('category')||'All'); const [max,setMax]=useState('');
 useEffect(()=>setProducts(getProducts()),[]);
 const categories=['All',...new Set(products.map(p=>p.category))];
 const filtered=useMemo(()=>products.filter(p=>(category==='All'||p.category===category)&&p.title.toLowerCase().includes(q.toLowerCase())&&(!max||p.price<=Number(max))),[products,q,category,max]);
 return <main className="section"><h1>Products</h1><div className="filters"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" aria-label="Search products"/><select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Category filter">{categories.map(c=><option key={c}>{c}</option>)}</select><input value={max} onChange={e=>setMax(e.target.value)} type="number" placeholder="Max price" aria-label="Maximum price"/></div><ProductGrid products={filtered}/>{filtered.length===0&&<p className="empty">No products found.</p>}</main>
}
