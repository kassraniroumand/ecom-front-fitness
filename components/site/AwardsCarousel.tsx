"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight } from "lucide-react";
import "swiper/css";
import { SectionHeading } from "@/components/site/SectionHeading";

export type AwardItem = { category: string; name: string; img: string };
export type AwardTab = { id: string; label: string };
export type AwardsSection = {
  catalogue: Record<string, AwardItem[]>;
  tabs: AwardTab[];
  defaultTab: string;
};

export const AwardsCarousel = ({
  catalogue,
  tabs,
  defaultTab,
}: AwardsSection) => {
  const [active, setActive] = useState<string>(defaultTab);
  const items = catalogue[active] ?? [];

  return (
    <section className="bg-foreground text-background py-8 md:py-5 px-2 m-4 overflow-hidden ">
      <div className="tg-container">
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-14">
          <SectionHeading
            tone="dark"
            eyebrow="تجلیل از کیفیت و نوآوری"
            title={<>بیش از ۵۰ محصول برنده<br />جایزه از سال ۲۰۰۴</>}
            className="mb-0"
          />
        </div>

        <div className="flex items-center justify-center gap-8 md:gap-12 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative pb-3 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition ${
                active === t.id ? "text-background" : "text-background/40 hover:text-background/70"
              }`}
            >
              {t.label}
              {active === t.id && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Swiper
          key={active}
          dir="rtl"
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.3, spaceBetween: 20 },
            1280: { slidesPerView: 4.3, spaceBetween: 20 },
          }}
          className="tg-swiper"
        >
          {items.map((p, i) => (
            <SwiperSlide key={`${p.name}-${i}`} className="!h-auto">
              <article className="relative rounded-none overflow-hidden h-full flex flex-col aspect-[3/4] text-foreground" style={{ backgroundColor: "#dcdbd4" }}>
                <div className="p-5 md:p-6 text-foreground">
                  <p className="tg-card-eyebrow text-foreground/60 mb-1">{p.category}</p>
                  <h3 className="tg-card-title">{p.name}</h3>
                </div>
                <div className="relative flex-1 px-4 pb-4">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    loading="lazy"
                    className="object-contain mix-blend-multiply p-4"
                  />
                </div>
                <button
                  aria-label={`کشف ${p.name}`}
                  className="absolute top-4 left-4 w-10 h-10 rounded border border-foreground/30 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
