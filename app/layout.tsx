import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navigation } from "@/app/components/layout/Navigation";
import { Footer } from "@/app/components/layout/Footer";
import { Chatbot } from "@/app/components/sections/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.REPL_SLUG 
    ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    : 'http://localhost:5000'),
  title: {
    default: "Peter Lightspeed - AI-Powered Web Developer & Virtual Assistant",
    template: "%s | Peter Lightspeed Portfolio"
  },
  description: "Professional Virtual Assistant, Web Developer & Graphic Designer offering website development, content creation, and digital marketing services.",
  keywords: ["virtual assistant", "web developer", "graphic designer", "website development", "digital marketing", "freelancer", "Nigeria"],
  authors: [{ name: "Peter Eluwade Toluwanimi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://peterlight123.github.io/portfolio/",
    siteName: "Peter Lightspeed Portfolio",
    title: "Peter Lightspeed - Virtual Assistant Portfolio",
    description: "Professional Virtual Assistant, Web Developer & Graphic Designer offering website development, content creation, and digital marketing services.",
    images: [
      {
        url: "/images/profile/my-pic.png",
        width: 1200,
        height: 630,
        alt: "Peter Lightspeed"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Peter Lightspeed - Virtual Assistant Portfolio",
    description: "Professional Virtual Assistant, Web Developer & Graphic Designer",
    creator: "@peterlightspeed",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
