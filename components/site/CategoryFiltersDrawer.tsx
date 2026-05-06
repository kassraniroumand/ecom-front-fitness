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

const faNumber = (n: number) => n.toLocaleString("fa-IR");

export function CategoryFiltersDrawer({
  open,
  onOpenChange,
  options,
  selected,
  onSelectedChange,
  visibleCount,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  options: string[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  visibleCount: number;
}) {
  const toggle = (opt: string) => {
    const next = selected.includes(opt)
      ? selected.filter((x) => x !== opt)
      : [...selected, opt];
    onSelectedChange(next);
  };

  const clearAll = () => onSelectedChange([]);
  const totalSelected = selected.length;

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
            <Accordion
              type="multiple"
              defaultValue={["filters"]}
              className="w-full"
            >
              <AccordionItem
                value="filters"
                className="border-b border-foreground/10"
              >
                <AccordionTrigger className="rounded-none py-5 text-sm font-bold tracking-wider hover:no-underline">
                  نوع تجهیز
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 pb-5 pt-1">
                    {options.map((opt) => {
                      const checked = selected.includes(opt);
                      return (
                        <label
                          key={opt}
                          className="flex cursor-pointer items-center gap-3"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggle(opt)}
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
              نمایش {faNumber(visibleCount)} نتیجه
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
