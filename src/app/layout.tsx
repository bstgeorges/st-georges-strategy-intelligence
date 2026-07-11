import "../../public/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stgeorgesstrategy.com"),
  applicationName: "The Virtual Officer",
  authors: [{ name: "Ben St Georges", url: "https://www.linkedin.com/in/benstgeorges/" }],
  creator: "Ben St Georges",
  publisher: "St Georges Strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
