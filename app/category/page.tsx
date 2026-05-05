import { CategoryView } from "@/components/site/CategoryView";
import { allCategoriesView } from "@/lib/categories";

export default function CategoryPage() {
  return <CategoryView category={allCategoriesView} />;
}
