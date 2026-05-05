import { notFound } from "next/navigation";
import { ProductView } from "@/components/site/ProductView";
import { getProductById, getRelatedProducts, productIds } from "@/lib/categories";

export function generateStaticParams() {
  return productIds.map((id) => ({ id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = getProductById(id);
  if (!entry) notFound();
  const related = getRelatedProducts(id, 3);
  return (
    <ProductView
      product={entry.product}
      category={entry.category}
      related={related}
    />
  );
}
