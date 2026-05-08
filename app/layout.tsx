import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "نیرومند فیتنس | سلامتی و تندرستی",
  description:
    "کشف تجهیزات بدنسازی، راهکارهای تندرستی. باشگاه‌های خانگی پریمیوم، تردمیل، دوچرخه و تجهیزات قدرتی.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Niroumand Fitness | The Wellness Company",
    description:
      "Discover Niroumand Fitness fitness equipment, wellness solutions and design. Premium home gyms, treadmills, bikes and strength training.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2993397e-f0f5-4dc3-b6e8-89886e6b5bf4/id-preview-2ab15596--5b7d2973-f3bf-4419-b58d-9727983e4d65.lovable.app-1777895545006.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niroumand Fitness | The Wellness Company",
    description:
      "Discover Niroumand Fitness fitness equipment, wellness solutions and design. Premium home gyms, treadmills, bikes and strength training.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2993397e-f0f5-4dc3-b6e8-89886e6b5bf4/id-preview-2ab15596--5b7d2973-f3bf-4419-b58d-9727983e4d65.lovable.app-1777895545006.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JLG01FRXR7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JLG01FRXR7');
        `}
      </Script>
    </html>
  );
}
