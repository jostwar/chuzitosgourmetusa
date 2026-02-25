import { Barlow_Condensed, Hanken_Grotesk } from 'next/font/google';

// Heading font (display: optional = menos bloqueo, mejor LCP / "Font display" en PageSpeed)
export const barlowCondensed = Barlow_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--heading-font',
  display: 'optional',
});

// Body font
export const hankenGrotesk = Hanken_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--body-font',
  display: 'optional',
});
