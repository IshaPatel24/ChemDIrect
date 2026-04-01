"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { filterTransactionalResults, cn } from '@/lib/utils';
import { Search, FlaskConical, ShoppingCart, ArrowRightLeft, Filter, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/data';

function ResultsContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
    
    const [selectedPurities, setSelectedPurities] = useState<string[]>([]);
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

    const results = React.useMemo(() => {
        return filterTransactionalResults(MOCK_PRODUCTS).filter(p => {
            const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
                                 (!!p.cas_number && p.cas_number.toLowerCase().includes(query.toLowerCase()));
            const matchesPurity = selectedPurities.length === 0 || (!!p.purity && selectedPurities.includes(p.purity));
            const matchesVendor = selectedVendors.length === 0 || (!!p.brand && selectedVendors.includes(p.brand));
            return matchesQuery && matchesPurity && matchesVendor;
        });
    }, [query, selectedPurities, selectedVendors]);

    const availablePurities = React.useMemo(() => {
        const purities = new Set(MOCK_PRODUCTS.map(p => p.purity).filter(Boolean) as string[]);
        return Array.from(purities).sort();
    }, []);

    const availableVendors = React.useMemo(() => {
        const vendors = new Set(MOCK_PRODUCTS.map(p => p.brand).filter(Boolean) as string[]);
        return Array.from(vendors).sort();
    }, []);

    const togglePurity = (purity: string) => {
        setSelectedPurities(prev => prev.includes(purity) ? prev.filter(p => p !== purity) : [...prev, purity]);
    };

    const toggleVendor = (vendor: string) => {
        setSelectedVendors(prev => prev.includes(vendor) ? prev.filter(v => v !== vendor) : [...prev, vendor]);
    };

    const toggleComparison = (id: string) => {
        setSelectedForComparison(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20">
            {/* Search Header */}
            <header className="bg-card border-b border-border sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <FlaskConical size={18} />
                        </div>
                    </Link>

                    <div className="flex-1 max-w-2xl relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            defaultValue={query}
                            className="w-full pl-10 pr-4 py-2 bg-background border border-border focus:ring-2 focus:ring-primary/50 rounded-xl transition-all outline-none text-sm text-foreground"
                            placeholder="Search clinical products..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {selectedForComparison.length > 0 && (
                            <Link
                                href={`/compare?ids=${selectedForComparison.join(',')}`}
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm"
                            >
                                Compare ({selectedForComparison.length})
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
                {/* Sidebar Filters */}
                <aside className="hidden lg:block w-64 shrink-0 space-y-8">
                    <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Filter size={14} /> Filter Results
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Purity Grade</label>
                                <div className="space-y-1">
                                    {availablePurities.map(grade => (
                                        <label key={grade} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-border text-primary focus:ring-primary/50" 
                                                checked={selectedPurities.includes(grade)}
                                                onChange={() => togglePurity(grade)}
                                            />
                                            {grade}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2 pt-4 border-t border-border">
                                <label className="text-sm font-semibold text-foreground">Manufacturer</label>
                                <div className="space-y-1">
                                    {availableVendors.map(v => (
                                        <label key={v} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-border text-primary focus:ring-primary/50" 
                                                checked={selectedVendors.includes(v)}
                                                onChange={() => toggleVendor(v)}
                                            />
                                            {v}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Results List */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-foreground font-semibold">
                            Showing {results.length} verifed results for <span className="text-primary">&quot;{query}&quot;</span>
                        </h1>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <CheckCircle2 size={14} className="text-primary" /> Strict clinical criteria applied
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {results.length > 0 ? (
                            results.map(product => (
                                <div key={product.id} className="bg-card p-5 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-md group flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-32 h-32 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                                        <FlaskConical size={40} className="text-primary/40 group-hover:text-primary transition-colors" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.brand}</span>
                                                    <span className="text-xs font-medium text-muted-foreground bg-primary/5 px-2 py-0.5 rounded-full">CAS: {product.cas_number || 'N/A'}</span>
                                                </div>
                                                <h2 className="text-xl font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h2>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-2xl font-black text-foreground">{product.currency} {product.price.toFixed(2)}</div>
                                                <div className="text-xs text-muted-foreground font-medium">per {product.unit}</div>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <a
                                                href={product.vendor_url}
                                                target="_blank"
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
                                            >
                                                <ShoppingCart size={16} /> Procure Now
                                            </a>
                                            <button
                                                onClick={() => toggleComparison(product.id)}
                                                className={cn(
                                                    "px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all border",
                                                    selectedForComparison.includes(product.id)
                                                        ? "bg-primary/10 border-primary/20 text-primary"
                                                        : "bg-transparent border-border text-foreground hover:bg-primary/5"
                                                )}
                                            >
                                                <ArrowRightLeft size={16} />
                                                {selectedForComparison.includes(product.id) ? "Selected" : "Compare"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
                                <FlaskConical size={48} className="mx-auto text-primary/30 mb-4" />
                                <h3 className="text-lg font-bold text-foreground">No verifiable compounds found</h3>
                                <p className="text-muted-foreground mt-2">Try adjusting your search parameters to find clinical grade chemicals.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary font-medium tracking-wide">Synthesizing Database...</div>}>
            <ResultsContent />
        </React.Suspense>
    );
}
