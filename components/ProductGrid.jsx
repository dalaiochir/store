import ProductCard from './ProductCard';
export default function ProductGrid({ products }){return <div className="grid productsGrid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>}
