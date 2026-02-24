'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'chuzitos-cart';
const TOAST_DURATION_MS = 2500;

export type CartAddon = { id: string; name: string; price: number; quantity: number };

export type CartItem = {
  id: string;
  title: string;
  price: number;
  img: string;
  quantity: number;
  category?: string;
  addOns?: CartAddon[];
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setAddOnQuantity: (itemId: string, addon: Omit<CartAddon, 'quantity'>, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : [];
    return items.map((item: CartItem) => ({
      ...item,
      addOns: (item.addOns ?? []).map((a: CartAddon & { quantity?: number }) => ({
        id: a.id,
        name: a.name,
        price: a.price,
        quantity: typeof a.quantity === 'number' && a.quantity >= 1 ? a.quantity : 1,
      })),
    }));
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(items);
  }, [items, hydrated]);

  useEffect(() => {
    if (!toast) return;
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, TOAST_DURATION_MS);
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [toast]);

  const addItem = useCallback(
    (input: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      const quantity = input.quantity ?? 1;
      setItems((prev) => {
        const existing = prev.find((i) => i.id === input.id);
        if (existing) {
          return prev.map((i) =>
            i.id === input.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { ...input, quantity }];
      });
      setToast('¡Añadido al carrito!');
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const setAddOnQuantity = useCallback(
    (itemId: string, addon: Omit<CartAddon, 'quantity'>, quantity: number) => {
      setItems((prev) =>
        prev.map((i) => {
          if (i.id !== itemId) return i;
          const current = i.addOns ?? [];
          if (quantity <= 0) {
            return { ...i, addOns: current.filter((a) => a.id !== addon.id) };
          }
          const existing = current.find((a) => a.id === addon.id);
          const addOns = existing
            ? current.map((a) => (a.id === addon.id ? { ...a, quantity } : a))
            : [...current, { ...addon, quantity }];
          return { ...i, addOns };
        })
      );
    },
    []
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, addItem, removeItem, updateQuantity, setAddOnQuantity }),
    [items, addItem, removeItem, updateQuantity, setAddOnQuantity]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div
          className="cart-toast"
          role="status"
          aria-live="polite"
        >
          <i className="far fa-check-circle" aria-hidden />
          <span>{toast}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
