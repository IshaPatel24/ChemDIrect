"use client";

import React, { useState } from 'react';
import { Globe, FlaskConical, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { simulateCrawl } from '@/lib/mock-crawler';
import { Product } from '@/lib/types';
import { ComparisonTable } from '@/components/ComparisonTable';

export default function BasicCrawlPage() {
  const [urls, setUrls] = useState({ url1: '', url2: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urls.url1 || !urls.url2) {
      setError("Please provide two organic product URLs for comparison.");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setResults([]);

    try {
      // Basic extraction
      const [res1, res2] = await Promise.all([
        simulateCrawl(urls.url1),
        simulateCrawl(urls.url2)
      ]);
      
      setResults([res1, res2]);
      setIsLoading(false);
    } catch (_err) {
      setError("Extraction failed. Ensure the URLs are valid.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <FlaskConical size={18} />
            </div>
            <span className="font-bold text-lg text-foreground">ChemDirect Crawl</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/results" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Verified Database</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Basic URL Comparison
          </h1>
          <p className="text-muted-foreground text-lg">
            Enter two URLs to compare products directly.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleCrawl} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Product 1 URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                      type="url"
                      placeholder="https://srlchem.com/..."
                      value={urls.url1}
                      onChange={(e) => setUrls({ ...urls, url1: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm text-foreground transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Product 2 URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                      type="url"
                      placeholder="https://lobachemie.com/..."
                      value={urls.url2}
                      onChange={(e) => setUrls({ ...urls, url2: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm text-foreground transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium flex items-center gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-sm"
              >
                {isLoading ? "Fetching Data..." : "Compare Products"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Comparison Results</h2>
              <button 
                onClick={() => { setResults([]); setUrls({ url1: '', url2: '' }); }}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Compare New URLs
              </button>
            </div>
            
            <ComparisonTable products={results} />
          </div>
        )}
      </main>
    </div>
  );
}
