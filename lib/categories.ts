export type CategoryProduct = {
  id: string;
  name: string;
  badge?: string;
  priceLabel: string;
  price: string;
  finance: string;
  features: string[];
  img: string;
  dark?: boolean;
};

export type Category = {
  slug: string;
  crumb: string;
  eyebrow: string;
  title: string;
  description: string;
  filters: string[];
  products: CategoryProduct[];
  bottomEyebrow: string;
  bottomTitleLead: string;
  bottomTitleAccent: string;
  bottomTitleTail: string;
};

const running: Category = {
  slug: "running",
  crumb: "تردمیل‌ها",
  eyebrow: "هوازی — ۴ زیرشاخه",
  title: "تردمیل‌های طراحی‌شده برای دویدن واقعی",
  description:
    "کاهش وزن، حفظ تناسب اندام و ارتقای عملکرد با تردمیل‌های جایزه‌برده‌ی ما برای تجربه‌ی تمرین خانگی همه‌جانبه و ایمن. مهندسی‌شده در ایتالیا. مورد اعتماد ورزشکاران، طراحان و المپیکی‌ها برای بیش از ۴۰ سال.",
  filters: ["همه", "خانگی", "استودیو", "حرفه‌ای", "جمع‌وجور", "هوشمند"],
  products: [
    {
      id: "run",
      name: "تکنوجیم ران",
      priceLabel: "از",
      price: "۱۰,۷۲۰ پوند",
      finance: "پرداخت اقساطی ۳۶ ماهه با بهره‌ی ۰٪",
      features: ["حالت سورتمه‌ای", "نرم و کم‌صدا", "تمرین‌های گروهی"],
      img: "/assets/latest-run.png",
    },
    {
      id: "myrun",
      name: "تکنوجیم مای‌ران",
      priceLabel: "از",
      price: "۳,۶۵۰ پوند",
      finance: "پرداخت اقساطی ۳۶ ماهه با بهره‌ی ۰٪",
      features: ["ابعاد جمع‌وجور", "سطح دویدن وفق‌پذیر", "اتصال به تبلت شما"],
      img: "/assets/latest-run.png",
    },
    {
      id: "run-personal",
      name: "ران پرسونال",
      badge: "طراحی آنتونیو سیتریو",
      priceLabel: "",
      price: "۱۳,۴۵۰ پوند",
      finance: "پرداخت بعدی با کلارنا",
      features: ["طراحی منحصربه‌فرد", "دویدن راحت", "نمایشگر ۲۲ اینچی"],
      img: "/assets/latest-run.png",
      dark: true,
    },
    {
      id: "skillrun",
      name: "اسکیل‌ران",
      badge: "حرفه‌ای",
      priceLabel: "از",
      price: "۱۸,۹۰۰ پوند",
      finance: "تأمین مالی ویژه‌ی کسب‌وکار در دسترس است",
      features: ["فناوری مالتی‌درایو", "حالت تمرین سورتمه‌ای", "داشبورد عملکرد"],
      img: "/assets/latest-run.png",
    },
  ],
  bottomEyebrow: "ساخته‌شده برای ماندگاری — مهندسی در چزنا",
  bottomTitleLead: "چهل سال تحقیق",
  bottomTitleAccent: "دویدن",
  bottomTitleTail: "، در هر تسمه.",
};

const strength: Category = {
  slug: "strength",
  crumb: "تجهیزات قدرتی",
  eyebrow: "قدرتی — ۵ زیرشاخه",
  title: "قدرت ناب، طراحی‌شده برای خانه و باشگاه",
  description:
    "از دمبل‌های هوشمند تا مالتی‌جیم‌های جمع‌وجور، تجهیزات قدرتی ما برای فرم‌دهی، مجسمه‌سازی و افزایش قدرت در هر فضایی طراحی شده‌اند. کیفیت ساخت ایتالیایی، با ضمانت بلندمدت.",
  filters: ["همه", "وزنه آزاد", "مالتی‌جیم", "نیمکت", "هوشمند", "جمع‌وجور"],
  products: [
    {
      id: "dumbbell-set",
      name: "ست دمبل هوشمند",
      badge: "جدید",
      priceLabel: "از",
      price: "۵۹۹ پوند",
      finance: "پرداخت اقساطی ۲۴ ماهه با بهره‌ی ۰٪",
      features: ["تنظیم وزن لمسی", "ردیابی تکرارها", "پایه‌ی شارژ"],
      img: "/assets/latest-dumbbells.png",
    },
    {
      id: "power-station",
      name: "پاور استیشن",
      priceLabel: "از",
      price: "۴,۹۹۰ پوند",
      finance: "پرداخت اقساطی ۳۶ ماهه با بهره‌ی ۴.۹٪",
      features: ["مقاومت وفق‌پذیر", "برج جمع‌وجور", "اتصال به اپلیکیشن"],
      img: "/assets/latest-multigym.png",
      dark: true,
    },
    {
      id: "multi-bench",
      name: "نیمکت چندکاره",
      priceLabel: "از",
      price: "۸۹۰ پوند",
      finance: "پرداخت اقساطی ۲۴ ماهه با بهره‌ی ۰٪",
      features: ["زاویه‌ی قابل تنظیم", "تاشو", "روکش چرم مصنوعی"],
      img: "/assets/latest-dumbbells.png",
    },
    {
      id: "kinesis-personal",
      name: "کینسیس پرسونال",
      badge: "طراحی آنتونیو سیتریو",
      priceLabel: "",
      price: "۱۵,۴۰۰ پوند",
      finance: "تأمین مالی شخصی موجود است",
      features: ["مقاومت سه‌بعدی", "بدون نیاز به وزنه", "طراحی نمایشی"],
      img: "/assets/latest-multigym.png",
      dark: true,
    },
  ],
  bottomEyebrow: "مهندسی قدرت — ساخت ایتالیا",
  bottomTitleLead: "هر تکرار،",
  bottomTitleAccent: "قدرتمندتر",
  bottomTitleTail: " از قبل.",
};

const bike: Category = {
  slug: "bike",
  crumb: "دوچرخه‌ها",
  eyebrow: "استقامت — ۳ زیرشاخه",
  title: "دوچرخه‌های ثابتی که با شما همراه‌اند",
  description:
    "از کلاس‌های زنده تا تور آزاد در جاده‌های مجازی، دوچرخه‌های ما تجربه‌ی رکاب‌زنی استودیویی را به خانه‌ی شما می‌آورند. مقاومت مغناطیسی بی‌صدا و نمایشگر متصل.",
  filters: ["همه", "استودیو", "ریکامبنت", "ایندور", "حرفه‌ای", "جمع‌وجور"],
  products: [
    {
      id: "bike-studio",
      name: "بایک استودیو",
      badge: "جدید",
      priceLabel: "از",
      price: "۲,۴۹۰ پوند",
      finance: "پرداخت اقساطی ۳۶ ماهه با بهره‌ی ۴.۹٪",
      features: ["مقاومت مغناطیسی", "کلاس‌های زنده", "نمایشگر قابل تنظیم"],
      img: "/assets/latest-bike.png",
    },
    {
      id: "bike-personal",
      name: "بایک پرسونال",
      badge: "طراحی آنتونیو سیتریو",
      priceLabel: "",
      price: "۹,۲۰۰ پوند",
      finance: "پرداخت بعدی با کلارنا",
      features: ["قاب چرمی", "حالت بی‌صدا", "تجربه‌ی نمایشی"],
      img: "/assets/latest-bike.png",
      dark: true,
    },
    {
      id: "skillbike",
      name: "اسکیل‌بایک",
      badge: "حرفه‌ای",
      priceLabel: "از",
      price: "۶,۸۰۰ پوند",
      finance: "تأمین مالی ویژه‌ی کسب‌وکار در دسترس است",
      features: ["شبیه‌سازی دنده", "حالت رقابتی", "پایش توان"],
      img: "/assets/latest-bike.png",
    },
    {
      id: "myride",
      name: "مای‌راید",
      priceLabel: "از",
      price: "۱,۲۹۰ پوند",
      finance: "پرداخت اقساطی ۲۴ ماهه با بهره‌ی ۰٪",
      features: ["تاشو", "اتصال به تبلت", "وزن سبک"],
      img: "/assets/latest-bike.png",
    },
  ],
  bottomEyebrow: "ساخته‌شده برای رکاب — مهندسی در چزنا",
  bottomTitleLead: "هر چرخش،",
  bottomTitleAccent: "روان‌تر",
  bottomTitleTail: " از قبل.",
};

const wellness: Category = {
  slug: "wellness",
  crumb: "تندرستی",
  eyebrow: "تندرستی — ۴ زیرشاخه",
  title: "تمرین ذهن و بدن، در خانه‌ی شما",
  description:
    "ابزارهای ریکاوری، پوشیدنی‌های هوشمند و تمرین‌های ذهن‌آگاهانه برای زندگی متعادل. هر روز بهتر از دیروز.",
  filters: ["همه", "ریکاوری", "پوشیدنی", "ذهن‌آگاهی", "هوشمند", "سفر"],
  products: [
    {
      id: "myrun-tracker",
      name: "ردیاب مای‌ران",
      badge: "جدید",
      priceLabel: "از",
      price: "۳۴۹ پوند",
      finance: "پرداخت اقساطی ۴ ماهه با بهره‌ی ۰٪",
      features: ["ردیابی ضربان", "اتصال به اپلیکیشن", "ضدآب"],
      img: "/assets/latest-watch.png",
    },
    {
      id: "recovery-kit",
      name: "کیت ریکاوری",
      badge: "جدید",
      priceLabel: "از",
      price: "۱۴۹ پوند",
      finance: "پرداخت اقساطی ۴ ماهه با بهره‌ی ۰٪",
      features: ["ماساژر برقی", "نوار کشی", "غلتک فوم"],
      img: "/assets/latest-recovery.png",
    },
    {
      id: "mindful-mat",
      name: "تشک ذهن‌آگاه",
      priceLabel: "از",
      price: "۸۹ پوند",
      finance: "پرداخت یک‌جا یا با کلارنا",
      features: ["جنس طبیعی", "تاشو", "همراه با کیف"],
      img: "/assets/latest-recovery.png",
    },
    {
      id: "wellness-ring",
      name: "حلقه‌ی تندرستی",
      badge: "نسل دوم",
      priceLabel: "از",
      price: "۲۹۹ پوند",
      finance: "پرداخت اقساطی ۶ ماهه با بهره‌ی ۰٪",
      features: ["پایش خواب", "ردیابی استرس", "باتری ۷ روزه"],
      img: "/assets/latest-watch.png",
      dark: true,
    },
  ],
  bottomEyebrow: "تندرستی — ساخته‌شده برای زندگی روزمره",
  bottomTitleLead: "تعادل،",
  bottomTitleAccent: "هر روز",
  bottomTitleTail: " از سال.",
};

const overview: Category = {
  slug: "all",
  crumb: "همه‌ی محصولات",
  eyebrow: "مجموعه — ۴ رشته",
  title: "همه‌ی تجهیزات تکنوجیم در یک نگاه",
  description:
    "از تردمیل‌های جایزه‌برده تا دمبل‌های هوشمند، دوچرخه‌های استودیویی و ابزارهای ریکاوری. یک اکوسیستم کامل برای هر هدف تمرینی.",
  filters: ["همه", "هوازی", "قدرتی", "استقامت", "تندرستی", "هوشمند"],
  products: [
    running.products[0],
    strength.products[0],
    bike.products[0],
    wellness.products[0],
    running.products[3],
    strength.products[1],
  ],
  bottomEyebrow: "اکوسیستم تکنوجیم — مهندسی در ایتالیا",
  bottomTitleLead: "یک اکوسیستم،",
  bottomTitleAccent: "بی‌نهایت",
  bottomTitleTail: " مسیر تمرین.",
};

const categoriesBySlug: Record<string, Category> = {
  running,
  strength,
  bike,
  wellness,
};

export const categorySlugs = Object.keys(categoriesBySlug);

export const allCategoriesView: Category = overview;

export function getCategory(slug: string): Category | undefined {
  return categoriesBySlug[slug];
}

export type ProductWithCategory = {
  product: CategoryProduct;
  category: Category;
};

const productIndex: Record<string, ProductWithCategory> = (() => {
  const index: Record<string, ProductWithCategory> = {};
  for (const slug of categorySlugs) {
    const cat = categoriesBySlug[slug];
    for (const product of cat.products) {
      if (!index[product.id]) index[product.id] = { product, category: cat };
    }
  }
  return index;
})();

export const productIds = Object.keys(productIndex);

export function getProductById(id: string): ProductWithCategory | undefined {
  return productIndex[id];
}

export function getRelatedProducts(
  id: string,
  limit = 3,
): CategoryProduct[] {
  const entry = productIndex[id];
  if (!entry) return [];
  return entry.category.products.filter((p) => p.id !== id).slice(0, limit);
}
