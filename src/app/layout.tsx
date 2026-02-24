import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arquibancada 90 | Camisas de Futebol Oficiais 2025/26",
  description: "Mostruário digital premium de camisas de futebol oficiais. Lançamentos dos maiores clubes do Brasil e do mundo. Flamengo, Corinthians, Palmeiras, Real Madrid, Barcelona e mais.",
  keywords: [
    "camisas de futebol",
    "camisas oficiais",
    "camisa flamengo",
    "camisa corinthians",
    "camisa real madrid",
    "camisa barcelona",
    "camisas 2025",
    "camisas 2026",
    "uniformes de futebol",
    "jersey football",
    "loja de camisas de futebol",
    "camisas de time",
    "arquibancada 90"
  ],
  authors: [{ name: "Arquibancada 90" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Arquibancada 90 | Camisas de Futebol Oficiais",
    description: "Mostruário digital premium de camisas de futebol oficiais. Lançamentos dos maiores clubes do Brasil e do mundo.",
    url: "https://arquibancada90.vercel.app",
    siteName: "Arquibancada 90",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arquibancada 90 | Camisas de Futebol Oficiais",
    description: "Mostruário digital premium de camisas de futebol oficiais dos maiores clubes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0F1115" />
        <meta name="author" content="Arquibancada 90" />
        <meta property="og:locale" content="pt_BR" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
