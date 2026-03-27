import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Methanol, HPLC Grade',
        brand: 'Sigma-Aldrich',
        cas_number: '67-56-1',
        purity: '99.9%',
        price: 45.50,
        currency: 'USD',
        unit: 'L',
        stock_status: 'in_stock',
        vendor_url: 'https://example.com/buy/methanol-1',
        description: 'High-purity methanol for HPLC and spectrophotometry. Add to cart for fast shipping.'
    },
    {
        id: '2',
        name: 'Methanol, Reagent Grade',
        brand: 'Thermo Fisher',
        cas_number: '67-56-1',
        purity: '99.5%',
        price: 32.00,
        currency: 'USD',
        unit: 'L',
        stock_status: 'in_stock',
        vendor_url: 'https://example.com/buy/methanol-2',
        description: 'Analytical reagent grade methanol. Competitive price per unit.'
    },
    {
        id: '3',
        name: 'Synthesis of Methanol: A Review',
        brand: 'ScienceDirect',
        price: 0,
        currency: 'USD',
        unit: 'g',
        stock_status: 'out_of_stock',
        vendor_url: 'https://example.com/article/methanol',
        description: 'A comprehensive review of the synthesis of methanol from synthesis gas.'
    },
    {
        id: '4',
        name: 'Ethanol, Absolute, 200 Proof',
        brand: 'Alfa Aesar',
        cas_number: '64-17-5',
        purity: '99.5%+',
        price: 120.00,
        currency: 'USD',
        unit: 'L',
        stock_status: 'in_stock',
        vendor_url: 'https://example.com/buy/ethanol',
        description: 'Pure ethanol for scientific research. Order now.'
    }
];
