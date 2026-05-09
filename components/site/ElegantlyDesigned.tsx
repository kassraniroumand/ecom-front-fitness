"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight, Home, Zap, Flame, Dumbbell } from "lucide-react";
import "swiper/css";
import { SectionHeading } from "@/components/site/SectionHeading";

export type ElegantCategory = "all" | "cardio" | "strength" | "wellness";

export type ElegantProduct = {
  name: string;
  price: string;
  img: string;
  category: ElegantCategory;
};

export type ElegantTab = {
  id: ElegantCategory;
  label: string;
  icon: "home" | "zap" | "flame" | "dumbbell";
};

const ICONS = { home: Home, zap: Zap, flame: Flame, dumbbell: Dumbbell } as const;

export const ElegantlyDesigned = ({
  products,
  tabs,
}: {
  products: ElegantProduct[];
  tabs: ElegantTab[];
}) => {
  const [active, setActive] = useState<ElegantCategory>("all");
  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section className="py-8 md:py-10 bg-background sm:px-4">
      <div className="tg-container">
        <SectionHeading
          eyebrow="کاتالوگ محصولات"
          title="طراحی شیک. با قدرت فناوری."
          description="فضای خود را با بهترین تجهیزات باشگاه خانگی متحول کنید: هر آنچه برای تمرین نیاز دارید، با راحتی خانه."
        >
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map(({ id, label, icon }) => {
                const Icon = ICONS[icon];
                return (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition ${
                      active === id
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-foreground/30 hover:border-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    {label}
                  </button>
                );
              })}
            </div>
            <a href="#" className="tg-btn-outline">
              خرید آنلاین <ChevronRight className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </SectionHeading>
      </div>

      <div>
        <Swiper
          key={active}
          dir="rtl"
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.3, spaceBetween: 24 },
            1280: { slidesPerView: 4.2, spaceBetween: 24 },
          }}
          className="tg-swiper"
        >
          {filtered.map((p) => (
            <SwiperSlide key={p.name} className="!h-auto">
              <article className="bg-card text-card-foreground rounded-none overflow-hidden h-full flex flex-col">
                <div className="relative aspect-square bg-card flex items-center justify-center p-6">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    loading="lazy"
                    className="object-contain p-6"
                  />
                </div>
                <div className="px-6 pb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="tg-card-title">
                      {p.name}
                    </h3>
                    <p className="text-base font-bold mt-1">{p.price}</p>
                  </div>
                  <button
                    aria-label={`کشف ${p.name}`}
                    className="shrink-0 w-10 h-10 rounded border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
                <div className="border-t border-foreground/10 px-6 py-4">
                  <p className="text-xs">
                    پرداخت در طول <span className="font-bold">۳۶ ماه</span> با{" "}
                    <span className="font-bold italic">کلارنا.</span>{" "}
                    <a href="#" className="underline">بیشتر بدانید</a>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    ۱۸+، شرایط و ضوابط اعمال می‌شود، اعتبار مشروط به وضعیت.
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
