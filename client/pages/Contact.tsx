import { Button } from "@/components/ui/button";
import { Instagram, MapPin, MessageCircle, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact Srinidhi Sarees
        </h1>
        <p className="mt-3 text-foreground/70">
          Reach us via WhatsApp, phone, Instagram, or visit our store.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* WhatsApp */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-content-center rounded-full bg-primary/10 text-primary">
              <MessageCircle />
            </div>
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-sm text-foreground/70">9447051531</p>
            </div>
          </div>
          <div className="mt-5">
            <Button asChild className="w-full">
              <a href="https://wa.me/919447051531" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </Button>
          </div>
        </div>

        {/* Phone */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-content-center rounded-full bg-primary/10 text-primary">
              <Phone />
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-foreground/70">9447051531, 0471 2555508</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button asChild variant="outline">
              <a href="tel:+919447051531">Call 9447051531</a>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+914712555508">Call 0471 2555508</a>
            </Button>
          </div>
        </div>

        {/* Instagram */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-content-center rounded-full bg-primary/10 text-primary">
              <Instagram />
            </div>
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-sm text-foreground/70">Follow our latest arrivals</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2">
            <Button asChild variant="outline">
              <a href="https://instagram.com/_srinidhi_sarees_" target="_blank" rel="noreferrer">@_srinidhi_sarees_</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://instagram.com/srinidhiapsara" target="_blank" rel="noreferrer">@srinidhiapsara</a>
            </Button>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-content-center rounded-full bg-primary/10 text-primary">
              <MapPin />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Store Address</h3>
              <p className="mt-1 text-sm text-foreground/80">
                Srinidhi Sarees, Shop No. 61&62, Kedaram Shopping Complex, Kesavadasapuram, Trivandrum - 695011
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-foreground/70"><Clock className="h-4 w-4"/> Open from 9 am to 9 pm</p>
              <div className="mt-4 flex gap-3">
                <Button asChild>
                  <a href="https://maps.google.com/?q=Srinidhi%20Sarees%2C%20Kedaram%20Shopping%20Complex%2C%20Kesavadasapuram%2C%20Trivandrum" target="_blank" rel="noreferrer">Get Directions</a>
                </Button>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border">
                <iframe
                  title="Srinidhi Sarees Location"
                  src="https://maps.google.com/maps?q=Srinidhi%20Sarees%2C%20Shop%20No.%2061%2662%2C%20Kedaram%20Shopping%20Complex%2C%20Kesavadasapuram%2C%20Trivandrum%20-%20695011&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-60 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
