"use client";

import { Search, ShoppingCart, Phone, ArrowUpRight, Menu, ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
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

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => setActiveParent(nav[0]), 300);
    }
  };

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
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold">
              برای کسب‌وکار <ArrowUpRight className="w-4 h-4 text-accent" />
            </a>
            <a href="#" className="hidden md:inline-block text-sm font-semibold">ورود</a>
            <a href="tel:08003162496" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold">
              <Phone className="w-4 h-4" /> ۰۸۰۰۳۱۶۲۴۹۶
            </a>
            <button aria-label="Search" onClick={() => posthog.capture("search_clicked")}>
              <Search className="w-5 h-5" />
            </button>
            <button aria-label="Cart" onClick={() => posthog.capture("cart_icon_clicked")}>
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Sheet open={open} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <button aria-label="Menu">
                  <Menu className="w-5 h-5" />
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
        </div>
      </div>
    </header>
  );
};
