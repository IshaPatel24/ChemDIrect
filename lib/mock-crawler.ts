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
  
  // Honey specific mock data
  if (urlLower.includes('dabur') && urlLower.includes('honey')) {
    return {
      id: `crawl-${Date.now()}-dabur`,
      name: 'Dabur 100% Pure Honey',
      brand: 'Dabur',
      cas_number: 'N/A',
      purity: '100% Pure',
      price: 395,
      currency: 'INR',
      unit: 'kg',
      stock_status: 'in_stock',
      vendor_url: url,
      description: 'Dabur Honey is 100% pure and natural, sourced from the finest apiaries.'
    };
  } else if (urlLower.includes('patanjali') && urlLower.includes('honey')) {
    return {
      id: `crawl-${Date.now()}-patanjali`,
      name: 'Patanjali Pure Natural Honey',
      brand: 'Patanjali',
      cas_number: 'N/A',
      purity: 'Pure Natural',
      price: 350,
      currency: 'INR',
      unit: 'kg',
      stock_status: 'in_stock',
      vendor_url: url,
      description: 'Patanjali Honey acts as a mild laxative, natural sweetener, and health tonic.'
    };
  } else if (urlLower.includes('organicindia') && urlLower.includes('honey')) {
     return {
      id: `crawl-${Date.now()}-organic`,
      name: 'Organic India Multi Floral Honey',
      brand: 'Organic India',
      cas_number: 'N/A',
      purity: 'Certified Organic',
      price: 525,
      currency: 'INR',
      unit: 'kg',
      stock_status: 'in_stock',
      vendor_url: url,
      description: 'Sustainably harvested from wild forests, certified organic, pure and unpasteurized.'
    };
  } else if (urlLower.includes('zandu') && urlLower.includes('honey')) {
     return {
      id: `crawl-${Date.now()}-zandu`,
      name: 'Zandu Pure Honey',
      brand: 'Zandu',
      cas_number: 'N/A',
      purity: 'Pure',
      price: 380,
      currency: 'INR',
      unit: 'kg',
      stock_status: 'in_stock',
      vendor_url: url,
      description: 'Zandu Pure Honey, with no added sugar. Goodness of Ayurveda.'
    };
  } else if (urlLower.includes('honey')) {
    // Generic honey fallback
    let domain = 'Unknown';
    try {
      domain = new URL(url).hostname.replace('www.', '').split('.')[0];
    } catch (e) {
      domain = 'OrganicBrand';
    }
    const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    
    return {
      id: `crawl-${Date.now()}-generic-honey`,
      name: 'Raw Natural Honey',
      brand: capitalizedDomain,
      cas_number: 'N/A',
      purity: 'Raw & Natural',
      price: 450,
      currency: 'INR',
      unit: 'kg',
      stock_status: 'in_stock',
      vendor_url: url,
      description: `Premium Raw Honey sourced from ${capitalizedDomain}. Unfiltered and straight from the hive.`
    };
  } else if (urlLower.includes('soap') || urlLower.includes('body-wash')) {
    // Soap specific mock data
    if (urlLower.includes('himalaya')) {
      return {
        id: `crawl-${Date.now()}-himalaya-soap`,
        name: 'Himalaya Herbals Neem & Turmeric Soap',
        brand: 'Himalaya Wellness',
        cas_number: 'N/A',
        purity: 'Ayurvedic',
        price: 45,
        currency: 'INR',
        unit: 'piece',
        stock_status: 'in_stock',
        vendor_url: url,
        description: 'Blends together all the goodness of naturally derived ingredients to keep your skin protected.'
      };
    } else if (urlLower.includes('patanjali')) {
      return {
        id: `crawl-${Date.now()}-patanjali-soap`,
        name: 'Patanjali Haldi Chandan Body Cleanser',
        brand: 'Patanjali',
        cas_number: 'N/A',
        purity: 'Ayurvedic',
        price: 40,
        currency: 'INR',
        unit: 'piece',
        stock_status: 'in_stock',
        vendor_url: url,
        description: 'Patanjali haldi chandan body cleanser is a natural Ayurvedic formulation for body cleansing.'
      };
    }

    let domain = 'Unknown';
    try {
      domain = new URL(url).hostname.replace('www.', '').split('.')[0];
    } catch (e) {
      domain = 'OrganicBrand';
    }
    const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    
    return {
      id: `crawl-${Date.now()}-generic-soap`,
      name: 'Organic Body Soap',
      brand: capitalizedDomain,
      cas_number: 'N/A',
      purity: 'Natural',
      price: 99,
      currency: 'INR',
      unit: 'piece',
      stock_status: 'in_stock',
      vendor_url: url,
      description: `Premium Organic Soap from ${capitalizedDomain}. Gentle and nourishing for the skin.`
    };
  }
  
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
    let domain = 'Unknown';
    let path = '';
    try {
      const parsedUrl = new URL(url);
      domain = parsedUrl.hostname.replace('www.', '').split('.')[0];
      path = parsedUrl.pathname;
    } catch (e) {
      domain = 'Supplier';
    }
    const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    
    let productName = 'Organic Research Compound';
    if (path && path !== '/') {
      const lastSegment = path.split('/').filter(Boolean).pop() || '';
      if (lastSegment) {
        productName = lastSegment.replace(/[-_]/g, ' ')
          .split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }
    
    return {
      id: `crawl-${Date.now() + 3}`,
      name: productName,
      brand: capitalizedDomain,
      cas_number: 'N/A',
      purity: '99%+',
      price: 5000,
      currency: 'INR',
      unit: 'kg',
      stock_status: 'in_stock',
      vendor_url: url,
      description: `Extracted data from ${url}. High-grade generic product for your comparison.`
    };
  }
};
