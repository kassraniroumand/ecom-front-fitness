import type { HeroSlide } from "@/components/site/HeroSwiper";
import type { FeatureItem } from "@/components/site/FeatureGrid";
import type { CategoryGridItem } from "@/components/site/CategoryGrid";
import type { ShopCategoryItem } from "@/components/site/ShopByCategory";
import type { LatestProduct } from "@/components/site/LatestCarousel";
import type { ElegantProduct, ElegantTab } from "@/components/site/ElegantlyDesigned";
import type { AwardsSection } from "@/components/site/AwardsCarousel";
import type { Story } from "@/components/site/Stories";
import { apiUrl } from "@/lib/api";

export type HomepageContent = {
  heroSlides: HeroSlide[];
  features: FeatureItem[];
  categoryGrid: CategoryGridItem[];
  shopByCategory: ShopCategoryItem[];
  latest: LatestProduct[];
  elegantlyDesigned: { products: ElegantProduct[]; tabs: ElegantTab[] };
  awards: AwardsSection;
  stories: Story[];
};

export async function getHomepageContent(): Promise<HomepageContent> {
  const res = await fetch(apiUrl("/homepage"), {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Content API returned ${res.status}`);
  }
  return (await res.json()) as HomepageContent;
}
