export type SortKey = "recommended" | "newest" | "price-desc" | "price-asc";

export const SORT_LABEL: Record<SortKey, string> = {
  recommended: "پیشنهادی",
  newest: "جدیدترین",
  "price-desc": "قیمت: بالا به پایین",
  "price-asc": "قیمت: پایین به بالا",
};

export type FilterKey = "categories" | "disciplines" | "materials" | "weights";

export type FilterState = Record<FilterKey, string[]>;

export const EMPTY_FILTERS: FilterState = {
  categories: [],
  disciplines: [],
  materials: [],
  weights: [],
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  engravable?: boolean;
  category: string;
  discipline: string;
  material: string;
  weightBucket: string;
};

export const faNumber = (n: number) => n.toLocaleString("fa-IR");
