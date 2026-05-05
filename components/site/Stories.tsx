"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArrowRight } from "lucide-react";

const stories = [
  { tag: "طراحی", title: "تندرستی به‌عنوان لوکس‌گرایی نوین در طراحی خانه", img: "/assets/treadmill.jpg" },
  { tag: "عملکرد", title: "ورزشکاران نخبه چگونه برای المپیک تمرین می‌کنند", img: "/assets/strength.jpg" },
  { tag: "تندرستی", title: "علم پشت ریکاوری فعال", img: "/assets/wellness.jpg" },
  { tag: "دوچرخه", title: "دوچرخه‌سواری داخل خانه: تجربه استودیویی در منزل", img: "/assets/bike.jpg" },
  { tag: "نوآوری", title: "درون آزمایشگاه طراحی هوشمندترین باشگاه جهان", img: "/assets/hero-gym.jpg" },
];

export const Stories = () => (
  <section className="py-8 md:py-10 bg-secondary">
    <div className="tg-container">
      <SectionHeading
        eyebrow="داستان‌ها"
        title="درون فرهنگ تندرستی"
        description="آخرین داستان‌ها، الهام‌ها و دیدگاه‌ها از دنیای تندرستی."
      >
        <a href="#" className="hidden md:inline-flex tg-btn-outline mt-2">
          همه داستان‌ها <ArrowRight className="w-4 h-4 rotate-180" />
        </a>
      </SectionHeading>
    </div>

    <div>
      <Swiper
        dir="rtl"
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="tg-swiper"
      >
        {stories.map((s) => (
          <SwiperSlide key={s.title} className="!h-auto">
            <article className="group h-full">
              <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-card mb-4">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                  loading="lazy"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <p className="tg-card-eyebrow text-accent-foreground bg-accent inline-block px-2 py-1 mb-3">{s.tag}</p>
              <h3 className="tg-card-title">{s.title}</h3>
              <a href="#" className="inline-flex items-center gap-1 mt-3 text-xs font-bold uppercase tracking-wider">
                ادامه مطلب <ArrowRight className="w-3 h-3 rotate-180" />
              </a>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);
