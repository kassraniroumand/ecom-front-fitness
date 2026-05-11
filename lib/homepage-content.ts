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

type PageResponse = {
  id: number;
  title: string;
  content: HomepageContent;
  seo?: unknown;
};

export async function getHomepageContent(): Promise<HomepageContent> {
  const res = await fetch(apiUrl("/pages/1"), {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Content API returned ${res.status}`);
  }
  const page = (await res.json()) as PageResponse;
  return page.content;
}
