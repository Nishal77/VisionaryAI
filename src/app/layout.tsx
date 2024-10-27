import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Visionary.AI - The Art Gallery",
  description:
    "Embark on a visual journey with Visionary.AI - where AI transforms your imagination into stunning masterpieces. Explore, create, and immerse yourself in a world of limitless artistic possibilities.",
  keywords: [
    "AI art",
    "image generation",
    "digital gallery",
    "creative exploration",
    "visual inspiration",
  ],
  openGraph: {
    title: "Visionary.AI-Powered Art Generation",
    description:
      "Transform your ideas into captivating visuals with our cutting-edge AI art generator. Discover a new realm of creativity at Visionary-ai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visionary.AI - Where Imagination Meets AI",
    description:
      "Create, explore, and share AI-generated art. Join the visual revolution with Visionary-ai.",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Provider>
            <Header />

            {children}
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
