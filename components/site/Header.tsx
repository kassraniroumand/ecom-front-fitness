"use client";

import { Search, ShoppingCart, Phone, ArrowUpRight, Menu, ChevronLeft, X, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavChild = { label: string; href?: string; image?: string };
type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

const nav: NavItem[] = [
  {
    label: "فروشگاه",
    href: "/category",
    children: [
      { label: "تردمیل", href: "/category/running", image: "/assets/cat-treadmills.jpg" },
      { label: "دوچرخه", href: "/category/bike", image: "/assets/cat-bikes.jpg" },
      { label: "وزنه آزاد", href: "/category/strength", image: "/assets/cat-freeweights.jpg" },
      { label: "مولتی‌جیم", href: "/category/strength", image: "/assets/cat-multigym.jpg" },
      { label: "روئینگ", href: "/category", image: "/assets/cat-rowers.jpg" },
    ],
  },
  {
    label: "تندرستی",
    href: "/category/wellness",
    children: [
      { label: "ریکاوری", href: "/category/wellness", image: "/assets/latest-recovery.jpg" },
      { label: "تغذیه", href: "/category/wellness", image: "/assets/wellness.jpg" },
      { label: "آموزش", href: "/category/wellness", image: "/assets/latest-watch.jpg" },
    ],
  },
  { label: "طراحی" },
  { label: "داستان‌ها" },
  { label: "جامعه" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<NavItem | null>(nav[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => setActiveParent(nav[0]), 300);
    }
  };

  const handleSearchOpenChange = (next: boolean) => {
    setSearchOpen(next);
    if (!next) setSearchQuery("");
  };

  const popularSearches = ["تردمیل", "دوچرخه ثابت", "وزنه دمبل", "روئینگ", "مولتی‌جیم"];
  const searchCategories = nav
    .filter((n) => n.children)
    .flatMap((n) => n.children!.map((c) => ({ ...c, parent: n.label })));

  return (
    <header className="relative sm:absolute top-0 left-0 right-0 z-50 px-1 md:px-2 pt-1 mb-1 md:pt-1 ">
      <div className="bg-background rounded-sm shadow-sm">
        <div className="grid grid-cols-3 items-center px-4 md:px-6 h-14 md:h-16">
          {/* Right (DOM-first in RTL): Menu */}
          <div className="flex items-center justify-self-start">
            <Sheet open={open} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <button
                  aria-label="Menu"
                  className="group flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Menu className="w-5 h-5" />
                  <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.2em]">
                    منو
                  </span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="p-0 gap-0 w-full sm:max-w-md md:!max-w-3xl lg:!max-w-5xl bg-background"
              >
                <SheetTitle className="sr-only">منو</SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between px-5 md:px-8 h-14 md:h-16 border-b border-border">
                    <div className="flex items-center gap-3">
                      <SheetClose
                        aria-label="Close"
                        className="flex items-center justify-center w-8 h-8 -ms-2 rounded-sm hover:bg-accent transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </SheetClose>
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">منو</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                      Technogym
                    </span>
                  </div>

                  <div className="flex flex-1 overflow-hidden min-h-0">
                    {/* Parent list — right pane in RTL */}
                    <nav
                      className={`${
                        activeParent?.children ? "hidden md:flex" : "flex"
                      } flex-col w-full md:w-80 lg:w-96 shrink-0 md:border-l md:border-border bg-background overflow-y-auto py-2 md:py-4`}
                    >
                      {nav.map((item, idx) => {
                        const isActive = activeParent?.label === item.label;
                        const hasChildren = !!item.children?.length;
                        const num = String(idx + 1).padStart(2, "0");
                        const baseCls =
                          "group relative flex items-baseline gap-4 px-5 md:px-8 py-3 md:py-4 transition-colors";
                        const titleCls = `text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] transition-colors ${
                          isActive ? "text-accent" : "group-hover:text-accent"
                        }`;
                        const numCls = `text-[10px] md:text-xs font-bold tracking-[0.25em] tabular-nums ${
                          isActive ? "text-accent" : "text-muted-foreground"
                        }`;
                        return hasChildren ? (
                          <button
                            key={item.label}
                            onMouseEnter={() => setActiveParent(item)}
                            onClick={() => setActiveParent(item)}
                            className={`${baseCls} text-right`}
                          >
                            <span className={numCls}>{num}</span>
                            <span className={titleCls}>{item.label}</span>
                            {isActive && (
                              <span className="absolute inset-y-3 right-0 w-1 bg-accent" />
                            )}
                          </button>
                        ) : (
                          <a
                            key={item.label}
                            href={item.href ?? "#"}
                            onMouseEnter={() => setActiveParent(item)}
                            className={baseCls}
                          >
                            <span className={numCls}>{num}</span>
                            <span className={titleCls}>{item.label}</span>
                          </a>
                        );
                      })}
                    </nav>

                    {/* Mega-menu grid — left pane in RTL */}
                    <div
                      className={`${
                        activeParent?.children ? "flex" : "hidden md:flex"
                      } flex-1 flex-col overflow-hidden bg-muted/30`}
                    >
                      <div className="md:hidden flex items-center gap-3 px-5 h-14 border-b border-border bg-background">
                        <button
                          aria-label="Back"
                          onClick={() => setActiveParent(null)}
                          className="flex items-center"
                        >
                          <ChevronLeft className="w-5 h-5 rotate-180" />
                        </button>
                        <span className="font-bold">{activeParent?.label}</span>
                      </div>

                      {activeParent?.children ? (
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                          <div className="hidden md:flex items-baseline justify-between mb-5">
                            <h3 className="text-2xl font-black tracking-tight">{activeParent.label}</h3>
                            <SheetClose asChild>
                              <a
                                href={activeParent.href ?? "#"}
                                className="group text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                              >
                                مشاهده همه <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                              </a>
                            </SheetClose>
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            {activeParent.children.map((child) => (
                              <SheetClose asChild key={child.label}>
                                <a
                                  href={child.href ?? "#"}
                                  className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-foreground/5"
                                >
                                {child.image && (
                                  <Image
                                    src={child.image}
                                    alt={child.label}
                                    fill
                                    sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 45vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 md:p-4">
                                  <span className="text-sm md:text-base font-bold text-white">
                                    {child.label}
                                  </span>
                                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </span>
                                </div>
                                </a>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                          یک دسته‌بندی را انتخاب کنید
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Editorial footer band */}
                  <div className="bg-foreground text-background">
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-background/15">
                      <a
                        href="#"
                        className="group flex items-center justify-between px-5 md:px-8 py-4 md:py-5 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-70 group-hover:opacity-100">
                            B2B
                          </span>
                          <span className="text-base md:text-lg font-bold">برای کسب‌وکار</span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <a
                        href="#"
                        className="group flex items-center justify-between px-5 md:px-8 py-4 md:py-5 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-70 group-hover:opacity-100">
                            Account
                          </span>
                          <span className="text-base md:text-lg font-bold">ورود</span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <a
                        href="tel:08003162496"
                        className="group flex items-center justify-between px-5 md:px-8 py-4 md:py-5 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-70 group-hover:opacity-100">
                            تماس
                          </span>
                          <span className="text-base md:text-lg font-bold tracking-tight">۰۸۰۰۳۱۶۲۴۹۶</span>
                        </div>
                        <Phone className="w-5 h-5 text-accent group-hover:text-accent-foreground" />
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="justify-self-center flex items-center" aria-label="تکنوجیم">
            <span className="bg-accent text-accent-foreground font-black tracking-tighter px-2 py-1 text-sm md:text-base rounded-sm">
              تکنوجیم
            </span>
          </Link>

          {/* Left (DOM-last in RTL): Search + Account + Cart */}
          <div className="flex items-center justify-self-end gap-4 md:gap-5">
            <button
              aria-label="Search"
              onClick={() => {
                posthog.capture("search_clicked");
                setSearchOpen(true);
              }}
              className="hover:text-accent transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="#"
              aria-label="حساب کاربری"
              className="hover:text-accent transition-colors"
            >
              <User className="w-5 h-5" />
            </a>
            <button
              aria-label="Cart"
              onClick={() => posthog.capture("cart_icon_clicked")}
              className="hover:text-accent transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* Full-screen search modal (portaled — placement here is fine) */}
            <Sheet open={searchOpen} onOpenChange={handleSearchOpenChange}>
              <SheetContent
                side="top"
                showCloseButton={false}
                className="!h-screen !max-h-screen w-full !max-w-none p-0 gap-0 bg-background border-0"
              >
                <SheetTitle className="sr-only">جستجو</SheetTitle>
                <div className="flex h-full flex-col">
                  {/* Top bar */}
                  <div className="flex items-center justify-between px-5 md:px-8 h-14 md:h-16 border-b border-border">
                    <span className="bg-accent text-accent-foreground font-black tracking-tighter px-2 py-1 text-sm md:text-base rounded-sm">
                      تکنوجیم
                    </span>
                    <SheetClose
                      aria-label="Close search"
                      className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors"
                    >
                      <span>بستن</span>
                      <span className="flex items-center justify-center w-8 h-8 rounded-sm border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <X className="w-4 h-4" />
                      </span>
                    </SheetClose>
                  </div>

                  {/* Search input — top of modal */}
                  <div className="px-4 sm:px-5 md:px-12 lg:px-24 pt-6 md:pt-20 pb-5 md:pb-8 border-b border-border">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground mb-3 md:mb-4">
                      جستجو
                    </p>
                    <div className="flex items-center gap-2.5 md:gap-6 min-w-0">
                      <Search className="w-5 h-5 md:w-8 md:h-8 shrink-0 text-foreground" strokeWidth={2} />
                      <input
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="جستجو…"
                        className="flex-1 min-w-0 bg-transparent border-0 outline-none text-base sm:text-lg md:text-4xl lg:text-5xl font-black tracking-tight placeholder:text-muted-foreground/50 placeholder:font-bold"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          aria-label="پاک کردن"
                          className="flex items-center justify-center w-7 h-7 md:w-auto md:h-auto md:px-0 md:py-0 rounded-sm border border-border md:border-0 text-muted-foreground hover:text-accent hover:border-accent transition-colors shrink-0 md:text-xs md:font-bold md:uppercase md:tracking-[0.2em]"
                        >
                          <X className="w-3.5 h-3.5 md:hidden" />
                          <span className="hidden md:inline">پاک کردن</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="flex-1 overflow-y-auto px-4 sm:px-5 md:px-12 lg:px-24 py-6 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground mb-3 md:mb-5">
                          جستجوهای پرطرفدار
                        </p>
                        <ul className="space-y-2.5 md:space-y-4">
                          {popularSearches.map((q, i) => (
                            <li key={q}>
                              <button
                                type="button"
                                onClick={() => setSearchQuery(q)}
                                className="group flex items-baseline gap-3 text-right"
                              >
                                <span className="text-[10px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-lg md:text-3xl font-black tracking-tight leading-tight group-hover:text-accent transition-colors">
                                  {q}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground mb-3 md:mb-5">
                          دسته‌بندی‌ها
                        </p>
                        <ul className="space-y-2.5 md:space-y-4">
                          {searchCategories.map((c) => (
                            <li key={`${c.parent}-${c.label}`}>
                              <a
                                href={c.href ?? "#"}
                                className="group flex items-baseline gap-3 flex-wrap"
                              >
                                <span className="text-lg md:text-3xl font-black tracking-tight leading-tight group-hover:text-accent transition-colors">
                                  {c.label}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                  {c.parent}
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-accent opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
