import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";

const veilTitleFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-veil-title",
});

const veilTextFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-veil-text",
});


export const metadata: Metadata = {
  title: "Veil – Hidden Feelings Revealed by Choice",
  description: "Anonymous confession platform for safe, consent-based connections.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${veilTitleFont.variable} ${veilTextFont.variable} antialiased`}>
  {children}
</body>
    </html>
  );
}
