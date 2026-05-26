'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../components/storage';

export default function Home(){
 const [products,setProducts]=useState([]);
 useEffect(()=>setProducts(getProducts()),[]);
 const featured=products.filter(p=>p.featured).slice(0,4);
 const best=products.filter(p=>p.bestSeller).slice(0,4);
 const categories=[...new Set(products.map(p=>p.category))];
 const steps=['Бараагаа хайх','Сагслах','Төлбөр сонгох','Захиалга батлах'];
 return <main>
  <section className="hero storaHero">
   <div className="heroCopy">
    <p className="eyebrow">Хязгааргүй сонголт</p>
    <h1>Дэлгүүрээ илүү цэвэр, хурдан, итгэлтэй болго.</h1>
    <p>Stora.mn-ийн мэдрэмжтэй төстэй: том хайлт, зөөлөн card, rounded layout, dark-blue accent бүхий premium e-commerce experience.</p>
    <div className="heroActions"><Link className="btn" href="/products">Бараа үзэх</Link><Link className="btn ghostLight" href="/login">Нэвтрэх</Link></div>
   </div>
   <div className="heroPanel" aria-label="Store benefits">
    <div><strong>24/7</strong><span>Онлайн захиалга</span></div>
    <div><strong>3</strong><span>Төлбөрийн сонголт</span></div>
    <div><strong>Admin</strong><span>Бараа, захиалга удирдах</span></div>
   </div>
  </section>

  <section className="section searchStrip" aria-label="Quick product search">
   <form action="/products" className="bigSearch"><input name="q" placeholder="Та юу хайж байна вэ?" aria-label="Search products"/><button>Хайх</button></form>
  </section>

  <section className="section"><div className="sectionHead"><div><p className="eyebrow dark">Featured</p><h2>Онцлох бараа</h2></div><Link href="/products">Бүгдийг үзэх</Link></div><ProductGrid products={featured}/></section>

  <section className="section categorySection"><div className="sectionHead"><div><p className="eyebrow dark">Categories</p><h2>Ангиллууд</h2></div></div><div className="categoryGrid">{categories.map(c=><Link key={c} href={`/products?category=${c}`} className="categoryCard"><span className="categoryName">{c}</span><span>Explore →</span></Link>)}</div></section>

  <section className="section process"><div className="sectionHead"><div><p className="eyebrow dark">How to order</p><h2>Захиалга хийхэд амархан</h2></div></div><div className="stepGrid">{steps.map((s,i)=><div className="stepCard" key={s}><b>{i+1}</b><span>{s}</span></div>)}</div></section>

  <section className="section"><div className="sectionHead"><div><p className="eyebrow dark">Popular</p><h2>Best selling</h2></div><Link href="/products">Browse</Link></div><ProductGrid products={best}/></section>
 </main>
}
