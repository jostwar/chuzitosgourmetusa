import "./globals.css";
import "../public/assets/css/default.css";
import "../public/assets/css/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { barlowCondensed, hankenGrotesk } from "@/lib/font";
import type { ReactNode } from "react";
import Webchat from "@/components/Webchat";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Chuzitos Gourmet USA - #AyPapááá",
  description: "Donde quieras, cuando quieras. Sabor colombiano en el corazón de Florida.",
  keywords: [
    "Chuzitos Gourmet USA",
    "comida colombiana",
    "Florida",
    "comida rápida",
    "chuzos",
  ],
};

const HERO_BG_PRELOAD = "https://chuzitos.s3.us-west-2.amazonaws.com/heroback3.png";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${hankenGrotesk.variable}`}>
      <head>
        <link rel="preload" as="image" href={HERO_BG_PRELOAD} />
      </head>
      <body>
        <CartProvider>
          {children}
          <Webchat />
        </CartProvider>
      </body>
    </html>
  );
}