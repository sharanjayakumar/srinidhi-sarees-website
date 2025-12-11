import { useEffect, useState } from "react";
import { CollectionItem, CollectionsListResponse, CollectionItemResponse } from "@shared/api";
import { Button } from "@/components/ui/button";
import { getToken, setToken, verifyToken, clearToken } from "@/lib/auth";

export default function AdminCollections() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", category: "", price: "", description: "", imageUrl: "", imageData: "" });
  const [submitting, setSubmitting] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/collections");
    const data = (await res.json()) as CollectionsListResponse;
    setItems(data.items);
    setLoading(false);
  };

  useEffect(() => {
    // Always require fresh login when page is opened
    clearToken();
    setAuthed(false);
    load();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { token?: string; error?: string };
      if (res.ok && data.token) {
        setToken(data.token);
        setAuthed(true);
        setPassword("");
      } else {
        setAuthError(data.error || "Login failed");
      }
    } catch {
      setAuthError("Network error");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const body: any = {
      name: form.name.trim(),
      category: form.category.trim() || undefined,
      description: form.description.trim() || undefined,
      imageUrl: (form.imageData || form.imageUrl).trim(),
    };
    const price = parseFloat(form.price);
    if (!Number.isNaN(price)) body.price = price;
    if (!body.imageUrl) {
      alert("Please provide an image URL or upload a file.");
      setSubmitting(false);
      return;
    }
    const token = getToken();
    const res = await fetch("/api/collections", { method: "POST", headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" }, body: JSON.stringify(body) });
    const data = (await res.json()) as CollectionItemResponse & { error?: string };
    if (res.ok) {
      setItems((prev) => [data.item, ...prev]);
      setForm({ name: "", category: "", price: "", description: "", imageUrl: "", imageData: "" });
    } else {
      alert(data.error ?? "Failed to add item");
      if (res.status === 401) setAuthed(false);
    }
    setSubmitting(false);
  };

  const remove = async (id: string) => {
    const token = getToken();
    const res = await fetch(`/api/collections/${id}`, { method: "DELETE", headers: { Authorization: token ? `Bearer ${token}` : "" } });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
    if (res.status === 401) setAuthed(false);
  };

  if (!authed) {
    return (
      <section className="container py-16 max-w-md">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Admin Login</h1>
        <form onSubmit={login} className="mt-6 grid gap-4 rounded-xl border bg-card p-5">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Password</label>
            <input type="password" className="rounded-md border bg-background px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <div className="flex justify-end">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="container py-12 md:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Admin • Collections</h1>

      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-xl border bg-card p-5">
        <div className="grid gap-1">
          <label className="text-sm font-medium">Name *</label>
          <input className="rounded-md border bg-background px-3 py-2" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
        </div>
        <div className="grid gap-1 sm:grid-cols-2 sm:gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Category</label>
            <input className="rounded-md border bg-background px-3 py-2" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Price (₹)</label>
            <input type="number" step="0.01" className="rounded-md border bg-background px-3 py-2" value={form.price} onChange={(e)=>setForm({...form, price: e.target.value})} />
          </div>
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Image URL</label>
          <input className="rounded-md border bg-background px-3 py-2" value={form.imageUrl} onChange={(e)=>setForm({...form, imageUrl: e.target.value})} placeholder="https://..." />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Or upload image</label>
          <input
            type="file"
            accept="image/*"
            className="rounded-md border bg-background px-3 py-2 file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) { setForm((f)=>({ ...f, imageData: "" })); return; }
              const reader = new FileReader();
              reader.onload = () => {
                setForm((f)=>({ ...f, imageData: String(reader.result || "") }));
              };
              reader.readAsDataURL(file);
            }}
          />
          {(form.imageData || form.imageUrl) && (
            <div className="mt-2">
              <img src={form.imageData || form.imageUrl} alt="Preview" className="h-32 w-32 rounded-md object-cover border" />
            </div>
          )}
          <p className="text-xs text-foreground/60">One of URL or file is required.</p>
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea className="min-h-24 rounded-md border bg-background px-3 py-2" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add Item"}</Button>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Current Items</h2>
        {loading ? (
          <p className="mt-4 text-foreground/70">Loading...</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-foreground/70">No items yet.</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <article key={c.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{c.name}</h3>
                      {c.category && <p className="text-xs text-foreground/60">{c.category}</p>}
                    </div>
                    <button onClick={() => remove(c.id)} className="text-sm text-destructive hover:underline">Delete</button>
                  </div>
                  {typeof c.price === "number" && <p className="mt-2 text-sm">₹{c.price.toLocaleString()}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
