'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/data';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Keyboard Support
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setQuery('');
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const lowerQuery = debouncedQuery.toLowerCase();
    
    // Custom deduplication to avoid showing multiple identical products from different vendors 
    // unless necessary, but given mock data, we just show top matches.
    return MOCK_PRODUCTS.filter(p => 
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.category?.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery) ||
      p.cas_number?.toLowerCase().includes(lowerQuery)
    ).slice(0, 8); // limit results
  }, [debouncedQuery]);

  const highlightMatch = (text: string = '', highlight: string) => {
    if (!highlight.trim() || !text) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? 
            <strong key={i} className="text-primary font-extrabold bg-primary/20 rounded-sm px-0.5">{part}</strong> : 
            <span key={i}>{part}</span>
        )}
      </>
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!query.trim()) {
      e.preventDefault();
      return;
    }
    // Form submits natively to /results
  };

  return (
    <div ref={wrapperRef} className="relative max-w-2xl mx-auto group z-50">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-opacity"></div>
      
      <form 
        action="/results" 
        className="relative flex items-center bg-card rounded-2xl shadow-xl border border-border p-2 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all"
        onSubmit={handleSubmit}
      >
        <div className="pl-4 text-muted-foreground flex-shrink-0">
          <Search size={24} className={query.trim() ? "text-primary" : ""} />
        </div>
        
        <input
          type="text"
          name="q"
          value={query}
          onChange={handleSearchChange}
          onFocus={() => { if (query.trim()) setIsOpen(true) }}
          placeholder="Search by Name, CAS Number, or Formula..."
          className="w-full px-4 py-4 focus:outline-none text-lg text-foreground placeholder:text-muted-foreground bg-transparent"
          autoComplete="off"
        />
        
        <div className="flex items-center flex-shrink-0 relative">
          <div className={`transition-all duration-200 flex items-center ${query ? 'opacity-100 scale-100 mr-2 w-auto' : 'opacity-0 scale-95 w-0 overflow-hidden'}`}>
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          </div>
          
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all transform active:scale-95 shadow-md hidden sm:block"
          >
            Search
          </button>
          {/* Mobile search icon only */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-xl font-bold transition-all transform active:scale-95 shadow-md sm:hidden"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* Dropdown menu */}
      {isOpen && query.trim() !== '' && (
        <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 flex flex-col max-h-[60vh] z-50">
          <div className="p-2 overflow-y-auto">
            {debouncedQuery.trim() !== '' && results.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground">
                <Search className="mx-auto mb-4 opacity-20" size={48} />
                <p className="text-xl font-semibold text-foreground mb-1">No products found</p>
                <p className="text-sm">Try checking for typos or searching by CAS number.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={product.vendor_url || '#'}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group/item"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-14 h-14 bg-background border border-border rounded-xl flex items-center justify-center text-muted-foreground flex-shrink-0 overflow-hidden shadow-sm">
                        {product.thumbnail_url ? (
                          <img src={product.thumbnail_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-base font-bold bg-gradient-to-br from-primary/10 to-primary/5 text-primary w-full h-full flex items-center justify-center uppercase">
                            {product.name.substring(0, 2)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="font-semibold text-base text-foreground truncate group-hover/item:text-primary transition-colors">
                          {highlightMatch(product.name, debouncedQuery)}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1 truncate">
                          {product.cas_number && (
                            <span className="bg-background px-2 py-0.5 rounded-md border border-border text-xs font-medium flex-shrink-0">
                              CAS: {highlightMatch(product.cas_number, debouncedQuery)}
                            </span>
                          )}
                          <span className="truncate">
                            {highlightMatch(product.brand || product.description, debouncedQuery)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 group-hover/item:scale-105 transition-transform origin-right">
                        <div className="font-bold text-foreground text-lg">
                          {(product.currency === 'USD' ? '$' : product.currency === 'INR' ? '₹' : '')}
                          {product.price.toLocaleString()}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          per {product.unit}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            
            {results.length > 0 && (
              <div className="p-2 mt-2 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => {
                    const form = document.querySelector('form[action="/results"]') as HTMLFormElement;
                    if(form) form.submit();
                  }}
                  className="w-full py-3 text-center text-sm font-bold text-primary hover:bg-primary/10 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={16} />
                  View all results for &quot;{debouncedQuery}&quot;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
