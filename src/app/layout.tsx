import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lexor.com.br"),
  title: {
    default: "Lexor | Sistemas de crescimento com marketing, IA e tecnologia",
    template: "%s | Lexor",
  },
  description:
    "A Lexor constrói sistemas de crescimento com marketing digital, agentes de IA, automações, sites, funis, apps e posicionamento no Google.",
  keywords: [
    "Lexor",
    "agentes de IA",
    "marketing digital",
    "automação",
    "sites",
    "apps personalizados",
    "posicionamento no Google",
    "funil de vendas",
  ],
  openGraph: {
    title: "Lexor | Vendemos tempo. Conectamos sua empresa com o futuro.",
    description:
      "Marketing, IA, sistemas, apps, automações, funis e Google trabalhando como um só sistema de crescimento.",
    url: "https://lexor.com.br",
    siteName: "Lexor",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lexor | Sistemas de crescimento",
    description:
      "A arquitetura digital que sua empresa precisaria contratar cinco pessoas para operar.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070907",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${geistSans.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
