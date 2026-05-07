"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

export type AccordionItemData = {
  id: string;
  title: string;
  content: ReactNode;
};

export function AccordionSection({
  heading,
  items,
  className,
  id,
}: {
  heading: string;
  items: AccordionItemData[];
  className?: string;
  id?: string;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id={id}
      className={`bg-[#0a0a0a] text-white py-24 md:py-32 scroll-mt-24 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="md:col-span-4 mb-10 md:mb-0">
            <h2 className="text-[36px] md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              {heading}
            </h2>
          </div>

          <div className="md:col-span-8">
            {items.map((item) => {
              const isOpen = openIds.has(item.id);
              return (
                <div key={item.id} className="border-b border-white/15">
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`acc-${item.id}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-start text-white/85 hover:text-white transition-colors"
                  >
                    <span className="text-xl md:text-2xl lg:text-[26px] font-normal leading-snug [overflow-wrap:anywhere]">
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 text-white/85 group-hover:border-white group-hover:text-white"
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.25} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`acc-${item.id}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-sm md:text-base text-white/70 leading-relaxed">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
