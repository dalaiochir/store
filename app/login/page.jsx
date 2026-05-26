'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '../../components/storage';

export default function LoginPage(){
 const router = useRouter();
 const [mode,setMode]=useState('login');
 const [error,setError]=useState('');
 const [form,setForm]=useState({name:'',phone:'',email:'',password:''});
 const update=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=e=>{
  e.preventDefault(); setError('');
  try{
   const user = mode==='login' ? login(form.email, form.password) : register(form);
   if(!user){ setError('Email эсвэл нууц үг буруу байна.'); return; }
   router.push(user.role==='admin'?'/admin':'/products');
  }catch(err){ setError(err.message || 'Алдаа гарлаа.'); }
 };
 return <main className="authPage section">
  <section className="authCard">
   <p className="eyebrow">Account access</p>
   <h1>{mode==='login'?'Нэвтрэх':'Бүртгүүлэх'}</h1>
   <p className="muted">Admin болон энгийн хэрэглэгчийн role localStorage дээр хадгалагдана.</p>
   <div className="demoBox"><b>Demo admin:</b> admin@mk.mn / admin123<br/><b>Demo user:</b> user@mk.mn / user123</div>
   <form onSubmit={submit}>
    {mode==='register'&&<><input required name="name" placeholder="Нэр" value={form.name} onChange={update}/><input required name="phone" placeholder="Утас" value={form.phone} onChange={update}/></>}
    <input required type="email" name="email" placeholder="Email" value={form.email} onChange={update}/>
    <input required type="password" name="password" placeholder="Нууц үг" value={form.password} onChange={update}/>
    {error&&<p className="errorText">{error}</p>}
    <button className="btn">{mode==='login'?'Login':'Create account'}</button>
   </form>
   <button className="ghost switchBtn" onClick={()=>{setMode(mode==='login'?'register':'login'); setError('');}}>{mode==='login'?'Шинээр бүртгүүлэх':'Надад account байгаа'}</button>
  </section>
 </main>
}
