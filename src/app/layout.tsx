import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Using Playfair Display as a similar serif alternative
const instrumentSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bryan Jaimes | AI/ML Engineer",
  description:
    "AI/ML Engineer building solutions that matter. Specializing in healthcare AI, computer vision, and scalable ML systems. Currently focused on using AI to solve cancer diagnostics.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Healthcare AI",
    "Computer Vision",
    "MLOps",
    "Python",
    "PyTorch",
    "TensorFlow",
  ],
  authors: [{ name: "Bryan Jaimes" }],
  openGraph: {
    title: "Bryan Jaimes | AI/ML Engineer",
    description:
      "AI/ML Engineer building solutions that matter. Specializing in healthcare AI and computer vision.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bryan Jaimes | AI/ML Engineer",
    description:
      "AI/ML Engineer building solutions that matter. Specializing in healthcare AI and computer vision.",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
