import { HeroSwiper } from "@/components/site/HeroSwiper";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { ShopByCategory } from "@/components/site/ShopByCategory";
import { EcosystemBanner } from "@/components/site/EcosystemBanner";
import { Stories } from "@/components/site/Stories";
import { LatestCarousel } from "@/components/site/LatestCarousel";
import { ElegantlyDesigned } from "@/components/site/ElegantlyDesigned";
import { AwardsCarousel } from "@/components/site/AwardsCarousel";
import { BusinessCta } from "@/components/site/BusinessCta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSwiper />
        <FeatureGrid />
        <CategoryGrid />
        <ShopByCategory />
        <LatestCarousel />
        <ElegantlyDesigned />
        <AwardsCarousel />
        {/*<EcosystemBanner />*/}
        <Stories />
        {/*<BusinessCta />*/}
      </main>
    </div>
  );
}
