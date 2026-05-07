"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import posthog from "posthog-js";
import { ArrowUpRight, Headphones, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { AdaptiveImage } from "@/components/site/AdaptiveImage";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CategoryFiltersDrawer } from "@/components/site/CategoryFiltersDrawer";
import { CategorySortDrawer } from "@/components/site/CategorySortDrawer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Category, CategoryProduct } from "@/lib/categories";

const faNumber = (n: number) => n.toLocaleString("fa-IR");

const sortOptions = [
  "پیشنهادی",
  "قیمت: کم به زیاد",
  "قیمت: زیاد به کم",
  "جدیدترین",
];

const ProductCard = ({ p }: { p: CategoryProduct }) => {
  return (
    <article className="group relative flex flex-col bg-card text-foreground border border-border transition-all duration-500 hover:border-foreground hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-card">
        <AdaptiveImage
          src={p.img}
          alt={p.name}
          variant="light"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
          loading="lazy"
          className="object-contain p-10 transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {p.badge && (
          <span className="absolute top-4 right-4 inline-flex items-center text-[10px] font-black tracking-[0.18em] bg-foreground text-background px-2.5 py-1">
            {p.badge}
          </span>
        )}

        <span
          aria-hidden
          className="absolute bottom-4 left-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground border border-border opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent"
        >
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      <div className="flex-1 flex flex-col p-5 md:p-6 min-w-0">
        <h3 className="text-lg md:text-xl font-bold leading-tight break-words">
          {p.name}
        </h3>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.features.map((f) => (
            <span
              key={f}
              className="text-[10px] font-bold tracking-[0.14em] text-foreground/75 bg-secondary px-2 py-1"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2">
            {p.priceLabel && (
              <span className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">
                {p.priceLabel}
              </span>
            )}
            <span className="text-2xl font-bold tabular-nums">{p.price}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {p.finance}
          </p>

          <div className="mt-5 grid grid-cols-2 border-t border-border">
            <Link
              href={`/product/${p.id}`}
              onClick={() =>
                posthog.capture("product_card_discover_clicked", {
                  product_id: p.id,
                  product_name: p.name,
                  price: p.price,
                })
              }
              className="flex items-center justify-center gap-2 py-3 text-[10px] font-bold tracking-[0.2em] text-foreground border-l border-border transition-colors hover:bg-secondary"
            >
              کشف کنید
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href={`/product/${p.id}`}
              onClick={() =>
                posthog.capture("product_card_configure_clicked", {
                  product_id: p.id,
                  product_name: p.name,
                  price: p.price,
                })
              }
              className="flex items-center justify-center py-3 text-[10px] font-bold tracking-[0.2em] bg-foreground text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              پیکربندی
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export const CategoryView = ({ category }: { category: Category }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const visibleCount = Math.max(
    category.products.length - selectedFilters.length,
    0,
  );

  const handleFiltersChange = (next: string[]) => {
    setSelectedFilters(next);
    posthog.capture("category_filter_changed", {
      category: category.crumb,
      category_slug: category.slug,
      filters: next,
    });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    posthog.capture("category_sort_changed", {
      category: category.crumb,
      category_slug: category.slug,
      sort: value,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-clip">
      <main className="flex-1 pt-4 px-4 min-w-0">
        <div className="tg-container min-w-0">
          <Breadcrumb>
            <BreadcrumbList className="text-sm md:text-base font-semibold tracking-tight gap-2 md:gap-3">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/"> خانه</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:size-4" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/category">همه‌ی محصولات</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:size-4" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold">
                  {category.crumb}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className="tg-container pt-10 md:pt-14 pb-12 md:pb-16 min-w-0">
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-end min-w-0">
            <div className="col-span-12 lg:col-span-8 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-6 max-w-full">
                <span className="h-px w-10 bg-accent shrink-0" />
                <p className="text-[10px] font-bold tracking-[0.28em] text-muted-foreground min-w-0 break-words">
                  {category.eyebrow}
                </p>
              </div>

              <h1 className="w-full max-w-full md:max-w-3xl text-3xl md:text-5xl font-bold leading-tight [overflow-wrap:anywhere] [word-break:break-word]">
                {category.title}
              </h1>

              <p className="mt-8 w-full max-w-full md:max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed [overflow-wrap:anywhere] [word-break:break-word]">
                {category.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
                <span className="inline-flex items-center gap-2 text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {category.products.length} محصول
                </span>
                <span className="text-muted-foreground">ارسال و نصب رایگان</span>
                <span className="text-muted-foreground">۳ سال گارانتی</span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 min-w-0">
              <div className="rounded-none bg-card p-6 md:p-7 ring-1 ring-border flex items-start gap-4 min-w-0">
                <div className="relative shrink-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-border">
                    <Image
                      src="/assets/treadmill.jpg"
                      alt="کارشناس"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-accent text-accent-foreground inline-flex items-center justify-center">
                    <Headphones className="w-3 h-3" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="tg-card-eyebrow text-muted-foreground">
                    کمک می‌خواهید؟
                  </p>
                  <h3 className="tg-card-title mt-1">
                    با کارشناس تمرین صحبت کنید.
                  </h3>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border-b border-foreground pb-0.5"
                  >
                    تماس با کارشناس
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky top-0 z-30 bg-background border-y border-foreground/15">
          <div className="mx-auto max-w-[1440px] px-4 py-3 md:px-10 md:py-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 min-w-0 text-sm font-bold tracking-tight"
              >
                <SlidersHorizontal className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="min-w-0 truncate underline underline-offset-4 decoration-foreground/40">
                  فیلتر
                  {selectedFilters.length > 0 && (
                    <span className="ms-1 text-accent-foreground bg-accent px-1.5 py-px rounded-sm text-[10px]">
                      {faNumber(selectedFilters.length)}
                    </span>
                  )}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSortOpen(true)}
                className="flex items-center gap-2 min-w-0 text-sm font-bold tracking-tight"
              >
                <ArrowUpDown className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="min-w-0 truncate underline underline-offset-4 decoration-foreground/40">
                  <span className="hidden sm:inline">مرتب‌سازی: </span>
                  {sort}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 pt-3 md:px-10 md:pt-4">
          <div className="flex justify-center">
            <span className="tg-card-eyebrow text-muted-foreground whitespace-nowrap">
              {faNumber(visibleCount)} محصول
            </span>
          </div>
        </div>

        <section className="tg-container py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {category.products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section className="bg-background py-20 md:py-28 min-w-0">
          <div className="tg-container grid grid-cols-12 gap-8 md:gap-12 items-end min-w-0">
            <div className="col-span-12 md:col-span-7 min-w-0">
              <SectionHeading
                eyebrow={category.bottomEyebrow}
                title={
                  <>
                    {category.bottomTitleLead}{" "}
                    <span className="italic font-light normal-case text-muted-foreground">
                      {category.bottomTitleAccent}
                    </span>
                    {category.bottomTitleTail}
                  </>
                }
                className="mb-0"
              />
            </div>
            <div className="col-span-12 md:col-span-5 md:text-left min-w-0">
              <a href="#" className="tg-btn-outline">
                بازدید از آزمایشگاه طراحی <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <CategorySortDrawer
        open={sortOpen}
        onOpenChange={setSortOpen}
        options={sortOptions}
        value={sort}
        onValueChange={handleSortChange}
      />
      <CategoryFiltersDrawer
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        options={category.filters}
        selected={selectedFilters}
        onSelectedChange={handleFiltersChange}
        visibleCount={visibleCount}
      />
    </div>
  );
};
