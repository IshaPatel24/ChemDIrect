"use client";

import React from 'react';
import { Product } from '@/lib/types';
import { getPricePerBaseUnit } from '@/lib/utils';
import { ExternalLink, Check, X } from 'lucide-react';

interface ComparisonTableProps {
    products: Product[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground bg-primary/5 rounded-xl border border-dashed border-border">
                No products selected for comparison.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-primary/5 border-bottom border-border">
                        <th className="p-4 font-semibold text-muted-foreground w-48">Feature</th>
                        {products.map((product) => (
                            <th key={product.id} className="p-4 font-semibold text-foreground min-w-[200px]">
                                <div className="flex flex-col gap-2">
                                    <span className="text-primary text-sm font-bold uppercase tracking-wider">{product.brand}</span>
                                    <span className="text-lg leading-tight">{product.name}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-primary/5">CAS Number</td>
                        {products.map((product) => (
                            <td key={product.id} className="p-4 text-foreground">{product.cas_number || 'N/A'}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-primary/5">Purity</td>
                        {products.map((product) => (
                            <td key={product.id} className="p-4">
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                                    {product.purity || 'N/A'}
                                </span>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-primary/5">Price</td>
                        {products.map((product) => (
                            <td key={product.id} className="p-4 font-bold text-foreground text-lg">
                                {product.currency === 'INR' ? '₹' : product.currency + ' '}{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / {product.unit}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-primary/5">Unit Price (Norm.)</td>
                        {products.map((product) => (
                            <td key={product.id} className="p-4 text-muted-foreground italic">
                                {product.currency === 'INR' ? '₹' : product.currency + ' '}{getPricePerBaseUnit(product).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} / unit
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="p-4 font-medium text-muted-foreground bg-primary/5">Availability</td>
                        {products.map((product) => (
                            <td key={product.id} className="p-4">
                                {product.stock_status === 'in_stock' ? (
                                    <div className="flex items-center gap-1 text-primary">
                                        <Check size={16} /> <span>In Stock</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-destructive">
                                        <X size={16} /> <span>Out of Stock</span>
                                    </div>
                                )}
                            </td>
                        ))}
                    </tr>
                    <tr className="bg-primary/5">
                        <td className="p-4 font-medium text-muted-foreground">Action</td>
                        {products.map((product) => (
                            <td key={product.id} className="p-4">
                                <a
                                    href={product.vendor_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium text-sm shadow-sm"
                                >
                                    Add to Protocol <ExternalLink size={14} />
                                </a>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
