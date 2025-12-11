import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-10 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-semibold">Srinidhi Sarees</h3>
          <p className="mt-2 text-sm text-foreground/70 max-w-sm">
            Timeless weaves and exquisite craftsmanship. Discover Banarasi,
            Kanjivaram, and handloom sarees curated with love.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <a
              href="https://instagram.com/_srinidhi_sarees_"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <Instagram size={18} /> _srinidhi_sarees_
            </a>
            <a
              href="https://instagram.com/srinidhiapsara"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <Instagram size={18} /> srinidhiapsara
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Store Details</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex items-start gap-2"><MapPin size={18} className="mt-0.5"/> Srinidhi Sarees, Shop No. 61&62, Kedaram Shopping Complex, Kesavadasapuram, Trivandrum, Kesavadasapuram, Kesavadasapuram, Trivandrum - 695011</li>
            <li className="flex items-start gap-2"><Phone size={18} className="mt-0.5"/> 9447051531, 0471 2555508</li>
            <li className="flex items-start gap-2"><MessageCircle size={18} className="mt-0.5"/>
              <a href="https://wa.me/919447051531" target="_blank" rel="noreferrer" className="hover:text-primary underline-offset-4 hover:underline">WhatsApp: 9447051531</a>
            </li>
            <li className="flex items-start gap-2"><Clock size={18} className="mt-0.5"/> Open from 9 am to 9 pm</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/collections" className="hover:text-primary">Collections</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-xs text-center text-foreground/60">
        © {new Date().getFullYear()} Srinidhi Sarees. All rights reserved.
      </div>
    </footer>
  );
}
