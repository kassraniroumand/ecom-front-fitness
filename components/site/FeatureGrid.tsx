"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";
import "swiper/css";
import { SectionHeading } from "@/components/site/SectionHeading";

export type FeatureItem = {
  title: string;
  subtitle: string;
  img: string;
};

const Card = ({ it }: { it: FeatureItem }) => (
  <a
    href="#"
    className="group relative block aspect-[2/3] md:aspect-[3/4] overflow-hidden bg-card h-full"
  >
    <Image
      src={it.img}
      alt={it.title}
      fill
      sizes="(min-width: 768px) 50vw, 85vw"
      loading="lazy"
      className="object-cover transition duration-[900ms] ease-out group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-end justify-between gap-4 text-background">
      <div className="min-w-0">
        <h3 className="tg-card-title text-background">{it.title}</h3>
        <p className="mt-2 text-sm text-background/80">{it.subtitle}</p>
      </div>
      <span
        aria-hidden
        className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground transition duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110"
      >
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </div>
  </a>
);

export const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
  <section className="py-8 md:py-12 bg-background sm:px-4">
    <div className="tg-container">
      <SectionHeading
        eyebrow="ویژگی‌ها"
        title="یک اکوسیستم کامل تمرینی"
        description="هر آنچه برای یک سبک زندگی فعال نیاز دارید — در یک نگاه."
      />
    </div>

    <div className="hidden md:block">
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {items.map((it) => (
          <Card key={it.title} it={it} />
        ))}
      </div>
    </div>

    <div className="md:hidden">
      <Swiper
        modules={[FreeMode]}
        dir="rtl"
        freeMode
        slidesPerView={1.15}
        spaceBetween={12}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        breakpoints={{
          640: { slidesPerView: 1.6, spaceBetween: 16, slidesOffsetBefore: 24, slidesOffsetAfter: 24 },
        }}
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
