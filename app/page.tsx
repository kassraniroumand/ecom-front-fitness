import { HeroSwiper } from "@/components/site/HeroSwiper";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { ShopByCategory } from "@/components/site/ShopByCategory";
import { Stories } from "@/components/site/Stories";
import { LatestCarousel } from "@/components/site/LatestCarousel";
import { ElegantlyDesigned } from "@/components/site/ElegantlyDesigned";
import { AwardsCarousel } from "@/components/site/AwardsCarousel";
import { getHomepageContent } from "@/lib/homepage-content";

export default async function HomePage() {
  const content = await getHomepageContent();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSwiper slides={content.heroSlides} />
        <FeatureGrid items={content.features} />
        <CategoryGrid items={content.categoryGrid} />
        <ShopByCategory items={content.shopByCategory} />
        <LatestCarousel cards={content.latest} />
        <ElegantlyDesigned
          products={content.elegantlyDesigned.products}
          tabs={content.elegantlyDesigned.tabs}
        />
        <AwardsCarousel
          catalogue={content.awards.catalogue}
          tabs={content.awards.tabs}
          defaultTab={content.awards.defaultTab}
        />
        <Stories stories={content.stories} />
      </main>
    </div>
  );
}
