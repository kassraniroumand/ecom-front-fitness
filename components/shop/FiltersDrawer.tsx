"use client";

import { X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EMPTY_FILTERS,
  faNumber,
  type FilterKey,
  type FilterState,
} from "./types";

const sections: { id: FilterKey; title: string; options: string[] }[] = [
  {
    id: "categories",
    title: "دسته‌بندی",
    options: ["قدرتی", "هوازی", "ریکاوری", "لوازم جانبی", "پوشاک"],
  },
  {
    id: "disciplines",
    title: "نوع تمرین",
    options: [
      "پاورلیفتینگ",
      "وزنه‌برداری المپیک",
      "تمرین عملکردی",
      "یوگا",
      "دویدن",
      "دوچرخه‌سواری",
    ],
  },
  {
    id: "materials",
    title: "جنس",
    options: ["چدن", "فولاد", "لاستیک", "چرم", "الیاف کربن", "چوب پنبه"],
  },
  {
    id: "weights",
    title: "وزن",
    options: [
      "کمتر از ۵ کیلوگرم",
      "۵ تا ۱۵ کیلوگرم",
      "۱۵ تا ۳۰ کیلوگرم",
      "بالای ۳۰ کیلوگرم",
    ],
  },
];

export function FiltersDrawer({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  visibleCount,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  visibleCount: number;
}) {
  const totalSelected =
    filters.categories.length +
    filters.disciplines.length +
    filters.materials.length +
    filters.weights.length;

  const toggle = (sectionId: FilterKey, opt: string) => {
    const current = filters[sectionId];
    const next = current.includes(opt)
      ? current.filter((x) => x !== opt)
      : [...current, opt];
    onFiltersChange({ ...filters, [sectionId]: next });
  };

  const clearAll = () => onFiltersChange(EMPTY_FILTERS);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[480px] gap-0 border-0 bg-background p-0 shadow-none duration-300"
      >
        <div className="relative flex h-full flex-col">
          <SheetClose asChild>
            <button
              aria-label="بستن"
              className="absolute -left-5 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </SheetClose>

          <div className="flex items-center justify-between border-b border-foreground/15 px-7 py-6 md:px-9">
            <SheetTitle className="tg-card-eyebrow text-foreground">
              فیلترها
            </SheetTitle>
            <button
              onClick={clearAll}
              className="text-xs font-bold text-foreground underline underline-offset-4 decoration-foreground/40"
            >
              حذف همه
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-7 md:px-9">
            <Accordion type="multiple" className="w-full">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border-b border-foreground/10"
                >
                  <AccordionTrigger className="rounded-none py-5 text-sm font-bold tracking-wider hover:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 pb-5 pt-1">
                      {section.options.map((opt) => {
                        const checked = filters[section.id].includes(opt);
                        return (
                          <label
                            key={opt}
                            className="flex cursor-pointer items-center gap-3"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggle(section.id, opt)}
                              className="size-5 rounded-none border-foreground/40 data-checked:border-foreground data-checked:bg-foreground"
                            />
                            <span className="text-sm font-semibold text-foreground">
                              {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="border-t border-foreground/15 bg-background p-5 md:p-6">
            <button
              type="button"
              disabled={totalSelected === 0}
              onClick={() => onOpenChange(false)}
              className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] transition-colors ${
                totalSelected === 0
                  ? "cursor-not-allowed bg-foreground/10 text-muted-foreground"
                  : "bg-accent text-accent-foreground hover:brightness-95"
              }`}
            >
              نمایش {faNumber(visibleCount)} محصول
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
