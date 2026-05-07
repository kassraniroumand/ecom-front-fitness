"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import posthog from "posthog-js";
import { ArrowUpRight, ChevronLeft, Phone, Plus, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { AdaptiveImage } from "@/components/site/AdaptiveImage";
import { ProductScrollGallery } from "@/components/site/ProductScrollGallery";
import {
  AccordionSection,
  type AccordionItemData,
} from "@/components/site/AccordionSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Category, CategoryProduct } from "@/lib/categories";

import "swiper/css";
import "swiper/css/pagination";

const lifestyleShots = [
  "/assets/cat-treadmills.jpg",
  "/assets/award-treadmill1.jpg",
  "/assets/award-treadmill2.jpg",
  "/assets/hero-gym.jpg",
];

const versionOptions = [
  { id: "standard", name: "استاندارد", img: "/assets/latest-run.png" },
  { id: "personal", name: "پرسونال", img: "/assets/latest-run.jpg" },
];

const bundles = [
  {
    name: "تکنوجیم مای‌ران + بنچ تکنوجیم",
    price: "۵,۰۵۰ پوند",
    img: "/assets/latest-recovery.jpg",
  },
  {
    name: "تکنوجیم مای‌ران + کیت ریکاوری",
    price: "۴,۲۰۰ پوند",
    img: "/assets/latest-recovery.jpg",
  },
  {
    name: "تکنوجیم مای‌ران + ست دمبل هوشمند",
    price: "۴,۸۹۰ پوند",
    img: "/assets/latest-dumbbells.jpg",
  },
];

const featureCards = [
  {
    title: "ترکیب کامل میرایی و بازگشت",
    img: "/assets/award-treadmill2.jpg",
  },
  {
    title: "سوزاندن کالری در سربالایی",
    desc: "تا ۱۲٪ شیب با کنترل دقیق برای تمرین HIIT.",
    img: "/assets/hero-gym.jpg",
  },
  {
    title: "متصل به دستگاه‌های شما",
    img: "/assets/treadmill.jpg",
  },
];

const specRow = (label: string, value: string) => (
  <div className="contents">
    <dt className="text-white/50">{label}</dt>
    <dd className="text-white">{value}</dd>
  </div>
);

const specsItems = (crumb: string): AccordionItemData[] => [
  {
    id: "performance",
    title: "عملکرد",
    content: (
      <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base">
        {specRow("حداکثر سرعت", "۲۰ کیلومتر بر ساعت")}
        {specRow("حداکثر شیب", "۱۲ درصد")}
        {specRow("سطح دویدن", "۵۰ × ۱۵۰ سانتی‌متر")}
        {specRow("ظرفیت کاربر", "تا ۱۸۰ کیلوگرم")}
      </dl>
    ),
  },
  {
    id: "dimensions",
    title: "ابعاد و وزن",
    content: (
      <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base">
        {specRow("طول", "۲۰۰ سانتی‌متر")}
        {specRow("عرض", "۸۸ سانتی‌متر")}
        {specRow("ارتفاع", "۱۴۵ سانتی‌متر")}
        {specRow("وزن دستگاه", "۱۳۵ کیلوگرم")}
      </dl>
    ),
  },
  {
    id: "tech",
    title: "فناوری و اتصال",
    content: (
      <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base">
        {specRow("نمایشگر", "۲۲ اینچ FullHD لمسی")}
        {specRow("اتصال", "Wi-Fi، بلوتوث، USB-C")}
        {specRow("اپلیکیشن", "تکنوجیم لایو + Apple Health")}
        {specRow("سیستم صوتی", "بلندگوی استریو دو کاناله")}
      </dl>
    ),
  },
  {
    id: "build",
    title: "ساخت و گارانتی",
    content: (
      <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base">
        {specRow("کشور سازنده", "ایتالیا — چزنا")}
        {specRow("دسته‌بندی", crumb)}
        {specRow("گارانتی", "۳ سال رسمی")}
        {specRow("نصب", "رایگان توسط تیم تخصصی")}
      </dl>
    ),
  },
];

const faqItems: AccordionItemData[] = [
  {
    id: "warranty",
    title: "گارانتی این محصول چند سال است و شامل چه مواردی می‌شود؟",
    content: (
      <p className="max-w-2xl">
        ۳ سال گارانتی رسمی تکنوجیم شامل بدنه، موتور و قطعات الکترونیکی. خدمات پس
        از فروش در سراسر کشور با اعزام تکنسین در محل ارائه می‌شود.
      </p>
    ),
  },
  {
    id: "shipping",
    title: "زمان ارسال و نصب چقدر طول می‌کشد؟",
    content: (
      <p className="max-w-2xl">
        ارسال طی ۲ تا ۴ هفته‌ی کاری از تأیید سفارش انجام می‌شود. نصب توسط تیم
        تخصصی تکنوجیم در منزل شما به‌صورت رایگان صورت می‌گیرد.
      </p>
    ),
  },
  {
    id: "finance",
    title: "آیا امکان خرید اقساطی وجود دارد؟",
    content: (
      <p className="max-w-2xl">
        بله. تا ۳۶ ماه پرداخت اقساطی با بهره‌ی ۰٪ از طریق همکاران بانکی ما در
        دسترس است. شرایط در صفحه‌ی پرداخت قابل مشاهده است.
      </p>
    ),
  },
  {
    id: "subscription",
    title: "اشتراک تکنوجیم پلاس برای چه چیزی لازم است؟",
    content: (
      <p className="max-w-2xl">
        اشتراک تکنوجیم پلاس امکان دسترسی به کلاس‌های زنده، برنامه‌های شخصی‌سازی
        شده و آرشیو کامل تمرین‌ها را فراهم می‌کند. ماه اول رایگان است.
      </p>
    ),
  },
  {
    id: "service",
    title: "آیا سرویس دوره‌ای محصول لازم است؟",
    content: (
      <p className="max-w-2xl">
        بازدید دوره‌ای سالی یک‌بار توسط تکنسین تکنوجیم توصیه می‌شود. در سال اول
        رایگان است و پس از آن طبق قرارداد سرویس قابل تمدید است.
      </p>
    ),
  },
];

type Props = {
  product: CategoryProduct;
  category: Category;
  related: CategoryProduct[];
};

export const ProductView = ({ product, category }: Props) => {
  const [version, setVersion] = useState(versionOptions[0].id);

  useEffect(() => {
    posthog.capture("product_viewed", {
      product_id: product.id,
      product_name: product.name,
      category: category.crumb,
      category_slug: category.slug,
      price: product.price,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const handleAddToCart = () => {
    const selected = versionOptions.find((v) => v.id === version);
    posthog.capture("add_to_cart_clicked", {
      product_id: product.id,
      product_name: product.name,
      category: category.crumb,
      category_slug: category.slug,
      price: product.price,
      version_id: version,
      version_name: selected?.name,
    });
  };

  const handleVersionSelect = (id: string) => {
    setVersion(id);
    const selected = versionOptions.find((v) => v.id === id);
    posthog.capture("product_version_selected", {
      product_id: product.id,
      version_id: id,
      version_name: selected?.name,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-clip">
      <main className="flex-1 min-w-0">
        {/* Breadcrumb — small editorial */}
        {/*<div className="tg-container px-4">*/}
        {/*  <nav*/}
        {/*    aria-label="مسیر"*/}
        {/*    className="flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground"*/}
        {/*  >*/}
        {/*    <Link href="/category" className="hover:text-foreground transition">*/}
        {/*      همه‌ی محصولات*/}
        {/*    </Link>*/}
        {/*    <span className="opacity-50">|</span>*/}
        {/*    <Link*/}
        {/*      href={`/category/${category.slug}`}*/}
        {/*      className="hover:text-foreground transition"*/}
        {/*    >*/}
        {/*      {category.crumb}*/}
        {/*    </Link>*/}
        {/*  </nav>*/}
        {/*</div>*/}

        {/* Main split */}
        <section className="min-w-0">
          <div className="grid grid-cols-12 gap-1 lg:gap-2 min-w-0">
            {/* LEFT — gallery: Swiper on phone, stacked grid on desktop */}
            <div className="col-span-12 lg:col-span-7 min-w-0">
              {/* Phone: horizontal Swiper */}
              <div className="lg:hidden">
                <Swiper
                  modules={[Pagination]}
                  dir="rtl"
                  pagination={{ clickable: true }}
                  spaceBetween={0}
                  slidesPerView={1}
                  className="tg-pdp-swiper"
                >
                  <SwiperSlide>
                    <div className="relative aspect-[4/3] w-full bg-[#d5d6cf] overflow-hidden">
                      <AdaptiveImage
                        src={product.img}
                        alt={product.name}
                        variant="light"
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                      {product.badge && (
                        <span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.18em] bg-foreground text-background px-2.5 py-1">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </SwiperSlide>
                  {lifestyleShots.map((src, i) => (
                    <SwiperSlide key={src}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#d5d6cf]">
                        <Image
                          src={src}
                          alt={`${product.name} — تصویر ${i + 1}`}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop: stacked gallery */}
              <div className="hidden lg:block space-y-5 bg-[#f3f3f3]">
                <div className="relative aspect-[4/3] w-full overflow-hidden ">
                  <AdaptiveImage
                    src={product.img}
                    alt={product.name}
                    variant="light"
                    fill
                    sizes="58vw"
                    className="object-contain p-20"
                  />
                  {product.badge && (
                    <span className="absolute top-5 right-5 text-[10px] font-black tracking-[0.18em] bg-foreground text-background px-2.5 py-1">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {lifestyleShots.map((src, i) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden bg-[#d5d6cf]"
                    >
                      <Image
                        src={src}
                        alt={`${product.name} — تصویر ${i + 1}`}
                        fill
                        sizes="28vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — buy panel */}
            <div className="col-span-12 lg:col-span-5 min-w-0  p-4">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                {/* Eyebrow + title + subtitle */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground mb-3">
                    سری — مای
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] [overflow-wrap:anywhere] [word-break:break-word]">
                    {product.name}
                  </h1>
                  <p className="mt-2 text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground">
                    تردمیل جمع‌وجور · {category.crumb}
                  </p>
                </div>

                {/* Marketing description */}
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed [overflow-wrap:anywhere]">
                  مهندسی‌شده برای دویدن واقعی در خانه — نرم، کم‌صدا و متصل به اپلیکیشن تکنوجیم برای تجربه‌ای کامل.
                </p>

                <a
                  href="#tech-spec"
                  className="self-start text-xs font-bold underline underline-offset-4 decoration-foreground/40 hover:text-accent hover:decoration-accent transition"
                >
                  مشخصات فنی
                </a>

                {/* Membership / subscription card */}
                <a
                  href="#"
                  className="group flex items-center gap-3 border border-border p-3.5 bg-card hover:border-foreground transition-colors"
                >
                  <span
                    aria-hidden
                    className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-foreground text-background text-[11px] font-black tracking-tight"
                  >
                    TG+
                  </span>
                  <div className="flex-1 flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                    <span className="font-bold text-sm">تکنوجیم پلاس</span>
                    <span className="inline-flex items-center text-[9px] font-black tracking-[0.18em] uppercase bg-emerald-100 text-emerald-800 px-2 py-1 rounded-sm">
                      ۱ ماه رایگان
                    </span>
                  </div>
                  <ChevronLeft className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition" />
                </a>

                {/* Price block */}
                <div className="border-t border-border pt-5">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl md:text-4xl font-black tabular-nums tracking-tight">
                      {product.price}
                    </span>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      / ۹۱.۲۵ پوند در ماه
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {product.finance}.{" "}
                    <a
                      href="#"
                      className="underline underline-offset-2 hover:text-foreground"
                    >
                      اطلاعات بیشتر
                    </a>
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground/80 leading-relaxed">
                    اعتبار سفارش بسته به بررسی موسسه‌ی مالی است.
                  </p>
                </div>

                {/* Info lines */}
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>شامل مالیات، ارسال و نصب رایگان.</li>
                  <li>
                    <a
                      href="#"
                      className="underline underline-offset-2 hover:text-foreground"
                    >
                      ارسال طی ۴ هفته از تأیید سفارش
                    </a>
                  </li>
                </ul>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-accent text-accent-foreground font-black uppercase tracking-[0.18em] text-sm px-6 py-4 rounded-sm hover:brightness-95 transition"
                >
                  افزودن به سبد خرید
                </button>

                {/* Secondary CTAs */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:08003162496"
                    className="inline-flex items-center justify-center gap-2 border border-foreground py-3 text-xs font-black tracking-[0.18em] uppercase rounded-sm hover:bg-foreground hover:text-background transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    ۰۸۰۰۳۱۶۲۴۹۶
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 border border-foreground py-3 text-xs font-black tracking-[0.18em] uppercase rounded-sm hover:bg-foreground hover:text-background transition"
                  >
                    تماس با ما
                  </a>
                </div>

                {/* Accordions — each item gets its own Accordion */}
                <div id="tech-spec" className="border-t border-border">
                  <a
                    href="#features"
                    className="group flex w-full items-center justify-between border-b border-border py-4 text-xs font-black tracking-[0.22em] uppercase transition-colors hover:text-accent"
                  >
                    <span>ویژگی‌ها</span>
                    <ArrowUpRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href="#faqs"
                    className="group flex w-full items-center justify-between border-b border-border py-4 text-xs font-black tracking-[0.22em] uppercase transition-colors hover:text-accent"
                  >
                    <span>پرسش‌های متداول</span>
                    <ArrowUpRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        type="button"
                        id="tech-spec"
                        className="group flex w-full items-center justify-between border-b border-border py-4 text-xs font-black tracking-[0.22em] uppercase transition-colors hover:text-accent"
                      >
                        <span>مشخصات فنی</span>
                        <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                      </button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      showCloseButton={false}
                      className="w-full sm:max-w-[480px] gap-0 border-0 bg-background p-0 shadow-none duration-300"
                    >
                      <div className="relative flex h-full flex-col">
                        <SheetClose asChild>
                          <button
                            aria-label="بستن"
                            className="absolute -left-5 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background"
                          >
                            <X className="h-4 w-4" strokeWidth={2} />
                          </button>
                        </SheetClose>

                        <div className="border-b border-foreground/15 px-7 py-6 md:px-9">
                          <SheetTitle className="tg-card-eyebrow text-foreground">
                            مشخصات فنی
                          </SheetTitle>
                          <p className="mt-2 text-base font-bold tracking-tight text-foreground">
                            {product.name}
                          </p>
                        </div>

                        <div className="flex-1 overflow-y-auto px-7 py-2 md:px-9">
                          <dl className="divide-y divide-foreground/10">
                            <div className="grid grid-cols-3 gap-4 py-4 text-sm">
                              <dt className="col-span-1 text-muted-foreground">دسته</dt>
                              <dd className="col-span-2 font-bold">{category.crumb}</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4 py-4 text-sm">
                              <dt className="col-span-1 text-muted-foreground">ساخت</dt>
                              <dd className="col-span-2 font-bold">ایتالیا — چزنا</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4 py-4 text-sm">
                              <dt className="col-span-1 text-muted-foreground">گارانتی</dt>
                              <dd className="col-span-2 font-bold">۳ سال</dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4 py-4 text-sm">
                              <dt className="col-span-1 text-muted-foreground">اتصال</dt>
                              <dd className="col-span-2 font-bold">
                                وای‌فای، بلوتوث، اپلیکیشن تکنوجیم
                              </dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4 py-4 text-sm">
                              <dt className="col-span-1 text-muted-foreground">نصب</dt>
                              <dd className="col-span-2 font-bold">
                                رایگان توسط تیم تخصصی
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductScrollGallery />

        <AccordionSection heading="مشخصات" items={specsItems(category.crumb)} />
        <AccordionSection id="faqs" heading="پرسش‌های متداول" items={faqItems} />

        {/* Promo: collab band */}
        {/*<section className="bg-foreground text-background">*/}
        {/*  <div className="tg-container px-4 py-12 md:py-16">*/}
        {/*    <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-background/60 mb-4 md:mb-6">*/}
        {/*      کلابوریشن*/}
        {/*    </p>*/}
        {/*    <div className="bg-secondary text-foreground p-5 md:p-10 grid grid-cols-1 md:grid-cols-[42%_1fr] gap-6 md:gap-10 items-center">*/}
        {/*      <div className="relative aspect-[4/3] w-full bg-background overflow-hidden">*/}
        {/*        <Image*/}
        {/*          src="/assets/award-treadmill3.jpg"*/}
        {/*          alt="نسخه‌ی محدود دیور و تکنوجیم"*/}
        {/*          fill*/}
        {/*          sizes="(min-width: 768px) 40vw, 90vw"*/}
        {/*          className="object-cover"*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div className="flex flex-col gap-4 items-start min-w-0">*/}
        {/*        <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-[1.05] [overflow-wrap:anywhere]">*/}
        {/*          دیور × تکنوجیم — نسخه‌ی محدود*/}
        {/*        </h2>*/}
        {/*        <p className="text-sm md:text-base text-foreground/75 leading-relaxed [overflow-wrap:anywhere] max-w-prose">*/}
        {/*          همکاری مشترک برای تجربه‌ی تمرین در خانه با طراحی منحصربه‌فرد و*/}
        {/*          متریال‌های لوکس.*/}
        {/*        </p>*/}
        {/*        <a*/}
        {/*          href="#"*/}
        {/*          className="mt-2 inline-flex items-center gap-2 bg-background text-foreground rounded-full px-5 py-2.5 text-xs font-black tracking-[0.2em] uppercase hover:bg-accent hover:text-accent-foreground transition"*/}
        {/*        >*/}
        {/*          بیشتر بدانید*/}
        {/*          <ArrowUpRight className="w-3.5 h-3.5" />*/}
        {/*        </a>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* Feature section on dark */}
        {/*<section className="bg-foreground text-background">*/}
        {/*  <div className="tg-container px-4 pt-4 pb-16 md:pt-6 md:pb-24 min-w-0">*/}
        {/*    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] max-w-3xl mb-10 md:mb-14 [overflow-wrap:anywhere]">*/}
        {/*      دویدن و پیاده‌روی برتر برای هر خانه*/}
        {/*    </h2>*/}
        {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">*/}
        {/*      {featureCards.map((c) => (*/}
        {/*        <article*/}
        {/*          key={c.title}*/}
        {/*          className="group relative isolate aspect-[3/4] overflow-hidden bg-foreground"*/}
        {/*        >*/}
        {/*          <Image*/}
        {/*            src={c.img}*/}
        {/*            alt={c.title}*/}
        {/*            fill*/}
        {/*            sizes="(min-width: 768px) 33vw, 100vw"*/}
        {/*            className="absolute inset-0 -z-20 object-cover transition-transform duration-700 group-hover:scale-[1.04]"*/}
        {/*          />*/}
        {/*          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />*/}
        {/*          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">*/}
        {/*            <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight [overflow-wrap:anywhere]">*/}
        {/*              {c.title}*/}
        {/*            </h3>*/}
        {/*            {c.desc && (*/}
        {/*              <p className="mt-2 text-xs md:text-sm text-background/80 leading-relaxed [overflow-wrap:anywhere]">*/}
        {/*                {c.desc}*/}
        {/*              </p>*/}
        {/*            )}*/}
        {/*            <span*/}
        {/*              aria-hidden*/}
        {/*              className="mt-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-background/15 text-background transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-[-12deg]"*/}
        {/*            >*/}
        {/*              <ArrowUpRight className="w-4 h-4" />*/}
        {/*            </span>*/}
        {/*          </div>*/}
        {/*        </article>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </main>
    </div>
  );
};
