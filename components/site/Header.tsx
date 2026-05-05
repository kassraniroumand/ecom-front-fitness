"use client";

import { Search, ShoppingCart, Phone, ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";

const nav = ["فروشگاه", "تندرستی", "طراحی", "داستان‌ها", "جامعه"];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3 md:pt-5">
      <div className="bg-background rounded-sm shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center" aria-label="تکنوجیم">
              <span className="bg-accent text-accent-foreground font-black tracking-tighter px-2 py-1 text-sm md:text-base rounded-sm">
                تکنوجیم
              </span>
            </a>
            <nav className="hidden lg:flex items-center gap-6">
              {nav.map((n) => (
                <a key={n} href="#" className="text-sm font-semibold hover:text-muted-foreground transition">
                  {n}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold">
              برای کسب‌وکار <ArrowUpRight className="w-4 h-4 text-accent" />
            </a>
            <a href="#" className="hidden md:inline-block text-sm font-semibold">ورود</a>
            <a href="tel:08003162496" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold">
              <Phone className="w-4 h-4" /> ۰۸۰۰۳۱۶۲۴۹۶
            </a>
            <button aria-label="Search"><Search className="w-5 h-5" /></button>
            <button aria-label="Cart"><ShoppingCart className="w-5 h-5" /></button>
            <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {open && (
          <nav className="lg:hidden border-t border-border px-4 py-3 flex flex-col gap-3">
            {nav.map((n) => (
              <a key={n} href="#" className="text-sm font-semibold">{n}</a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
