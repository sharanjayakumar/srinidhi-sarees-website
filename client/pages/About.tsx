import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

export default function About() {
  return (
    <div className="border-y bg-muted/30">
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            About Srinidhi Sarees
          </h1>
          <p className="mt-4 text-foreground/75">
            We celebrate the heritage of Indian textiles by working directly
            with artisans and weavers. From heirloom Kanjivarams to
            contemporary designs, we bring you authentic quality and fair
            craftsmanship.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 text-primary"/> Srinidhi Sarees, Shop No. 61&62, Kedaram Shopping Complex, Kesavadasapuram, Trivandrum, Kesavadasapuram, Kesavadasapuram, Trivandrum - 695011</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 text-primary"/> 9447051531, 0471 2555508</li>
          </ul>
          <div className="mt-8 flex gap-3">
            <Button asChild>
              <a href="#map">Get Directions</a>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+919447051531">Call Now</a>
            </Button>
          </div>
        </div>
        <div id="map" className="overflow-hidden rounded-2xl border shadow-sm">
          <iframe
            title="Srinidhi Sarees Location"
            src="https://maps.google.com/maps?q=Srinidhi%20Sarees%2C%20Shop%20No.%2061%2662%2C%20Kedaram%20Shopping%20Complex%2C%20Kesavadasapuram%2C%20Trivandrum%2C%20Kesavadasapuram%2C%20Kesavadasapuram%2C%20Trivandrum%20-%20695011&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-[320px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
