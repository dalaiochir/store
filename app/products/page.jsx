'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '../../components/ProductGrid';
import { getProducts } from '../../components/storage';

function ProductsContent() {
  const params = useSearchParams();
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [max, setMax] = useState('');

  useEffect(() => {
    setProducts(getProducts());
    setQ(params.get('q') || '');
    setCategory(params.get('category') || 'All');
  }, [params]);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === 'All' || p.category === category) &&
          p.title.toLowerCase().includes(q.toLowerCase()) &&
          (!max || p.price <= Number(max))
      ),
    [products, q, category, max]
  );

  return (
    <main className="section">
      <h1>Products</h1>
      <div className="filters">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          aria-label="Search products"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category filter"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          value={max}
          onChange={(e) => setMax(e.target.value)}
          type="number"
          placeholder="Max price"
          aria-label="Maximum price"
        />
      </div>
      <ProductGrid products={filtered} />
      {filtered.length === 0 && <p className="empty">No products found.</p>}
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<main className="section"><p className="empty">Loading products...</p></main>}>
      <ProductsContent />
    </Suspense>
  );
}
