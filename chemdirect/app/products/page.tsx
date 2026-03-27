import React from 'react';
import Link from 'next/link';
import { Droplet, Network, Microscope, Beaker } from 'lucide-react';

export default function ProductsPage() {
  const categories = [
    { name: "Active Pharmaceutical Ingredients (APIs)", icon: <Beaker size={32} /> },
    { name: "Organic Reagents", icon: <Droplet size={32} /> },
    { name: "Analytical Standards", icon: <Microscope size={32} /> },
    { name: "Monomers & Polymers", icon: <Network size={32} /> }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Beaker size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Chem<span className="text-primary">Direct</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/products" className="text-primary transition-colors">Products</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Chemical Catalog</h1>
          <p className="text-xl text-muted-foreground">Explore high-purity organic compunds across specialized categories.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground">{cat.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
