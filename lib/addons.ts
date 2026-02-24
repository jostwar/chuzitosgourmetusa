/**
 * Ingredientes adicionales por categoría (sin imagen).
 * Solo se muestran en el carrito para Salchipapas y Chuzo Desgranado.
 */

export type AddonOption = {
  id: string;
  name: string;
  price: number;
};

export const ADDONS_SALCHIPAPAS: AddonOption[] = [
  { id: 'sal-gratinado', name: 'Gratinado / Gratin', price: 3.15 },
  { id: 'sal-grille', name: 'Grille / Grille', price: 2.09 },
  { id: 'sal-corn', name: 'Corn / Maíz', price: 4.19 },
  { id: 'sal-bacon', name: 'Bacon / Tocineta', price: 2.09 },
  { id: 'sal-cheese', name: 'Cheese / Queso', price: 1.05 },
  { id: 'sal-chongo', name: 'Chongo', price: 1.05 },
];

export const ADDONS_CHUZO_DESGRANADO: AddonOption[] = [
  { id: 'chuzo-papas', name: 'Papas Francesas', price: 4.19 },
  { id: 'chuzo-maiz', name: 'Maíz', price: 4.19 },
  { id: 'chuzo-gratinado', name: 'Gratinado', price: 3.15 },
  { id: 'chuzo-grille', name: 'Grille', price: 2.09 },
  { id: 'chuzo-tocineta', name: 'Tocineta', price: 2.09 },
];

export const CATEGORY_SALCHIPAPAS = 'SALCHIPAPAS';
export const CATEGORY_CHUZO_DESGRANADO = 'CHUZO DESGRANADO';

export function getAddonsForCategory(category: string | undefined): AddonOption[] {
  if (category === CATEGORY_SALCHIPAPAS) return ADDONS_SALCHIPAPAS;
  if (category === CATEGORY_CHUZO_DESGRANADO) return ADDONS_CHUZO_DESGRANADO;
  return [];
}

export function getAddonsLabel(category: string | undefined): string {
  if (category === CATEGORY_SALCHIPAPAS) return 'Ingredientes adicionales solo Salchipapas';
  if (category === CATEGORY_CHUZO_DESGRANADO) return 'Ingredientes adicionales solo Chuzo Desgranado';
  return 'Ingredientes adicionales';
}
