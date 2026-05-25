import { basePath } from './site';

export type Category = 'Waist Beads' | 'Necklaces' | 'Bracelets' | 'Anklets' | 'Earrings';

export interface Product {
  id: string;
  num: string;            // display number e.g. "#01"
  name: string;
  category: Category;
  price: number;          // in Naira, whole numbers
  image: string;          // filename only — use imgSrc() for full path
  needsSize: boolean;
  sizePlaceholder: string;
}

// ─── CUSTOM NAME ADD-ON ────────────────────────────────────────────────────────
export const CUSTOM_NAME_PRICE = 500;

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
// To add a new product:
//   1. Drop the image in public/images/
//   2. Add one entry below — it will appear in the shop and order modal automatically.
// To update a price: just change the number here.
// ──────────────────────────────────────────────────────────────────────────────
export const products: Product[] = [
  // ── WAIST BEADS ─────────────────────────────────────────────────────────────
  {
    id: 'waist-beads-pink-luxury',
    num: '#01',
    name: 'Pink Luxury Waist Beads',
    category: 'Waist Beads',
    price: 3500,
    image: 'waist-beads-pink-luxury.png',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-glow-queen',
    num: '#02',
    name: 'Glow Queen Waist Beads',
    category: 'Waist Beads',
    price: 3000,
    image: 'waist-beads-glow-queen.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-crystal-delicate',
    num: '#03',
    name: 'Crystal Delicate Waist Beads',
    category: 'Waist Beads',
    price: 2500,
    image: 'waist-beads-crystal-delicate.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-black-gold',
    num: '#04',
    name: 'Black & Gold Waist Beads',
    category: 'Waist Beads',
    price: 3500,
    image: 'waist-beads-black-gold.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-pink-flowers',
    num: '#05',
    name: 'Pink Flowers Waist Beads',
    category: 'Waist Beads',
    price: 2500,
    image: 'waist-beads-pink-flowers.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-yellow-green',
    num: '#06',
    name: 'Yellow-Green Waist Beads',
    category: 'Waist Beads',
    price: 2500,
    image: 'waist-beads-yellow-green.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-blue-hearts',
    num: '#07',
    name: 'Blue Hearts Waist Beads',
    category: 'Waist Beads',
    price: 2500,
    image: 'waist-beads-blue-hearts.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-multicolor',
    num: '#08',
    name: 'Multicolor Waist Beads',
    category: 'Waist Beads',
    price: 2500,
    image: 'waist-beads-multicolor.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-crystal-gold',
    num: '#09',
    name: 'Crystal & Gold Waist Beads',
    category: 'Waist Beads',
    price: 4000,
    image: 'waist-beads-crystal-gold-flatlay.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'waist-beads-pink-yellow-gift',
    num: '#10',
    name: 'Pink & Yellow Waist Beads',
    category: 'Waist Beads',
    price: 3000,
    image: 'waist-beads-pink-yellow-gift.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },

  // ── NECKLACES ────────────────────────────────────────────────────────────────
  {
    id: 'necklace-pearl-classic',
    num: '#11',
    name: 'Classic Pearl Necklace',
    category: 'Necklaces',
    price: 5000,
    image: 'necklace-pearl-classic.jpeg',
    needsSize: false,
    sizePlaceholder: '',
  },
  {
    id: 'necklace-pearl-classic-2',
    num: '#12',
    name: 'Classic Pearl Necklace II',
    category: 'Necklaces',
    price: 5000,
    image: 'necklace-pearl-classic-2.jpeg',
    needsSize: false,
    sizePlaceholder: '',
  },
  {
    id: 'necklace-crystal-clear-heart',
    num: '#13',
    name: 'Crystal Clear Heart Necklace',
    category: 'Necklaces',
    price: 3500,
    image: 'necklace-crystal-clear-heart.jpeg',
    needsSize: false,
    sizePlaceholder: '',
  },
  {
    id: 'necklace-purple-smiley-rose',
    num: '#14',
    name: 'Purple Smiley Rose Necklace',
    category: 'Necklaces',
    price: 3500,
    image: 'necklace-purple-smiley-rose.jpeg',
    needsSize: false,
    sizePlaceholder: '',
  },
  {
    id: 'necklace-lava-stone',
    num: '#15',
    name: 'Lava Stone Necklace',
    category: 'Necklaces',
    price: 4500,
    image: 'necklace-lava-stone-bust.jpeg',
    needsSize: false,
    sizePlaceholder: '',
  },

  // ── BRACELETS ────────────────────────────────────────────────────────────────
  {
    id: 'bracelet-pearl-silver',
    num: '#16',
    name: 'Pearl & Silver Bracelet Set',
    category: 'Bracelets',
    price: 4000,
    image: 'bracelet-pearl-silver-flatlay.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 7 inches',
  },
  {
    id: 'bracelet-lava-black-stack',
    num: '#17',
    name: 'Black Lava Bracelet Stack',
    category: 'Bracelets',
    price: 3500,
    image: 'bracelet-lava-black-stack.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 7 inches',
  },
  {
    id: 'bracelet-lava-black-stack-2',
    num: '#18',
    name: 'Black Lava Bracelet Stack II',
    category: 'Bracelets',
    price: 3500,
    image: 'bracelet-lava-black-stack-2.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 7 inches',
  },

  // ── ANKLETS ──────────────────────────────────────────────────────────────────
  {
    id: 'anklet-black-crystal',
    num: '#19',
    name: 'Black Crystal Sparkle Anklet',
    category: 'Anklets',
    price: 2500,
    image: 'anklet-black-crystal-sparkle.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 9 inches',
  },
  {
    id: 'anklet-red-gold-crystal',
    num: '#20',
    name: 'Red & Gold Crystal Anklet',
    category: 'Anklets',
    price: 2500,
    image: 'anklet-red-gold-crystal.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 9 inches',
  },

  // ── EARRINGS ─────────────────────────────────────────────────────────────────
  {
    id: 'earrings-butterfly-pearl',
    num: '#21',
    name: 'Butterfly Pearl Earrings',
    category: 'Earrings',
    price: 2000,
    image: 'earrings-butterfly-pearl-card.jpeg',
    needsSize: false,
    sizePlaceholder: '',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  'Waist Beads',
  'Necklaces',
  'Bracelets',
  'Anklets',
  'Earrings',
];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

/** Returns the full src path for use in <Image> and CSS */
export function imgSrc(filename: string): string {
  return `${basePath}/images/${filename}`;
}

export function formatPrice(n: number): string {
  return `₦${n.toLocaleString('en-NG')}`;
}
