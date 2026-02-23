import "../public/assets/css/default.css";
import "../public/assets/css/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { barlowCondensed, hankenGrotesk } from "@/lib/font";
import type { ReactNode } from "react";

export const metadata = {
  title: "Chuzitos Gourmet USA - #AyPapááá",
  description: "Donde quieras, cuando quieras. Chuzitos Gourmet USA, sabor colombiano en el corazón de Florida. La comida rápida más TOP.",
  keywords: [
    "Chuzitos Gourmet USA",
    "comida colombiana",
    "Florida",
    "comida rápida",
    "chuzos",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${hankenGrotesk.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}