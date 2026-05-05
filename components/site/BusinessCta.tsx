import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const BusinessCta = () => (
  <section className="relative py-10 md:py-14 overflow-hidden">
    <Image
      src="/assets/strength.jpg"
      alt=""
      fill
      sizes="100vw"
      loading="lazy"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-foreground/70" />
    <div className="relative tg-container">
      <SectionHeading
        align="center"
        tone="dark"
        eyebrow="برای کسب‌وکار"
        title="کسب‌وکار تناسب اندامی بسازید که ماندگار باشد"
        description="از استودیوهای بوتیک تا هتل‌های لوکس — تکنوجیم شریک مورد اعتماد بیش از ۱۰۰,۰۰۰ مرکز تندرستی در سراسر جهان است."
      >
        <a href="#" className="tg-btn-yellow mt-2">
          کشف B2B <ArrowUpRight className="w-4 h-4" />
        </a>
      </SectionHeading>
    </div>
  </section>
);
