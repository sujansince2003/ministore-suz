import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, Header } from "@/components/general";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ministore-suz.vercel.app"),
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  title: "Suzz Store",
  description:
    "Discover our  collection of electronics, clothing, jewelry, and more",
  keywords: "online store, electronics, clothing, jewelry, shopping",
  authors: [{ name: "Sujan Khatri" }],
  openGraph: {
    title: "Suzz Store-Online Mini Store",
    description:
      "Discover our  collection of electronics, clothing, jewelry, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Header />
          <div className="max-w-6xl mx-auto">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
