import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL
    ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
    : "https://pc-seken.vercel.app";


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: "PCSeken | Repair Laptop & Custom PC",
  description:
    "Kedai komputer dipercayai di Malaysia. Servis repair laptop, format PC, custom PC gaming dan aksesori komputer berkualiti.",

  keywords: [
    "Repair Laptop Malaysia",
    "Kedai Komputer",
    "Custom PC Malaysia",
    "Baiki Laptop",
    "PC Gaming Malaysia",
  ],

  authors: [{ name: "PCSeken" }],

  openGraph: {
    title: "PCSeken | Pakar Komputer Anda",
    description:
      "Pusat servis laptop dan PC terbaik. Pantas, murah, dan berkualiti.",
    url: baseUrl,
    siteName: "PCSeken",
    images: [
      {
        url: "/images/shop.jpeg",
        width: 1200,
        height: 630,
        alt: "PCSeken Shop",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },

  icons: {
    icon: "/icons/logo.png",
    apple: "/icons/logo.png",
  },

  twitter: {
    card: "summary_large_image",
    title: "PCSeken | Repair Laptop & Custom PC",
    description:
      "Servis laptop & PC terbaik di Malaysia.",
    images: ["/images/shop.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}