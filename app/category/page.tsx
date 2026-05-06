import { Header } from "@/components/site/Header";
import { ShopClient } from "@/components/shop/ShopClient";
import { products } from "@/components/shop/products";

export default function CategoryPage() {
  return (
    <>
      <Header />
      <ShopClient products={products} />
    </>
  );
}
