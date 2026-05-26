'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../components/storage';

export default function Home(){
 const [products,setProducts]=useState([]); useEffect(()=>setProducts(getProducts()),[]);
 const featured=products.filter(p=>p.featured).slice(0,4); const best=products.filter(p=>p.bestSeller).slice(0,4);
 const categories=[...new Set(products.map(p=>p.category))];
 return <main><section className="hero"><div><p className="eyebrow">Premium marketplace</p><h1>Modern lifestyle products for everyday excellence.</h1><p>White, black, dark-blue accent бүхий clean shopping experience.</p><Link className="btn" href="/products">Shop now</Link></div></section><section className="section"><div className="sectionHead"><h2>Featured products</h2><Link href="/products">View all</Link></div><ProductGrid products={featured}/></section><section className="section"><h2>Categories</h2><div className="categoryGrid">{categories.map(c=><Link key={c} href={`/products?category=${c}`} className="categoryCard">{c}<span>Explore</span></Link>)}</div></section><section className="section"><div className="sectionHead"><h2>Best selling</h2><Link href="/products">Browse</Link></div><ProductGrid products={best}/></section></main>
}
