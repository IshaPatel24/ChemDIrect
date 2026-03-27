import React from 'react';
import Link from 'next/link';
import { Leaf, Award, Beaker } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Beaker size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Chem<span className="text-primary">Direct</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="text-primary transition-colors">About</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Purity. Precision. Protocol.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ChemDirect connects research labs and industrial buyers directly to high-grade organic compounds without the marketing middlemen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Leaf className="text-primary" /> Our Organic Promise
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We ensure that all our suppliers adhere to strict pharmaceutical and organic synthesis standards. We curate our index to prioritize manufacturers that hold ISO 9001 and verifiable organic processing certifications.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Award className="text-primary" /> Quality Assured
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every compound listed on ChemDirect undergoes algorithmic verification against known CAS registry numbers and purity thresholds. Our commitment to quality ensures reproducible results in your synthesis and clinical applications.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
