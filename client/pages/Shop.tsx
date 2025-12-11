import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CartLine, CollectionItem, CollectionsListResponse, OrderInput, OrderResponse } from "@shared/api";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function Shop() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { add, items: cartItems, remove, clear, total } = useCart();
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "" });
  const [placing, setPlacing] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/collections");
        const data = (await res.json()) as CollectionsListResponse;
        setItems(data.items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const placeOrder = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty");
    if (!customer.name || !customer.phone || !customer.address) return alert("Please fill your details");
    setPlacing(true);
    try {
      const body: OrderInput = {
        customerName: customer.name,
        phone: customer.phone,
        address: customer.address,
        notes: customer.notes || undefined,
        items: cartItems as CartLine[],
      };
      // Open WhatsApp immediately to avoid popup blockers
      const lines = [
        "New order from Srinidhi Sarees website:",
        `Name: ${customer.name}`,
        `Phone: ${customer.phone}`,
        `Address: ${customer.address}`,
        customer.notes ? `Notes: ${customer.notes}` : undefined,
        "",
        "Items:",
        ...cartItems.map((l) => `• ${l.name}${typeof l.price === 'number' ? ` - ₹${l.price.toLocaleString()}` : ''} x ${l.qty}`),
        "",
        `Total: ₹${total.toLocaleString()}`,
      ].filter(Boolean) as string[];
      const text = encodeURIComponent(lines.join("\n"));
      const waUrl = `https://wa.me/917012124919?text=${text}`;
      
      // Try to open WhatsApp
      let whatsappOpened = false;
      try {
        const win = window.open(waUrl, "_blank");
        if (win) {
          whatsappOpened = true;
        } else {
          // Popup blocked, try direct navigation
          window.location.href = waUrl;
          whatsappOpened = true;
        }
      } catch (e) {
        console.error("Failed to open WhatsApp:", e);
      }

      // Show prominent reminder to send the WhatsApp message
      if (whatsappOpened) {
        toast.success("⚠️ IMPORTANT: Complete Your Order", {
          description: "WhatsApp has opened with your order details. You MUST click the SEND button in WhatsApp to complete your order. We will not receive your order until you send the message!",
          duration: 10000,
        });
      } else {
        toast.error("Unable to open WhatsApp", {
          description: `Please manually send your order to WhatsApp: +91 7012124919`,
          duration: 10000,
        });
      }

      // Persist order (optional)
      let ok = true;
      try {
        const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const data = (await res.json()) as OrderResponse & { error?: string };
        ok = res.ok;
        if (ok) setSuccessId(data.id);
      } catch {
        ok = false;
      }

      clear();
      if (!ok) {
        // If API failed, still show a success note since WhatsApp was opened
        setSuccessId("whatsapp");
      }
    } catch (e: any) {
      alert(e.message || "Order failed");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="container py-12 md:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Shop</h1>
      <p className="mt-2 text-foreground/70">Browse collections, add to cart and place your order.</p>

      {successId ? (
        <div className="mt-6 rounded-xl border-2 border-primary bg-card p-6 shadow-lg">
          <h2 className="text-xl font-bold text-primary">✅ Order Received!</h2>
          <p className="mt-2 text-sm font-medium">Order ID: {successId}</p>
          <div className="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 p-4">
            <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
              ⚠️ IMPORTANT: Did you send the WhatsApp message?
            </p>
            <p className="mt-2 text-xs text-yellow-800 dark:text-yellow-300">
              Your order has been saved, but we will only process it after you <strong>send the message in WhatsApp</strong>. 
              Please check your WhatsApp and click the <strong>SEND button</strong> to complete your order.
            </p>
            <p className="mt-2 text-xs text-yellow-800 dark:text-yellow-300">
              If WhatsApp didn't open, please manually send your order details to: <strong>+91 7012124919</strong>
            </p>
          </div>
          <p className="mt-4 text-sm text-foreground/70">We will contact you shortly after receiving your WhatsApp message.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            {loading ? (
              <p className="text-foreground/70">Loading...</p>
            ) : items.length === 0 ? (
              <p className="text-foreground/70">No items available right now.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <article key={c.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold">{c.name}</h3>
                      {c.category && <p className="text-xs text-foreground/60">{c.category}</p>}
                      {typeof c.price === "number" && (
                        <p className="mt-2 font-medium">₹{c.price.toLocaleString()}</p>
                      )}
                      <div className="mt-4">
                        <Button onClick={() => add(c)} className="w-full">Add to Cart</Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              {cartItems.length === 0 ? (
                <p className="mt-2 text-sm text-foreground/70">Cart is empty.</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {cartItems.map((l) => (
                    <li key={l.itemId} className="flex items-center gap-3">
                      <img src={l.imageUrl} alt="" className="h-12 w-12 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{l.name}</p>
                        {typeof l.price === "number" && (
                          <p className="text-xs text-foreground/60">₹{l.price.toLocaleString()} × {l.qty}</p>
                        )}
                      </div>
                      <button onClick={() => remove(l.itemId)} className="text-sm text-destructive hover:underline">Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
                <span>Total</span>
                <span className="font-medium">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h2 className="text-lg font-semibold">Checkout</h2>
              <div className="mt-3 grid gap-2">
                <input placeholder="Your Name" className="rounded-md border bg-background px-3 py-2" value={customer.name} onChange={(e)=>setCustomer({...customer, name: e.target.value})} />
                <input placeholder="Phone" className="rounded-md border bg-background px-3 py-2" value={customer.phone} onChange={(e)=>setCustomer({...customer, phone: e.target.value})} />
                <textarea placeholder="Address" className="min-h-24 rounded-md border bg-background px-3 py-2" value={customer.address} onChange={(e)=>setCustomer({...customer, address: e.target.value})} />
                <textarea placeholder="Notes (optional)" className="min-h-20 rounded-md border bg-background px-3 py-2" value={customer.notes} onChange={(e)=>setCustomer({...customer, notes: e.target.value})} />
                <Button onClick={placeOrder} disabled={placing || cartItems.length===0}>{placing ? "Placing..." : "Place Order"}</Button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
