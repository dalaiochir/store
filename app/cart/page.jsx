'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart, money, saveCart } from '../../components/storage';

export default function CartPage(){
 const [cart,setCart]=useState([]); const sync=next=>{setCart(next); saveCart(next); window.dispatchEvent(new Event('cart:update'));};
 useEffect(()=>setCart(getCart()),[]); const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
 return <main className="section"><h1>Your cart</h1>{cart.length===0?<div className="empty"><p>Cart is empty.</p><Link className="btn" href="/products">Shop products</Link></div>:<><div className="cartList">{cart.map(item=><article className="cartItem" key={item.id}><img src={item.image} alt={item.title}/><div><h3>{item.title}</h3><p>{money(item.price)}</p></div><div className="qty"><button onClick={()=>sync(cart.map(i=>i.id===item.id?{...i,qty:Math.max(1,i.qty-1)}:i))}>−</button><span>{item.qty}</span><button onClick={()=>sync(cart.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))}>+</button></div><button className="ghost" onClick={()=>sync(cart.filter(i=>i.id!==item.id))}>Remove</button></article>)}</div><aside className="summary"><h2>Total: {money(total)}</h2><Link className="btn" href="/checkout">Checkout</Link></aside></>}</main>
}
