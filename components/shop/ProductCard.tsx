import Image from "next/image";
import { faNumber, type Product } from "./types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div className="relative aspect-square bg-card ring-1 ring-border">
        {product.engravable && (
          <span className="tg-card-eyebrow absolute right-3 top-3 z-10 text-muted-foreground">
            حک نام شما
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-5 space-y-1">
        <p className="text-sm md:text-base font-bold leading-snug text-foreground">
          {product.name}
        </p>
        <p className="text-sm font-bold tracking-tight text-foreground">
          {faNumber(product.price)} تومان
        </p>
      </div>
    </div>
  );
}
