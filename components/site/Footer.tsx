"use client";

import { ChevronLeft, MapPin } from "lucide-react";
import posthog from "posthog-js";

const ctas = [
  { title: "به جامعه بپیوندید", cta: "عضو شوید", icon: "chevron" as const },
  { title: "از بوتیک‌های ما دیدن کنید", cta: "نزدیک‌ترین را پیدا کنید", icon: "pin" as const },
  { title: "تکنوجیم برای کسب‌وکار", cta: "کاوش سایت", icon: "chevron" as const },
];

const linkCols = [
  {
    title: "محصولات",
    links: ["تردمیل‌ها", "دوچرخه‌ها", "اسکی فضایی", "روئینگ", "قدرتی", "ابزار تمرین"],
  },
  {
    title: "پشتیبانی",
    links: ["تماس", "پشتیبانی مشتریان", "طراحی باشگاه خانگی", "آموزش آنلاین", "پشتیبانی بازاریابی"],
  },
  {
    title: "شرکت",
    links: ["تندرستی", "طراحی", "داستان‌ها", "پایداری", "روابط سرمایه‌گذاران", "همکاری با ما"],
  },
];

const socials = ["اینستاگرام", "تیک‌تاک", "ایکس", "فیسبوک", "لینکدین", "یوتیوب"];

export const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="tg-container pt-10">
      <div className="grid md:grid-cols-3 gap-3">
        {ctas.map((c) => (
          <div
            key={c.title}
            className="bg-accent text-accent-foreground rounded-none p-6 md:p-8 min-h-[220px] flex flex-col justify-between"
          >
            <h3 className="text-xl md:text-2xl font-black uppercase leading-tight max-w-[14ch]">
              {c.title}
            </h3>
            <button className="self-start inline-flex items-center gap-2 border border-accent-foreground rounded px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-accent-foreground hover:text-accent transition">
              {c.icon === "pin" ? (
                <MapPin className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
              {c.cta}
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="tg-container py-12">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-background/[0.04] rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-4">
              عضویت در خبرنامه
            </h4>
            <p className="text-sm text-background/60 max-w-xs leading-relaxed">
              آخرین اخبار و رویدادها را دریافت کنید تا الهام بگیرید و سریع‌تر به اهداف خود برسید.
            </p>
          </div>
          <button
            onClick={() => posthog.capture("newsletter_subscribe_clicked")}
            className="self-start inline-flex items-center gap-2 border border-background/40 rounded px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-background hover:text-foreground transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            اکنون مشترک شوید
          </button>
        </div>

        <div className="lg:col-span-5 grid grid-cols-3 gap-6">
          {linkCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-background/75 hover:text-accent transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 lg:border-r lg:border-background/10 lg:pr-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-background/60 mb-5">
            با ما در ارتباط باشید
          </h4>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s}>
                <a href="#" className="text-sm font-bold uppercase tracking-[0.15em] hover:text-accent transition">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-background/10">
      <div className="tg-container py-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em]">
        <button className="inline-flex items-center gap-2 hover:text-accent transition">
          <ChevronLeft className="w-3.5 h-3.5" />
          ایده‌های خود را به اشتراک بگذارید
        </button>
        <button className="inline-flex items-center gap-2 hover:text-accent transition">
          <MapPin className="w-3.5 h-3.5" />
          ایران
        </button>
      </div>
    </div>

    <div className="tg-container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <span className="bg-accent text-accent-foreground font-black tracking-tighter px-2 py-1 text-base rounded-sm inline-block">
          تکنوجیم
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.2em] leading-snug">
          بیایید حرکت کنیم
          <br />
          برای دنیایی بهتر.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-background/70">
          اپ تکنوجیم را دانلود کنید
        </span>
        <a
          href="#"
          onClick={() => posthog.capture("app_download_clicked", { store: "google_play" })}
          className="inline-flex items-center gap-2 bg-background text-foreground rounded-md px-3 py-2 text-[10px] font-bold uppercase"
        >
          ▶ Google Play
        </a>
        <a
          href="#"
          onClick={() => posthog.capture("app_download_clicked", { store: "app_store" })}
          className="inline-flex items-center gap-2 bg-background text-foreground rounded-md px-3 py-2 text-[10px] font-bold uppercase"
        >
           App Store
        </a>
      </div>
    </div>
  </footer>
);
