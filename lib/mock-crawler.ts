import { Product } from './types';

export interface CrawlStep {
  message: string;
  status: 'pending' | 'success' | 'error';
  timestamp: number;
}

export const simulateCrawl = async (url: string): Promise<Product> => {
  // Simulate minimal network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  const urlLower = url.toLowerCase();
  
  // Realistic mock data based on domain
  if (urlLower.includes('srlchem.com')) {
    return {
      id: `crawl-${Date.now()}`,
      name: 'Hydrochloric Acid, 35-38% (AR)',
      brand: 'SRL (Sisco Research Laboratories)',
      cas_number: '7647-01-0',
      purity: '37%',
      price: 1250,
      currency: 'INR',
      unit: 'L',
      stock_status: 'in_stock',
      vendor_url: url,
      description: 'Analytical Reagent grade Hydrochloric Acid. Suitable for precise titration and synthesis.'
    };
  } else if (urlLower.includes('lobachemie.com')) {
    return {
      id: `crawl-${Date.now() + 1}`,
      name: 'Sulfuric Acid, 98% (AR)',
      brand: 'Loba Chemie',
      cas_number: '7664-93-9',
      purity: '98%',
      price: 980,
      currency: 'INR',
      unit: 'L',
      stock_status: 'in_stock',
      vendor_url: url,
      description: 'High purity Sulfuric Acid for industrial and laboratory applications.'
    };
  } else if (urlLower.includes('tcichemicals.com')) {
    return {
      id: `crawl-${Date.now() + 2}`,
      name: 'N,N-Dimethylformamide (DMF)',
      brand: 'TCI Chemicals India',
      cas_number: '68-12-2',
      purity: '99.5% (GC)',
      price: 3400,
      currency: 'INR',
      unit: 'L',
      stock_status: 'in_stock',
      vendor_url: url,
      description: 'TCI Quality DMF, ideal for peptide synthesis and as a versatile solvent.'
    };
  } else {
    // Generic fallback for any other organic website
    const domain = new URL(url).hostname.replace('www.', '').split('.')[0];
    const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    
    return {
      id: `crawl-${Date.now() + 3}`,
      name: 'Organic Research Compound',
      brand: capitalizedDomain,
      cas_number: 'N/A',
      purity: '99%+',
      price: 5000,
      currency: 'INR',
      unit: 'kg',
      stock_status: 'in_stock',
      vendor_url: url,
      description: `Extracted data from ${url}. High-grade organic compound for experimental use.`
    };
  }
};
