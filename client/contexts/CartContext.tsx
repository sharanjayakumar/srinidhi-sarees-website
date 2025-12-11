import { createContext, useContext, useMemo, useState } from "react";
import { CartLine, CollectionItem } from "@shared/api";

interface CartCtx {
  items: CartLine[];
  add: (item: CollectionItem) => void;
  remove: (itemId: string) => void;
  clear: () => void;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);

  const add = (item: CollectionItem) => {
    setItems((prev) => {
      const found = prev.find((l) => l.itemId === item.id);
      if (found) return prev.map((l) => (l.itemId === item.id ? { ...l, qty: l.qty + 1 } : l));
      return [
        ...prev,
        { itemId: item.id, name: item.name, imageUrl: item.imageUrl, price: item.price, qty: 1 },
      ];
    });
  };

  const remove = (itemId: string) => setItems((prev) => prev.filter((l) => l.itemId !== itemId));
  const clear = () => setItems([]);
  const total = useMemo(
    () => items.reduce((sum, l) => sum + (l.price || 0) * l.qty, 0),
    [items],
  );

  const value = { items, add, remove, clear, total };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("CartProvider missing");
  return v;
}
