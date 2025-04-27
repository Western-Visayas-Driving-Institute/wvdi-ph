import React from 'react';

/**
 * Seo component for injecting SEO meta tags, Open Graph, Twitter cards, canonical URL, and Organisation JSON-LD.
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} image - Absolute URL to preview image
 * @param {string} locale - Language locale (default: 'en')
 */
export default function Seo({
  title = 'Western Visayas Driving Institute',
  description = 'Get professional driving training from LTO-accredited instructors on Negros Island. WVDI is your trusted partner for driving education.',
  image = 'https://wvdi-ph.com/assets/wvdi-logo.jpg',
  locale = 'en',
}) {
  const canonical = 'https://wvdi-ph.com/';
  const orgJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Western Visayas Driving Institute',
    url: canonical,
    logo: image,
    sameAs: [
      'https://www.facebook.com/wvdiphilippines/'
    ]
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Western Visayas Driving Institute" />
      <meta property="og:locale" content={locale} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@wvdiphilippines" />
      {/* Organisation JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJSONLD) }} />
    </>
  );
}
