"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const items = [
  { title: "تردمیل‌ها", count: 12, img: "/assets/cat-treadmills.jpg" },
  { title: "دوچرخه‌ها", count: 9, img: "/assets/cat-bikes.jpg" },
  { title: "نیمکت‌های وزنه", count: 7, img: "/assets/cat-benches.jpg" },
  { title: "مولتی‌جیم", count: 5, img: "/assets/cat-multigym.jpg" },
  { title: "اسکی فضایی", count: 6, img: "/assets/cat-cross.jpg" },
  { title: "روئینگ", count: 4, img: "/assets/cat-rowers.jpg" },
  { title: "وزنه آزاد", count: 18, img: "/assets/cat-freeweights.jpg" },
];

const Card = ({ it }: { it: (typeof items)[number] }) => (
  <a
    href="#"
    className="group relative block aspect-[3/4] overflow-hidden rounded-none bg-card h-full shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)] transition-shadow duration-500"
  >
    <Image
      src={it.img}
      alt={it.title}
      fill
      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
      loading="lazy"
      className="object-cover transition duration-[900ms] ease-out group-hover:scale-[1.06]"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-transparent" />

    <span className="absolute top-4 right-4 inline-flex items-center tg-card-eyebrow text-background/90 bg-background/10 backdrop-blur-md border border-background/25 rounded-full px-2.5 py-1">
      {it.count} مدل
    </span>

    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h3 className="tg-card-title text-accent truncate">
          {it.title}
        </h3>
        <span className="block mt-1 tg-card-eyebrow text-background/80 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
          کشف کنید
        </span>
      </div>

      <span
        aria-hidden
        className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground shadow-md transition duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110"
      >
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </div>
  </a>
);

export const ShopByCategory = () => (
  <section className="py-8 px-2 sm:px-4 md:py-10 bg-background">
    <div className="tg-container">
      <SectionHeading
        align="center"
        eyebrow="مجموعه"
        title="خرید بر اساس دسته‌بندی"
        description="مجموعه کامل تجهیزات تمرینی پریمیوم ما را برای هر رشته‌ای کشف کنید."
      >
        <a
          href="#"
          className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition"
        >
          مشاهده همه دسته‌ها
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </SectionHeading>
    </div>

    <div>
      <Swiper
        dir="rtl"
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 24 },
          1280: { slidesPerView: 4.2, spaceBetween: 24 },
        }}
        className="tg-swiper"
      >
        {items.map((it) => (
          <SwiperSlide key={it.title} className="!h-auto">
            <Card it={it} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);
