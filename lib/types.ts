export type Unit = 'g' | 'kg' | 'mg' | 'ml' | 'L';

export interface Product {
    id: string;
    name: string;
    brand?: string;
    cas_number?: string;
    purity?: string;
    description?: string;
    price: number;
    currency: string;
    unit: Unit;
    stock_status: 'in_stock' | 'out_of_stock' | 'preorder';
    vendor_url: string;
    thumbnail_url?: string;
}

export interface SearchResult {
    products: Product[];
    total: number;
    query: string;
}

export interface ComparisonItem extends Product {
    normalized_price_per_unit: number; // For comparison logic
}
