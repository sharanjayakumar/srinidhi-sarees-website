import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Phone, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.15]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(40rem 40rem at 10% -10%, hsl(var(--primary)/.25) 10%, transparent 60%), radial-gradient(30rem 30rem at 90% 10%, hsl(var(--secondary)/.7) 0, transparent 60%)",
          }}
        />
        <div className="container grid gap-10 py-20 md:grid-cols-2 md:gap-14 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Since 1996
            </div>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-[0.06em]">
              Srinidhi Sarees
              <span className="block text-xl font-sans font-medium text-foreground/70 sm:text-2xl">
                Timeless weaves. Modern elegance.
              </span>
            </h1>
            <p className="mt-5 max-w-prose text-foreground/75">
              Discover handpicked Banarasi, Kanjivaram, Soft Silk and designer
              sarees for weddings, festivals and everyday grace.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link to="/collections">Explore Collections</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-3 text-sm text-foreground/70 sm:grid-cols-2">
              <li className="flex items-center gap-2"><Check className="text-primary"/> Churidar materials</li>
              <li className="flex items-center gap-2"><Check className="text-primary"/> Matching Blouse</li>
              <li className="flex items-center gap-2"><Check className="text-primary"/> Sarees</li>
              <li className="flex items-center gap-2"><Check className="text-primary"/> Men's wear</li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/50 blur-2xl" />
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border bg-card shadow-xl">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fcce44ec321394cb09d5f7f473aa5cc8c%2F1ba07de133184e2ba63dd3a4629aa02b?format=webp&width=1600"
                alt="Srinidhi Sarees storefront"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>




      {/* CTA */}
      <section className="relative overflow-hidden border-t bg-gradient-to-br from-primary/5 to-secondary/40">
        <div className="container py-16 text-center md:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Visit Our Store Today
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-foreground/75">
            Experience luxurious fabrics and personalized assistance at
            Srinidhi Sarees.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link to="/contact">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/collections">Browse Collections</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
