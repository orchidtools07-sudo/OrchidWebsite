import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  canonical,
  structuredData 
}) => {
  const location = useLocation();
  const baseUrl = 'https://www.oidpl.com';
  
  // Default SEO data
  const defaultSEO = {
    title: 'Orchid Infrastructure Developers - Premium Real Estate in Gurugram & Delhi NCR',
    description: 'Leading real estate developers in Gurugram and Delhi NCR. Premium residential & commercial projects, luxury hospitality ventures. 15+ years experience, 1000+ happy families.',
    keywords: 'real estate developers, Gurugram properties, Delhi NCR real estate, luxury residential projects, commercial properties, Orchid Infrastructure',
    ogImage: `${baseUrl}/images/og-image.jpg`
  };

  // Page-specific SEO configurations
  const pageSEO = {
    '/': {
      title: 'Orchid Infrastructure Developers - Premium Real Estate in Gurugram & Delhi NCR',
      description: 'Leading real estate developers in Gurugram and Delhi NCR. Premium residential & commercial projects, luxury hospitality ventures. 15+ years experience, 1000+ happy families.',
      keywords: 'real estate developers, Gurugram properties, Delhi NCR real estate, luxury residential projects, commercial properties, Orchid Infrastructure, premium apartments, real estate investment'
    },
    '/about': {
      title: 'About Orchid Infrastructure - 15+ Years of Excellence in Real Estate Development',
      description: 'Learn about Orchid Infrastructure Developers - 25+ years of excellence in real estate development. Premium residential & commercial projects in Gurugram and Delhi NCR.',
      keywords: 'about orchid infrastructure, real estate company history, Gurugram developers, Delhi NCR real estate company, premium property developers'
    },
    '/projects': {
      title: 'Premium Real Estate Projects by Orchid Infrastructure - Residential & Commercial',
      description: 'Explore premium residential and commercial real estate projects by Orchid Infrastructure in Gurugram and Delhi NCR. Luxury apartments, commercial spaces, and hospitality ventures.',
      keywords: 'orchid infrastructure projects, Gurugram residential projects, Delhi NCR commercial properties, luxury apartments, premium real estate projects'
    },
    '/contact': {
      title: 'Contact Orchid Infrastructure Developers - Get in Touch for Premium Properties',
      description: 'Contact Orchid Infrastructure Developers for premium real estate opportunities in Gurugram and Delhi NCR. Schedule consultation for residential and commercial projects.',
      keywords: 'contact orchid infrastructure, real estate consultation, Gurugram property inquiry, Delhi NCR real estate contact, premium property developers contact'
    },
    '/hospitality': {
      title: 'Luxury Hospitality Projects by Orchid Infrastructure - Premium Hotels & Resorts',
      description: 'Discover luxury hospitality projects by Orchid Infrastructure. Premium hotels, resorts, and hospitality ventures in prime locations across India.',
      keywords: 'orchid infrastructure hospitality, luxury hotels, premium resorts, hospitality projects, hotel development, luxury accommodation'
    },
    '/mission-vision': {
      title: 'Mission & Vision - Orchid Infrastructure Developers Commitment to Excellence',
      description: 'Learn about Orchid Infrastructure\'s mission and vision for transforming real estate development with innovation, quality, and customer satisfaction.',
      keywords: 'orchid infrastructure mission, real estate vision, company values, development philosophy, quality commitment'
    },
    '/certification': {
      title: 'Certifications & Awards - Orchid Infrastructure Quality Assurance',
      description: 'View certifications and awards received by Orchid Infrastructure Developers for excellence in real estate development and quality construction.',
      keywords: 'orchid infrastructure certifications, real estate awards, quality certifications, construction excellence, industry recognition'
    }
  };

  useEffect(() => {
    // Get current page SEO data
    const currentPageSEO = pageSEO[location.pathname] || defaultSEO;
    const finalTitle = title || currentPageSEO.title;
    const finalDescription = description || currentPageSEO.description;
    const finalKeywords = keywords || currentPageSEO.keywords;
    const finalCanonical = canonical || `${baseUrl}${location.pathname}`;
    const finalOgImage = ogImage || defaultSEO.ogImage;

    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update canonical link
    const updateCanonical = (href) => {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', href);
    };

    // Update meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('title', finalTitle);
    
    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:url', finalCanonical, true);
    updateMetaTag('og:image', finalOgImage, true);
    
    // Twitter tags
    updateMetaTag('twitter:title', finalTitle, true);
    updateMetaTag('twitter:description', finalDescription, true);
    updateMetaTag('twitter:image', finalOgImage, true);
    updateMetaTag('twitter:url', finalCanonical, true);

    // Update canonical URL
    updateCanonical(finalCanonical);

    // Add structured data if provided
    if (structuredData) {
      let script = document.querySelector('#structured-data-script');
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data-script';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

  }, [location.pathname, title, description, keywords, ogImage, canonical, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;
