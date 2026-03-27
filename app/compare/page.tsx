"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ComparisonTable } from '@/components/ComparisonTable';
import { FlaskConical, ArrowLeft, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/data';

function CompareContent() {
    const searchParams = useSearchParams();
    const ids = React.useMemo(() => searchParams.get('ids')?.split(',') || [], [searchParams]);

    const products = React.useMemo(() => {
        return MOCK_PRODUCTS.filter(p => ids.includes(p.id));
    }, [ids]);

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20">
            <header className="bg-card border-b border-border sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/results" className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-muted-foreground">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <FlaskConical size={18} />
                            </div>
                            <h1 className="text-lg font-bold text-foreground">Clinical Comparison</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-primary/5 transition-colors">
                            <Share2 size={16} /> Share Specs
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                            <Download size={16} /> Export Dossier
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-foreground mb-2">Technical Specifications</h2>
                    <p className="text-muted-foreground font-medium">Comparing {products.length} selected verifiable compounds side-by-side.</p>
                </div>

                <ComparisonTable products={products} />

                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                        <h3 className="text-xl font-bold text-foreground mb-4">Laboratory Insights</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Price normalization indicates a <strong>significant variance</strong> in cost per basic unit across verified manufacturers for these selections.
                                </p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Always consider the <em>purity margins</em> and accompanying CAS certification when planning synthesis to avoid yield degradation.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-primary p-8 rounded-2xl text-primary-foreground shadow-lg flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-4">Request Enterprise Fulfillment</h3>
                        <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                            Procuring high-volume organic compounds? Contact our laboratory enterprise team for specialized purity protocols and priority logistics.
                        </p>
                        <button className="w-full py-3 bg-background text-primary rounded-xl font-bold hover:bg-background/90 transition-colors shadow-md">
                            Contact Account Executive
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary font-medium tracking-wide">Compiling Analysis...</div>}>
            <CompareContent />
        </Suspense>
    );
}
