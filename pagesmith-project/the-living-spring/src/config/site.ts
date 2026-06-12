export const SITE = {
  name: 'The Living Spring',
  title: 'The Living Spring -- A Field Guide to Fullness',
  description: 'You were made to be full. Trace any real delight far enough upstream and you reach the same source.',
  lang: 'en',
  url:
    (typeof process !== 'undefined' && process.env.SITE_URL) ||
    'https://example.com',
  twitterHandle: '@example',
  socials: {
    twitter: 'https://twitter.com/example',
    instagram: 'https://instagram.com/example',
    linkedin: 'https://www.linkedin.com/company/example',
    dribbble: 'https://dribbble.com/example',
  },
} as const;

export type SiteConfig = typeof SITE;
