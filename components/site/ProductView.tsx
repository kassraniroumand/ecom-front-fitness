"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import posthog from "posthog-js";
import {
  ArrowUpRight,
  ChevronLeft,
  Check,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AdaptiveImage } from "@/components/site/AdaptiveImage";
import type { Category, CategoryProduct } from "@/lib/categories";

import "swiper/css";
import "swiper/css/navigation";

const colorOptions = [
  { id: "graphite", name: "گرافیت", swatch: "#1c1c1c" },
  { id: "ivory", name: "صدفی", swatch: "#ece7da" },
  { id: "saffron", name: "زعفرانی", swatch: "#f4d35e" },
];

type Props = {
  product: CategoryProduct;
  category: Category;
  related: CategoryProduct[];
};

export const ProductView = ({ product, category, related }: Props) => {
  const [color, setColor] = useState(colorOptions[0].id);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = [product.img, product.img, product.img, product.img];

  useEffect(() => {
    posthog.capture("product_viewed", {
      product_id: product.id,
      product_name: product.name,
      category: category.crumb,
      category_slug: category.slug,
      price: product.price,
    });
  }, [product.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleColorSelect = (colorId: string) => {
    setColor(colorId);
    const selected = colorOptions.find((c) => c.id === colorId);
    posthog.capture("product_color_selected", {
      product_id: product.id,
      product_name: product.name,
      color_id: colorId,
      color_name: selected?.name,
    });
  };

  const handleAddToCart = () => {
    posthog.capture("add_to_cart_clicked", {
      product_id: product.id,
      product_name: product.name,
      category: category.crumb,
      category_slug: category.slug,
      price: product.price,
      color: colorOptions.find((c) => c.id === color)?.name,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-clip">
      <Header />

      <main className="flex-1 pt-24 md:pt-28">
        <div className="tg-container">
          <nav
            aria-label="مسیر"
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition">
              خانه
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href="/category" className="hover:text-foreground transition">
              همه‌ی محصولات
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <Link
              href={`/category/${category.slug}`}
              className="hover:text-foreground transition"
            >
              {category.crumb}
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <section className="tg-container pt-8 md:pt-12 pb-14 md:pb-20">
          <div className="grid grid-cols-12 gap-8 lg:gap-14">
            <div className="col-span-12 lg:col-span-7 order-1">
              <div className="relative aspect-square w-full bg-secondary overflow-hidden">
                <Swiper
                  modules={[Navigation]}
                  dir="rtl"
                  navigation
                  spaceBetween={0}
                  slidesPerView={1}
                  onSwiper={setMainSwiper}
                  onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                  className="tg-product-swiper h-full w-full"
                >
                  {gallery.map((g, i) => (
                    <SwiperSlide key={i} className="!h-full">
                      <div className="relative h-full w-full">
                        <AdaptiveImage
                          src={g}
                          alt={`${product.name} — نمای ${i + 1}`}
                          variant="light"
                          fill
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          className="object-contain p-12 md:p-16"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {product.badge && (
                  <span className="pointer-events-none absolute top-5 right-5 z-10 text-[10px] font-black tracking-[0.18em] bg-foreground text-background px-2.5 py-1">
                    {product.badge}
                  </span>
                )}

                <span className="pointer-events-none absolute bottom-5 left-5 z-10 inline-flex items-center gap-2 bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold tracking-[0.18em] px-3 py-2 border border-border">
                  ۳۶۰° نمایش
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-3 md:gap-4">
                {gallery.map((g, i) => {
                  const active = i === activeIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => mainSwiper?.slideTo(i)}
                      aria-label={`نمای ${i + 1}`}
                      className={`relative aspect-square bg-secondary overflow-hidden border transition ${
                        active
                          ? "border-foreground"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <AdaptiveImage
                        src={g}
                        alt=""
                        variant="light"
                        fill
                        sizes="120px"
                        className="object-contain p-3"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 order-2 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-accent" />
                <p className="text-[10px] font-bold tracking-[0.28em] text-muted-foreground">
                  {category.eyebrow}
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.05]">
                {product.name}
              </h1>

              <div className="mt-6 flex items-baseline gap-3">
                {product.priceLabel && (
                  <span className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">
                    {product.priceLabel}
                  </span>
                )}
                <span className="text-3xl md:text-4xl font-bold tabular-nums">
                  {product.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {product.finance}
              </p>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold tracking-[0.24em] text-muted-foreground">
                    رنگ
                  </p>
                  <span className="text-xs font-bold">
                    {colorOptions.find((c) => c.id === color)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {colorOptions.map((c) => {
                    const active = c.id === color;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleColorSelect(c.id)}
                        aria-label={c.name}
                        className={`relative w-10 h-10 rounded-full border transition ${
                          active
                            ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
                            : "border-border hover:border-foreground/50"
                        }`}
                        style={{ backgroundColor: c.swatch }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-accent text-accent-foreground font-bold uppercase tracking-wide text-sm px-6 py-4 hover:brightness-95 transition"
                >
                  افزودن به سبد خرید
                </button>
              </div>

              <ul className="mt-8 grid grid-cols-1 gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground/85">
                    <span
                      aria-hidden
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-foreground text-background"
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-secondary/60 border-y border-border">
          <div className="tg-container py-8 md:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "ارسال و نصب رایگان", desc: "تحویل با هماهنگی قبلی." },
              { icon: ShieldCheck, title: "۳ سال گارانتی", desc: "پشتیبانی رسمی تکنوجیم." },
              { icon: Headphones, title: "مشاوره‌ی تخصصی", desc: "گفت‌وگو با کارشناس تمرین." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="tg-container py-14 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-accent" />
                <p className="text-[10px] font-bold tracking-[0.28em] text-muted-foreground">
                  مشخصات
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                طراحی، عملکرد و جزئیات.
              </h2>
              <p className="mt-4 text-sm text-foreground/75 max-w-md leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="col-span-12 md:col-span-7">
              <dl className="divide-y divide-border border-y border-border">
                {[
                  { k: "دسته", v: category.crumb },
                  { k: "ساخت", v: "ایتالیا — چزنا" },
                  { k: "گارانتی", v: "۳ سال" },
                  { k: "اتصال", v: "وای‌فای، بلوتوث، اپلیکیشن تکنوجیم" },
                  { k: "نصب", v: "رایگان توسط تیم تخصصی" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="grid grid-cols-3 gap-4 py-4 text-sm"
                  >
                    <dt className="col-span-1 text-muted-foreground">{row.k}</dt>
                    <dd className="col-span-2 font-medium">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-background py-14 md:py-20 border-t border-border">
            <div className="tg-container">
              <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-10 bg-accent" />
                    <p className="text-[10px] font-bold tracking-[0.28em] text-muted-foreground">
                      شاید بپسندید
                    </p>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    محصولات مرتبط
                  </h2>
                </div>
                <Link
                  href={`/category/${category.slug}`}
                  className="hidden sm:inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition"
                >
                  مشاهده‌ی همه‌ی {category.crumb}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/product/${r.id}`}
                    onClick={() =>
                      posthog.capture("related_product_clicked", {
                        product_id: r.id,
                        product_name: r.name,
                        source_product_id: product.id,
                        source_product_name: product.name,
                        category: category.crumb,
                      })
                    }
                    className="group flex flex-col bg-card border border-border transition-all hover:border-foreground hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <AdaptiveImage
                        src={r.img}
                        alt={r.name}
                        variant="light"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                        className="object-contain p-10 transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-base font-bold truncate">{r.name}</h3>
                        <p className="text-sm text-muted-foreground tabular-nums mt-1">
                          {r.price}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-foreground group-hover:bg-foreground group-hover:text-background transition"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
