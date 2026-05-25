import { basePath } from './site';

export type Category =
  | 'Luxury'
  | 'Waist Beads'
  | 'Necklaces'
  | 'Bracelets'
  | 'Anklets'
  | 'Earrings';

export interface Product {
  id: string;
  num: string;            // e.g. "#151", "#N1"
  name: string;
  category: Category;
  price: number;          // Naira, whole numbers
  image: string | null;   // filename or null → shows placeholder card
  needsSize: boolean;
  sizePlaceholder: string;
}

export const CUSTOM_NAME_PRICE = 500;

// ─── LUXURY COLLECTION ────────────────────────────────────────────────────────
const luxury: Product[] = [
  {
    id: 'luxury-152',
    num: '#152',
    name: 'Crystal Gold Waist Beads',
    category: 'Luxury',
    price: 4500,
    image: 'waist-beads-crystal-gold-flatlay.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  },
  {
    id: 'luxury-10',
    num: '#10',
    name: 'Luxury Bracelet',
    category: 'Luxury',
    price: 12000,
    image: 'bracelet-lava-black-stack.jpeg',
    needsSize: true,
    sizePlaceholder: 'e.g. 7 inches',
  },
  {
    id: 'luxury-11',
    num: '#11',
    name: 'Protection Bracelet',
    category: 'Luxury',
    price: 15000,
    image: null,
    needsSize: true,
    sizePlaceholder: 'e.g. 7 inches',
  },
];

// ─── WAIST BEADS ──────────────────────────────────────────────────────────────
// #151 = special price, #152 is in Luxury, #153–#160 have photos, #161–200 no photo yet
const waistBeads: Product[] = [
  { id: 'wb-151', num: '#151', name: 'Waist Bead', category: 'Waist Beads', price: 3000, image: 'waist-beads-pink-luxury.png',        needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-153', num: '#153', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-glow-queen.jpeg',        needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-154', num: '#154', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-crystal-delicate.jpeg',  needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-155', num: '#155', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-black-gold.jpeg',        needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-156', num: '#156', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-pink-flowers.jpeg',      needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-157', num: '#157', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-yellow-green.jpeg',      needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-158', num: '#158', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-blue-hearts.jpeg',       needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-159', num: '#159', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-multicolor.jpeg',        needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  { id: 'wb-160', num: '#160', name: 'Waist Bead', category: 'Waist Beads', price: 2500, image: 'waist-beads-pink-yellow-gift.jpeg',  needsSize: true, sizePlaceholder: 'e.g. 32 inches' },
  // #161–#200 — photos coming soon
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `wb-${161 + i}`,
    num: `#${161 + i}`,
    name: 'Waist Bead',
    category: 'Waist Beads' as const,
    price: 2500,
    image: null,
    needsSize: true,
    sizePlaceholder: 'e.g. 32 inches',
  })),
];

// ─── NECKLACES ────────────────────────────────────────────────────────────────
const necklaces: Product[] = [
  { id: 'nk-1', num: '#N1', name: 'Classic Pearl Necklace',        category: 'Necklaces', price: 5000, image: 'necklace-pearl-classic.jpeg',         needsSize: false, sizePlaceholder: '' },
  { id: 'nk-2', num: '#N2', name: 'Classic Pearl Necklace II',     category: 'Necklaces', price: 5000, image: 'necklace-pearl-classic-2.jpeg',        needsSize: false, sizePlaceholder: '' },
  { id: 'nk-3', num: '#N3', name: 'Crystal Clear Heart Necklace',  category: 'Necklaces', price: 3500, image: 'necklace-crystal-clear-heart.jpeg',    needsSize: false, sizePlaceholder: '' },
  { id: 'nk-4', num: '#N4', name: 'Purple Smiley Rose Necklace',   category: 'Necklaces', price: 3500, image: 'necklace-purple-smiley-rose.jpeg',     needsSize: false, sizePlaceholder: '' },
  { id: 'nk-5', num: '#N5', name: 'Lava Stone Necklace',           category: 'Necklaces', price: 4500, image: 'necklace-lava-stone-bust.jpeg',        needsSize: false, sizePlaceholder: '' },
];

// ─── BRACELETS ────────────────────────────────────────────────────────────────
// #10 and #11 are in Luxury. #2–#4 have photos. #5–#9 and #12–#23 no photo yet.
const bracelets: Product[] = [
  { id: 'br-2', num: '#2', name: 'Bracelet', category: 'Bracelets', price: 1500, image: 'bracelet-pearl-silver-flatlay.jpeg', needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  { id: 'br-3', num: '#3', name: 'Bracelet', category: 'Bracelets', price: 1500, image: 'bracelet-lava-black-stack-2.jpeg',   needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  { id: 'br-4', num: '#4', name: 'Bracelet', category: 'Bracelets', price: 1500, image: null,                                 needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  { id: 'br-5', num: '#5', name: 'Bracelet', category: 'Bracelets', price: 1500, image: null,                                 needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  { id: 'br-6', num: '#6', name: 'Bracelet', category: 'Bracelets', price: 1500, image: null,                                 needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  { id: 'br-7', num: '#7', name: 'Bracelet', category: 'Bracelets', price: 1500, image: null,                                 needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  { id: 'br-8', num: '#8', name: 'Bracelet', category: 'Bracelets', price: 1500, image: null,                                 needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  { id: 'br-9', num: '#9', name: 'Bracelet', category: 'Bracelets', price: 1500, image: null,                                 needsSize: true, sizePlaceholder: 'e.g. 7 inches' },
  // #12–#23 (skip #10 and #11 — they're in Luxury)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `br-${12 + i}`,
    num: `#${12 + i}`,
    name: 'Bracelet',
    category: 'Bracelets' as const,
    price: 1500,
    image: null,
    needsSize: true,
    sizePlaceholder: 'e.g. 7 inches',
  })),
];

// ─── ANKLETS ─────────────────────────────────────────────────────────────────
const anklets: Product[] = [
  { id: 'ak-1', num: '#A1', name: 'Black Crystal Sparkle Anklet', category: 'Anklets', price: 2500, image: 'anklet-black-crystal-sparkle.jpeg', needsSize: true, sizePlaceholder: 'e.g. 9 inches' },
  { id: 'ak-2', num: '#A2', name: 'Red & Gold Crystal Anklet',    category: 'Anklets', price: 2500, image: 'anklet-red-gold-crystal.jpeg',       needsSize: true, sizePlaceholder: 'e.g. 9 inches' },
];

// ─── EARRINGS ────────────────────────────────────────────────────────────────
const earrings: Product[] = [
  { id: 'er-1', num: '#E1', name: 'Butterfly Pearl Earrings', category: 'Earrings', price: 2000, image: 'earrings-butterfly-pearl-card.jpeg', needsSize: false, sizePlaceholder: '' },
];

// ─── FULL CATALOG ─────────────────────────────────────────────────────────────
export const products: Product[] = [
  ...luxury,
  ...waistBeads,
  ...necklaces,
  ...bracelets,
  ...anklets,
  ...earrings,
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  'Luxury',
  'Waist Beads',
  'Necklaces',
  'Bracelets',
  'Anklets',
  'Earrings',
];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function imgSrc(filename: string): string {
  return `${basePath}/images/${filename}`;
}

export function formatPrice(n: number): string {
  return `₦${n.toLocaleString('en-NG')}`;
}
