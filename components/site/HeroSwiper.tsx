"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { ChevronRight } from "lucide-react";
import posthog from "posthog-js";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

export type HeroSlide = {
  img: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  accent: string;
};

export const HeroSwiper = ({ slides }: { slides: HeroSlide[] }) => (
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

            {/* desktop */}
            <div className="hidden sm:flex order-2  flex-col justify-between bg-secondary text-foreground py-10 px-4 md:py-0">
              <div
                id={"text-container"}
                className="px-1 md:pt-24 lg:pt-28"
              >
                <div className="text-base md:text-xl font-black tracking-tighter mb-4">
                  {s.eyebrow}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1] max-w-xl whitespace-pre-line font-bold">
                  {s.title}
                </h1>
                <p className="mt-4 max-w-md text-sm text-foreground/75 leading-relaxed">
                  {s.body}
                </p>
                <div>
                  <a
                    href="#shop"
                    onClick={() =>
                      posthog.capture("hero_cta_clicked", {
                        slide_index: i,
                        slide_eyebrow: s.eyebrow,
                        cta_label: s.cta,
                      })
                    }
                    className="tg-btn-yellow mt-6"
                  >
                    {s.cta} <ChevronRight className="w-4 h-4 rotate-180" />
                  </a>
                </div>
              </div>

              <div className="relative hidden md:block w-full aspect-[4/3] mt-8 md:mt-12 bg-[#e3e3e3]">
                <Image
                  src={s.accent}
                  alt={s.eyebrow}
                  fill
                  sizes="40vw"
                  className="object-contain object-end"
                />
              </div>
            </div>

            {/* phone */}
            <div className="grid sm:hidden order-2 grid-cols-2 justify-between bg-secondary text-foreground py-2 md:py-0">
              <div
                  id={"text-container"}
                  className="px-1 md:pt-24 lg:pt-28"
              >
                <div className="text-base md:text-xl font-black tracking-tighter mb-4">
                  {s.eyebrow}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1] max-w-xl whitespace-pre-line font-bold">
                  {s.title}
                </h1>

                <div>
                  <a
                      href="#shop"
                      onClick={() =>
                          posthog.capture("hero_cta_clicked", {
                            slide_index: i,
                            slide_eyebrow: s.eyebrow,
                            cta_label: s.cta,
                          })
                      }
                      className="tg-btn-yellow mt-6"
                  >
                    {s.cta} <ChevronRight className="w-4 h-4 rotate-180" />
                  </a>
                </div>
              </div>

              <div className="relative md:block w-full h-full aspect-[4/3]  bg-[#e3e3e3]">
                <Image
                    src={s.accent}
                    alt={s.eyebrow}
                    fill
                    sizes="40vw"
                    className="object-contain object-end"
                />
              </div>
            </div>


          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
