"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { AdaptiveImage } from "@/components/site/AdaptiveImage";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArrowUpRight } from "lucide-react";
import "swiper/css";

type Card = {
  badge?: string;
  title: string;
  tagline: string;
  price: string;
  img: string;
  dark?: boolean;
  category?: string;
};

const cards: Card[] = [
  {
    badge: "جدید",
    title: "بایک استودیو",
    tagline: "رکاب زدن زندگی شما.",
    price: "از ۲,۴۹۰ پوند یا ۶۹.۱۶ پوند/ماه برای ۳۶ ماه با بهره ۴.۹٪",
    img: "/assets/latest-bike.png",
    category: "استقامت",
  },
  {
    badge: "جدید",
    title: "ست دمبل",
    tagline: "قدرت، تصفیه‌شده.",
    price: "از ۵۹۹ پوند یا ۲۴.۹۵ پوند/ماه برای ۲۴ ماه با بهره ۰٪",
    img: "/assets/latest-dumbbells.png",
    category: "قدرتی",
  },
  {
    badge: "جدید",
    title: "ردیاب مای‌ران",
    tagline: "تمرین هوشمندانه‌تر.",
    price: "از ۳۴۹ پوند یا ۸۷.۲۵ پوند/ماه برای ۴ ماه با بهره ۰٪",
    img: "/assets/latest-watch.png",
    category: "پوشیدنی",
  },
  {
    badge: "جدید",
    title: "کیت ریکاوری",
    tagline: "بازیابی. تجدید. بازسازی.",
    price: "از ۱۴۹ پوند یا ۳۷.۲۵ پوند/ماه برای ۴ ماه با بهره ۰٪",
    img: "/assets/latest-recovery.png",
    category: "ریکاوری",
  },
];

const ProductCard = ({ c }: { c: Card }) => {
  const dark = !!c.dark;
  return (
    <article
      className={`relative h-full flex flex-col overflow-hidden rounded-none ring-1 ${
        dark
          ? "bg-foreground text-background ring-foreground/40"
          : "bg-card text-card-foreground ring-border"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          {c.badge && (
            <span className="tg-card-eyebrow bg-accent text-accent-foreground px-2 py-1 rounded-sm">
              {c.badge}
            </span>
          )}
          {c.category && (
            <span
              className={`tg-card-eyebrow truncate ${
                dark ? "text-background/60" : "text-muted-foreground"
              }`}
            >
              {c.category}
            </span>
          )}
        </div>
        <span
          aria-hidden
          className={`shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border ${
            dark ? "border-background/25 text-background" : "border-border text-foreground"
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      <div className="relative flex-1 min-h-0 mt-2 mb-2 mx-2 rounded-none overflow-hidden">
        <div
          aria-hidden
          className={`absolute inset-0 ${
            dark
              ? "bg-[radial-gradient(circle_at_50%_60%,hsl(var(--background)/0.08),transparent_70%)]"
              : "bg-[radial-gradient(circle_at_50%_60%,hsl(var(--muted)),transparent_70%)]"
          }`}
        />
        <AdaptiveImage
          src={c.img}
          alt={c.title}
          variant={dark ? "dark" : "light"}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          loading="lazy"
          className="object-contain object-center p-4 sm:p-5 md:p-6"
        />
      </div>

      <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-3">
        <h3 className="text-xl sm:text-2xl md:text-3xl normal-case tracking-tight font-bold leading-[1.05] break-words">
          {c.title}
        </h3>
        <p className={`text-sm mt-2 ${dark ? "text-background/80" : "text-foreground/80"}`}>
          {c.tagline}
        </p>

        <div
          className={`mt-4 sm:mt-5 pt-3 sm:pt-4 border-t ${
            dark ? "border-background/15" : "border-border"
          } flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3`}
        >
          <p
            className={`text-[11px] leading-snug sm:max-w-[28ch] ${
              dark ? "text-background/65" : "text-muted-foreground"
            }`}
          >
            {c.price}
          </p>
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 tg-card-eyebrow ${
              dark ? "text-accent" : "text-foreground"
            }`}
          >
            <span className={`h-px w-5 ${dark ? "bg-accent" : "bg-foreground"}`} />
            مشاهده
          </span>
        </div>
      </div>
    </article>
  );
};

export const LatestCarousel = () => (
  <section className="py-8 md:py-10 bg-secondary">
    <div className="tg-container">
      <SectionHeading
        eyebrow="تازه‌واردها"
        title="جدیدترین‌ها"
        description="نگاهی به آنچه اکنون تازه است بیندازید."
      />
    </div>

    <div>
      <Swiper
        dir="rtl"
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 20 },
          1280: { slidesPerView: 3.8, spaceBetween: 24 },
        }}
        className="tg-swiper"
      >
        {cards.map((c) => (
          <SwiperSlide key={c.title} className="!h-auto">
            <div className="h-full min-h-[460px] sm:min-h-0 sm:aspect-[3/4]">
              <ProductCard c={c} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);
