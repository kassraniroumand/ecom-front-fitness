import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { categoryHeroImages, categoryList } from "@/lib/categories";

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-clip">
      <main className="flex-1 pt-28 md:pt-36 px-4 md:px-10 min-w-0">
        <div className="tg-container min-w-0">
          <Breadcrumb>
            <BreadcrumbList className="text-sm md:text-base font-semibold tracking-tight gap-2 md:gap-3">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/"> خانه</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:size-4" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold">
                  دسته‌بندی‌ها
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className="tg-container pt-10 md:pt-14 pb-10 md:pb-16 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-6 max-w-full">
            <span className="h-px w-10 bg-accent shrink-0" />
            <p className="text-[10px] font-bold tracking-[0.28em] text-muted-foreground min-w-0 break-words">
              مجموعه — {categoryList.length} رشته
            </p>
          </div>

          <h1 className="w-full max-w-full md:max-w-3xl text-3xl md:text-5xl font-bold leading-tight [overflow-wrap:anywhere] [word-break:break-word]">
            دسته‌بندی‌های تکنوجیم را کشف کنید
          </h1>

          <p className="mt-6 md:mt-8 w-full max-w-full md:max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed [overflow-wrap:anywhere]">
            از تردمیل‌های جایزه‌برده تا تجهیزات قدرتی، دوچرخه‌های استودیویی و ابزارهای تندرستی — دسته‌ای را انتخاب کنید تا محصولات مرتبط را ببینید.
          </p>
        </section>

        <section className="tg-container pb-16 md:pb-24 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categoryList.map((cat, idx) => {
              const num = String(idx + 1).padStart(2, "0");
              const total = String(categoryList.length).padStart(2, "0");
              const img = categoryHeroImages[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group relative isolate flex aspect-[4/5] sm:aspect-[3/4] flex-col justify-between overflow-hidden bg-foreground text-background min-w-0 transition-shadow hover:shadow-xl"
                >
                  {img && (
                    <Image
                      src={img}
                      alt={cat.crumb}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 -z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-colors duration-500 group-hover:from-black/95" />

                  {/* Top row: number + eyebrow */}
                  <div className="flex items-start justify-between gap-3 p-4 md:p-6">
                    <span className="text-[10px] md:text-xs font-black tabular-nums tracking-[0.25em] text-background/85">
                      {num}
                      <span className="text-background/40"> / {total}</span>
                    </span>
                    <span className="text-end text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-background/70 max-w-[60%] [overflow-wrap:anywhere]">
                      {cat.eyebrow}
                    </span>
                  </div>

                  {/* Bottom block: title + meta + arrow */}
                  <div className="p-4 md:p-6 min-w-0">
                    <div className="flex items-end justify-between gap-3">
                      <h2 className="flex-1 min-w-0 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] [overflow-wrap:anywhere] [word-break:break-word] transition-colors duration-300 group-hover:text-accent">
                        {cat.crumb}
                      </h2>
                      <span className="flex shrink-0 items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-background text-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-[-12deg]">
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-bold tracking-[0.22em] text-background/85">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {cat.products.length} محصول
                      </span>
                      <span className="inline-flex items-center gap-1.5 group-hover:text-accent transition-colors">
                        مشاهده‌ی دسته
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
