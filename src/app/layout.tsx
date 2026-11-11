import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@/components/pwa/PwaRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doce Negócio · Guia de Mesa do Mestre",
  description: "Ferramenta de auxílio e escudo do mestre para conduzir sessões do RPG Doce Negócio com fichas, catálogos, cálculos financeiros e baralho interativo.",
  applicationName: "Doce Negócio",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Doce Negócio"
  }
};

export const viewport: Viewport = {
  themeColor: "#381F14",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1A0F0A] dark:bg-[#140B07] dark:text-[#F4ECE1]">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
