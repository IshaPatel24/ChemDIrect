import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, Unit } from "./types";

/**
 * Merges class names with tailwind-merge and clsx
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Filters search results to keep only transactional/product pages.
 * In a real-world scenario, this would check meta tags or specific selectors,
 * but for this mock-up, we'll simulate it by checking description keywords.
 */
export function filterTransactionalResults(products: Product[]): Product[] {
    const transactionalKeywords = ['add to cart', 'buy', 'stock', 'price', 'order'];
    return products.filter(product => {
        const content = `${product.name} ${product.description}`.toLowerCase();
        return transactionalKeywords.some(keyword => content.includes(keyword)) || !!product.price;
    });
}

/**
 * Normalizes units to a base value for comparison.
 * Mass -> grams (g)
 * Volume -> milliliters (ml)
 */
export function normalizeUnits(value: number, unit: Unit): { value: number; baseUnit: 'g' | 'ml' } {
    switch (unit) {
        case 'kg':
            return { value: value * 1000, baseUnit: 'g' };
        case 'mg':
            return { value: value / 1000, baseUnit: 'g' };
        case 'g':
            return { value, baseUnit: 'g' };
        case 'L':
            return { value: value * 1000, baseUnit: 'ml' };
        case 'ml':
            return { value, baseUnit: 'ml' };
        default:
            return { value, baseUnit: 'g' };
    }
}

/**
 * Calculates price per base unit for comparison
 */
export function getPricePerBaseUnit(product: Product): number {
    const normalized = normalizeUnits(1, product.unit); // Assume quantity is 1 for now or parse from name
    return product.price / normalized.value;
}
