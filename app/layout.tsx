import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes"
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from 'next/font/local'

const LynoJean = localFont({ src: 'fonts/Lyno-Jean.otf', variable: '--font-jean' })
const LynoStan = localFont({ src: 'fonts/Lyno-Stan.otf', variable: '--font-stan' })
const LynoUlys = localFont({ src: 'fonts/Lyno-Ulys.otf', variable: '--font-ulys' })
const LynoWalt = localFont({ src: 'fonts/Lyno-Walt.otf', variable: '--font-walt' })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ninja",
  description: "A brand new tech stack manager not limited to Apache, MySQL and PHP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable} 
          ${LynoJean.variable} 
          ${LynoUlys.variable} 
          ${LynoWalt.variable} 
          ${LynoStan.variable} 
            antialiased h-full`}
      >
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
