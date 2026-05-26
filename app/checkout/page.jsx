'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, getOrders, money, saveCart, saveOrders } from '../../components/storage';

export default function CheckoutPage(){
 const router=useRouter(); const [cart,setCart]=useState([]); const [form,setForm]=useState({name:'',phone:'',email:'',address:'',payment:'QPay'});
 useEffect(()=>setCart(getCart()),[]); const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
 const place=e=>{e.preventDefault(); if(!cart.length) return; const order={id:'ORD-'+Date.now(), customer:form, items:cart, total, status:'Pending', createdAt:new Date().toISOString()}; saveOrders([order,...getOrders()]); saveCart([]); window.dispatchEvent(new Event('cart:update')); router.push('/success');};
 return <main className="section checkout"><form className="panel" onSubmit={place}><h1>Checkout</h1><input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><textarea required placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/><label>Payment method<select value={form.payment} onChange={e=>setForm({...form,payment:e.target.value})}><option>QPay</option><option>Bank transfer</option><option>Cash on delivery</option></select></label><button className="btn">Place order</button></form><aside className="summary"><h2>Order summary</h2>{cart.map(i=><p key={i.id}>{i.title} × {i.qty} <b>{money(i.price*i.qty)}</b></p>)}<hr/><h3>Total: {money(total)}</h3></aside></main>
}
