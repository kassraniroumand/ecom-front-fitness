"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ShopBanner } from "./ShopBanner";
import { FiltersDrawer } from "./FiltersDrawer";
import { SortDrawer } from "./SortDrawer";
import {
  EMPTY_FILTERS,
  SORT_LABEL,
  faNumber,
  type FilterState,
  type Product,
  type SortKey,
} from "./types";

export function ShopClient({ products }: { products: Product[] }) {
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const totalSelected =
    filters.categories.length +
    filters.disciplines.length +
    filters.materials.length +
    filters.weights.length;

  const visibleCount = Math.max(products.length - totalSelected, 0);

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "newest") arr.reverse();
    return arr;
  }, [products, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ShopBanner />
      <div className="border-b border-foreground/15">
        <div className="mx-auto grid max-w-[1440px] grid-cols-3 items-center px-4 py-4 md:px-10 md:py-5">
          <button
            type="button"
            onClick={() => setSortOpen(true)}
            className="flex items-center gap-2 justify-self-start text-sm font-bold tracking-tight"
          >
            <ArrowUpDown className="h-4 w-4" strokeWidth={2} />
            <span className="underline underline-offset-4 decoration-foreground/40">
              مرتب‌سازی: {SORT_LABEL[sort]}
            </span>
          </button>
          <span className="tg-card-eyebrow justify-self-center text-muted-foreground">
            {faNumber(visibleCount)} محصول
          </span>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 justify-self-end text-sm font-bold tracking-tight"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            <span className="underline underline-offset-4 decoration-foreground/40">
              فیلتر
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <SortDrawer
        open={sortOpen}
        onOpenChange={setSortOpen}
        sort={sort}
        onSortChange={setSort}
      />
      <FiltersDrawer
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={filters}
        onFiltersChange={setFilters}
        visibleCount={visibleCount}
      />
    </div>
  );
}
