/**
 * Schema.org JSON-LD helpers for structured data.
 * Improves SEO and AI citation by providing machine-readable content.
 */

interface FAQItem {
  question: string
  answer: string
}

interface ProductOffer {
  name: string
  price: number
  priceCurrency: string
  description: string
}

interface ArticleData {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}

export function useSchemaOrg() {
  /**
   * Generate Organization schema for site-wide identity.
   */
  function getOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Helvetra',
      'url': 'https://helvetra.ch',
      'logo': 'https://helvetra.ch/logo.svg',
      'description': 'Swiss translation app with privacy-first approach',
      'foundingDate': '2024',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'CH',
      },
      'sameAs': [
        'https://x.com/helvetra',
        'https://instagram.com/helvetra.ch',
      ],
    }
  }

  /**
   * Generate WebSite schema for search features.
   */
  function getWebSiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Helvetra',
      'url': 'https://helvetra.ch',
      'description': 'The very Swiss translation app',
      'inLanguage': ['en', 'de', 'fr', 'it'],
    }
  }

  /**
   * Generate FAQ schema from question/answer pairs.
   */
  function getFAQSchema(items: FAQItem[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': items.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer,
        },
      })),
    }
  }

  /**
   * Generate Product schema for pricing tiers.
   */
  function getProductSchema(offers: ProductOffer[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Helvetra',
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'Web',
      'description': 'Swiss translation app for German, Swiss German, French, Italian, Romansh, and English',
      'offers': offers.map(offer => ({
        '@type': 'Offer',
        'name': offer.name,
        'price': offer.price,
        'priceCurrency': offer.priceCurrency,
        'description': offer.description,
      })),
    }
  }

  /**
   * Generate Article schema for comparison and blog pages.
   */
  function getArticleSchema(data: ArticleData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': data.headline,
      'description': data.description,
      'datePublished': data.datePublished,
      'dateModified': data.dateModified || data.datePublished,
      'author': {
        '@type': 'Organization',
        'name': data.author || 'Helvetra',
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Helvetra',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://helvetra.ch/logo.svg',
        },
      },
      'image': data.image || 'https://helvetra.ch/og-image.png',
    }
  }

  /**
   * Add JSON-LD script to page head.
   */
  function useJsonLd(schema: object | object[]) {
    const schemas = Array.isArray(schema) ? schema : [schema]

    useHead({
      script: schemas.map(s => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(s),
      })),
    })
  }

  return {
    getOrganizationSchema,
    getWebSiteSchema,
    getFAQSchema,
    getProductSchema,
    getArticleSchema,
    useJsonLd,
  }
}
