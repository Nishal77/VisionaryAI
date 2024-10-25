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
  title: "ArtSafari - AI Art Gallery",
  description:
    "Embark on a visual journey with ArtSafari - where AI transforms your imagination into stunning masterpieces. Explore, create, and immerse yourself in a world of limitless artistic possibilities.",
  keywords: [
    "AI art",
    "image generation",
    "digital gallery",
    "creative exploration",
    "visual inspiration",
  ],
  openGraph: {
    title: "ArtSafari - AI-Powered Art Generation",
    description:
      "Transform your ideas into captivating visuals with our cutting-edge AI art generator. Discover a new realm of creativity at ArtSafari.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtSafari - Where Imagination Meets AI",
    description:
      "Create, explore, and share AI-generated art. Join the visual revolution with ArtSafari.",
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
