import type { Metadata } from "next";
import { Inter, Anton, Bebas_Neue, Cinzel } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

import SplashScreen from "@/components/ui/SplashScreen";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://natvansh.nitp.ac.in"),
  title: {
    template: "%s | Natvansh",
    default: "Natvansh — Drama & Film Club | NIT Patna",
  },
  description: "नटवंश — अस्ति कश्चित् विशेषः! The official Drama & Film Club of National Institute of Technology, Patna. Where stories come alive on stage and screen.",
  keywords: ["Natvansh", "NIT Patna", "Drama Club", "Film Club", "Theater", "Nukkad Natak", "नटवंश"],
  authors: [{ name: "Natvansh Tech Team" }],
  openGraph: {
    title: "Natvansh — Drama & Film Club",
    description: "The official stage and screen society of NIT Patna. We discover raw talent and perform stories that mirror society.",
    url: "https://natvansh.nitp.ac.in",
    siteName: "Natvansh NIT Patna",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natvansh — Drama & Film Club",
    description: "The official stage and screen society of NIT Patna.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        data-theme="dark"
        className={`${inter.variable} ${anton.variable} ${bebasNeue.variable} ${cinzel.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-screen antialiased">
          <ThemeProvider>
            <CustomCursor />
            <SplashScreen />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
