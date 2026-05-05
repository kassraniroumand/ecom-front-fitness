"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { SectionHeading } from "@/components/site/SectionHeading";

type Item = {
  index: string;
  title: string;
  subtitle: string;
  tag: string;
  count: string;
  img: string;
};

const items: Item[] = [
  { index: "۰۱", title: "دویدن", subtitle: "تردمیل‌هایی برای عملکرد بالا.", tag: "هوازی", count: "۱۲ محصول", img: "/assets/treadmill.jpg" },
  { index: "۰۲", title: "قدرتی", subtitle: "فرم‌دهی، مجسمه‌سازی و افزایش قدرت.", tag: "قدرت", count: "۱۸ محصول", img: "/assets/strength.jpg" },
  { index: "۰۳", title: "دوچرخه", subtitle: "دوچرخه‌های ثابت همراه با شما.", tag: "استقامت", count: "۹ محصول", img: "/assets/bike.jpg" },
  { index: "۰۴", title: "تندرستی", subtitle: "تمرین ذهن و بدن در خانه.", tag: "ریکاوری", count: "۱۴ محصول", img: "/assets/wellness.jpg" },
];

export const CategoryGrid = () => {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="bg-background py-8 md:py-10">
      <div className="tg-container">
        <SectionHeading
          eyebrow="خرید بر اساس دسته‌بندی — ۴ رشته"
          title="تجربه تمرینی بی‌نظیر خود را پیدا کنید"
          description="مجموعه‌ای از تجهیزات حرفه‌ای، طراحی‌شده برای هر هدف تمرینی."
        >
          <a href="#" className="tg-btn-outline mt-2">
            مشاهده همه <ArrowUpRight className="w-4 h-4" />
          </a>
        </SectionHeading>

        {/* Desktop: list + sticky preview */}
        <div className="hidden lg:grid grid-cols-12 gap-12">
          {/* List */}
          <div className="col-span-7">
            <div className="border-t border-foreground" />
            {items.map((it, i) => {
              const isActive = i === active;
              return (
                <a
                  key={it.title}
                  href="#"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group flex items-baseline justify-between py-4 border-b transition-colors duration-300 ${
                    isActive ? "border-foreground" : "border-border"
                  }`}
                >
                  <div className="flex items-baseline gap-5 min-w-0">
                    <span className="text-xs font-bold text-muted-foreground tabular-nums">
                      {it.index}
                    </span>
                    <h3
                      className={`text-2xl xl:text-3xl leading-none truncate transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {it.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-5 shrink-0 pl-6">
                    <div className="text-right hidden xl:block">
                      <p className="tg-card-eyebrow text-muted-foreground">
                        {it.tag}
                      </p>
                      <p className="text-xs text-foreground/70 mt-1">{it.count}</p>
                    </div>
                    <span
                      aria-hidden
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-foreground"
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Sticky preview */}
          <div className="col-span-5">
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-none overflow-hidden bg-card ring-1 ring-border">
                {items.map((it, i) => (
                  <Image
                    key={it.title}
                    src={it.img}
                    alt={it.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className={`object-cover transition-opacity duration-500 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 text-background">
                  <p className="tg-card-eyebrow text-accent mb-2">
                    در حال نمایش — {current.index}
                  </p>
                  <h4 className="tg-card-title">{current.title}</h4>
                  <p className="tg-card-desc text-background/80 mt-2 max-w-[34ch]">
                    {current.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: image cards in a swiper */}
        <div className="lg:hidden -mx-4 md:-mx-8">
          <Swiper
            modules={[FreeMode]}
            dir="rtl"
            freeMode
            slidesPerView={1.15}
            spaceBetween={12}
            slidesOffsetBefore={16}
            slidesOffsetAfter={16}
            breakpoints={{
              640: { slidesPerView: 2.1, spaceBetween: 16, slidesOffsetBefore: 32, slidesOffsetAfter: 32 },
              768: { slidesPerView: 2.4, spaceBetween: 16, slidesOffsetBefore: 32, slidesOffsetAfter: 32 },
            }}
          >
            {items.map((it) => (
              <SwiperSlide key={it.title} className="!h-auto">
                <a
                  href="#"
                  className="group relative block aspect-[3/4] rounded-none overflow-hidden bg-card ring-1 ring-border"
                >
                  <Image
                    src={it.img}
                    alt={it.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                  <span className="absolute top-5 left-5 tg-card-eyebrow text-background/90 bg-background/10 backdrop-blur-md border border-background/25 rounded-full px-2.5 py-1">
                    {it.index} — {it.tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-background">
                    <h3 className="tg-card-title">{it.title}</h3>
                    <p className="tg-card-desc text-background/80 mt-2">{it.subtitle}</p>
                    <div className="mt-4 flex items-center gap-2 tg-card-eyebrow text-accent">
                      <span className="h-px w-5 bg-accent" />
                      کشف کنید
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
