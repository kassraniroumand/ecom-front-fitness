"use client";

import { X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function CategorySortDrawer({
  open,
  onOpenChange,
  options,
  value,
  onValueChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  options: string[];
  value: string;
  onValueChange: (v: string) => void;
}) {
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

          <div className="border-b border-foreground/15 px-7 py-6 md:px-9">
            <SheetTitle className="tg-card-eyebrow text-foreground">
              مرتب‌سازی
            </SheetTitle>
          </div>

          <RadioGroup
            value={value}
            onValueChange={onValueChange}
            className="flex-1 gap-0 px-7 py-2 md:px-9"
          >
            {options.map((opt) => (
              <label
                key={opt}
                className="flex cursor-pointer items-center gap-3 border-b border-foreground/10 py-5 last:border-b-0"
              >
                <RadioGroupItem
                  value={opt}
                  className="size-5 border-foreground/40 data-checked:border-foreground data-checked:bg-foreground"
                />
                <span className="text-base font-bold text-foreground">{opt}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      </SheetContent>
    </Sheet>
  );
}
