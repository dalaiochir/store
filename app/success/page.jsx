import Link from 'next/link';
export default function SuccessPage(){return <main className="section success"><div className="panel"><p className="check">✓</p><h1>Order placed successfully</h1><p>Таны захиалга бүртгэгдлээ. Бид тун удахгүй холбогдох болно.</p><Link className="btn" href="/products">Continue shopping</Link></div></main>}
