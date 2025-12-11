import { useEffect, useState } from "react";
import { CollectionsListResponse, CollectionItem } from "@shared/api";

export default function Collections() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/collections");
        const data = (await res.json()) as CollectionsListResponse;
        setItems(data.items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="container py-12 md:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Collections
      </h1>
      {loading ? (
        <p className="mt-6 text-foreground/70">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-foreground/70">No items yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <article key={c.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{c.name}</h3>
                {c.category && <p className="text-xs text-foreground/60">{c.category}</p>}
                {c.description && <p className="mt-2 text-sm text-foreground/70 line-clamp-3">{c.description}</p>}
                {typeof c.price === "number" && (
                  <p className="mt-3 font-medium">₹{c.price.toLocaleString()}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
