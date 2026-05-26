'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { addToCart, getProducts, money } from '../../../components/storage';

export default function ProductDetail({ params }){
 const [product,setProduct]=useState(null); useEffect(()=>setProduct(getProducts().find(p=>p.id===params.id)),[params.id]);
 if(!product) return <main className="section"><p>Product not found.</p><Link href="/products">Back to products</Link></main>;
 return <main className="section detail"><img src={product.image} alt={product.title}/><div><p className="eyebrow">{product.category}</p><h1>{product.title}</h1><h2>{money(product.price)}</h2><p>{product.description}</p><p className={product.stock>0?'stock':'out'}>{product.stock>0?`${product.stock} ширхэг бэлэн байна`:'Out of stock'}</p><button className="btn" disabled={product.stock<1} onClick={()=>addToCart(product)}>Add to cart</button></div></main>
}
