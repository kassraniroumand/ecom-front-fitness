"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CardVariant = "feature" | "editorial";

type Card = {
  variant: CardVariant;
  title: string;
  description: string;
  image: string;
};

const cards: Card[] = [
  {
    variant: "feature",
    title: "قدرت بیشتر برای پاها، باسن و شکم",
    description:
      "وزنه را انتخاب کن، دسته‌ها را بگیر و فشار بده. تردمیل HIIT می‌تواند مقاومت یک سورتمه را شبیه‌سازی کند تا تمرین‌های انفجاری پلایومتریک، استقامت و قدرت را در یک دستگاه فراهم کند.",
    image: "/assets/strength.jpg",
  },
  {
    variant: "editorial",
    title: "تجربه دویدن بی‌نهایت",
    description:
      "سطح دویدن وفق‌پذیر با میرایی هیدرولیکی تا فشار را از مفاصل دور کند. هر گام نرم‌تر، هر کیلومتر طبیعی‌تر.",
    image: "/assets/award-treadmill1.jpg",
  },
  {
    variant: "editorial",
    title: "سینمای خانگی برای تمرینی غرق‌کننده",
    description:
      "نمایشگر ۲۲ اینچی FullHD با اپلیکیشن تکنوجیم، اتصال مستقیم به Netflix و Disney+، و کلاس‌های زنده استودیویی.",
    image: "/assets/hero-gym.jpg",
  },
  {
    variant: "feature",
    title: "ساخته‌شده برای سکوت، طراحی‌شده برای تمرکز",
    description:
      "موتور بی‌صدا با عایق‌بندی پیشرفته و سیستم میرایی چندلایه. کمتر از ۵۸ دسی‌بل در دویدن — بی‌صدا برای ساکنان همسایه.",
    image: "/assets/award-treadmill2.jpg",
  },
  {
    variant: "editorial",
    title: "وفق‌پذیر با هر گام",
    description:
      "حسگرهای زیر سطح دویدن، طول گام و توزیع وزن را در زمان واقعی می‌سنجند تا میرایی را خودکار تنظیم کنند.",
    image: "/assets/cat-treadmills.jpg",
  },
  {
    variant: "feature",
    title: "متصل به دنیای شما",
    description:
      "همگام‌سازی با اپلیکیشن تکنوجیم، استریم کلاس‌های زنده، و پشتیبانی از Apple Watch، Garmin و Strava.",
    image: "/assets/latest-watch.jpg",
  },
];

export function ProductScrollGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateRange, setTranslateRange] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const viewport = section.querySelector("[data-pin-viewport]");
      const trackContainer = section.querySelector("[data-pin-track-area]");
      const trackContainerWidth =
        trackContainer?.getBoundingClientRect().width ?? 0;
      const trackWidth = track.scrollWidth;
      const range = Math.max(trackWidth - trackContainerWidth, 0);
      setTranslateRange(range);
      const viewportHeight = (viewport as HTMLElement)?.offsetHeight ?? 0;
      section.style.setProperty(
        "--pin-wrapper-height",
        `${viewportHeight + range}px`,
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, translateRange]);

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{ height: "var(--pin-wrapper-height, 300vh)" }}
      className="relative bg-[#0a0a0a] text-white scroll-mt-24"
      dir="rtl"
    >
      <div
        data-pin-viewport
        className="sticky top-0 h-screen overflow-hidden flex items-center"
      >
        <div className="grid grid-cols-12 w-full h-full items-center">
          <div className="col-span-12 md:col-span-4 lg:col-span-3 px-4 pt-6 md:px-8 lg:px-10 flex flex-col justify-start h-fit">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/50 mb-4">
              مهندسی شده در هر جزء
            </span>
            <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-[1.1] text-white max-w-md [overflow-wrap:anywhere]">
              مهندسی شده در هر جزئیات برای حداکثر راحتی، کنترل و سکوت در دویدن
            </h2>
            <div className="mt-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.18em] text-white/60">
              <span className="h-px w-8 bg-white/40" />
              <span>اسکرول کنید</span>
            </div>
          </div>

          <div
            data-pin-track-area
            className="col-span-12 md:col-span-8 lg:col-span-9 h-full overflow-hidden flex items-center"
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 pl-6 pr-6 md:pl-10 md:pr-10 will-change-transform"
            >
              {cards.map((card, i) => (
                <CardItem key={i} card={card} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardItem({ card }: { card: Card }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative shrink-0 w-[78vw] sm:w-[60vw] md:w-[420px] lg:w-[520px] aspect-[5/7] overflow-hidden bg-neutral-900 text-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(min-width: 1024px) 520px, (min-width: 768px) 420px, 78vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {card.variant === "feature" ? (
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          ) : (
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
          )}

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold leading-snug text-white max-w-[26ch]">
              {card.title}
            </h3>

            {card.variant === "feature" && (
              <>
                <p className="text-sm md:text-base text-white/75 leading-relaxed line-clamp-2 max-w-[36ch]">
                  {card.description}
                </p>
                <span
                  aria-hidden
                  className="mt-2 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-white"
                >
                  <ArrowUpRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
                </span>
              </>
            )}
          </div>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="!fixed !inset-0 !top-0 !start-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !rounded-none !p-0 !gap-0 !bg-[#0a0a0a] !text-white !ring-0 border-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">{card.title}</DialogTitle>

        <DialogClose asChild>
          <button
            type="button"
            aria-label="بستن"
            className="absolute top-5 start-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </DialogClose>

        <div className="flex flex-col md:flex-row-reverse h-full w-full">
          {/* Text panel — DOM 1, visually right on desktop, below on mobile */}
          <div className="order-2 md:order-1 flex-1 flex flex-col justify-center px-6 py-10 md:px-12 lg:px-20 md:py-0 overflow-y-auto">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] text-white/50 mb-5">
              {card.variant === "feature" ? "ویژگی" : "تجربه"}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white max-w-2xl [overflow-wrap:anywhere]">
              {card.title}
            </h2>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-white/75 leading-relaxed max-w-xl [overflow-wrap:anywhere]">
              {card.description}
            </p>
            <div className="mt-8 md:mt-10 flex items-center gap-4 text-xs font-bold tracking-[0.18em] text-white/60">
              <span className="h-px w-10 bg-white/40" />
              <span>تکنوجیم — مهندسی در ایتالیا</span>
            </div>
          </div>

          {/* Image panel — DOM 2, visually left on desktop, top on mobile */}
          <div className="order-1 md:order-2 relative w-full h-[42vh] md:h-full md:w-1/2 shrink-0 bg-neutral-900">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
