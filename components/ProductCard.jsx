'use client';
import Link from 'next/link';
import { addToCart, money } from './storage';
export default function ProductCard({ product }){
 return <article className="card productCard"><Link href={`/products/${product.id}`}><img src={product.image} alt={product.title}/><div className="cardBody"><p className="muted">{product.category}</p><h3>{product.title}</h3><p>{money(product.price)}</p></div></Link><button onClick={()=>addToCart(product)} disabled={product.stock<1}>{product.stock>0?'Add to cart':'Out of stock'}</button></article>
}
