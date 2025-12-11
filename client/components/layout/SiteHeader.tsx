import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const navLink = (
    to: string,
    label: string,
  ) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-secondary text-secondary-foreground"
            : "text-foreground/80 hover:text-foreground hover:bg-accent",
        )
      }
      onClick={() => setOpen(false)}
    >
      {label}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2" aria-label="Srinidhi Sarees home">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fcce44ec321394cb09d5f7f473aa5cc8c%2F98b9664f5ea942729c270ed5004c11b2?format=webp&width=800"
              alt="Srinidhi Sarees icon"
              className="h-8 w-8 rounded-full object-cover border border-border"
            />
            <span className="font-display text-xl md:text-2xl font-bold tracking-[0.06em] text-foreground">
              Srinidhi Sarees
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLink("/", "Home")}
          {navLink("/collections", "Collections")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin/collections" className="text-sm text-foreground/70 hover:text-foreground">Admin</Link>
          <Button asChild variant="default" className="bg-primary text-primary-foreground">
            <Link to="/shop">Shop</Link>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:bg-accent hover:text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-2 flex flex-col gap-1">
            {navLink("/", "Home")}
            {navLink("/collections", "Collections")}
            {navLink("/about", "About")}
            {navLink("/contact", "Contact")}
          </div>
        </div>
      )}
    </header>
  );
}
