"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const slides = [
  {
    img: "/assets/hero-gym.jpg",
    eyebrow: "۱یونیکا®",
    title: "حداکثر عملکرد\nدر کمترین فضا",
    copy: "بیش از ۵۰ تمرین در یک دستگاه — تمرین کل بدن تنها در ۱.۵ متر مربع.",
    cta: "کشف یونیکا",
  },
  {
    img: "/assets/treadmill.jpg",
    eyebrow: "ران پرسونال",
    title: "تردمیل،\nبازطراحی شده",
    copy: "نمادی از طراحی و عملکرد، طراحی شده تا دویدن در خانه تجربه‌ای بی‌نظیر باشد.",
    cta: "کشف ران",
  },
  {
    img: "/assets/bike.jpg",
    eyebrow: "بایک پرسونال",
    title: "با سبک رکاب بزن.\nبا هدف تمرین کن.",
    copy: "کلاس‌های زنده و ضبط‌شده که تجربه استودیو را به خانه شما می‌آورد.",
    cta: "کشف بایک",
  },
  {
    img: "/assets/strength.jpg",
    eyebrow: "مجموعه قدرتی",
    title: "قدرت بساز.\nبدنت را شکل بده.",
    copy: "تجهیزات قدرتی پریمیوم برای نتایج عالی و الهام‌بخش.",
    cta: "کشف قدرت",
  },
];

export const HeroSwiper = () => (
  <section className="relative w-full overflow-hidden md:h-[86vh] md:min-h-[600px] md:max-h-[820px]">
    <Swiper
      modules={[Autoplay, EffectFade, Navigation]}
      dir="rtl"
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5500, disableOnInteraction: false }}
      loop
      navigation
      className="h-full w-full tg-hero-swiper"
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i}>
          <div className="grid h-full grid-cols-1 md:grid-cols-[3fr_2fr]">
            <div className="relative aspect-[3/4] md:aspect-auto md:h-full order-1">
              <Image
                src={s.img}
                alt={s.eyebrow}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="order-2 flex flex-col justify-center bg-secondary text-foreground px-6 sm:px-10 md:px-10 lg:px-16 py-10 md:py-0">
              <div className="text-base md:text-xl font-black tracking-tighter mb-4">
                {s.eyebrow}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1] max-w-xl whitespace-pre-line font-bold">
                {s.title}
              </h1>
              <p className="mt-4 max-w-md text-sm text-foreground/75 leading-relaxed">
                {s.copy}
              </p>
              <div>
                <a href="#shop" className="tg-btn-yellow mt-6">
                  {s.cta} <ChevronRight className="w-4 h-4 rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
