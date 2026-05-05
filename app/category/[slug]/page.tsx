import { notFound } from "next/navigation";
import { CategoryView } from "@/components/site/CategoryView";
import { categorySlugs, getCategory } from "@/lib/categories";

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({ slug }));
}

export default async function CategorySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
