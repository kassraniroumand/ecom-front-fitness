import type { Category } from "@/lib/categories";
import { apiUrl } from "@/lib/api";

export type CategoriesContent = {
  categories: Category[];
  heroImages: Record<string, string>;
};

export async function getCategoriesContent(): Promise<CategoriesContent> {
  const res = await fetch(apiUrl("/categories"), {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Content API returned ${res.status}`);
  }
  return (await res.json()) as CategoriesContent;
}
