import Image from "next/image";
import { ChevronRight } from "lucide-react";

export const Hero = () => (
  <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
    <Image
      src="/assets/hero-gym.jpg"
      alt="Unica home gym"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-background px-4">
      <div className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
        <span className="italic">1</span>UNICA<sup className="text-base align-super">®</sup>
      </div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl">
        Maximum performance<br />in minimal space
      </h1>
      <p className="mt-6 max-w-xl text-sm md:text-base text-background/85">
        Delivering over 50 exercises in a single piece of equipment, Unica offers full body tone and definition in just 1.5 m².
      </p>
      <a href="#shop" className="tg-btn-yellow mt-8">
        <ChevronRight className="w-4 h-4" /> Explore Unica
      </a>
    </div>
  </section>
);
