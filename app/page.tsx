import React from 'react';
import { Search, FlaskConical, BarChart3, ShoppingCart, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FlaskConical size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Chem<span className="text-primary">Direct</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            The Vertical Search Engine for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Chemical & Organic Products
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminate content marketing clutter. Find direct &quot;Add to Cart&quot; product links and compare weights, purity, and pricing side-by-side.
          </p>

          {/* Search Interface */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-opacity"></div>
            <form action="/results" className="relative flex items-center bg-card rounded-2xl shadow-xl border border-border p-2 overflow-hidden">
              <div className="pl-4 text-muted-foreground">
                <Search size={24} />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search by Name, CAS Number, or Formula..."
                className="w-full px-4 py-4 focus:outline-none text-lg text-foreground placeholder:text-muted-foreground bg-transparent"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all transform active:scale-95 shadow-md"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /> Verified Suppliers</span>
            <span className="flex items-center gap-1.5"><BarChart3 size={16} className="text-primary" /> Side-by-Side Comparison</span>
            <span className="flex items-center gap-1.5"><ShoppingCart size={16} className="text-primary" /> Instant Checkout</span>
          </div>

          <div className="mt-12">
            <Link 
              href="/compare/crawl" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 border border-white/10 rounded-2xl text-white font-bold hover:bg-neutral-800 hover:border-primary/50 transition-all group"
            >
              <Globe size={20} className="text-primary group-hover:rotate-12 transition-transform" />
              Compare via External URL
              <ArrowRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="max-w-7xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Transactional Focus",
              desc: "Our algorithm filters out SEO blogs and whitepapers to give you direct buy links.",
              icon: <ShoppingCart size={28} />
            },
            {
              title: "Smart Comparison",
              desc: "Normalize chemical units automatically. Compare costs per gram or milliliter accurately.",
              icon: <BarChart3 size={28} />
            },
            {
              title: "Quality Assurance",
              desc: "Standardized purity and CAS verification across multiple global vendors.",
              icon: <ShieldCheck size={28} />
            }
          ].map((f, i) => (
            <div key={i} className="p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">© 2026 ChemDirect Search Engine. Built for Organic & Inorganic synthesis.</p>
        </div>
      </footer>
    </div>
  );
}
