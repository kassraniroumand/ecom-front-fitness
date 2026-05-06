import Image from "next/image";

export function ShopBanner() {
  return (
    <section className="relative w-full overflow-hidden md:h-[58vh] md:min-h-[460px] md:max-h-[640px]">
      <div className="grid h-full grid-cols-1 md:grid-cols-[3fr_2fr]">
        <div className="relative aspect-[3/4] md:aspect-auto md:h-full order-1">
          <Image
            src="/assets/strength.jpg"
            alt="فروشگاه نیرومند"
            fill
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-2 flex flex-col justify-center bg-secondary text-foreground px-6 sm:px-10 md:px-10 lg:px-16 py-10 md:py-0">
          <span className="tg-card-eyebrow text-muted-foreground mb-4">
            فروشگاه — تمام محصولات
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1] max-w-xl">
            تجهیزات حرفه‌ای،
            <br />
            طراحی‌شده برای عملکرد
          </h1>
          <p className="mt-5 max-w-md text-sm md:text-base text-foreground/75 leading-relaxed">
            مجموعه کامل تجهیزات بدنسازی و تندرستی نیرومند. از وزنه‌های آزاد تا
            دستگاه‌های هوازی، هر آنچه برای تمرین تخصصی نیاز دارید.
          </p>
        </div>
      </div>
    </section>
  );
}
