import { ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const EcosystemBanner = () => (
  <section className="bg-foreground text-background py-10 md:py-12">
    <div className="tg-container grid md:grid-cols-2 gap-12 items-center">
      <SectionHeading
        tone="dark"
        eyebrow="اکوسیستم تکنوجیم"
        title={<>یک اپلیکیشن.<br />راه‌های بی‌شمار<br />برای تمرین.</>}
        className="mb-0"
      />
      <div>
        <p className="text-base md:text-lg text-background/75 mb-8 max-w-md">
          برنامه‌های شخصی‌سازی‌شده، کلاس‌های زنده و ضبط‌شده، و مربی هوشمند مبتنی بر AI که با شما تطبیق می‌یابد — هرکجا که باشید.
        </p>
        <a href="#" className="tg-btn-yellow">کاوش اپلیکیشن <ChevronRight className="w-4 h-4 rotate-180" /></a>
      </div>
    </div>
  </section>
);
